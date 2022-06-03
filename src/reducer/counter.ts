export const INCREASECOUNT = 'counter/INCREASECOUNT';
export const DECREASECOUNT = 'counter/DECREASECOUNT';

export interface CountState {
  data: number;
  constatnt: number;
}

interface CountAction {
  type: string;
}

const initialState: CountState = {
  data: 0,
  constatnt: 23,
};

export const increment = () => ({
  type: INCREASECOUNT,
});

export const decrement = () => ({
  type: DECREASECOUNT,
});

// 리듀서
export default function counterReducer(
  state: CountState,
  action: CountAction,
): CountState {
  switch (action.type) {
    case INCREASECOUNT:
      return {
        ...state,
        data: state.data + 1,
      };
    case DECREASECOUNT:
      return {
        ...state,
        data: state.data - 1,
      };
    default:
      return state || initialState;
  }
}
