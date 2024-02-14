export interface DashboardModel {
  ordersAmount?: number;
  paidAmount?: number;
  leftAmount?: number;
  porductsCount?: number;
  quotationsCount?: number;
  quotationsNewCount?: number;
  ordersCount?: number;
  unPaidOrdersCount?: number;
  unInvoicedOrdersCount?: number;
  invoices?: Invoice[];
  payments?: Invoice[];
  quotations?: Invoice[];
  monthlySummary?: MonthlySummary[];
}

export interface Invoice {
  status?: number;
  statusName?: string;
  count?: number;
  amount?: number;
}

export interface MonthlySummary {
  orgName?: string;
  monthName?: string;
  supplychainer?: string;
  ordersCount?: number;
  ordersAmount?: number;
  ordersProfits?: number;
  directOrdersCount?: number;
  directOrdersAmount?: number;
  directOrdersProfits?: number;
  tenderOrdersCount?: number;
  tenderOrdersAmount?: number;
  tenderOrdersProfits?: number;
  lvpOrdersCount?: number;
  lvpOrdersAmount?: number;
  lvpOrdersProfits?: number;
}
