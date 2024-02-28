import { View } from "react-native"

import consts from "consts"

export type BallEntity = {
  body: Matter.Body
  size: [number, number]
  color: string
}

export default function Ball({ size, body, color }: BallEntity) {
  const [width, height] = size
  const x = body.position.x - width / 2
  const y = body.position.y - height / 2
  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color,
        borderRadius: consts.BALL_SIZE / 2
      }}
    />
  )
}
