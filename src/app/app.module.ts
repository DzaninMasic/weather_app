import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page-component/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchPageComponent } from './search-page-component/search-page.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, SearchPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
