import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}
  public getCompaniesUrl =
    'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/companies';
  public getContactsUrl =
    'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts';

  getCompanies() {
    return this.http.get(this.getCompaniesUrl);
  }
  getContacts() {
    return this.http.get(this.getContactsUrl);
  }
  editContacts(data, id) {
    return this.http.put(`${this.getContactsUrl}/${id}`, data);
  }
  deleteContacts(id) {
    return this.http.delete(`${this.getContactsUrl}/${id}`);
  }
  addContacts(data) {
    return this.http.post(this.getContactsUrl, data);
  }
}
