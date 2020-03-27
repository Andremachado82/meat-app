import { LoginService } from './../security/login/login.service';
import { NotificationService } from './messages/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService } from './../order/order.service';
import { RestaurantsService } from './../restaurants/restaurants.services';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';

import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';

@NgModule({
  declarations: [InputComponent, RatingComponent, RadioComponent, SnackbarComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
    CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ShoppingCartService,
        RestaurantsService,
        OrderService,
        NotificationService,
        LoginService
      ]
    }
  }
}
