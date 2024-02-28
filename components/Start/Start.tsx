import React from "react"
import { Text, useWindowDimensions } from "react-native"

export default function Start() {
  const { height, width } = useWindowDimensions()
  return (
    <Text
      style={{
        position: "absolute",
        top: height / 2,
        left: width / 2,
        transform: [{ translateX: -50 }, { translateY: -50 }],
        fontSize: 50
      }}
    >
      START
    </Text>
  )
}
