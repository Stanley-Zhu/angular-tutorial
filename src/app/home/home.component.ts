import {Component, inject} from '@angular/core';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from "../housinglocation";
import {CommonModule} from "@angular/common";
import {HousingService} from '../housing.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent, FormsModule],
  template: `
    <section>
      <form (ngSubmit)="filterResults(filter.value)">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
    // filtered list should be all housingLocations by default
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
          housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
      );
    }
  }
}