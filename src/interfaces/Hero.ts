export interface Hero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  imageIds?: number[];
  createdAt: Date;
  updatedAt: Date;
}
