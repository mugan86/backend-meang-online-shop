export interface IContext {
    req: IRequest;
    connection: IConnection;
}

interface IRequest {
    headers: {
        authorization: string;
    };
}

interface IConnection {
    authorization: string;
}