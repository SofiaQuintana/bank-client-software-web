import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Card } from './card';

@Component({
  selector: 'app-card-statement',
  templateUrl: './card-statement.component.html',
  styleUrls: ['./card-statement.component.css']
})
export class CardStatementComponent implements OnInit {

  //actual page reference for first pagination
  page : any;
  //actual page reference for second pagination
  secondPage : any;
  //card id to get card data
  cardId : any;
  //object to store card data
  card : Card;
  //array of card payments
  movements : any = [];
  //array of delayed payments
  delayed : any = [];

  constructor(private accountService : AccountService, private actRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouteParam();
    this.getCardData();
  }

  /**
   * gets account id param sent in url,
   * in a dynamic way.
   */
   getRouteParam() {
    this.actRoute.paramMap.subscribe(
      (param) => {
        this.cardId = param.get('id');
      }
    );
  }

  getCardData() {
    this.accountService.getCardInfo(this.cardId).subscribe(
      (response) => {
        this.card = response;
        this.movements = this.card.payments;
        this.delayed = this.card.payments_delayed;
        console.log(this.card);
      },
      (error : HttpErrorResponse) => {
        console.error(error.error.information_message);
      }
    )
  }

}
