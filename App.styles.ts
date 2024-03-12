import { StyleSheet } from "react-native"

type Insets = {
  top: number
  bottom: number
  left: number
  right: number
}

const createStyles = (insets: Insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "forestgreen"
    },
    gameContainer: {
      flex: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    score: {
      position: "absolute",
      top: insets.top,
      left: 20,
      color: "white",
      fontSize: 12
    },
    shots: {
      position: "absolute",
      top: insets.top,
      right: 25,
      color: "white",
      fontSize: 12
    }
  })

export default createStyles
