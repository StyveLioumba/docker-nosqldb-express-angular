import { Deck } from './../model/deck';
import { Card } from './../model/card';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  get cards():Observable<any>{
    return this.httpClient.get<any>(environment.baseUrl);
  }

  get deck():Observable<any>{
    return this.httpClient.get<any>(`${environment.baseUrl}/deck` );
  }

  addCardToDeck(card:Card):Observable<any>{
    const deck:Deck = {
      userid:card.id.toString(),
      image_url:card.card_images[0].image_url,
      name:card.name,
      last_update_timestamp:Date.now().toString()
    }
    return this.httpClient.post<any>(`${environment.baseUrl}/deck`,deck);
  }

  deleteDeck(deck:Deck):Observable<any>{
    return this.httpClient.delete<any>(`${environment.baseUrl}/deck/${deck.userid}`);
  }

}
