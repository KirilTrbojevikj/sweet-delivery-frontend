import { Result, Status } from "../types";

export class Handler {
  static LoadingResult = <T>(): Result<T> => {
    return {
      value: null,
      message: null,
      status: Status.LOADING,
    } as Result<T>;
  };

  static SuccessResult = <T>(payload: T): Result<T> => {
    return {
      value: payload,
      message: null,
      status: Status.SUCCESS,
    } as Result<T>;
  };

  static ErrorResult = <T>(reason: any): Result<T> => {
    return {
      value: null,
      message: reason.response.data.detail,
      status: Status.ERROR,
    } as Result<T>;
  };
}
