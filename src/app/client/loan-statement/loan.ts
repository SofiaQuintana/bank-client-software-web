import { LoanMovement } from "./loan-movement";

export interface Loan {
    id_loan: number;
    cui: number;
    guarantor_cui: number;
    amount: number;
    balance: number;
    monthly_payment : any;
    interest_rate: number;
    cutoff_date: any;
    payments: LoanMovement[];
}
