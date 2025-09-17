import { Injectable } from "@kernel/decorators/Injectable";
import { env } from "./env";

@Injectable()
export class AppConfig {
  readonly auth: AppConfig.Auth;

  constructor() {
    this.auth = {
      cognitoClientId: env.COGNITO_CLIENT_ID,
    };
  }
}

export namespace AppConfig {
  export type Auth = {
    cognitoClientId: string;
  };
}
