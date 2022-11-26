import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components-models/header/header.component';
import { FooterComponent } from './components-models/footer/footer.component';
import { CardComponent } from './components-models/card/card.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeComponent } from './components/home/home.component';
import { DeckComponent } from './components/deck/deck.component';
import { DeckModelComponent } from './components-models/deck-model/deck-model.component';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CardComponent,
        HomeComponent,
        DeckComponent,
        DeckModelComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class AppModule { }
