import { Document } from 'mongoose';
import { User } from './user';
import { Comment } from './comment';


// interface Comment{
//     text: string;
//     author: User;
// }

export interface Campground extends Document{
    name: string;
    image: string;
    description: string;
    author: User;
    comments: Comment[];
}