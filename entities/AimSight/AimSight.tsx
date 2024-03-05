import { View } from "react-native"

import Matter from "matter-js"
import { getDistance } from "utils"

export type AimSightType = {
  pointA: { x: number; y: number }
  pointB: { x: number; y: number }
  isVisible: boolean
}

export default function AimSight({ pointA, pointB, isVisible }: AimSightType) {
  const distance = getDistance([pointA.x, pointA.y], [pointB.x, pointB.y])
  const angle = Matter.Vector.angle(pointA, pointB) * (180 / Math.PI)

  if (!isVisible) return null

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        transform: [{ rotate: `${angle}deg` }],
        height: distance * 2,
        width: distance * 2,
        borderTopColor: "blue",
        top: pointA.y - distance,
        left: pointA.x - distance
      }}
    >
      <View
        style={{
          position: "absolute",
          height: 1,
          width: 1000,
          right: distance,
          backgroundColor: "white"
        }}
      />
    </View>
  )
}
