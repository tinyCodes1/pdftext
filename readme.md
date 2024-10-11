<a href="https://jsr.io/@pdf/pdftext">
  <img src="https://jsr.io/badges/@pdf/pdftext" alt="JSR" />
</a>


@pdf/pdftext is a simple module to extract text from pdf. It uses [PDF.js](https://mozilla.github.io/pdf.js/). It can be executed in

  - Command-line  
      i. With deno installed,  
      ii. Without deno installed,  
  - Browser,  
  - Deno.  

# Command-line :
## <u>i. With deno installed</u>
1. Install / Update
```shell
deno install -frgA jsr:@pdf/pdftext/pdftxt
```
2. Now you can use it from command line
```shell
pdftxt sample.pdf
```
3. Uninstall
```shell
deno uninstall pdftxt
```

## <u>ii. Without deno installed</u>
1. Download appropriate version from [here](https://github.com/tinyCodes1/pdftext/tree/main/Dist).

2. Use

***Windows***  
Click on pdftxt.exe directly *or*  
Open command line in downloaded location.
```cmd
.\pdftxt sample.pdf
```

***Linux***
```sh
./pdftxt sample.pdf
```


# Browser :
1. Download directly or use a utility like 'wget'
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
// To get page 1
// console.log(`Page 1 : ` + page[1]);
});
</script>
<input type="file" id="file-input" />
```

# Deno :
```typescript
import {pdfText} from 'jsr:@pdf/pdftext';
const pdfBuffer : ArrayBuffer = Deno.readFileSync("./path/to/pdf");
const page : {[pageno:number]:string} = await pdfText(pdfBuffer);
// To get page 1
// console.log(`page 1 text : ` + page[1]);
```


# TEST :
Typescript code for testing purpose.
```typescript
import {test} from 'jsr:@pdf/pdftext' ;
console.log(await test());
```


# License
This project is licensed under the MIT License.  

## Dependencies
Some dependencies of this project may be licensed under different terms. In particular:  
[PDF.js](https://mozilla.github.io/pdf.js/) is licensed under the Apache License 2.0.
