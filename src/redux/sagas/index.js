import { all } from "redux-saga/effects";
import Auth from "./Auth";
import userSagas from "./users";

export default function* rootSaga() {
  yield all([...userSagas, Auth()]);
}
