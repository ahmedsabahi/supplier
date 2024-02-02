export interface PaymentModel {
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
