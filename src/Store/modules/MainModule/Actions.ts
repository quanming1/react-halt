import { SET_NAME } from "./Constant";

// test----
export const setNameAction = (name: string) => ({
  type: SET_NAME,
  payload: { name },
});
