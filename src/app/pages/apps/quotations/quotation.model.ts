import { QuotationStatus } from 'src/app/core/constants/enums';

export interface QuotationModel {
  supplierQuotationID?: string;
  orderID?: string;
  orderNo?: number;
  supplierID?: string;
  supplierName?: string;
  supplierContactID?: string;
  supplierContactName?: string;
  createdOn?: Date;
  createdBy?: string;
  createdByName?: string;
  itemsTotal?: number;
  deliveryFees?: number;
  vatPer?: number;
  vat?: number;
  total?: number;
  notes?: string;
  supplierNotes?: string;
  status?: QuotationStatus;
  statusName?: string;
  pricedOn?: Date;
  pricedBy?: string;
  pricedByName?: string;
  fileName?: string;
  fileContentType?: string;
  fileContent?: string;
  items?: ItemModel[];
}

export interface ItemModel {
  supplierQuotationDetailID?: string;
  supplierQuotationID?: string;
  supplierID?: string;
  productID?: string;
  productName?: string;
  item?: string;
  unitID?: string;
  unitName?: string;
  qty?: number;
  price?: number;
  isVATExcluded?: boolean;
}

export class QuotationSearch {
  find?: any;
  page?: number;
  limit?: number;
  includeStatus?: QuotationStatus;
}
