# OVERVIEW 
---

@pdf/pdftext is a simple module to extract text from pdf. It uses mozilla's [PDF.js](https://mozilla.github.io/pdf.js/).

## USAGE (Deno) :
```typescript
import {pdfText} from 'jsr:@pdf/pdftext';
const pdfBuffer : ArrayBuffer = Deno.readFileSync("./path/to/pdf");
const page : {[pageno:number]:string} = await pdfText(pdfBuffer);
// To get page 1
// console.log(`page 1 text : ` + page[1]);
```

## USAGE (Browser) :
1. Download directly or using any utility like wget :
```shell
wget https://jsr.io/@pdf/pdftext/1.0.18/src/pdftext.js
```
2. Minimum webpage
```html
<script type="module">
import {pdfText} from './pdftext.js';
document.getElementById('file-input').addEventListener('change', async(event)=>{
const file = event.target.files[0];
const pdfBuffer = await file.arrayBuffer();
const page = await pdfText(pdfBuffer);
console.log(`Page 1 : ` + page[1]);
});
</script>
<input type="file" id="file-input" />
```


## TEST :
```typescript
import {test} from 'jsr:@pdf/pdftext' ;
console.log(await test());
```

