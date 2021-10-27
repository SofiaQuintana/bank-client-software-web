export interface DelayedPayment {
    id_payment_delay : number;
    id_card : number;
    canceled : boolean;
    interest_rate : number;
    total_debt : number;
}
