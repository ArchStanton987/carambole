import { useReducer, useRef, useState } from "react"
import { Text, useWindowDimensions } from "react-native"

import consts from "consts"
import AimSight from "entities/AimSight/AimSight"
import Ball from "entities/Ball/Ball"
import { getBallOptions, handleCollision } from "entities/Ball/ball-utils"
import Wall from "entities/Wall/Wall"
import { wallBottom, wallLeft, wallRight, wallTop } from "entities/Wall/walls-options"
import Matter from "matter-js"
import { GameEngine } from "react-native-game-engine"
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import gameReducer from "reducers/game-reducer"
import MoveBall from "systems/MoveBall"
import Physics from "systems/Physics"
import ReleaseBall from "systems/ReleaseBall"
import ResetBall from "systems/ResetBall"

import PressableFullScreen from "components/PressableFullScreen/PressableFullScreen"
import Start from "components/Start/Start"

import styles from "./App.styles"

const initState = { score: 0, shots: 0, collidedBallsIds: [] }

function Game() {
  const gameRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  const [scoreState, dispatch] = useReducer(gameReducer, initState)

  const dimensions = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const height = dimensions.height - insets.top - insets.bottom
  const width = dimensions.width - insets.left - insets.right

  const engine = Matter.Engine.create({ enableSleeping: false })
  const { world } = engine
  engine.gravity.y = 0

  const initBallX = width / 2
  const initBall1Y = height - height * 0.1
  const anchor = { x: initBallX, y: initBall1Y }

  const ball1 = Matter.Bodies.circle(initBallX, initBall1Y, consts.BALL_SIZE / 2, getBallOptions(1))
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

  Matter.Events.on(engine, "collisionStart", event => handleCollision(event, dispatch))

  // PREVENTS BALLS TO STICK TO THE WALL ON LOW SPEED COLLISION
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
          state: "idle",
          scoreActions: {
            resetCollisions: () => dispatch({ type: "RESET_COLLISIONS" }),
            incrementShots: () => dispatch({ type: "INCREMENT_SHOTS" }),
            reset: () => dispatch({ type: "RESET" })
          },
          score: 0,
          windowDimensions: { height, width },
          ballPosition: { x: initBallX, y: initBall1Y },
          physics: { engine, world, drag, elastic },
          aimSight: {
            pointA: { x: initBallX, y: initBall1Y },
            pointB: { x: initBallX, y: initBall1Y },
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
