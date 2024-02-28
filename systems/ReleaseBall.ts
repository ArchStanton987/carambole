import { GameEntities } from "entities/Entities.types"

const ReleaseBall = (entities: GameEntities) => {
  const { isFiring, ball1, windowDimensions, physics } = entities
  const { height, width } = windowDimensions
  const { elastic } = physics
  const { position } = ball1.body

  const hasElastic = elastic.bodyB !== null

  if (isFiring && hasElastic) {
    const initBallX = width / 2
    const initBallY = height - 150
    const hasX = Math.abs(position.x - initBallX) <= 10
    const hasY = Math.abs(position.y - initBallY) <= 10
    if (hasX && hasY) {
      elastic.bodyB = null
    }
  }
  return entities
}

export default ReleaseBall
