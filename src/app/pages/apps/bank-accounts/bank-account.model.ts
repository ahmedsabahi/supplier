export interface BankAccountModel {
  supplierAccountID?: string;
  bankID?: string;
  bankName?: string;
  supplierID?: string;
  supplierName?: string;
  name?: string;
  accountNo?: string;
  iban?: string;
  branch?: string;
  isDefault?: boolean;
  fileContent?: string;
  fileContentType?: string;
  fileName?: string;
  createdBy?: string;
  createdOn?: Date;
  accountDetails?: string;
}

export interface BankAccountSearch {
  find?: any;
  page?: number;
  limit?: number;
}

export interface DropDownModel {
  id?: string;
  textEn?: string;
  textAr?: string;
}
