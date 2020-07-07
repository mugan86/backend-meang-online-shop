export interface IStripeCharge {
    id: string;
    amount: number;
    status: string;
    receiptEmail: string;
    receiptUrl: string;
    paid: boolean;
    created: string;
    typeOrder: string;
    description: string;
    card: string;
    customer: string;
}