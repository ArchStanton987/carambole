import { View } from "react-native"

export type WallEntity = {
  body: Matter.Body
  size: [number, number]
  color: string
}

export default function Wall({ size, body, color }: WallEntity) {
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
