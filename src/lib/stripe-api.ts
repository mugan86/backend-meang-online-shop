export const STRIPE_OBJECTS = {
    CHARGES: 'charges',
    CUSTOMERS: 'customers',
    TOKENS: 'tokens'
};

export const STRIPE_ACTIONS = {
    CREATE: 'create',
    CREATE_SOURCE: 'createSource',
    DELETE: 'del',
    DELETE_SOURCE: 'deleteSource',
    GET: 'retrieve',
    GET_SOURCE: 'retrieveSource',
    LIST: 'list',
    LIST_SOURCES: 'listSources',
    UPDATE: 'update'
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

    protected async getError(error: Error) {
        {
            return {
              status: false,
              message: 'Error: '.concat(error.message),
              hasMore: false,
              customer: undefined,
              card: undefined
            };
          }
    }
}

export default StripeApi;