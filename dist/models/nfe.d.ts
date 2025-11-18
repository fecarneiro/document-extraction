import z from 'zod';
export declare const NFeSchema: z.ZodObject<{
    dataTransporte: z.ZodString;
    valorCarga: z.ZodString;
}, z.z.core.$strip>;
export type NFe = z.infer<typeof NFeSchema>;
