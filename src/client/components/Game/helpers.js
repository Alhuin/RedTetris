export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const initStage = () => Array.from(
  Array(STAGE_HEIGHT),
  () => Array.from(Array(STAGE_WIDTH)).fill([0, 'clear']),
);
