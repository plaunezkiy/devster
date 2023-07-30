// // ./app/api/chat/route.ts
// import { Configuration, OpenAIApi } from "openai-edge";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// // Create an OpenAI API client (that's edge friendly!)
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);

// // IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

// export async function POST(req: Request) {
//   // Extract the `prompt` from the body of the request
//   const { messages } = await req.json();

//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     stream: true,
//     messages: messages.map((message: any) => ({
//       content: message.content,
//       role: message.role,
//     })),
//   });

//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }
import { Card, Post } from "@/lib/types";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionFunctions } from "openai-edge";
import { createCard } from "@/components/Cards/cards";
import { createPost } from "@/app/blog/posts";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const functions: ChatCompletionFunctions[] = [
  {
    name: "write_blog_post",
    description: "Write and create a blog post",
    parameters: {
      type: "object",
      properties: {
        post: {
          series: "string",
          title: "string",
          text: "string",
        },
      },
      required: ["post"],
    },
  },
  {
    name: "create_flash_card",
    description: "Create a flash card object from a JSON object",
    parameters: {
      type: "object",
      properties: {
        card: {
          front: "string",
          back: "string",
          hint: "string",
          invertible: "boolean",
          module: "number",
        },
      },
      required: ["card"],
    },
  },
  {
    name: "get_current_weather",
    description: "Get the current weather",
    parameters: {
      type: "object",
      properties: {
        format: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description:
            "The temperature unit to use. Infer this from the users location.",
        },
      },
      required: ["format"],
    },
  },
  {
    name: "create_recipe",
    description:
      "Create a recipe that has a title, sequence of steps to make it and the list of necessary ingredients",
    parameters: {
      type: "object",
      properties: {
        recipe: {
          title: "string",
          // type: {
          //   type: "string",
          //   enum: ["breakfast", "lunch", "dinner"],
          //   description:
          //     "The temperature unit to use. Infer this from the users location.",
          // },
          steps: "string",
          ingredients: "string[]",
        },
      },
      required: ["recipe"],
    },
  },
  {
    name: "eval_code_in_browser",
    description: "Execute javascript code in the browser with eval().",
    parameters: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: `Javascript code that will be directly executed via eval(). Do not use backticks in your response.
           DO NOT include any newlines in your response, and be sure to provide only valid JSON when providing the arguments object.
           The output of the eval() will be returned directly by the function.`,
        },
      },
      required: ["code"],
    },
  },
];

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages,
    functions,
  });

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      {
        name,
        arguments: args,
      }: { name: string; arguments: Record<any, unknown> },
      createFunctionCallMessages
    ) => {
      let resp;
      switch (name) {
        case "get_current_weather":
          // Call a weather API here
          const weatherData = {
            temperature: 20,
            unit: args.format === "celsius" ? "C" : "F",
          };
          const newMessages = createFunctionCallMessages(weatherData);
          return openai.createChatCompletion({
            messages: [...messages, ...newMessages],
            stream: true,
            model: "gpt-3.5-turbo-0613",
            functions,
          });
        case "write_blog_post":
          resp = await createPost(args.post);
          const rt = await resp.text();
          console.log(rt);

          const post = await resp.json();
          const postMsg = createFunctionCallMessages(post);
          return openai.createChatCompletion({
            messages: [...messages, ...postMsg],
            stream: true,
            model: "gpt-3.5-turbo-0613",
            functions,
          });
        case "create_flash_card":
          console.log(args.card);

          const card = await (await createCard(args.card)).json();
          const cardMsg = createFunctionCallMessages(card);
          return openai.createChatCompletion({
            messages: [...messages, ...cardMsg],
            stream: true,
            model: "gpt-3.5-turbo-0613",
            functions,
          });
        case "create_recipe":
          console.log(args.recipe);

          // const recipe = await (await createCard(args.card)).json();
          // const cardMsg = createFunctionCallMessages(card);
          return openai.createChatCompletion({
            messages: [...messages, "Logged creating a recipe"],
            stream: true,
            model: "gpt-3.5-turbo-0613",
            functions,
          });
      }
    },
  });

  return new StreamingTextResponse(stream);
}
