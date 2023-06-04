import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { RemoveProductsComponent } from '../remove-products/remove-products.component';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  Product:Product[] = [];
  sortingControl = new FormControl('');
  searchControl = new FormControl('');
  pageIndex:number = 0;
  pageSize:number = 5;
  totalRecords:number = 0;
  constructor(private ProductService:ProductService,
              private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getAPI('','','');
    this.sortingControl.valueChanges.subscribe((value)=> {
      if(value){
        let sortData = this.doSorting(value);
        this.getAPI(sortData.sortColumn, sortData.order, this.sortingControl.value ?? '');
      }
    })
}
  textSearch(){
    let sortData = this.doSorting(this.sortingControl.value ?? '');
        this.getAPI(sortData.sortColumn, sortData.order, this.sortingControl.value ?? '');
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.searchControl.value?? ''
    );
  }

  doSorting(value: string) {
    let sortColumn:string = '';
    let order:string = '';
    if(value === 'id-by-desc'){
      sortColumn = 'id';
      order = 'desc';
    } else if(value === 'id-by-asc') {
      sortColumn = 'id';
      order = 'asc';
    }
    // this.getAPI(sortColumn, order,'');
    return {
      sortColumn,
      order
    }
  }

  getAPI(sortColumn: string, order: string, searchKey: string){
    this.ProductService
    .get(sortColumn, order, searchKey, (this.pageIndex + 1), this.pageSize)
    .subscribe((response)=>{
      this.Product = response.body as Product[];
      this.totalRecords = response.headers.get('X-Total-Count') ?
      Number(response.headers.get('X-Total-Count')) : 0;
    })
  }

  deleteItem(id:number){
    const dialogRef = this.dialog.open(RemoveProductsComponent,{
      width: '250px',
      data: {id},
    });

    dialogRef.afterClosed().subscribe((result) =>{
      if(result){
        this.Product = this.Product.filter(_=>_.id !== result);
      }
    });
  }
  handlePageEvent(e:PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    let sortData = this.doSorting(this.sortingControl.value ?? '');
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.searchControl.value?? ''
    );
  };
}
