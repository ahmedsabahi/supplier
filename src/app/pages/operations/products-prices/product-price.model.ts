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

export class ProductPriceSearch {
  find?: any;
  page?: number;
  limit?: number;
}
