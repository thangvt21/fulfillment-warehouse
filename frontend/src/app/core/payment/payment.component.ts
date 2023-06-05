import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Import } from '../interfaces/import';
import { FormControl } from '@angular/forms';
import { ImportService } from '../services/import.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public defaultPrice: string = '9.99';
  public payPalConfig?: IPayPalConfig;
  public Import:Import[] =[];
  public customerName = '';
  public customerEmail = '';
  public customerAddress = '';
  public selectedPaymentMethod = '';
  public cart: any[] = [];
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  sortingControl = new FormControl("");
  searchControl = new FormControl("");
  pageIndex: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;
  step = 0;

  items: {
    name: any;
    quantity: any;
    category: string;
    unit_amount: { currency_code: string; value: any };
  }[] = [];
  total = 0;

  @ViewChild('priceElem', { static: false }) priceElem?: ElementRef;

  constructor( private ImportService: ImportService,) {}

  ngOnInit(): void {
    this.initConfig('0');
    this.getAPI("", "", "");
    this.sortingControl.valueChanges.subscribe((value) => {
      if (value) {
        let sortData = this.doSorting(value);
        this.getAPI(
          sortData.sortColumn,
          sortData.order,
          this.sortingControl.value ?? ""
        );
      }
    });
  }

  textSearch() {
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.sortingControl.value ?? ""
    );
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.searchControl.value ?? ""
    );
  }

  doSorting(value: string) {
    let sortColumn: string = "";
    let order: string = "";
    if (value === "id-by-desc") {
      sortColumn = "id";
      order = "desc";
    } else if (value === "id-by-asc") {
      sortColumn = "id";
      order = "asc";
    }
    // this.getAPI(sortColumn, order,'');
    return {
      sortColumn,
      order,
    };
  }

  getAPI(sortColumn: string, order: string, searchKey: string) {
    this.ImportService.get(
      sortColumn,
      order,
      searchKey,
      this.pageIndex + 1,
      this.pageSize
    ).subscribe((response) => {
      this.Import = response.body as Import[];
      this.totalRecords = response.headers.get("X-Total-Count")
        ? Number(response.headers.get("X-Total-Count"))
        : 0;
    });
  }

  // deleteItem(id:number){
  //   const dialogRef = this.dialog.open(DeleteDialogAccountsComponent,{
  //     width: '250px',
  //     data: {id},
  //   });

  //   dialogRef.afterClosed().subscribe((result) =>{
  //     if(result){
  //       this.Accounts = this.Accounts.filter(_=>_.id !== result);
  //     }
  //   });
  // }
  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.searchControl.value ?? ""
    );
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addItemToCart(item: any): void {
    let itemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex === -1) {
      this.cart.push({ ...item, quantity: 1 });
    } else {
      this.cart[itemIndex].quantity++;
    }
    this.updateTotal();
  }

  removeItemFromCart(item: any): void {
    let itemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex > -1) {
      if (this.cart[itemIndex].quantity === 1) {
        this.cart.splice(itemIndex, 1);
      } else {
        this.cart[itemIndex].quantity--;
      }
    }
    this.updateTotal();
  }

  updateTotal() {
    this.cart.forEach((cartItem) => {
      this.items.push({
        name: cartItem.name,
        quantity: cartItem.quantity,
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: cartItem.price,
        },
      });
      this.total += parseFloat(cartItem.price) * cartItem.quantity;
    });
    this.initConfig(this.total + '');
  }

  private initConfig(price: string): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AReia98UsJ_Q5J2M1FQ2kzS80MtjrOtAn-dVro3murWgHxUNDr0jmm4l8r8EHOubUbtAe9kDokDEHxg_',
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: price,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: price,
                  },
                },
              },
              items: this.items,
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        shape: 'pill',
        color: 'blue',
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (
        data: any,
        actions: { order: { get: () => Promise<any> } }
      ) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data: any) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data: any, actions: any) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err: any) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
      onInit: (data: any, actions: any) => {
        console.log('onInit', data, actions);
      },
    };
  }



  private resetStatus(): void {
    this.items = [];
    this.total = 0;
    this.showError = false;
    this.showSuccess = false;
  }
}
