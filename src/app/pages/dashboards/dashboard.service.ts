import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import { BaseResponse } from 'src/app/core/models/api-response.model';
import { DashboardModel } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  dashboard(): Observable<BaseResponse<DashboardModel>> {
    return this.http.get<BaseResponse<DashboardModel>>(EndPoints.dashboard);
  }
}
