import { View } from "react-native"

import Matter from "matter-js"

export type CueEntity = {
  body: Matter.Body
  size: [number, number]
  color: string
}

export default function Cue({ size, body, color }: CueEntity) {
  const [width, height] = size
  const x = body.position.x - width / 2
  const y = body.position.y - height / 2
  const angle = body.angle || 0
  return (
    <View
      style={{
        position: "absolute",
        transform: [{ rotate: `${angle - 90}deg` }],
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color
      }}
    />
  )
}
