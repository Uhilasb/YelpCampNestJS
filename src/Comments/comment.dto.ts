export interface createCommentDTO{
    text: string;
}

export type updateCommentDTO = Partial<createCommentDTO>;