export type Card = {
  id: number;
  front: string;
  back: string;
  hint: string;
  invertible: boolean;
  module: number;
};

export type Post = {
  id: number;
  series: string;
  title: string;
  text: string;
  slug: string;
};
