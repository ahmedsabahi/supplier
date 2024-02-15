export interface UserModel {
  userID?: string;
  fullName?: string;
  email?: string;
  userName?: string;
  password?: string;
  lastPasswordChage?: Date;
  isMFAEnabled?: boolean;
  mfaCode?: string;
  isActive?: boolean;
  userType?: string;
  token?: string;
  tokenExpireDate?: Date;
  roleType?: string;
  employee?: any;
  customer?: any;
  supplier?: SupplierModel;
  roles?: RoleModel[];
}

export interface RoleModel {
  employeeRoleID?: string;
  roleID?: string;
  employeeID?: string;
  roleName?: string;
  group?: string;
  displayName?: string;
  displayNameAr?: string;
  displayNameEn?: string;
}

export interface SupplierModel {
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

export interface UserLoginCommand {
  username: string;
  password: string;
}
