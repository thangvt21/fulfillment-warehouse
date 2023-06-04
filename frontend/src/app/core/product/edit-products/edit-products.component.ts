import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent {
  hide = true;
  constructor(private fb:FormBuilder,
              private ProductService:ProductService,
              private route:ActivatedRoute,
              private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.paramMap.subscribe((param)=>{
      let id = Number(param.get('id'));
      this.getbyID(id);
    });
  }

  updateProductForm = this.fb.group({
    id: [0],
    name: [''],
    code: [''],
    weightUnit: [''],
    weight: [0],
    Lenght: [0],
    Width: [0],
    Height: [0],
    description: [''],
    imgUrl: [''],
  });

  getbyID(id:number){
    this.ProductService.getByID(id)
    .subscribe((response)=>{
       this.updateProductForm.setValue(response);
    })
  }

  update(){
    this.ProductService.update((this.updateProductForm.value as Product))
    .subscribe(()=>{
      this.router.navigate(["/product"]);
    });
  }
}
