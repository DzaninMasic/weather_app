import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css', './hamburger.css', './modal.css'],
})
export class SearchPageComponent implements OnInit {
  constructor(private router: Router) {}
  myGlobalImageObj: any = {
    '01d.png': '',
    '01n.png': '',
    '02d.png': '',
    '02n.png': '',
    '03d.png': '',
    '03n.png': '',
    '04d.png': '',
    '04n.png': '',
    '09d.png': '',
    '09n.png': '',
    '10d.png': '',
    '10n.png': '',
    '11d.png': '',
    '11n.png': '',
    '13d.png': '',
    '13n.png': '',
    '50d.png': '',
    '50n.png': '',
  };
  isOpen: boolean = false;
  isOpenPopup: boolean = false;
  baseLink: string = 'https://api.openweathermap.org/data/2.5/weather?';
  APPID: string = '7a88f44a73b2870985ca58e19db07fc6'; // change later - this is stolen from https://gist.github.com/lalithabacies/c8f973dc6754384d6cade282b64a8cb1
  place1: string = 'q=Sarajevo,bih';
  place2: string = 'q=London,uk';

  baseLinkImage: string = 'https://openweathermap.org/img/wn/';
  img1: string = '';
  img2: string = '';
  // example of img part 10d@2x.png
  pngImg1: string = '';
  pngImg2: string = '';

  temperature1: string = '';
  temperature2: string = '';

  type1: string = '';
  type2: string = '';

  searchText: string = '';
  shouldShowTemplate: boolean = true;

  debounceTimer: any;
  placesInnerHtml: any[] = [];

  mainLat: number = 43.85643;
  mainLng: number = 18.413029;

  dataForMainScreen: any = {
    name: 'Sarajevo',
    time: new Date(), //dt
    temp: '27' + '℃', //273.15 main.temp
    windSpeed: '10', //wind.speed
    humidity: '54', //main.humidity
    image: null,
  };

  myMainImage: any;

  forcastArray: any[] = [];

  onClickItem(index: number) {
    this.mainLat = this.placesInnerHtml[index].lat;
    this.mainLng = this.placesInnerHtml[index].lng;
    this.isOpenPopup = false;
    this.fetchDataForMainScreen();
  }

  trackByFn(index: number, item: string) {
    return index;
  }

  onTextChanged(value: any) {
    this.searchText = value;
    if (!(value !== '' && value !== undefined && value !== null)) {
      this.shouldShowTemplate = true;
    } else {
      this.shouldShowTemplate = false;
    }

    clearTimeout(this.debounceTimer); // Clear the previous timer
    this.placesInnerHtml = [];

    this.debounceTimer = setTimeout(() => {
      this.searchPlaces(); // Trigger the search after the debounce time
    }, 2000);
  }

  searchPlaces() {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      this.searchText
    )}&format=json&limit=3`;
    axios
      .get(url)
      .then((response) => {
        (response.data || []).forEach((e: any) => {
          this.placesInnerHtml.push({
            name: e.display_name,
            lat: e.lat,
            lng: e.lon,
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ngOnInit(): void {
    this.fetchHTML();
    this.fetchAllImages();
    this.fetchForecast();
  }

  fetchImage(imgId: string, variableToSet: number): void {
    if (variableToSet === 1) {
      this.pngImg1 = this.myGlobalImageObj[`${imgId}.png`];
      this.dataForMainScreen.image = this.myGlobalImageObj[`${imgId}.png`];
      this.myMainImage = this.myGlobalImageObj[`${imgId}.png`];
    } else if (variableToSet === 2)
      this.pngImg2 = this.myGlobalImageObj[`${imgId}.png`];
    // axios({
    //   method: "get",
    //   url: `${this.baseLinkImage}${imgId}.png`,
    //   responseType: "arraybuffer",
    // })
    //   .then((response) => {
    //     const imageBuffer = new Uint8Array(response.data);
    //     const binaryImage = Array.from(imageBuffer)
    //       .map((byte) => String.fromCharCode(byte))
    //       .join("");
    //     const base64Image = btoa(binaryImage);
    //     if (variableToSet === 1) {
    //       this.pngImg1 = `data:image/png;base64, ${base64Image}`;
    //       this.dataForMainScreen.image = `data:image/png;base64, ${base64Image}`;
    //       this.myMainImage = `data:image/png;base64, ${base64Image}`;
    //     } else if (variableToSet === 2)
    //       this.pngImg2 = `data:image/png;base64, ${base64Image}`;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  goToThisWeek() {
    this.router.navigate(['/this-week']);
  }

  fetchHTML(): void {
    axios
      .get(`${this.baseLink}${this.place1}&APPID=${this.APPID}`)
      .then((response) => {
        // assign data to state
        this.img1 = response?.data?.weather[0]?.icon;
        this.type1 = response?.data?.weather[0]?.main;
        this.fetchImage(this.img1, 1);
        this.temperature1 = response?.data?.main?.temp
          ? Number(response?.data?.main?.temp - 273.15).toFixed(0) + '℃'
          : '';

        this.dataForMainScreen.name = response?.data?.name;
        const dateFromRequest = new Date(Number(`${response?.data?.dt}000`));
        this.dataForMainScreen.time = dateFromRequest;
        const formatedData = this.calculateDate(dateFromRequest);
        this.dataForMainScreen.formattedDay = formatedData[0];
        this.dataForMainScreen.formattedTime = formatedData[1];
        this.dataForMainScreen.temp =
          Number(response?.data?.main?.temp - 273.15).toFixed(0) + '℃';
        this.dataForMainScreen.windSpeed = response?.data?.wind?.speed;
        this.dataForMainScreen.humidity = response?.data?.main?.humidity;
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${this.baseLink}${this.place2}&APPID=${this.APPID}`)
      .then((response) => {
        this.img2 = response?.data?.weather[0]?.icon;
        this.type2 = response?.data?.weather[0]?.main;
        this.fetchImage(this.img2, 2);
        this.temperature2 = response?.data?.main?.temp
          ? Number(response?.data?.main?.temp - 273.15).toFixed(0) + '℃'
          : '';
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleNav() {
    this.isOpen = !this.isOpen;
  }

  togglePopup() {
    this.isOpenPopup = !this.isOpenPopup;
  }

  fetchDataForMainScreen(): void {
    axios
      .get(
        `${this.baseLink}lat=${this.mainLat}&lon=${this.mainLng}&APPID=${this.APPID}`
      )
      .then((response) => {
        this.img1 = response?.data?.weather[0]?.icon;
        this.dataForMainScreen.name = response?.data?.name;
        const dateFromRequest = new Date(Number(`${response?.data?.dt}000`));
        this.dataForMainScreen.time = dateFromRequest;
        const formatedData = this.calculateDate(dateFromRequest);
        this.dataForMainScreen.formattedDay = formatedData[0];
        this.dataForMainScreen.formattedTime = formatedData[1];
        this.dataForMainScreen.temp =
          Number(response?.data?.main?.temp - 273.15).toFixed(0) + '℃';
        this.dataForMainScreen.windSpeed = response?.data?.wind?.speed;
        this.dataForMainScreen.humidity = response?.data?.main?.humidity;
        this.fetchImage(this.img1, 1);
        this.fetchForecast();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  calculateDate(x: Date): string[] {
    const day = x.getDate();
    const month = x.toLocaleString('default', { month: 'short' });
    const year = x.getFullYear();
    const hours = x.getHours();
    const minutes = x.getMinutes();
    const suffix = getDaySuffix(day);
    const formattedDay = `${day}${suffix} ${month} ${year}`;
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const weekday = x.toLocaleString('default', { weekday: 'long' });
    const formattedTime = `${weekday} ${formattedHours}:${formattedMinutes} ${ampm}`;
    function getDaySuffix(day: number) {
      if (day >= 11 && day <= 13) {
        return 'th';
      }

      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

    return [formattedDay, formattedTime];
  }

  fetchForecast(): void {
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${this.mainLat}&lon=${this.mainLng}&APPID=${this.APPID}`
      )
      .then((response) => {
        this.forcastArray = [];
        (response.data?.list || []).forEach((e: any, i: number) => {
          if (i % 8 === 0) {
            this.forcastArray.push({
              ...e,
              resolvedImage: this.myGlobalImageObj[`${e.weather[0].icon}.png`],
              temperature: e?.main?.temp
                ? Number(e?.main?.temp - 273.15).toFixed(0) + '℃'
                : '',
              weekday: new Date(Number(`${e.dt}000`)).toLocaleString(
                'default',
                {
                  weekday: 'long',
                }
              ),
            });
          }
        });
      })
      .catch((e) => console.log(e));
  }

  fetchAllImages(): void {
    Object.keys(this.myGlobalImageObj).forEach((key) => {
      axios({
        method: 'get',
        url: `${this.baseLinkImage}${key}`,
        responseType: 'arraybuffer',
      })
        .then((response) => {
          const imageBuffer = new Uint8Array(response.data);
          const binaryImage = Array.from(imageBuffer)
            .map((byte) => String.fromCharCode(byte))
            .join('');
          const base64Image = btoa(binaryImage);
          this.myGlobalImageObj[key] = `data:image/png;base64, ${base64Image}`;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}
