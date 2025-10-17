export class Profile {
  readonly accountId: string;
  name: string;
  birthDate: Date;
  readonly createdAt: Date;

  constructor(attributes: Profile.Attributes) {
    this.accountId = attributes.accountId;
    this.name = attributes.name;
    this.birthDate = new Date(attributes.birthDate);
    this.createdAt = attributes.createdAt ?? new Date();
  }
}

export namespace Profile {
  export type Attributes = {
    accountId: string;
    name: string;
    birthDate: string;
    createdAt?: Date;
  };
}
