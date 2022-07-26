export class Payment {
    id!: string;
    email!: string;
}

export interface Payment {
    id: string,
    email: string,
    name:string,
    exp_year:number,
    exp_month:number,
    cvc:number,
    amount:number
}
