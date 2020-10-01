import { Document } from 'mongoose';
import { User } from './user';

export interface Comment extends Document{
    text: string;
    author: User;
    
}