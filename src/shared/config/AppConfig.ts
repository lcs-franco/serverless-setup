import { Injectable } from "@kernel/decorators/Injectable";
import { env } from "./env";

@Injectable()
export class AppConfig {
  readonly auth: AppConfig.Auth;
  readonly database: AppConfig.Database;

  constructor() {
    this.auth = {
      cognito: {
        client: {
          id: env.COGNITO_CLIENT_ID,
        },
      },
    };
    this.database = {
      tableName: env.MAIN_TABLE_NAME,
    };
  }
}

export namespace AppConfig {
  export type Auth = {
    cognito: {
      client: {
        id: string;
      };
    };
  };

  export type Database = {
    tableName: string;
  };
}
