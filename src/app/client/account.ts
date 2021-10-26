import { Movement } from "./account-status/movement";

export interface Account {
    balance : number;
    id_account : number;
    id_account_type : number;
    movements : Array<Movement>;
}
