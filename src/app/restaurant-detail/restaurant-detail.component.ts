import { Restaurant } from './../restaurants/restaurant/restaurant.model';
import { RestaurantsService } from './../restaurants/restaurants.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantsService.restaurantById(this.route.snapshot.params['id'])
      .subscribe(restaurant => this.restaurant = restaurant)
  }

}
