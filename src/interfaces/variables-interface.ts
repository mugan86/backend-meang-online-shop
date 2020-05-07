import { IUser } from './user.interface';
import { IPaginationOptions } from './pagination-options.interface';

export interface IVariables {
    id?: string | number;
    genre?: string;
    user?: IUser;
    pagination?: IPaginationOptions;
}