import { GameEntities } from "entities/Entities.types"
import { GameEngineUpdateEventOptionType } from "react-native-game-engine"
import { Point, getDistance } from "utils"

const MoveBall = (e: GameEntities, { touches }: GameEngineUpdateEventOptionType) => {
  // Handle start touch
  const start = touches.find(x => x.type === "start")

  if (start && e.state === "idle") {
    const startPos: Point = [start.event.pageX, start.event.pageY]

    const ballId = Object.keys(e).find(key => {
      const body = e[key as keyof GameEntities]?.body ?? false

      return body && getDistance([body.position.x, body.position.y], startPos) < 25
    })

    // only the playable ball ("ball1") can be moved
    if (ballId && ballId === "ball1") {
      e.physics.drag.pointA = { x: startPos[0], y: startPos[1] }
      e.physics.drag.pointB = { x: 0, y: 0 }
      e.physics.drag.bodyB = e[ballId].body
      // REFACTOR: DOES NOT EXISTS ???
      e.physics.drag.angleB = e[ballId].body.angle
      e.aimSight.isVisible = true
      e.state = "aiming"
    }
  }

  // Handle move touch
  const move = touches.find(x => x.type === "move")

  if (move) {
    e.physics.drag.pointA = { x: move.event.pageX, y: move.event.pageY }
    e.aimSight.pointB = e.ball1.body.position
  }

  // Handle end touch
  const end = touches.find(x => x.type === "end")

  if (end) {
    e.state = "released"

    e.physics.drag.pointA = { x: 0, y: 0 }
    e.physics.drag.pointB = { x: 0, y: 0 }
    e.physics.drag.bodyB = null

    e.aimSight.isVisible = false
  }

  return e
}

export default MoveBall
