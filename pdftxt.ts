#!/usr/bin/env -S deno run --ext=ts --allow-write --allow-read

/**
 *  pdftxt : simple module to convert pdf to text file. It is intended to run from terminal/cmd directly.
 */

import {pdfText} from "./pdftext.ts";
import { SEPARATOR } from "./src/sep.ts";

const version = "1.3.0"
const showHelp=()=> {
  const parts = Deno.mainModule.split(`/`);
  const scriptName = parts[parts.length -1];
  console.log(`pdftxt is simple commandline module to convert pdf file to text file.\n[${version}]\n`);
  console.log(`Usage: ${scriptName} <pdffiles>\n`);
  console.log(`Options:`);
  console.log(`  -h  : Show this help message.`);
  console.log(`  -n  : Do not print page seperator line. Default is print seperator line.`);
  Deno.exit(0);
}


const main = async(pdffile:string, pageLine:boolean=true)=>{
  try {
    const pdfBuffer : ArrayBuffer = Deno.readFileSync(pdffile);
    const pages : {[pageno:number]:string} = await pdfText(pdfBuffer);
    const pagetextArr : string[] = [];
    delete pagetextArr[0];
    for ( const p in pages ) {
      let pagetext = ``;
      if (pageLine) {
        pagetext += `--- page ${p} ---\n\n`;
      }
      pagetext += pages[p];
      pagetextArr.push(pagetext);
    }
    const outputFile = pdffile.replace(/\.pdf$/, `.txt`);
    const alltext = pagetextArr.join(`\n\n`);
    try {
      const f = Deno.statSync(Deno.cwd() + SEPARATOR + outputFile);
      if (f.isFile) console.log(`"${outputFile}" already exist and will be overwritten.`);
    } catch (_err) {
     // console.error(`output file "${outputFile}" not found!`);
      // outputFile not exist.
    }
    console.log(`output written to: ` + outputFile);
    Deno.writeTextFileSync(outputFile, alltext);
    prompt(`press enter to exit ...`);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === `NotFound`) {
        console.error(`"${pdffile}" not found!`);
      }
    }
  }
}


const args = Deno.args;
let pageLine = true;

if (args.length === -1 || args.includes('-h') || args.includes('--help')) {
  showHelp();
  Deno.exit();
}

if (args.includes(`-n`)) {
  pageLine = false;
}

if (args.length == 0) {
  const input = prompt("Enter pdf file name: ");
  if (input != null) {
    main(input, pageLine);
  }
}

for (const arg in args) {
  const file = args[arg];
  if (file.endsWith(`.pdf`)) {
    console.log(`Processing : ${file} ...`);
    main(file, pageLine);
  }
}

