import { watchFetchDoctors } from "@/app/@redux/apis/doctorsSaga";
import { doctorReducer } from "@/app/@redux/reducer/reducer";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import createSagaMiddleware, { Saga } from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    doctor: doctorReducer as Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchDoctors as Saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
