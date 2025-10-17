import { Profile } from "@application/entities/Profile";

export class ProfileItem {
  static readonly type = "Profile";
  private readonly keys: ProfileItem.Keys;

  constructor(private readonly attrs: ProfileItem.Attributes) {
    this.keys = {
      PK: ProfileItem.getPK(this.attrs.accountId),
      SK: ProfileItem.getSK(this.attrs.accountId),
    };
  }

  toItem(): ProfileItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: ProfileItem.type,
    };
  }

  static fromEntity(profile: Profile) {
    return new ProfileItem({
      ...profile,
      birthDate: profile.birthDate.toISOString(),
      createdAt: profile.createdAt.toISOString(),
    });
  }

  static toEntity(item: ProfileItem.ItemType) {
    return new Profile({
      ...item,
      createdAt: new Date(item.createdAt),
    });
  }

  static getPK(accountId: string): ProfileItem.Keys["PK"] {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): ProfileItem.Keys["SK"] {
    return `ACCOUNT#${accountId}#PROFILE`;
  }
}

export namespace ProfileItem {
  export type Keys = {
    PK: `ACCOUNT#${string}`;
    SK: `ACCOUNT#${string}#PROFILE`;
  };

  export type Attributes = {
    accountId: string;
    name: string;
    birthDate: string;
    createdAt: string;
  };

  export type ItemType = Keys & Attributes & { type: "Profile" };
}
