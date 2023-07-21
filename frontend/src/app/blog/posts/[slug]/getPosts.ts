export const fetchPosts = async (slug: string) => {
  return fetch(`http://127.0.0.1:8000/api/blog/post/${slug}/`, {
    next: { revalidate: 60 },
  }).then((resp) => resp.json());
};
