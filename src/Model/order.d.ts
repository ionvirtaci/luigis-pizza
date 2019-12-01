import {Customer} from "./customer";
import {Pizza} from "./pizza";
import {Card} from "./card";

interface Billing extends Card {
    price: number;
}

export interface Order {
    customer: Customer;
    pizza: Pizza;
    billing: Billing;
}