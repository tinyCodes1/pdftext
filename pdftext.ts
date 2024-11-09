/**
 * pdftext file containing essential functions.
 * @module
 */

import { getDocument } from "./src/pdfjs.js";

interface PdfDocument {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfPage>;
}
interface PdfPage {
  getTextContent(): Promise<PdfTextContent>;
  getAnnotations(): Promise<[]>;
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

const getPages=async(pdfDoc:PdfDocument): Promise<{[number: number]: string}>=>{

  const pagetext: {[key:number]:string} = {}  ;

  try {
    for (let i = 1; i <= pdfDoc.numPages; i++) {

      let currentLine = "";
      const lines : Array<string> = [];
      let lastY : number = 0;

      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();

      const ObjItems = content.items ;

      for (const i in ObjItems) {
        const item = ObjItems[i];
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
  } catch (error) {
    console.log(`error while getting pdf text. : ${error}`);
  }
  return pagetext ;
}



/**
 * Export function to get pdf data.
 * @param {ArrayBuffer} fileArray Array Buffer of pdf.
 * @returns {Promise<PdfTextJson>} returns pdf text data in json format to external.
 */
export const pdfText = async(fileArray: ArrayBuffer): Promise<{[number:number]:string }> => {
  const pdfTask = await getDocument(fileArray);
  const pdfDoc = await pdfTask.promise;
  const pageJson = await getPages(pdfDoc);
  pageJson[0] =  `${Object.values(pageJson)}`;
  return pageJson;
};
