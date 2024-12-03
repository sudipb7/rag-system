import { openai } from "../clients";

export async function extractName(query: string): Promise<string | null> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant tasked with extracting the name of an animal or entity from a query. It must be the full name of the animal and plural.",
      },
      { role: "user", content: query },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "filter_by_name",
          description:
            "Extract the name of an animal or entity from the query. It must be the full name of the animal and plural.",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the animal or entity",
              },
            },
            required: ["name"],
          },
        },
      },
    ],
  });

  const toolCall = response.choices[0]?.message.tool_calls?.[0];
  return toolCall ? JSON.parse(toolCall.function.arguments).name : null;
}
