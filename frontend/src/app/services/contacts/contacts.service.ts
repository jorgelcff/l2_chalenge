import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends HttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  getContacts(params?: {
    limit?: number;
    skip?: number;
    select?: string;
    sortBy?: string;
    order?: string;
  }) {
    return this.get('users', { params });
  }

  getContact(id: number) {
    return this.get(`users/${id}`);
  }

  createContact(data: any) {
    return this.post('users/add', data);
  }

  updateContact(id: number, data: any) {
    return this.put(`users/${id}`, data);
  }

  deleteContact(id: number) {
    return this.delete(`users/${id}`);
  }

  searchContacts(query: string) {
    return this.get(`users/search?q=${query}`);
  }
}
