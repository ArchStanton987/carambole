import { GameEntities } from "entities/Entities.types"

const ResetBall = (e: GameEntities) => {
  const ballHasStopped = e.ball1.body.speed < 0.05
  const hasNoElastic = e.physics.elastic.bodyB === null
  const isRunning = e.state === "running"

  if (isRunning && ballHasStopped && hasNoElastic) {
    const { x, y } = e.ball1.body.position
    e.ballPosition = { x, y }
    e.aimSight.pointA = { x, y }

    e.physics.elastic.pointA = { x, y }
    e.physics.elastic.bodyB = e.ball1.body
    e.state = "idle"
    e.onShotEnd()
  }
  return e
}

export default ResetBall
