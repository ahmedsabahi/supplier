export interface UserModel {
  supplierContactID?: string;
  supplierID?: string;
  responsableID?: string;
  supplierName?: string;
  fullName?: string;
  address?: string;
  email?: string;
  password?: string;
  mobile?: string;
  language?: string;
  isActive?: boolean;
  isAccountManager?: boolean;
  lastPasswordChage?: Date;
  isMFAEnabled?: boolean;
  mfaCode?: string;
}

export class UserSearch {
  find?: any;
  page?: number;
  limit?: number;
}
