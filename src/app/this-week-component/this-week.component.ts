import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-week-page',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css'],
})
export class ThisWeekComponent implements OnInit {
  city: any = JSON.parse(window.localStorage.getItem('city') || '');

  weekday: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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

  APPID: string = 'bd5e378503939ddaee76f12ad7a97608'; // change later - this is stolen from https://gist.github.com/lalithabacies/c8f973dc6754384d6cade282b64a8cb1
  baseLinkImage: string = 'https://openweathermap.org/img/wn/';

  dzanin2: any[] = [
    {
      dt: 1685880000,
      main: {
        temp: 294.56,
        feels_like: 294.4,
        temp_min: 294.56,
        temp_max: 294.57,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 955,
        humidity: 63,
        temp_kf: -0.01,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: { all: 41 },
      wind: { speed: 0.34, deg: 222, gust: 1.07 },
      visibility: 10000,
      pop: 0.95,
      rain: { '3h': 2.34 },
      sys: { pod: 'd' },
      dt_txt: '2023-06-01 12:00:00',
    },
    {
      dt: 1685890800,
      main: {
        temp: 293.94,
        feels_like: 294.01,
        temp_min: 293.64,
        temp_max: 293.94,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 954,
        humidity: 74,
        temp_kf: 0.3,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      clouds: { all: 71 },
      wind: { speed: 0.29, deg: 91, gust: 0.89 },
      visibility: 10000,
      pop: 1,
      rain: { '3h': 4.29 },
      sys: { pod: 'd' },
      dt_txt: '2023-06-02 15:00:00',
    },
    {
      dt: 1685901600,
      main: {
        temp: 289.46,
        feels_like: 289.5,
        temp_min: 289.46,
        temp_max: 289.46,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 954,
        humidity: 90,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      clouds: { all: 91 },
      wind: { speed: 0.65, deg: 151, gust: 0.79 },
      visibility: 10000,
      pop: 1,
      rain: { '3h': 3.07 },
      sys: { pod: 'd' },
      dt_txt: '2023-06-03 18:00:00',
    },
    {
      dt: 1685912400,
      main: {
        temp: 287.38,
        feels_like: 287.34,
        temp_min: 287.38,
        temp_max: 287.38,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 955,
        humidity: 95,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: { all: 94 },
      wind: { speed: 1.52, deg: 175, gust: 1.48 },
      visibility: 10000,
      pop: 0.36,
      rain: { '3h': 0.13 },
      sys: { pod: 'n' },
      dt_txt: '2023-06-04 21:00:00',
    },
    {
      dt: 1685923200,
      main: {
        temp: 286.51,
        feels_like: 286.38,
        temp_min: 286.51,
        temp_max: 286.51,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 954,
        humidity: 95,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: { all: 97 },
      wind: { speed: 1.44, deg: 178, gust: 1.41 },
      visibility: 10000,
      pop: 0.23,
      sys: { pod: 'n' },
      dt_txt: '2023-06-05 00:00:00',
    },
  ];

  forcastArray: any[] = [];
  ngOnInit(): void {
    this.fetchAllImages();
    let forcastString = window.localStorage.getItem('forcast');
    this.forcastArray = JSON.parse(forcastString || '');
    this.city = JSON.parse(window.localStorage.getItem('city') || '');
    console.log(this.forcastArray, 'this.forcastArray');
  }

  trackByFn(index: number, item: string) {
    return index;
  }

  calculateDate(x: Date): string[] {
    const day = new Date(x).getDate();
    const dayOfWeek = this.weekday[new Date(x).getDay()];
    const month = new Date(x).toLocaleString('default', { month: 'short' });
    const year = new Date(x).getFullYear();
    const hours = new Date(x).getHours();
    const minutes = new Date(x).getMinutes();
    const suffix = getDaySuffix(day);
    const formattedDay = `${day}${suffix} ${month} ${year}`;
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const weekday = new Date(x).toLocaleString('default', { weekday: 'long' });
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

    return [formattedDay, formattedTime, dayOfWeek];
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
