import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  ResultResponse
} from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import { ContactModel, ContactSearch } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  contacts(search?: ContactSearch): Observable<BaseResponse<ContactModel[]>> {
    return this.http.get<BaseResponse<ContactModel[]>>(EndPoints.contacts, {
      params: new HttpParams().appendAll(search as any)
    });
  }

  contact(id: string): Observable<BaseResponse<ContactModel>> {
    return this.http.get<BaseResponse<ContactModel>>(
      `${EndPoints.contacts}/${id}`
    );
  }

  create(contact: ContactModel): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(EndPoints.contacts, contact);
  }

  update(contact: ContactModel): Observable<ResultResponse> {
    return this.http.put<ResultResponse>(EndPoints.contacts, contact);
  }
}
