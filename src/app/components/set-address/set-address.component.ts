import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IAddress } from 'src/app/api/business';

@Component({
  selector: 'app-set-address',
  templateUrl: './set-address.component.html',
  styleUrls: ['./set-address.component.css'],
})
export class SetAddressComponent implements OnInit {

  @Output() public addressChange = new EventEmitter<IAddress>();
  @ViewChild('searchAddress', { read: ElementRef, static: true }) public searchInput: ElementRef<HTMLInputElement>;

  public shouldRequireNumber = false;
  public addressNumber = '';
  public places: any;
  public autocompleteService: google.maps.places.AutocompleteService;
  public placesService: google.maps.places.PlacesService;
  private address: IAddress;
  constructor(
    private rendered: Renderer2,
    private mapsApi: MapsAPILoader) { }

  ngOnInit(): void {
    this.mapsApi.load().then((d) => {
      const searchInput = this.searchInput.nativeElement;
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(searchInput);
      const autocomplete = new google.maps.places.Autocomplete(searchInput);
      autocomplete.addListener('place_changed', () => {
        this.shouldRequireNumber = false;
        const place = autocomplete.getPlace();
        if (!place?.address_components) {
          return false;
        }
        this.setPlaceResult(place);
      });
    });

    // Listen to click events in the component
    this.rendered.listen(this.searchInput.nativeElement, 'keydown', (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        return false;
      }
    });
  }

  public changeAddressNumber(evt) {
    this.autocompleteService.getPlacePredictions({
      input: `${this.address.address} ${evt.target.value}, ${this.address.city || ''} ${this.address.postal_code || ''}`,
    }, (d) => {
      const g = new google.maps.places.PlacesService(this.searchInput.nativeElement);
      g.getDetails({
        placeId: d[0].place_id,
      }, (place) => {
        this.setPlaceResult(place);
      });
    });

  }
  private setPlaceResult(place: google.maps.places.PlaceResult) {
    const postal_code = place.address_components.find((c) => c.types.some((t) => t === 'postal_code'))?.long_name;
    const state = place.address_components.find((c) => c.types.some((t) => t === 'administrative_area_level_2'))?.long_name;
    const city = place.address_components.find((c) => c.types.some((t) => t === 'locality'))?.long_name;
    const address_types = ['town_square', 'route'];
    const address = place.address_components.find((c) => c.types.some((t) => address_types.some((at) => at === t)))?.long_name;
    const address_number = place.address_components.find((c) => c.types.some((t) => t === 'street_number'))?.long_name;
    this.address = {
      address: `${address} ${address_number || ''}`,
      city,
      postal_code: Number(postal_code),
      country: 1,
      state,
      lat: 0,
      lng: 0,
    } as IAddress;
    if (!address_number) {
      this.shouldRequireNumber = true;
      return false;
    }
    this.address.lat = place.geometry.location.lat();
    this.address.lng = place.geometry.location.lng();
    this.addressChange.emit(this.address);
  }
}
