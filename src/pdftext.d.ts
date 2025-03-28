// ------------- pdftext.ts ---------

/**
  * pdftext file containing essential functions.
  * @module
*/
/**
  * function to get pdf data.
  * @param {ArrayBuffer} fileArray Array Buffer of pdf.
  * @returns {Promise<{[number:number]:string}>} returns pdf text data in json format to external.
  */
export declare const pdfText: (fileArray: Uint8Array) => Promise<{
    [number: number]: string;
}>;




// ------------- pdfjs.ts ---------

export { __webpack_exports__getDocument as getDocument };
declare var __webpack_exports__getDocument: any;