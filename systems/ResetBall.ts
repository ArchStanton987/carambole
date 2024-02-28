import { GameEntities } from "entities/Entities.types"
import Matter from "matter-js"

const ResetBall = (entities: GameEntities) => {
  const { ball1, windowDimensions, physics, ...rest } = entities
  const { height, width } = windowDimensions
  const { elastic } = physics

  let { isFiring } = rest
  const ballHasStopped = ball1.body.speed < 0.05
  const hasNoElastic = elastic.bodyB === null

  if (isFiring && ballHasStopped && hasNoElastic) {
    const initBallX = width / 2
    const initBallY = height - 150
    Matter.Body.setPosition(ball1.body, { x: initBallX, y: initBallY })
    Matter.Body.setVelocity(ball1.body, { x: 0, y: 0 })
    elastic.bodyB = ball1.body
    isFiring = false
    return { ...entities, isFiring }
  }
  return entities
}

export default ResetBall
