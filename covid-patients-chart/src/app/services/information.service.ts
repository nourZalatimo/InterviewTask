import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {States} from '../models/states.interface';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get<States[]>('https://covidtracking.com/api/states');
  }
  sort(data: States[]) {
    data.sort((a, b) => b.hospitalizedCurrently -  a.hospitalizedCurrently);
    data = data.slice(0, 5);
    return data;
  }
}
