import { AppService } from 'src/app/services/app.service';
import { Deck } from './../../model/deck';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  decks :Deck[] = [];
  totalCards:number = 0;
  subscription:Subscription = new Subscription();
  p = 1;
  isDelete:boolean = false;

  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.subscription = this.appService.deck.subscribe((res:any) => {
      this.decks = res.data;
      this.totalCards = this.decks.length;
    });
    
  }

  isDeleted($event:any){
    this.isDelete = $event;
    console.log($event);
    
    if($event){
      this.ngOnInit();
    }
  }


}
