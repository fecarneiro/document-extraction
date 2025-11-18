import type { DTA } from '../models/dta.js';
export declare function textProcessor(file: Buffer): Promise<{
    success: boolean;
    data?: DTA;
}>;
