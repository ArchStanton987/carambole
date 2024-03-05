import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "forestgreen"
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  score: {
    position: "absolute",
    top: 20,
    left: 20,
    color: "white",
    fontSize: 10
  },
  shots: {
    position: "absolute",
    top: 20,
    right: 25,
    color: "white",
    fontSize: 10
  }
})

export default styles
