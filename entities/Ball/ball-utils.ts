/* eslint-disable no-bitwise */
import consts from "consts"
import Matter from "matter-js"
import { CollidedBallId, GameReducerAction } from "reducers/game-reducer.types"

export const getBallOptions = (ballIndex: number): Matter.IBodyDefinition => ({
  isStatic: false,
  restitution: 1,
  inertia: Infinity, // no speed loss due to torque in a collision
  friction: 0, // perfect slide in a collision
  frictionAir: 0.015, // no air resistance
  frictionStatic: 0, // never stop moving
  label: `ball-${ballIndex}`,
  collisionFilter: {
    mask:
      ballIndex === 1
        ? consts.collisionFilters.cue | consts.collisionFilters.default
        : consts.collisionFilters.default
  }
})

export const handleCollision = (
  event: Matter.IEventCollision<Matter.Engine>,
  dispatch: (e: GameReducerAction) => void
): void => {
  const bodyALabel = event.pairs[0].bodyA.label
  const bodyBLabel = event.pairs[0].bodyB.label
  const includesBall1 = [bodyALabel, bodyBLabel].includes("ball-1")
  const includesWall = [bodyALabel, bodyBLabel].some(label => label.includes("wall"))
  if (!includesBall1 || includesWall) return
  const collidedBallId = [bodyALabel, bodyBLabel].find(e => e !== "ball-1") as CollidedBallId
  dispatch({ type: "BALL_COLLISION", payload: { collidedBallId } })
}
