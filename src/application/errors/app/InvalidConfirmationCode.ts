import { ErrorCode } from "../ErrorCode";
import { ApplicationError } from "./ApplicationError";

export class InvalidConfirmationCode extends ApplicationError {
  public override code: ErrorCode;
  public override statusCode = 401;

  constructor() {
    super();

    this.name = "InvalidConfirmationCode";
    this.message = "Invalid confirmation code";
    this.code = ErrorCode.INVALID_CONFIRMATION_CODE;
  }
}
