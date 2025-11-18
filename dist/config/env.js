import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: String(process.env.NODE_ENV) || 'developer',
    openaiKey: String(process.env.OPENAI_API_KEY),
    aiModel: String(process.env.AI_MODEL) || 'gpt-4o-mini',
};
//# sourceMappingURL=env.js.map