import { GameEntities } from "entities/Entities.types"

const ResetBall = (entities: GameEntities) => {
  const { ball1, physics, aimSight, onShotEnd, ...rest } = entities
  let { isFiring, ballPosition } = rest
  const { elastic } = physics
  const ballHasStopped = ball1.body.speed < 0.05
  const hasNoElastic = elastic.bodyB === null

  if (isFiring && ballHasStopped && hasNoElastic) {
    const { x, y } = ball1.body.position
    ballPosition = { x, y }
    aimSight.pointA = { x, y }

    elastic.pointA = { x, y }
    elastic.bodyB = ball1.body
    isFiring = false
    onShotEnd()
  }
  return { ...entities, ballPosition, aimSight, isFiring, physics: { ...physics, elastic } }
}

export default ResetBall
