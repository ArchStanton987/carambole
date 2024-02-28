import { Dimensions } from "react-native"

import consts from "consts"
import Matter from "matter-js"

const wallVisibleWidth = 20
const MAX_WIDTH = Dimensions.get("screen").width
const MAX_HEIGHT = Dimensions.get("screen").height

export const wallLeft = Matter.Bodies.rectangle(
  -(consts.WALL_WIDTH - wallVisibleWidth) / 2 + wallVisibleWidth,
  MAX_HEIGHT / 2,
  consts.WALL_WIDTH,
  MAX_HEIGHT,
  { isStatic: true, label: "wallLeft" }
)

export const wallRight = Matter.Bodies.rectangle(
  MAX_WIDTH + (consts.WALL_WIDTH - wallVisibleWidth) / 2 - wallVisibleWidth,
  MAX_HEIGHT / 2,
  consts.WALL_WIDTH,
  MAX_HEIGHT,
  { isStatic: true, label: "wallRight" }
)

export const wallTop = Matter.Bodies.rectangle(
  MAX_WIDTH / 2,
  -(consts.WALL_WIDTH - wallVisibleWidth) / 2 + wallVisibleWidth,
  MAX_WIDTH,
  consts.WALL_WIDTH,
  { isStatic: true, label: "wallTop" }
)

export const wallBottom = Matter.Bodies.rectangle(
  MAX_WIDTH / 2,
  MAX_HEIGHT + (consts.WALL_WIDTH - wallVisibleWidth) / 2 - wallVisibleWidth,
  MAX_WIDTH,
  consts.WALL_WIDTH,
  { isStatic: true, label: "wallBottom" }
)
