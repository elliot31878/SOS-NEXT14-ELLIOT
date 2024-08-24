import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
  ForkEffect,
} from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  DoctorActionTypes,
  FETCH_DOCTORS_REQUEST,
  fetchDoctorsFailure,
  FetchDoctorsFailureAction,
  FetchDoctorsRequestAction,
  fetchDoctorsSuccess,
  FetchDoctorsSuccessAction,
} from "../actions/actions";
import apiClient from "@/app/network/axios";
import { Doctor } from "../actions/@types";

type FetchDoctorsResponse = AxiosResponse<Doctor[]>;

function* fetchDoctorsSaga(): Generator<
  | CallEffect<unknown>
  | PutEffect<FetchDoctorsSuccessAction>
  | PutEffect<FetchDoctorsFailureAction>
  | void,
  void,
  FetchDoctorsResponse
> {
  try {
    const response: FetchDoctorsResponse = yield call(
      apiClient.get,
      "dockters"
    );
    yield put(fetchDoctorsSuccess(response.data as Doctor[]));
  } catch (error: any) {
    yield put(fetchDoctorsFailure(error.message));
  }
}

export function* watchFetchDoctors(): Generator<
  CallEffect<FetchDoctorsRequestAction> | ForkEffect<never> | void,
  void,
  DoctorActionTypes
> {
  yield takeEvery(FETCH_DOCTORS_REQUEST, fetchDoctorsSaga);
}
