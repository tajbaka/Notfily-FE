export const State = {
  HOVER: "hover" as "hover",
  SELECT: "select" as "select",
  ACTIVE: "active" as "active"
};

export type State = typeof State[keyof typeof State];