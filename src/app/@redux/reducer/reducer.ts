import {
  FETCH_DOCTORS_REQUEST,
  FETCH_DOCTORS_SUCCESS,
  FETCH_DOCTORS_FAILURE,
  IAction,
} from "../actions/actions";

const initialState = {
  loading: false,
  doctors: [],
  error: null,
};

export const doctorReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case FETCH_DOCTORS_REQUEST:
      return { ...state, loading: true };
    case FETCH_DOCTORS_SUCCESS:
      return { ...state, loading: false, doctors: action.payload };
    case FETCH_DOCTORS_FAILURE:
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
};
