import { AuthGateway } from "@infra/gateways/AuthGateway";
import { Injectable } from "@kernel/decorators/Injectable";

@Injectable()
export class EmailConfirmationUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute({
    email,
    confirmationCode,
  }: EmailConfirmationUseCase.Input): Promise<EmailConfirmationUseCase.Output> {
    await this.authGateway.emailConfirmation({ email, confirmationCode });

    return;
  }
}

export namespace EmailConfirmationUseCase {
  export type Input = {
    email: string;
    confirmationCode: string;
  };

  export type Output = void;
}
