import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { trigger, state, style, transition, animate } from '@angular/animations';

import { RestaurantsService } from './restaurants.services';
import { Restaurant } from './restaurant/restaurant.model';

import { from } from 'rxjs';

import { tap, switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toogleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', [
        animate('250ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';
  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;


  constructor(private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(), // emite somente eventos únicos
        switchMap(searchTerm =>
          this.restaurantsService
            .restaurants(searchTerm)
            .pipe(catchError(error => from([]))))
      ).subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
