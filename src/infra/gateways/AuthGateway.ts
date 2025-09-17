import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "@infra/clients/cognitoClient";
import { Injectable } from "@kernel/decorators/Injectable";

@Injectable()
export class AuthGateway {
  async signUp({
    email,
    password,
    internalId,
  }: AuthGateway.SignUpParams): Promise<AuthGateway.SignUpResult> {
    const command = new SignUpCommand({
      ClientId: "",
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "internalId",
          Value: internalId,
        },
      ],
    });

    const response = await cognitoClient.send(command);

    console.log(response);

    return {
      externalId: "user.id",
    };
  }
}

export namespace AuthGateway {
  export type SignUpParams = {
    email: string;
    password: string;
    internalId: string;
  };

  export type SignUpResult = {
    externalId: string;
  };
}
