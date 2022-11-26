import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Deck } from 'src/app/model/deck';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-deck-model',
  templateUrl: './deck-model.component.html',
  styleUrls: ['./deck-model.component.scss']
})
export class DeckModelComponent implements OnInit, OnDestroy {
  @Input() deck: Deck;
  @Output() isDelete= new EventEmitter<boolean>();
  subscription:Subscription = new Subscription();

  constructor(private appService:AppService) {
    this.deck = {} as Deck;
   }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  ngOnInit(): void {
  }

  onDeleteToDeck(){
    this.subscription= this.appService.deleteDeck(this.deck).subscribe((data)=>{
      if(data.message ==='deleted'){
         this.isDelete.emit(true);
      }
    });
  }
}
