import z from 'zod';
export declare function aiProcessor<T>(fileBase64: string, aiModel: string, prompt: string, documentSchema: z.ZodType<T>): Promise<T>;
