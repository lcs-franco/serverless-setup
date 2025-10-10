import { ErrorCode } from "../ErrorCode";
import { ApplicationError } from "./ApplicationError";

export class EmailAlreadyInUse extends ApplicationError {
  public override code: ErrorCode;

  constructor() {
    super();

    this.name = "EmailAlreadyInUse";
    this.message = "Email already in use";
    this.code = ErrorCode.EMAIL_ALREADY_IN_USE;
  }
}
