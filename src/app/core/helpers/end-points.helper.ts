export class EndPoints {
  /* ------ authentication -------*/
  static login = '/shared/Authentication/Login'; //post
  static password = '/Shared/Authentication/Password'; //put
  static resetPassword = '/Shared/Authentication/RestPassword'; //put

  /* ------ vendor -------*/
  static vendor = '/Vendor/Info'; //get
  static vendorUpdate = '/Vendor/Info/Profile'; //put
  static vendorRegister = '/Vendor/Info/Register'; //post
  static vendorConfirmEmail = '/Vendor/Info/ConfirmEmail'; //post

  /* ------ payment -------*/
  static payments = '/Vendor/Payments'; //get

  /* ------ product -------*/
  static productPrices = '/Vendor/productPrices'; //get, post

  /* ------ contact -------*/
  static contacts = '/Vendor/Contacts'; //get , post, put

  /* ------ bankAccount -------*/
  static bankAccounts = '/vendor/Accounts'; //get, post, put

  /* ------ Lookups -------*/
  static banks = '/Shared/Lookups/BanksList'; //get
  static units = '/Shared/Lookups/UnitsList'; //get
  static products = '/Shared/Lookups/ProductsList'; //get
  static cities = '/Shared/Lookups/CitiesList'; //get
  static categories = '/Shared/Lookups/CateogiesList'; //get

  /* ------ purchaseOrder -------*/
  static purchaseOrders = '/Vendor/PurchaseOrders'; //get
  static purchaseOrderPdf = '/Vendor/purchaseOrders/PurchaseOrderPdf'; //get
  static uploadInvoice = '/Vendor/purchaseOrders/UploadInvoice'; //post

  /* ------ quotation -------*/
  static quotations = '/Vendor/Quotations'; //get, put
  static submitQuotation = '/Vendor/Quotations/Submit'; //post
  static isThereLowerPrice = '/Vendor/Quotations/IsThereLowerPrice'; //put

  /* ------ dashboard -------*/
  static dashboard = '/Vendor/dahboard'; //get
}
