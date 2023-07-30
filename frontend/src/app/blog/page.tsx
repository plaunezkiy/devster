import { Post } from "@/lib/types";
import Link from "next/link";
import React from "react";

const posts = [
  {
    id: 1,
    slug: "localhost-exceptions",
    title: "Post title 1",
    date_created: "",
    image: {
      url: "",
    },
  },
  {
    id: 2,
    slug: "post-title-2",
    title: "Post title 2",
    date_created: "",
    image: {
      url: "",
    },
  },
  {
    id: 3,
    slug: "post-title-3",
    title: "Post title 3",
    date_created: "",
    image: {
      url: "",
    },
  },
  {
    id: 4,
    slug: "post-title-4",
    title: "Post title 4",
    date_created: "",
    image: {
      url: "",
    },
  },
];

const fetchPosts = async () => {
  const resp = await fetch("http://127.0.0.1:8000/api/blog/post/", {
    next: { revalidate: 10 },
  });
  const data = await resp.json();
  return data;
};

const BlogIndex = async () => {
  // const posts = [await fetchPosts()];
  const posts: Post[] = [];

  return (
    <div className="w-full flex justify-center">
      <div className="content flex flex-col w-full lg:flex-row justify-center gap-8 md:gap-16 mt-8 md:mt-12">
        <div className="order-2 lg:order-1 flex flex-col gap-4">
          <p className="text-md text-gray-500">Entries found: 4</p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <Link
                href={`/blog/posts/${post.slug}`}
                key={post.id}
                className="h-96 md:h-64 w-full sm:w-60 flex flex-col rounded-lg shadow-lg cursor-pointer duration-300 border border-1 hover:-translate-y-1 hover:text-blue-500 hover:shadow-xl"
              >
                <div className="h-64 md:h-40 relative overflow-hidden">
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISERISEBASFRUSFxMRFRESEBsSEBMQFBEYGhcWFRMYKCggGB0nGxYTITIhMSkrLi4wGB8zODMsNygtLisBCgoKDg0OGxAQGi8lICYvLS0rNy8tLS8vMjItLS0rLSstLTUtMDA3Mi01LS0tLS04LS0tMC0tLTUtNTcvNy0yLf/AABEIAKIBNwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgMBBAUH/8QAOBAAAgIABAQDBQYFBQEAAAAAAAECEQMSITFBUWFxgaGxBCKR0fATMkJScuEFYpKi8SMzgsHCQ//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBv/EACYRAQEAAgIBBAEEAwAAAAAAAAABAhEhMUEDElHwYaGx4fEiQmL/2gAMAwEAAhEDEQA/APzAAH0DwgAAAAAAAAAAAAAAAAAAArDw3J1GLk+UVb+CPSv4fP8AE4Q/VK3/AExtr4Gpjb0zc8Z3XkB74fw+LdfaNv8Alw9PjJql1PHjxipNRlmSekqq/AZYWdmOcyuogFPDkt4td0cyvk+9aamdNbcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASKyP6YEgrI/pjI/pl1RIKyP6YyP6Y1RIKyP6Z3BwnOSjFW3t+/JDVLdcuYcHJpRTbeiSVts9+H7FCH+480vyRfur9U1v2XxNYqOGnHD1b0licZdI8o+vHpmejH0pj3243K5fiNJY7rKqjH8sVlj4pb+JmC8OWXNP8izL9VpR/uafZM6bZ4xnBizUWoOLkv8A65Z07/I2rpJ03za6HzW6225r57jDbzJ2753r8SoYl6OKd/8AF/HbxPPcvc6Y4e1ee9HrXF8F3KhP3ZJN1o99HTrV89fAj2vKpNQbcdGm1UncU7fxOYT3ripWuF02tO6G+dL3NuST068Wk/izmJTqlWm+tPV6u9jT2fGlHMoOlNZZR3teO/qTiS4PTTlaJxpedsWgeyeI1h5Gk0pJukrUmmtGuVbdzzyw9G0/Di+3MmWOiZfLMHUrO5H9MxppIKyP6YyP6ZdUSCsj+mMj5DVEgAgAAAAAAAAAAAAAAAArD3XdepJWHuu69SS+AABAAAA+pg4f2cK/HNJy5xg9VHx0b8FwPJ/D8JSnclcYLPJc0tl4ycV4nqnNttvdu2+rO/o4/wCzlnd3X37/AA4Iq3S3eldQdhNpprdNNd0zslbfYqpJSjKS3ir0S3adU/8AJh7R/tVp709m60hHhf60bPJFtwi1KS4u4xUo61z0fnxPL7bWTD/Vica4Yf7Ez4xrnju2ffDzfZtNWn4qicrql4vgulno9i9rlhSjKDp8FuqeltM88pXvvz4fDgee61w9E3tWItItvhWmuqfyaL9mkovNSdWkpapvLy5fscw8Fyj0TvNukmtXfgjkprWuCpckr83vqXrk74SnW9dqV/sbSnmeZ1cajGklbS07tb9dDDCTb67+PDzoYj4LZaLrzfj8iS6hZy7B+7LvH0l8xhz6X20/Y3wcFOGI5SUXFRdP703fBc/mjDDevRe81zrn5LxGrNG5dq9rwlGTUZZlprVd1T5PTwMSrtPmtfjv9dyTF74WdAAIoVh7ruvUkrD3XdepZ2JABAAAAAAAAAAAAAAAABWHuu69SSsPdd16kl8AACAAAPoeyRrCvjiS/tgtPOT/AKTtmk5QhDDzatQi1BP83v3J/hXvbb9tzVRxd5Y6w09oRb93pljouHGz2YziR5ff5+Xms0wsO7bdJK26vjSSXF2ZPFxMzhiTk8tppybVrib4MlUot1mrXgpJ6XXDVrxLLtq26di4YjqDalokm01JpUlpVN11MMeObD2vJK66TVPwuMPia+y+yrDkpuSpO0lJScmta93bhqzmFJXUtYyWWXOnxXVOn4E1bOWZ/wA8yfa+blld0+exWJhKLalum1lX/b2XmXiezZZ1vT1XGt7X5k1rfoTHV7Xs1pbtq/gef2vRvfMdePJJxi8qlWZLZ1snzIjqqq23w0ei/dBwS+876Rf/AK/yU52ktlq2lyuvHbzHPk1PDfCwIqEnnWZ6ZK1UOLzbdPieeuTrrX/ohTd2tOXQ3kr+7pJ7rn079OPkXcs4TVjNVaSem23PiKSju/efLgv3r4EXfD4aP5Ho9tUcz+z1SWja166fqzcyTra286ZYUVabbS4vLw40r1JxopSkou0m0m1TaT0dcCVqxLdmb0uuXAAZUKw913XqSVh7ruvUs7EgAgAAAAAAAAAAAAAAAArD3XdepJWHuu69SS+AABAAAHrw08SFfiw/PCb/AOpP4S6H0PaoSnCLiopvLmedL3qea721rwo8/sscuDfHFd/8IWl/dm+COHqxx/xm3ms3dzxf7/VeNutbqMItrZuMEn6EHZKvHU4bak1C/r67AAKqUVNJSdNJqE+V/hlXDV9jD2mUmlCSUZR92lSU+Kba+83wfE1NY+z/AGsXBVmiri5OllvWLfdp/wBXMzljvpncx5vX7ffL5UXwq+nG+hpjQpKtVStrm1dPlu/3Oy101zbW9M/Tv6kJu7TrRW+lbVx22OGtO6Yrj9NhS58fXmenFlGWqw4wpfdbk/He/IhPi1GueVNPot7fiPb+UlIK3r97a+Ev3rj1REYSd0ncddE9Nde2tGn2znoqWVPKkktHpq1vuT9rdJvbaT49JfWhbpOTAgnKKk1G2ve3S14pGMlq9b1eq2fUuUMt32Xj+1mZi/DU+QAGVCsPdd16klYe67r1LOxIAIAAAAAAAAAAAAAAAAKw913XqSVh7ruvUkvgAAQCsLDcpKMd5NRXduiT0ewYyhNSlykrWri5JrNXGr2Ljq3lMrZLp7/aZLNUfuxShH9MVSMjrhbShLDk26X+rFW3tSlTIinx8tj2b24Y61qO5q3Vro6kvmuNdTqaatPak01TV3v8HxBzD/H3h6SIroAKoXh7Td7Ql5rKvNog57Q6wpfzSjHwVyfmoEt1NpeeGDSWstE9VruuTS4bq/U5je1NvWEVWnu6N9W+L6nni+HD61RpCrSkrWtU61rRX3rQ8/ut6ddfKoRW+lfCTfS/U65t8Ev5a0rsZuSk7d/HRLktCs1c0uTdt9aosoOarSlrytOlx5brmdmnu66qk2+p3E9oi0suGk1dyzNuTfGvwmeFjuLuKXZrMn3TuyWz5OddO4+K2ox0921otdd03x/yZAGLd1qTQACAVh7ruvUkrD3XdepZ2JABAAAAAAAAAAAAAAAABWHuu69STqdanc3RefzKJBWbovP5jN0Xn8wJBWbovP5jN0Xn8wPR/DV/qXxipSS4uSi6rqnr4HojFv8ADLu4tKu70PF7LiKOJCTWkZRk0t9GnpZvj5syTdp1JNbSTf3kzt6d1HLKX3NjsVpLvDyUvmIxb2KlSVXbu3W3a+J2ZvwgABQy/iL0w49JT8ZSr0gvibQg26StvgeP27EUsR07SyxT4NRila71fic/VusTHnKffwwLwpJNXtaut6vh1OZui8/mM3RefzPPOHZeLNW1C1G3Wb79cG60vsZFZui8/mM3RefzF5JwkFZui8/mM3RefzAkFZui8/mM3RefzAkFZui8/mM3RefzAkrD3XdeozdF5/MKfRefzAkAEAAAAAAAAAAAAAAAAAAAAAAAAA+o4ZYwhxisz/XOm14LKvBnyz6Xss/tIqP446VxnBbVza2rlXJnX0rNufqeL4L4AtYMtfdem7fupd29EZ4ntGHH+d8l7sF3lu/Cu53tk7Y38LhBydJN9uXN8iZ4uHHd53+WD08Z7fCzx4/tUpqm6j+SKqHw493bMTjl6vw1MLe3oxvbJSTSqMX+GOif6nvLxZ5wDlbb26TGToABFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABU8STrNJutrbddrJAB0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z"
                    alt="Post image"
                    className="h-full w-full rounded-t-lg object-cover"
                  />
                  {/* <div className="absolute bottom-0 flex flex-wrap gap-2 px-2 mb-2">
                        {post.tags.map((tag) => (
                        <span className="{`${tag.color}" text-white text-sm px-1 rounded`}>
                        {tag.name}
                        </span>
                        ))}
                    </div> */}
                </div>

                <div className="relative flex flex-col grow px-4 my-1">
                  <h1 className="text-md font-semibold">{post.title}</h1>

                  <p className="text-sm">
                    Post description or the first couple of lines
                  </p>
                  <p className="pb-1 mt-auto ml-auto text-xs text-gray-400">
                    {/* {post.date_created} */}
                    14/11/2022 - 19:07
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* filter */}
        <div className="order-1 h-full md:sticky top-10">
          <div className="w-full lg:w-64 h-64 rounded-lg shadow-lg p-2">
            <div className="h-full flex flex-col grow gap-1 items-center">
              <p className="text-lg font-semibold">Filter</p>
              <form action="" className="flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="border rounded-l-lg font-medium text-gray-900 pl-2"
                />
                <button
                  type="submit"
                  className="p-2.5 text-sm font-medium text-white bg-blue-500 rounded-r-lg border border-blue-500 hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* /filter */}
      </div>
    </div>
  );
};

export default BlogIndex;
