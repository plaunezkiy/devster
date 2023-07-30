import { Post } from "@/lib/types";

const API_URL = "http://127.0.0.1:8000";
// const API_URL = "http://192.168.1.206:8000";

// export const fetchCards = async () => {
//   return fetch(API_URL + "/api/cards/card/", {
//     cache: "no-store",
//   }).then((resp) => resp.json());
// };

export const createPost = async (post: Post | unknown) => {
//   console.log("about to create a post", post);

  return fetch(API_URL + "/api/blog/post/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
};

export const deletePost = async (id: number) => {
  return fetch(API_URL + `/api/blog/post/${id}/`, { method: "DELETE" });
};
