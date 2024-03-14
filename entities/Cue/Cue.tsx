import { View } from "react-native"

export type CueEntity = {
  body: Matter.Body
  size: [number, number]
  color: string
}

export default function Cue({ size, body, color }: CueEntity) {
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
        backgroundColor: color
      }}
    />
  )
}
