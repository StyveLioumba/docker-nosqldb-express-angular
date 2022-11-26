import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { Card } from './../../model/card';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input()
  card:Card;
  subscription:Subscription = new Subscription();
  isAdded:boolean = false;
  constructor(private appService:AppService) { 
    this.card = {} as Card;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

  ngOnInit(): void {
  }

  onAddToDeck(){
    this.subscription = this.appService.addCardToDeck(this.card).subscribe((data)=>{
      if(data.message ==='added'){
        this.isAdded = true;
      }
    });
  }

}
