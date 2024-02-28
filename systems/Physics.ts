import { GameEntities } from "entities/Entities.types"
import Matter from "matter-js"
import { GameEngineUpdateEventOptionType } from "react-native-game-engine"

const Physics = (entities: GameEntities, { time }: GameEngineUpdateEventOptionType) => {
  const { engine } = entities.physics
  Matter.Engine.update(engine, time.delta)
  return entities
}

export default Physics
