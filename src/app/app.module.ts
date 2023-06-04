import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page-component/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchPageComponent } from './search-page-component/search-page.component';
import { AboutPageComponent } from './about-page-component/about-page.component';
import { ContactPageComponent } from './contact-page-component/contact-page.component';
import { ThisWeekComponent } from './this-week-component/this-week.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchPageComponent,
    AboutPageComponent,
    ContactPageComponent,
    ThisWeekComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
