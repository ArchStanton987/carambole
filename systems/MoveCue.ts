import consts from "consts"
import { GameEntities } from "entities/Entities.types"
import Matter from "matter-js"
import { GameEngineUpdateEventOptionType } from "react-native-game-engine"
import { Point } from "utils"

const MoveCue = (e: GameEntities, { touches }: GameEngineUpdateEventOptionType) => {
  const cueOffset = consts.CUE_HEIGHT / 2 + 40
  // Handle start touch
  const start = touches.find(x => x.type === "start")

  if (start && e.state === "idle") {
    const startPos: Point = [start.event.pageX, start.event.pageY]

    const touchEventPosition = { x: startPos[0], y: startPos[1] }
    const ball1Position = e.ball1.body.position
    const cueAngle = Matter.Vector.angle(touchEventPosition, ball1Position) * (180 / Math.PI)
    const cuePosition = [
      ball1Position.x - Math.cos(cueAngle * (Math.PI / 180)) * cueOffset,
      ball1Position.y - Math.sin(cueAngle * (Math.PI / 180)) * cueOffset
    ]
    e.cue.body.angle = cueAngle
    e.cue.body.position = { x: cuePosition[0], y: cuePosition[1] }
    e.physics.drag.pointA = { x: startPos[0], y: startPos[1] }
    e.physics.drag.pointB = { x: 0, y: 0 }
    e.physics.drag.angleB = e.cue.body.angle
    e.aimSight.isVisible = true
    e.state = "aiming"
  }

  // Handle move touch
  const move = touches.find(x => x.type === "move")

  if (move) {
    e.physics.drag.pointA = { x: move.event.pageX, y: move.event.pageY }
    e.aimSight.pointB = e.cue.body.position
    const touchEventPosition = e.physics.drag.pointA
    const ball1Position = e.ball1.body.position
    const cueAngle = Matter.Vector.angle(touchEventPosition, ball1Position) * (180 / Math.PI)
    e.cue.body.angle = cueAngle

    const cuePosition = [
      ball1Position.x - Math.cos(cueAngle * (Math.PI / 180)) * cueOffset,
      ball1Position.y - Math.sin(cueAngle * (Math.PI / 180)) * cueOffset
    ]

    e.cue.body.position = { x: cuePosition[0], y: cuePosition[1] }
  }

  // Handle end touch
  const end = touches.find(x => x.type === "end")

  if (end) {
    e.state = "idle"

    e.physics.drag.pointA = { x: 0, y: 0 }
    e.physics.drag.pointB = { x: 0, y: 0 }
    e.physics.drag.bodyB = null

    e.aimSight.isVisible = false
  }

  return e
}

export default MoveCue
