import { GameReducerAction, GameReducerState } from "./game-reducer.types"

const ballsToCollideCount = 2

const gameReducer = (state: GameReducerState, action: GameReducerAction): GameReducerState => {
  switch (action.type) {
    case "BALL_COLLISION": {
      const { collidedBallId } = action.payload
      // if ball already collided, do nothing
      const hasCollided = state.collidedBallsIds.includes(collidedBallId)
      if (hasCollided) return state
      // if not, check if we have enough collided balls to increase score
      const collidedBallsIds = [...state.collidedBallsIds, collidedBallId]
      if (collidedBallsIds.length < ballsToCollideCount) {
        return { ...state, collidedBallsIds }
      }
      // if yes, increase score and reset collided balls
      return { ...state, score: state.score + 1, collidedBallsIds: [] }
    }
    case "RESET_COLLISIONS": {
      return { ...state, collidedBallsIds: [] }
    }
    case "INCREMENT_SHOTS": {
      return { ...state, shots: state.shots + 1 }
    }
    case "RESET": {
      return { score: 0, shots: 0, collidedBallsIds: [] }
    }
    default:
      throw new Error("Invalid action type")
  }
}

export default gameReducer
