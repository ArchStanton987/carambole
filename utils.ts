/* eslint-disable import/prefer-default-export */
export type Point = [number, number]

export const getDistance = ([x1, y1]: Point, [x2, y2]: Point) =>
  Math.sqrt(Math.abs((x2 - x1) ** 2 + (y2 - y1) ** 2))
