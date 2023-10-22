import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { CorePipesModule } from '@core/pipes/pipes.module';
// import { CoreDirectivesModule } from '@core/directives/directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListProductComponent } from './list-product/list-product.component';

const routes: Routes = [
  {
    path: 'list-product',
    component: ListProductComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    NgSelectModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    // CorePipesModule,
    // CoreDirectivesModule,
    NgbModule,
  ]
})
export class ProductModule { }
