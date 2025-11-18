import z from 'zod';
export declare const DISchema: z.ZodObject<{
    cnpjImportador: z.ZodString;
    nomeImportador: z.ZodString;
    origemCidade: z.ZodString;
    origemEstado: z.ZodString;
    destinoCidade: z.ZodString;
    destinoEstado: z.ZodString;
    nomeMercadoria: z.ZodString;
}, z.z.core.$strip>;
export type DI = z.infer<typeof DISchema>;
