export interface BaseResponse<T> {
  data?: T;
  totalRecords: number;
  result: ResultResponse;
}

export interface ResultResponse {
  title?: string;
  status?: number;
  success?: boolean;
  messageAr?: string;
  messageEn?: string;
  execptionMessage?: string;
  errors?: string[];
  data?: any;
}

export interface Search {
  find?: string;
  userID?: string;
  walletID?: string;
  opportunityID?: string;
  sort?: string;
  page?: number;
  itemsCount: number;
  limit: number;
  readonly offset?: number;
  readonly pages?: number;
  readonly next?: number;
  readonly previous?: number;
}

export interface FileModel {
  fileName?: string;
  fileContentType?: string;
  fileContent?: string;
  size?: number;
}
