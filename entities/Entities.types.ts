import { BallEntity } from "entities/Ball/Ball"
import { WallEntity } from "entities/Wall/Wall"

import { AimSightType } from "./AimSight/AimSight"

export type GameEntities = {
  isFiring: boolean
  state: "idle" | "aiming" | "running"
  aimSight: AimSightType
  ballPosition: { x: number; y: number }
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
