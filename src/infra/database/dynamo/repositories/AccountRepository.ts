import { Account } from "@application/entities/Account";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "@infra/clients/dynamoClient";
import { Injectable } from "@kernel/decorators/Injectable";
import { AppConfig } from "@shared/config/AppConfig";
import { AccountItem } from "../items/AccountItem";

@Injectable()
export class AccountRepository {
  constructor(private readonly appConfig: AppConfig) {}

  async create(account: Account): Promise<void> {
    const accountItem = AccountItem.fromEntity(account);

    const command = new PutItemCommand({
      TableName: this.appConfig.database.tableName,
      Item: accountItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
