import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page-component/search-page.component';
import { HomePageComponent } from './home-page-component/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AboutPageComponent } from './about-page-component/about-page.component';
import { ContactPageComponent } from './contact-page-component/contact-page.component';
import { LiveStreamComponent } from './live-stream-component/live-stream.component';
import { WeatherMapComponent } from './weather-map/weather-map.component';
import { ThisWeekComponent } from './this-week-component/this-week.component';

const routes: Routes = [
  { path: 'search-page', component: SearchPageComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'contact-page', component: ContactPageComponent },
  { path: 'live-stream', component: LiveStreamComponent },
  { path: 'weather-map', component: WeatherMapComponent },
  { path: 'this-week', component: ThisWeekComponent },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
