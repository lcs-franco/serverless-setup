import { Controller } from "@application/contracts/Controller";
import { EmailConfirmationUseCase } from "@application/useCases/auth/EmailConfirmationUseCase";
import { Injectable } from "@kernel/decorators/Injectable";
import { Schema } from "@kernel/decorators/Schema";
import {
  EmailConfirmationBody,
  emailConfirmationSchema,
} from "./schemas/emailConfirmationSchema";

@Injectable()
@Schema(emailConfirmationSchema)
export class EmailConfirmationController extends Controller<
  "public",
  EmailConfirmationController.Response
> {
  constructor(
    private readonly emailConfirmationUseCase: EmailConfirmationUseCase
  ) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<"public", EmailConfirmationBody>): Promise<
    Controller.Response<EmailConfirmationController.Response>
  > {
    const { code, email } = body;

    await this.emailConfirmationUseCase.execute({ code, email });

    return {
      statusCode: 200,
    };
  }
}

export namespace EmailConfirmationController {
  export type Response = void;
}
