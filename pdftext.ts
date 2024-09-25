/**
 * pdftext file containing essential functions.
 * @module
 */

import { getDocument, GlobalWorkerOptions } from "./src/pdf.mjs";
import * as pdfWorker from "./src/pdf.worker.mjs";
GlobalWorkerOptions.worker = pdfWorker;

interface Config {
  pdfDoc: PdfDocument;
  coord?: string;
}
interface PdfDocument {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfPage>;
}
interface PdfPage {
  getTextContent(): Promise<PdfTextContent>;
}
interface PdfTextContent {
  items: PdfTextContentText[];
}
interface PdfTextContentText {
  str: string;
  transform : Array<number>;
}

/**
 * Get json text from pdf array buffer.
 * @param {pdfDocument} pdfDoc data.
 * @returns {Promise<PdfTextJson>} returns json text to pdfText function.
 */

const getPages=async(config : Config): Promise<{[number: number]: string}>=>{

  const { pdfDoc, coord } = config;
  const pagetext: {[key:number]:string} = {}  ;
  try {
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      let currentLine = "";
      const lines : Array<string> = [];
      let lastY : number = 0;

      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();

      let ObjItems = content.items ;
      if ( coord == "y" ) {
        ObjItems = ObjItems.sort((a,b)=>a.transform[4] - b.transform[4]);  // sorted x coordinations
        ObjItems = ObjItems.sort((a,b)=>b.transform[5] - a.transform[5]);  // sorted y coordinations
      } else if ( coord == "x" ) {
        ObjItems = ObjItems.sort((a,b)=>b.transform[5] - a.transform[5]);  // sorted y coordinations
        ObjItems = ObjItems.sort((a,b)=>a.transform[4] - b.transform[4]);  // sorted x coordinations
      }

      for (const i in ObjItems) {
        const item = content.items[i];
        if ((lastY == null) || (Math.abs(item.transform[5] - lastY) < item.transform[0]/2.5)) {
          currentLine += item.str + " " ;
        } else {
          lines.push(currentLine);
          currentLine = item.str;
        }
        lastY = item.transform[5];
      }
      if (currentLine) {
        lines.push(currentLine);
      }
      const lin : Array<string> = lines.map( line => line.trim().replace(/\s{2,}/g, " "));
      const allText = lin.join("\n").trim();
      pagetext[i] = allText.replace(/\n{3,}/g, '\n\n\n');    // remove more than 3 new lines
    }
  } catch (_error) {
    console.log(`error while getting pdf text.`);
  }
  return pagetext ;
}

/**
 * Export function to get pdf data.
 * @param {ArrayBuffer} fileArray Array Buffer of pdf.
 * @returns {Promise<PdfTextJson>} returns pdf text data in json format to external.
 */
export const pdfText = async(fileArray: ArrayBuffer, coord = "none"): Promise<{[number:number]:string }> => {
  const pdfTask = await getDocument(fileArray);
  const pdfDoc = await pdfTask.promise;
  const allPageJson = await getPages({pdfDoc, coord});
  return allPageJson;
};
