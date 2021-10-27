import { CardMovement } from "./card-movement";
import { DelayedPayment } from "./delayed-payment";

export interface Card {
    balance : number;
    cui : number;
    id_account : number;
    id_card : number;
    credit_limit : number;
    cutoff_date : any;
    interest_rate : number;
    payments: CardMovement[];
    payments_delayed : DelayedPayment[]; 
}
