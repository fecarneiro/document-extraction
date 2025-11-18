import fs from 'node:fs/promises';
import { pdf } from 'pdf-to-img';
import sharp from 'sharp';
import { createWorker, PSM } from 'tesseract.js';
import { matchFieldsWithRegex } from '../utils/regex-match.js';
async function createTesseractWorker() {
    const worker = await createWorker('por', 1, {
        cachePath: './tessdata',
        cacheMethod: 'write',
    });
    await worker.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÃÂÇÉÊÍÓÔÕÚàáãâçéêíóôõú .:/-,()',
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
    return worker;
}
async function pdfToImage(fileBuffer) {
    const pages = [];
    const document = await pdf(fileBuffer, { scale: 3 });
    for await (const image of document) {
        pages.push(image);
    }
    return pages;
}
async function optimizeImage(pages) {
    let counter = 1;
    const optimizedPages = [];
    for await (const page of pages) {
        const optmizedPage = await sharp(page)
            .greyscale()
            .normalise()
            .linear(1.6, 0)
            .sharpen()
            .png()
            .toBuffer();
        await fs.writeFile(`./data/output/opt-page${counter}.png`, optmizedPage);
        optimizedPages.push(optmizedPage);
        counter++;
    }
    return optimizedPages;
}
async function recognizeImage(worker, images) {
    let extractedText = '';
    for await (const image of images) {
        const { data: { text }, } = await worker.recognize(image);
        extractedText += text;
    }
    return extractedText;
}
function regexMatch(text) {
    const regexObjectResult = matchFieldsWithRegex(text);
    return regexObjectResult;
}
export async function ocrProcessor(fileBuffer) {
    const worker = await createTesseractWorker();
    try {
        const images = await pdfToImage(fileBuffer);
        const optimizedImages = await optimizeImage(images);
        const text = await recognizeImage(worker, optimizedImages);
        const ocrExtractionResult = regexMatch(text);
        return { success: true, data: ocrExtractionResult };
    }
    catch (error) {
        console.error('Error extracting text with OCR', error);
        return { success: false };
    }
    finally {
        await worker.terminate();
    }
}
//# sourceMappingURL=ocr-processor-service.js.map