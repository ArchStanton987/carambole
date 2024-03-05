import { useReducer, useRef, useState } from "react"
import { Text, useWindowDimensions } from "react-native"

import consts from "consts"
import AimSight from "entities/AimSight/AimSight"
import Ball from "entities/Ball/Ball"
import Wall from "entities/Wall/Wall"
import { wallBottom, wallLeft, wallRight, wallTop } from "entities/Wall/walls-options"
import Matter from "matter-js"
import { GameEngine } from "react-native-game-engine"
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import MoveBall from "systems/MoveBall"
import Physics from "systems/Physics"
import ReleaseBall from "systems/ReleaseBall"
import ResetBall from "systems/ResetBall"

import PressableFullScreen from "components/PressableFullScreen/PressableFullScreen"
import Start from "components/Start/Start"

import styles from "./App.styles"

const getBallOptions = (ballIndex: number): Matter.IBodyDefinition => ({
  isStatic: false,
  restitution: 1,
  inertia: Infinity, // no speed loss due to torque in a collision
  friction: 0, // perfect slide in a collision
  frictionAir: 0.015, // no air resistance
  frictionStatic: 0, // never stop moving
  // collisionFilter: { group: -1 },
  label: `ball-${ballIndex}`
})

type CollidedBallId = "ball-2" | "ball-3"

type StateType = {
  score: number
  collidedBallsIds: CollidedBallId[]
  shots: number
}
const ballsToCollideNb = 2
const initState = { score: 0, shots: 0, collidedBallsIds: [] }
type ActionType =
  | { type: "ON_COLLISION"; payload: { collidedBallId: CollidedBallId } }
  | { type: "ON_END_SHOT" }
  | { type: "ON_RESET" }
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "ON_COLLISION": {
      const { collidedBallId } = action.payload
      // if ball already collided, do nothing
      const hasCollided = state.collidedBallsIds.includes(collidedBallId)
      if (hasCollided) return state
      // if not, check if we have enough collided balls to increase score
      const collidedBallsIds = [...state.collidedBallsIds, collidedBallId]
      if (collidedBallsIds.length < ballsToCollideNb) {
        return { ...state, collidedBallsIds }
      }
      // if yes, increase score and reset collided balls
      return { ...state, score: state.score + 1, collidedBallsIds: [] }
    }
    case "ON_END_SHOT": {
      return { ...state, shots: state.shots + 1, collidedBallsIds: [] }
    }
    case "ON_RESET": {
      return { score: 0, shots: 0, collidedBallsIds: [] }
    }
    default:
      throw new Error("Invalid action type")
  }
}

function Game() {
  const gameRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)

  const [scoreState, dispatch] = useReducer(reducer, initState)

  const dimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const height = dimensions.height - insets.top - insets.bottom
  const width = dimensions.width - insets.left - insets.right

  const engine = Matter.Engine.create({ enableSleeping: false })
  const { world } = engine
  engine.gravity.y = 0

  const initBallX = width / 2
  const ball1Y = height - 150
  const anchor = { x: initBallX, y: ball1Y }

  const ball1 = Matter.Bodies.circle(
    initBallX,
    height - 150,
    consts.BALL_SIZE / 2,
    getBallOptions(1)
  )
  const ball2 = Matter.Bodies.circle(initBallX, 200, consts.BALL_SIZE / 2, getBallOptions(2))
  const ball3 = Matter.Bodies.circle(initBallX, 300, consts.BALL_SIZE / 2, getBallOptions(3))

  const drag = Matter.Constraint.create({
    label: "drag",
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 },
    length: 0.01,
    stiffness: 0.05
  })

  const elastic = Matter.Constraint.create({
    pointA: anchor,
    bodyB: ball1,
    length: 0.01,
    damping: 0.01,
    stiffness: 0.05
  })

  Matter.World.add(world, [ball1, ball2, ball3, wallLeft, wallTop, wallRight, wallBottom])
  Matter.World.addConstraint(world, drag)
  Matter.World.addConstraint(world, elastic)

  Matter.Events.on(engine, "collisionStart", event => {
    const bodyALabel = event.pairs[0].bodyA.label
    const bodyBLabel = event.pairs[0].bodyB.label
    const includesBall1 = [bodyALabel, bodyBLabel].includes("ball-1")
    const includesWall = [bodyALabel, bodyBLabel].some(label => label.includes("wall"))
    if (!includesBall1 || includesWall) return
    const collidedBallId = [bodyALabel, bodyBLabel].find(
      label => label !== "ball-1"
    ) as CollidedBallId
    dispatch({ type: "ON_COLLISION", payload: { collidedBallId } })
  })

  // PREVENTS BALLS TO STICK TO THE BALL ON LOW SPEED COLLISION
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  Matter.Resolver._restingThresh = 0.001

  return (
    <>
      <GameEngine
        ref={gameRef}
        style={styles.gameContainer}
        running={isRunning}
        systems={[Physics, MoveBall, ReleaseBall, ResetBall]}
        entities={{
          isFiring: false,
          state: "idle",
          onShotEnd: () => dispatch({ type: "ON_END_SHOT" }),
          score: 0,
          windowDimensions: { height, width },
          ballPosition: { x: initBallX, y: ball1Y },
          physics: { engine, world, drag, elastic },
          aimSight: {
            pointA: { x: initBallX, y: ball1Y },
            pointB: { x: initBallX, y: ball1Y },
            isVisible: false,
            renderer: AimSight
          },
          ball1: {
            body: ball1,
            size: [consts.BALL_SIZE, consts.BALL_SIZE],
            color: "floralwhite",
            renderer: Ball
          },
          ball2: {
            body: ball2,
            size: [consts.BALL_SIZE, consts.BALL_SIZE],
            color: "firebrick",
            renderer: Ball
          },
          ball3: {
            body: ball3,
            size: [consts.BALL_SIZE, consts.BALL_SIZE],
            color: "firebrick",
            renderer: Ball
          },
          wallLeft: {
            body: wallLeft,
            size: [consts.WALL_WIDTH, dimensions.height],
            color: "darkgreen",
            renderer: Wall
          },
          wallRight: {
            body: wallRight,
            size: [consts.WALL_WIDTH, dimensions.height],
            color: "darkgreen",
            renderer: Wall
          },
          wallTop: {
            body: wallTop,
            size: [height, consts.WALL_WIDTH],
            color: "darkgreen",
            renderer: Wall
          },
          wallBottom: {
            body: wallBottom,
            size: [height, consts.WALL_WIDTH],
            color: "darkgreen",
            renderer: Wall
          }
        }}
      />
      <Text style={styles.score}>score:{scoreState.score}</Text>
      <Text style={styles.shots}>shots:{scoreState.shots}</Text>
      {!isRunning && <Start />}
      {!isRunning && <PressableFullScreen onPress={() => setIsRunning(true)} />}
    </>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Game />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
