"use client";
import { fetchPosts } from "./getPosts";

interface Props {
  params: {
    slug: string;
  };
}
const BlogPostPage = async ({ params: { slug } }: Props) => {
  const post = await fetchPosts(slug);

  return (
    <div className="mt-12 w-full flex justify-center">
      <div className="mx-4 lg:w-2/3 flex flex-col gap-4">
        <h1 className="text-3xl text-center font-semibold">{post.title}</h1>
        <h1 className="text-2xl text-center font-semibold">{post.series}</h1>
        <div className="w-full flex justify-between items-center gap-4 text-sm divide-x">
          <p className="w-full px-auto flex justify-center items-center gap-1">
            <i className="fa-solid fa-eye text-xs"></i> 12
          </p>
          <p className="w-full text-center">15 min read</p>
          <p className="w-full text-center">24/02/2023</p>
        </div>
        <div
          className="mt-4 text-lg"
          dangerouslySetInnerHTML={{ __html: post.text }}
        ></div>
      </div>
    </div>
  );
};

export default BlogPostPage;
