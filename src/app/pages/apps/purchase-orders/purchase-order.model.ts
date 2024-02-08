import { PurchaseOrderStatus } from 'src/app/core/constants/enums';

export interface PurchaseOrderModel {
  purchaseOrderDetailID?: string;
  purchaseOrderID?: string;
  orderID?: string;
  orderNo?: number;
  prNumber?: string;
  supplierID?: string;
  supplierName?: string;
  accountID?: string;
  accountName?: string;
  iban?: string;
  bankName?: string;
  itemsQty?: number;
  amount?: number;
  amountWithNoVAT?: number;
  vat?: number;
  vatPer?: number;
  isDeliveryFees?: boolean;
  isDeliveryFeesVATExcluded?: boolean;
  deliveryFees?: number;
  total?: number;
  transferTo?: string;
  createdOn?: Date;
  invoiceDate?: Date;
  isSupplierApproved?: boolean;
  accountDetails?: string;
  paidAmount?: number;
  leftAmount?: number;
  fileName?: string;
  fileContent?: string;
  filePath?: string;
  fileContentType?: string;
  status?: PurchaseOrderStatus;
  statusName?: string;
  poStatus?: number;
  paymentTerms?: number;
  creditPer?: number;
  creditDueDate?: Date;
  paymentTermsName?: string;
  invoiceStatus?: number;
  opportunityID?: string;
  invoiceStatusName?: string;
  notes?: string;
  paymentType?: number;
  paymentTypeName?: string;
  employeeName?: string;
  employeeID?: string;
  items?: Item[];
  payments?: Payment[];
}

export interface Item {
  purchaseOrderItemID?: string;
  purchaseOrderDetailID?: string;
  purchaseOrderID?: string;
  productID?: string;
  unitID?: string;
  unitName?: string;
  productName?: string;
  qty?: number;
  price?: number;
  total?: number;
  vatPer?: number;
  vat?: number;
  totalWithVAT?: number;
  isVATExcluded?: boolean;
  isReturned?: boolean;
}

export interface Payment {
  purchaseOrderPaymentID?: string;
  purchaseOrderDetailID?: string;
  purchaseOrderID?: string;
  orderID?: string;
  orderNo?: number;
  supplierID?: string;
  supplierName?: string;
  amount?: number;
  transactionNo?: string;
  paidOn?: Date;
  employeeID?: string;
  employeeName?: string;
  fileName?: string;
  fileContent?: string;
  fileContentType?: string;
  filePath?: string;
  isReturnedPayment?: boolean;
  notes?: string;
  isBankTransfer?: boolean;
  transferRequestBy?: string;
  transferRequestOn?: Date;
  transferApprovedBy?: string;
  transferApprovedByName?: string;
  transferApprovedOn?: Date;
  status?: number;
  statusName?: string;
}

export class PurchaseOrderSearch {
  find?: any;
  page?: number;
  limit?: number;
  status?: number;
  excludeStatus?: number[];
}
