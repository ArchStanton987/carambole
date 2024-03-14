import { BallEntity } from "entities/Ball/Ball"
import { CueEntity } from "entities/Cue/Cue"
import { WallEntity } from "entities/Wall/Wall"

import { AimSightType } from "./AimSight/AimSight"

export type GameEntities = {
  state: "idle" | "aiming" | "released" | "running"
  scoreActions: {
    resetCollisions: () => void
    incrementShots: () => void
    reset: () => void
  }
  aimSight: AimSightType
  ballPosition: { x: number; y: number }
  cue: CueEntity
  ball1: BallEntity
  ball2: BallEntity
  ball3: BallEntity
  wallLeft: WallEntity
  wallRight: WallEntity
  wallTop: WallEntity
  wallBottom: WallEntity
  windowDimensions: { height: number; width: number }
  physics: {
    engine: Matter.Engine
    world: Matter.World
    drag: Matter.Constraint
    elastic: Matter.Constraint
  }
}
