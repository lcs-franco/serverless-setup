import { Account } from "@application/entities/Account";
import { Profile } from "@application/entities/Profile";
import { EmailAlreadyInUse } from "@application/errors/app/EmailAlreadyInUse";
import { AccountRepository } from "@infra/database/dynamo/repositories/AccountRepository";
import { ProfileRepository } from "@infra/database/dynamo/repositories/ProfileRepository";
import { AuthGateway } from "@infra/gateways/AuthGateway";
import { Injectable } from "@kernel/decorators/Injectable";

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly accountRepo: AccountRepository,
    private readonly profileRepo: ProfileRepository
  ) {}

  async execute({
    account: { email, password },
    profile: profileData,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const emailAlreadyInUse = await this.accountRepo.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUse();
    }

    const account = new Account({ email });
    const profile = new Profile({
      ...profileData,
      accountId: account.id,
    });

    const { externalId } = await this.authGateway.signUp({
      email,
      password,
      internalId: account.id,
    });

    account.externalId = externalId;

    await Promise.all([
      this.accountRepo.create(account),
      this.profileRepo.create(profile),
    ]);

    const { accessToken, refreshToken } = await this.authGateway.signIn({
      email,
      password,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    account: {
      email: string;
      password: string;
    };
    profile: {
      name: string;
      birthDate: string;
    };
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
