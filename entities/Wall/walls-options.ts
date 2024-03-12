import consts from "consts"
import Matter from "matter-js"

type Insets = {
  top: number
  bottom: number
  left: number
  right: number
}

type Dimensions = {
  height: number
  width: number
}

const wallVisibleWidth = 10
const scoreHeight = 12

const getWalls = (insets: Insets, dimensions: Dimensions) => {
  const width = dimensions.width - insets.left - insets.right
  const wallLeft = Matter.Bodies.rectangle(
    -(consts.WALL_WIDTH / 2) + wallVisibleWidth,
    0,
    consts.WALL_WIDTH,
    dimensions.height * 2,
    { isStatic: true, label: "wallLeft" }
  )
  const wallRight = Matter.Bodies.rectangle(
    width + consts.WALL_WIDTH / 2 - wallVisibleWidth,
    0,
    consts.WALL_WIDTH,
    dimensions.height * 2,
    { isStatic: true, label: "wallRight" }
  )

  const wallTop = Matter.Bodies.rectangle(
    0,
    -consts.WALL_WIDTH / 2 + wallVisibleWidth + insets.top + scoreHeight,
    dimensions.width * 2,
    consts.WALL_WIDTH,
    { isStatic: true, label: "wallTop" }
  )

  const wallBottom = Matter.Bodies.rectangle(
    0,
    dimensions.height + consts.WALL_WIDTH / 2 - wallVisibleWidth - insets.bottom,
    dimensions.width * 2,
    consts.WALL_WIDTH,
    { isStatic: true, label: "wallBottom" }
  )

  return { wallLeft, wallRight, wallTop, wallBottom }
}

export default getWalls
