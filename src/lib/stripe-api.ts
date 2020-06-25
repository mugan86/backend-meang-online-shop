export const STRIPE_OBJECTS = {
    CUSTOMERS: 'customers',
};

export const STRIPE_ACTIONS = {
    CREATE: 'create',
    GET: 'retrieve',
    LIST: 'list'
};

class StripeApi {
    private stripe = require('stripe')(process.env.STRIPE_API_KEY, {
        apiVersion: process.env.STRIPE_API_VERSION
    });

    async execute(object: string, action: string, ...args: [
        (string | object ), (string | object)?
    ]) {
        return await this.stripe[object][action](...args);
    }
}

export default StripeApi;