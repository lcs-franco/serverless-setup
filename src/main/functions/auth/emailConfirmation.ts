import "reflect-metadata";

import { EmailConfirmationController } from "@application/controllers/auth/EmailConfirmationController";
import { lambdaHttpAdapter } from "@main/adapters/lambdaHttpAdapter";

export const handler = lambdaHttpAdapter(EmailConfirmationController);
