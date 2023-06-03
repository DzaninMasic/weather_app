import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page-component/search-page.component';
import { HomePageComponent } from './home-page-component/home-page.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: 'search-page', component: SearchPageComponent },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
