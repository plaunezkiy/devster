export type Card = {
  front: string;
  back: string;
  hint: string;
  invertible: boolean;
  module: number;
};

export type Post = {
  series: string;
  title: string;
  text: string;
};
