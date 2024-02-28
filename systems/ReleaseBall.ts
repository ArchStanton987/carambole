import { GameEntities } from "entities/Entities.types"

const ReleaseBall = (entities: GameEntities) => {
  const { isFiring, ball1, ballPosition, physics } = entities
  const { elastic } = physics
  const { position } = ball1.body

  const hasElastic = elastic.bodyB !== null

  if (isFiring && hasElastic) {
    const hasX = Math.abs(position.x - ballPosition.x) <= 10
    const hasY = Math.abs(position.y - ballPosition.y) <= 10
    if (hasX && hasY) {
      elastic.bodyB = null
    }
  }
  return entities
}

export default ReleaseBall
