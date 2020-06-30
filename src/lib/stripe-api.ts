export const STRIPE_OBJECTS = {
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
    UPDATE: 'update',
    UPDATE_SOURCE : 'updateSource'
};

class StripeApi {
    private stripe = require('stripe')(process.env.STRIPE_API_KEY, {
        apiVersion: process.env.STRIPE_API_VERSION
    });

    async execute(object: string, action: string, ...args: [
        (string | object ), (string | object)?, (string | object)?
    ]) {
        return await this.stripe[object][action](...args);
    }

    protected async getError(error: Error) {
        {
            return {
              status: false,
              message: 'Error: '.concat(error.message),
              hasMore: false,
            };
          }
    }
}

export default StripeApi;