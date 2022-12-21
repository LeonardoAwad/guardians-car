import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarCardComponent } from './components/car-list/car-card/car-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, CarListComponent, CarCardComponent, MenuComponent, FilterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
