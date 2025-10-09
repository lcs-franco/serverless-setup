import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

import { Account } from "@application/entities/Account";
import { dynamoClient } from "@infra/clients/dynamoClient";
import { Injectable } from "@kernel/decorators/Injectable";
import { AppConfig } from "@shared/config/AppConfig";
import { AccountItem } from "../items/AccountItem";

@Injectable()
export class AccountRepository {
  constructor(private readonly appConfig: AppConfig) {}

  getPutItemCommand(account: Account): PutCommandInput {
    const accountItem = AccountItem.fromEntity(account);

    return {
      TableName: this.appConfig.database.tableName,
      Item: accountItem.toItem(),
    };
  }

  async create(account: Account): Promise<void> {
    await dynamoClient.send(new PutCommand(this.getPutItemCommand(account)));
  }
}
