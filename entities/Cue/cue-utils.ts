import consts from "consts"

/* eslint-disable import/prefer-default-export */
export const getCueOptions = (): Matter.IBodyDefinition => ({
  isStatic: false,
  restitution: 1,
  inertia: Infinity,
  friction: 1,
  frictionAir: 1,
  frictionStatic: 0,
  label: "cue",
  collisionFilter: { category: consts.collisionFilters.cue }
})
