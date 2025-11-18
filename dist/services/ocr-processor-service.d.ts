import type { DTA } from '../models/dta.js';
export declare function ocrProcessor(fileBuffer: string | Buffer): Promise<{
    success: boolean;
    data?: DTA;
}>;
