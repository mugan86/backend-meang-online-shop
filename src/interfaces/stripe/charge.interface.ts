export interface ICharge {
    id: string;
    object: string;
    amount: number;
    created: number;
    customer: string;
    currency: string;
    description: string;
    paid: boolean;
    payment_method: string;
    receipt_url: string;
    receipt_email: string;
    status: string;
}