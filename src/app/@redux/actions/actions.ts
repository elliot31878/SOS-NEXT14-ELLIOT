import { Doctor } from "./@types";

export const FETCH_DOCTORS_REQUEST = "FETCH_DOCTORS_REQUEST";
export const FETCH_DOCTORS_SUCCESS = "FETCH_DOCTORS_SUCCESS";
export const FETCH_DOCTORS_FAILURE = "FETCH_DOCTORS_FAILURE";

export type IAction = {
  type:
    | "FETCH_DOCTORS_REQUEST"
    | "FETCH_DOCTORS_SUCCESS"
    | "FETCH_DOCTORS_FAILURE";
  payload: Doctor[] | string | null;
};

export interface FetchDoctorsRequestAction {
  type: typeof FETCH_DOCTORS_REQUEST;
}

export interface FetchDoctorsSuccessAction {
  type: typeof FETCH_DOCTORS_SUCCESS;
  payload: Doctor[];
}

export interface FetchDoctorsFailureAction {
  type: typeof FETCH_DOCTORS_FAILURE;
  payload: string;
}

export type DoctorActionTypes =
  | FetchDoctorsRequestAction
  | FetchDoctorsSuccessAction
  | FetchDoctorsFailureAction;

export const fetchDoctorsRequest = (): FetchDoctorsRequestAction => ({
  type: FETCH_DOCTORS_REQUEST,
});

export const fetchDoctorsSuccess = (
  doctors: Doctor[]
): FetchDoctorsSuccessAction => ({
  type: FETCH_DOCTORS_SUCCESS,
  payload: doctors,
});

export const fetchDoctorsFailure = (
  error: string
): FetchDoctorsFailureAction => ({
  type: FETCH_DOCTORS_FAILURE,
  payload: error,
});
