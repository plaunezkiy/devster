import { Card } from "@/lib/types";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionFunctions } from "openai-edge/types/api";
import { createCard } from "@/app/apps/cards/cards";
import { createPost } from "@/app/blog/posts";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const functions: ChatCompletionFunctions[] = [
  // {
  //   name: "create_flash_card",
  //   description: "Create a flash card object from a JSON object",
  //   parameters: {
  //     type: "object",
  //     properties: {
  //       card: "Card",
  //       // card: {
  //       //   front: "string",
  //       //   back: "string",
  //       //   hint: "string",
  //       //   invertible: "boolean",
  //       //   module: "number",
  //       // },
  //     },
  //     required: ["card"],
  //   },
  // },
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
      { name, arguments: args },
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
        // case "create_flash_card":
        //   resp = await createCard(args.card);
        //   const t = await resp.text();
        //   console.log(t);

        //   const card = await resp.json();
        //   const cardMsg = createFunctionCallMessages(card);
        //   return openai.createChatCompletion({
        //     messages: [...messages, ...cardMsg],
        //     stream: true,
        //     model: "gpt-3.5-turbo-0613",
        //     functions,
        //   });
        
      }
    },
  });

  return new StreamingTextResponse(stream);
}
