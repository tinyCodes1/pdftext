#!/usr/bin/env -S deno run --ext=ts --allow-write --allow-read

/**
 *  pdftxt : simple module to convert pdf to text file. It is intended to run from terminal/cmd directly.
 */

import {pdfText} from "./pdftext.ts";
import { SEPARATOR } from "./src/sep.ts";

const version = "1.1.9"
const showHelp=()=> {
  const parts = Deno.mainModule.split(`/`);
  const scriptName = parts[parts.length -1];
  console.log(`pdftxt is simple commandline module to convert pdf file to text file.\n[${version}]\n`);
  console.log(`Usage: ${scriptName} <pdffiles>\n`);
  console.log(`Options:`);
  console.log(`  -h  : Show this help message.`);
  console.log(`  -n  : Do not print page seperator line. Default is print seperator line.`);
  console.log(`  -hs : Horizontal sorting. Default is none`);
  console.log(`  -vs : Vertical sorting. better for tabular data.tabular data should be in left alignment. Default is none.`);
  Deno.exit(0);
}

interface Config {
  pdffile : string;
  coord? : string;
  pageLine? : boolean;
}

const main = async(config:Config)=>{
  const {pdffile, coord="none", pageLine=true} = config;
  try {
    const pdfBuffer : ArrayBuffer = Deno.readFileSync(pdffile);
    const pages : {[pageno:number]:string} = await pdfText(pdfBuffer, coord);
    const pagetextArr : string[] = [];
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
      // outputFile not exist.
    }
    console.log(`output written to: ` + outputFile);
    Deno.writeTextFileSync(outputFile, alltext);
    prompt(`press enter to exit ...`);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === `NotFound`) {
        console.log(`"${pdffile}" not found!`);
      }
    }
  }
}


const args = Deno.args;
let coord = "none";
let pageLine = true;

if (args.length === -1 || args.includes('-h') || args.includes('--help')) {
  showHelp();
  Deno.exit();
}

if (args.includes(`-hs`)) {
  coord = "y";
}
if (args.includes(`-vs`)) {
  coord = "x";
}

if (args.includes(`-n`)) {
  pageLine = false;
}

if (args.length == 0) {
  const input = prompt("Enter pdf file name: ");
  if (input != null) {
    main({pdffile:input, coord:coord, pageLine});
  }
}

for (const arg in args) {
  const file = args[arg];
  if (file.endsWith(`.pdf`)) {
    console.log(`Processing : ${file} ...`);
    main({pdffile:file, coord:coord, pageLine});
  }
}

