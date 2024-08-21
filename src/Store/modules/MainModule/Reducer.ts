import { SET_NAME } from "./Constant";

interface IState {
  name: string;
}

const initState = (): IState => ({
  name: "test-name",
});

const types: {
  [name: string]: (
    state: ReturnType<typeof initState>,
    action: { type: string; payload: any },
  ) => ReturnType<typeof initState>;
} = {
  [SET_NAME](state, action) {
    state.name = action.payload.name;
    return state;
  },
};

const mainReducer = (state = initState(), action: { payload: any; type: string }) => {
  return types[action.type] ? types[action.type]({ ...state }, action) : state;
};
export default mainReducer;
