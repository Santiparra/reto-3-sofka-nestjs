import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  constructor (private customerService: CustomerService) {}

  customers: Customer[] = [];

  ngOnInit(): void {
    this.buscarCustomers()
  }  
  
  buscarCustomers( ) {
    this.customerService.buscarCustomers()
      .subscribe(
        res => {this.customers = res; console.log(this.customers)},
        /* err => console.log(err) */
      )
  }

  borrarCustomer( id: any ) {
    this.customerService.borrarCustomer(id)
      .subscribe(
        res => {this.buscarCustomers()},
        /* err => console.log(err) */
      )
  }

}
