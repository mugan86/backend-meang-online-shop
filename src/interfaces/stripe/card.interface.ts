export interface IStripeCard {
  id?: string;
  number?: string;
  expMonth: number;
  expYear: number;
  cvc?: string;
  cvcCheck?: string;
  fingerprint?: string;
}
