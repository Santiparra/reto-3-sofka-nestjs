import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit{
  constructor (
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}
  
  customer: Customer = {
    nombre: "",
    usuario: "",
    email: "",
    contrasena: ""
  }  

  edicion: boolean = false

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params
    if (params['id']) {
      this.customerService.buscarCustomer(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.customer = res
            this.edicion = true
        }
        )
    }
  }

    submitCustomer() {
    this.customerService.crearCustomer(this.customer)
      .subscribe({
        next: () => this.router.navigate(["/"]),
        error: (err) => console.log(err)
      })
  }

  editarCustomer () {
    this.customerService.editarCustomer(this.customer._id, this.customer)
      .subscribe({
        next: () => this.router.navigate(["/"]),
        error: (err) => console.log(err)
      })
  }
}
