import {
  PutCommand,
  PutCommandInput,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { Account } from "@application/entities/Account";
import { dynamoClient } from "@infra/clients/dynamoClient";
import { Injectable } from "@kernel/decorators/Injectable";
import { AppConfig } from "@shared/config/AppConfig";
import { AccountItem } from "../items/AccountItem";

@Injectable()
export class AccountRepository {
  constructor(private readonly appConfig: AppConfig) {}

  async findByEmail(email: string): Promise<Account | null> {
    const command = new QueryCommand({
      TableName: this.appConfig.database.tableName,
      IndexName: "GSI1",
      KeyConditionExpression: "#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK",
      ExpressionAttributeNames: {
        "#GSI1PK": "GSI1PK",
        "#GSI1SK": "GSI1SK",
      },
      ExpressionAttributeValues: {
        ":GSI1PK": AccountItem.getPK(email),
        ":GSI1SK": AccountItem.getSK(email),
      },
      Limit: 1,
    });

    const { Items: account } = await dynamoClient.send(command);

    if (!account) {
      return null;
    }

    return AccountItem.toEntity(account[0] as AccountItem.ItemType);
  }

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
