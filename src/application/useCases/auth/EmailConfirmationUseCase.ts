import { AuthGateway } from "@infra/gateways/AuthGateway";
import { Injectable } from "@kernel/decorators/Injectable";

@Injectable()
export class EmailConfirmationUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute({
    email,
    code,
  }: EmailConfirmationUseCase.Input): Promise<EmailConfirmationUseCase.Output> {
    return this.authGateway.emailConfirmation({ email, code });
  }
}

export namespace EmailConfirmationUseCase {
  export type Input = {
    email: string;
    code: string;
  };

  export type Output = void;
}
