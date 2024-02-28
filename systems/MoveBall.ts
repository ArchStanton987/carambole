import { GameEntities } from "entities/Entities.types"
import { GameEngineUpdateEventOptionType } from "react-native-game-engine"
import { Point, getDistance } from "utils"

const MoveBall = (entities: GameEntities, { touches }: GameEngineUpdateEventOptionType) => {
  const { physics, ...rest } = entities
  let { isFiring } = rest
  const { drag } = physics

  // Handle start touch
  const start = touches.find(x => x.type === "start")

  if (start) {
    const startPos: Point = [start.event.pageX, start.event.pageY]

    const ballId = Object.keys(entities).find(key => {
      const body = entities[key as keyof GameEntities]?.body ?? false

      return body && getDistance([body.position.x, body.position.y], startPos) < 25
    })

    // only basic "ball" can be moved
    if (ballId && ballId === "ball1" && !isFiring) {
      drag.pointA = { x: startPos[0], y: startPos[1] }
      drag.pointB = { x: 0, y: 0 }
      drag.bodyB = entities[ballId].body
      // REFACTOR: DOES NOT EXISTS ???
      drag.angleB = entities[ballId].body.angle
    }
  }

  // Handle move touch
  const move = touches.find(x => x.type === "move")

  if (move) {
    drag.pointA = { x: move.event.pageX, y: move.event.pageY }
  }

  // Handle end touch
  const end = touches.find(x => x.type === "end")

  if (end) {
    isFiring = true

    drag.pointA = { x: 0, y: 0 }
    drag.pointB = { x: 0, y: 0 }
    drag.bodyB = null
  }

  return { ...entities, isFiring }
}

export default MoveBall
