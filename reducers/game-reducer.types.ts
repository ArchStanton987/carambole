export type CollidedBallId = "ball-2" | "ball-3"

export type GameReducerState = {
  score: number
  collidedBallsIds: CollidedBallId[]
  shots: number
}
export type GameReducerAction =
  | { type: "BALL_COLLISION"; payload: { collidedBallId: CollidedBallId } }
  | { type: "RESET_COLLISIONS" }
  | { type: "INCREMENT_SHOTS" }
  | { type: "RESET" }
