import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/model/card';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {
  cards :Card[] = [];
  totalCards:number = 0;
  subscription:Subscription = new Subscription();
  p = 1;

  constructor(private appService:AppService) {}
 
  ngOnInit(): void {
    this.subscription = this.appService.cards.subscribe((res:any)=>{
      this.cards = res.data;
      this.totalCards = this.cards.length;
    });
  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
