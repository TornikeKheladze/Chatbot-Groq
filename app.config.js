import "dotenv/config";

export default {
  expo: {
    name: "Chatbot",
    slug: "Chatbot",
    icon: "./assets/gpt.png",
    splash: {
      image: "./assets/gpt.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    extra: {
      groqApiKey: process.env.GROQ_API_KEY,
    },
    android: {
      package: "com.anonymous.Chatbot",
      adaptiveIcon: {
        foregroundImage: "./assets/gpt.png",
        backgroundColor: "#ffffff",
      },
    },
    ios: {
      bundleIdentifier: "com.anonymous.Chatbot",
    },
  },
};
