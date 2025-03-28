/**
 * test file to check if pdfText is working properly or not.
 * @module
 */

import {pdfText} from './mod.ts' ;
/**
 * Export function to check pdfText.
 */
export const test = async () : Promise<string> => {
  const response = await fetch("https://jsr.io/@pdf/pdftext/1.3.2/samplepdf/sample.pdf");
  const filedata = await response.arrayBuffer();
  const pages = await pdfText(new Uint8Array(filedata));
  const page1 : string = pages[1] ;
  if (page1.toLowerCase().trim() === "This is sample pdf\npage 1\nline 3".toLowerCase().trim()) {
    return `pdfText is running fine in this device.`;
  } else {
    return `test unsuccessful.`;
  } 
}
