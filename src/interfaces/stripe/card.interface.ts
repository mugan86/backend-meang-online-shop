export interface IStripeCard {
    id?: string;
    number: string;
    expMonth: number;
    cvc: string;
    expYear: number;
    fingerprint?: string;
}