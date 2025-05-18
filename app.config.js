import "dotenv/config";

export default {
  expo: {
    name: "Chatbot",
    slug: "Chatbot",
    extra: {
      groqApiKey: process.env.GROQ_API_KEY,
    },
  },
};
