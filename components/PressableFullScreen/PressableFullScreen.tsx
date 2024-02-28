import React from "react"
import { Pressable, PressableProps, useWindowDimensions } from "react-native"

export default function PressableFullScreen({ onPress }: PressableProps) {
  const { height, width } = useWindowDimensions()
  return (
    <Pressable
      style={{
        position: "absolute",
        height,
        width,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onPress={onPress}
    />
  )
}
