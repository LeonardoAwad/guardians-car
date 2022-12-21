import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CarCardComponent } from './components/car-list/car-card/car-card.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterService } from './services/filter.service';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './material.module';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CarListComponent,
    CarCardComponent,
    MenuComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FilterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
