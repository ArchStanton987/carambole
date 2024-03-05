import { GameEntities } from "entities/Entities.types"

const ReleaseBall = (e: GameEntities) => {
  const hasElastic = e.physics.elastic.bodyB !== null

  if (e.state === "released" && hasElastic) {
    const hasX = Math.abs(e.ball1.body.position.x - e.ballPosition.x) <= 10
    const hasY = Math.abs(e.ball1.body.position.y - e.ballPosition.y) <= 10
    if (hasX && hasY) {
      e.physics.elastic.bodyB = null
      e.state = "running"
      e.scoreActions.incrementShots()
    }
  }
  return e
}

export default ReleaseBall
