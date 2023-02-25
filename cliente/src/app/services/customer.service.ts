import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url_base: string = "http://localhost:5500";

  constructor(private http: HttpClient) { }

  buscarCustomers( ): Observable<Customer[]> {
    return  this.http.get<Customer[]>(`${this.url_base}/customer`)
  }
  
  buscarCustomer( id: string ): Observable<Customer> {
    return this.http.get<Customer>(`${this.url_base}/customer/${id}`)
  }

  crearCustomer( customer: Customer ): Observable<Customer> {
    return this.http.post<Customer>(`${this.url_base}/auth/registrar`, customer)
  }

  editarCustomer( id: any , customer: Customer ): Observable<Customer> {
    return this.http.patch<Customer>(`${this.url_base}/customer/editar?customerID=${id}`, customer)
  }

  actualizarCustomer( id: string, customer: Customer ): Observable<Customer> {
    return this.http.put<Customer>(`${this.url_base}/customer/actualizar?customerID=${id}`, customer)
  }

  borrarCustomer( id: string ): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url_base}/customer/borrar?customerID=${id}`)
  }


}
