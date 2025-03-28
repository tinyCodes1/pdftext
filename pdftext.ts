/**
  * pdftext file containing essential functions.
  * @module
*/

import { expect } from "jsr:@std/expect";
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

const getPlainTexts=async(page:PdfPage)=>{
  let currentLine = "";
  const lines : Array<string> = [];
  let lastY : number = 0;
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
  return allText;
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
      const page = await pdfDoc.getPage(i);
      let allText = `` ;
      allText = await getPlainTexts(page); 
      pagetext[i] = allText.replace(/\n{3,}/g, '\n\n\n');    // remove more than 3 new lines
    }
  } catch (error) {
    console.log(`error while getting pdf text. : ${error}`);
  }
  return pagetext ;
}


/**
  * function to get pdf data.
  * @param {ArrayBuffer} fileArray Array Buffer of pdf.
  * @returns {Promise<{[number:number]:string}>} returns pdf text data in json format to external.
  */
const pdfText = async(fileArray: Uint8Array): Promise<{[number:number]:string }> => {
  const pdfTask = await getDocument(fileArray);
  const pdfDoc = await pdfTask.promise;
  const pageJson = await getPages(pdfDoc);
  return pageJson;
};


// ----------- tests --------------
Deno.test("pdfText", async () => {
  const filePath = "./samplepdf/sample.pdf";
  const pdfBuffer : Uint8Array = Deno.readFileSync(filePath);
  const pages : {[pageno:number]:string} = await pdfText(pdfBuffer);
  expect(Object.keys(pages).length).toBe(2);
  expect(pages[1]).toBe("This is sample pdf\npage 1\nline 3");
});


export { pdfText };
