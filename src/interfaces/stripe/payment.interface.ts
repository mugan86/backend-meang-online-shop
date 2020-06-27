export interface IPayment {
    amount: number;
    description: string;
    currency: string;
    token: string;
    customer: string;
    cart: string;
    fingerprint: string;
}