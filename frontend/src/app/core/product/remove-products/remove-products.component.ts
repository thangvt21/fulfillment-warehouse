import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-remove-products',
  templateUrl: './remove-products.component.html',
  styleUrls: ['./remove-products.component.css']
})
export class RemoveProductsComponent {
  constructor(public dialogRef: MatDialogRef<RemoveProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ProductService:ProductService){}

confirmDel(){
this.ProductService.delete(this.data.id)
.subscribe(() =>{
this.dialogRef.close(this.data.id);
})
}
}
