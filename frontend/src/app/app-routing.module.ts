import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./accounts/all-accounts/accounts.component";
import { CreateAccountComponent } from "./accounts/add-account/add-account.component";
import { EditAccountComponent } from "./accounts/edit-account/edit-account.component";
import { AllProductsComponent } from "./core/product/all-products/all-products.component";
import { CreateProductsComponent } from "./core/product/create-products/create-products.component";
import { EditProductsComponent } from "./core/product/edit-products/edit-products.component";
import { AllWarehouseComponent } from "./core/warehouse/all-warehouse/all-warehouse.component";
import { EditWarehouseComponent } from "./core/warehouse/edit-warehouse/edit-warehouse.component";
import { CreateWarehouseComponent } from "./core/warehouse/create-warehouse/create-warehouse.component";
import { DetailWarehouseComponent } from "./core/warehouse/detail-warehouse/detail-warehouse.component";
import { AllImportsComponent } from "./core/import/all-imports/all-imports.component";
import { CreateImportsComponent } from "./core/import/create-imports/create-imports.component";
import { PaymentComponent } from "./core/payment/payment.component";

const routes: Routes = [
  { path: "account", component: AccountsComponent }, //admin
  { path: "account/create", component: CreateAccountComponent },
  { path: "account/edit/:id", component: EditAccountComponent },
  { path: "product", component: AllProductsComponent },
  { path: "product/create", component: CreateProductsComponent },
  { path: "product/edit/:id", component: EditProductsComponent },
  { path: "warehouse", component: AllWarehouseComponent },
  { path: "warehouse/edit/:id", component: EditWarehouseComponent },
  { path: "warehouse/create", component: CreateWarehouseComponent },
  { path: "warehouse/detail/:id", component: DetailWarehouseComponent },
  { path: "import", component: AllImportsComponent },
  { path: "import/create", component: CreateImportsComponent },
  { path: "payment", component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
