import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent {
  hide = true;
  constructor(private fb:FormBuilder,
              private ProductService:ProductService,
              private router:Router) {}

  createProductForm = this.fb.group({
    id: [0],
    name: [''],
    code: [''],
    weightUnit: [''],
    weight: [],
    Lenght: [],
    Width: [],
    Height: [],
    description: [''],
    imgUrl: [''],
  });

  create(){
    this.ProductService.create(this.createProductForm.value as Product).subscribe(() => {
      this.router.navigate(['/product']);
    })
  }
}
