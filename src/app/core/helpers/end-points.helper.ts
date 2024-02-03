export class EndPoints {
  /* ------ authentication -------*/
  static login = '/shared/Authentication/Login'; //post
  static password = '/Shared/Authentication/Password'; //put
  static resetPassword = '/Shared/Authentication/RestPassword'; //put

  /* ------ vendor -------*/
  static vendor = '/Vendor/Info'; //get
  static vendorUpdate = '/Vendor/Info/Profile'; //put
  static vendorRegister = '/Vendor/Info/Register'; //post

  /* ------ payment -------*/
  static payments = '/Vendor/Payments'; //get

  /* ------ product -------*/
  static productPrices = '/Vendor/productPrices'; //get

  /* ------ contact -------*/
  static contacts = '/Vendor/Contacts'; //get
}
