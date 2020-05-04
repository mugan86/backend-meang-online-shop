import { Db } from 'mongodb';

export interface IContextData {
    db?: Db;
    token?: string;
}