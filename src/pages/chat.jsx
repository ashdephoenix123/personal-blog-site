import React from "react";

const prompt = `
Generate a 500-word article on the topic "Latest Trends in Web Development".
Include a title and a short description.
`;

const model = "gpt-4o-mini-tts";
const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;

const Chat = () => {
  const generatePrompt = async () => {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourdomain.com", // optional but recommended
          "X-Title": "My Next.js App", // optional for identifying the project
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // You can also use other models like anthropic/claude-3-opus, mistralai/mistral-7b-instruct
          messages: [
            {
              role: "user",
              content: `Write a 500-word blog article on "Why AI is the Future of Content Creation". Include a title and summary.`,
            },
          ],
          temperature: 0.7,
        }),
      }
    );
    console.log("res => ", response);
    const data = await response.json();
    console.log(11, data);
  };
  return (
    <div className="h-screen">
      <button
        className="bg-white text-black px-6 py-2 rounded"
        onClick={generatePrompt}
      >
        Generate
      </button>
    </div>
  );
};

export default Chat;
