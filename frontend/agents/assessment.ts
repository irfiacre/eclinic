"use server";
import { ChatDeepSeek } from "@langchain/deepseek";
import { createAgent } from "langchain";
import * as z from "zod";

export interface QuestionInterface {
  question: string;
  options: String[];
  answer: string;
}

const API_KEY = process.env.NEXT_DEEPSEEK_API_KEY;

const model: any = new ChatDeepSeek({
  model: "deepseek-chat",
  apiKey: API_KEY,
});

const ModelResponse = z.object({ result: z.string() });

export const handleGetAgentOutput = async (
  assessmentPrompt: string,
  question: string,
) => {
  const agent = createAgent({
    model,
    tools: [],
    responseFormat: ModelResponse,
    systemPrompt: assessmentPrompt,
  });

  const result = await agent.invoke({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  return result.structuredResponse;
};
