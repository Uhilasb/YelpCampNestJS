export interface CreateCampgroundDTO{
    name: string;
    image: string;
    description: string;
}

export type UpdateCampgroundDTO  = Partial<CreateCampgroundDTO>;