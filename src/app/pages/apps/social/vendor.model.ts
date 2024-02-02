export interface VendorModel {
  supplierID?: string;
  name?: string;
  address?: string;
  email?: string;
  logo?: string;
  mobile?: string;
  isActive?: boolean;
  responsableID?: string;
  responsableName?: string;
  createdOn?: Date;
  createdBy?: string;
  createdByName?: string;
  registerOn?: Date;
  cityID?: string;
  cityName?: string;
  isDeliveryCo?: boolean;
  isDeleted?: boolean;
  isUpdated?: boolean;
  isApproved?: boolean;
  approvedBy?: string;
  approvedByName?: string;
  approvedOn?: Date;
  website?: string;
  nameAr?: string;
  crNumber?: string;
  vatNumber?: string;
  lastUpdateBy?: string;
  lastUpdateByName?: string;
  lastUpdateOn?: Date;
  actionName?: string;
  categoryIDs?: string[];
  contactsCount?: number;
  accountsCount?: number;
  pricesCount?: number;
  productsCount?: number;
  contacts?: ContactModel[];
  accounts?: AccountModel[];
  productPrices?: ProductPriceModel[];
  categories?: CategoryModel[];
}

export interface AccountModel {
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

export interface CategoryModel {
  supplierCategoryID?: string;
  supplierID?: string;
  categoryID?: string;
  supplierName?: string;
  supplierMobile?: string;
  supplierEmail?: string;
  categoryName?: string;
  categoryIDs?: string[];
  contacts?: ContactModel[];
}

export interface ContactModel {
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

export interface ProductPriceModel {
  productPriceID?: string;
  price?: number;
  supplierID?: string;
  supplierName?: string;
  createdOn?: Date;
  productID?: string;
  productName?: string;
  productNameAr?: string;
  skuNumber?: string;
  description?: string;
  isActive?: boolean;
  availableQty?: number;
  unitID?: string;
  unitName?: string;
  createdBy?: string;
  employeeID?: string;
  employeeName?: string;
  supplierContactID?: string;
  supplierContactName?: string;
  source?: number;
  sourceName?: string;
  orderID?: string;
  orderNo?: number;
  isFixedPrice?: boolean;
  expiryDate?: Date;
  marginPer?: number;
}

export interface UpdateVendorCommend {
  name?: string;
  address?: string;
  email?: string;
  logo?: string;
  mobile?: string;
  cityID?: string;
  crNumber?: string;
  vatNumber?: string;
  categoryIDs?: string[];
}

export interface RegisterVendorCommand {
  email?: string;
  password?: string;
  cityID?: string;
  confrimPassword?: string;
  companyName?: string;
  phone?: string;
  fullname?: string;
  categories?: string[];
  categoriesList?: string;
  fileName?: string;
  fileContent?: string;
  fileContentType?: string;
  crNumber?: string;
  vatNumber?: string;
}
