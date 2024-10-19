<h1>@pdf/pdftext - Simple PDF Text Extraction Module</h1>

<a href="https://jsr.io/@pdf/pdftext">
<img src="https://jsr.io/badges/@pdf/pdftext" alt="JSR Badge" />
</a>

<p><strong>@pdf/pdftext</strong> is a lightweight module for 
extracting text from PDFs, built on 
<a href="https://mozilla.github.io/pdf.js/">PDF.js</a>. It can be used in
various environments, including:</p>

<ul>
<li><strong>Deno</strong></li>
<li><strong>Browser</strong></li>
<li><strong>Command-line</strong>
<ul>
<li>With Deno installed</li>
<li>Without Deno installed</li>
</ul>
</li>
</ul>

<h2>Features</h2>
<ul>
<li>Easy to use for command-line, browser, and Deno.</li>
<li>PDF text extraction with minimal configuration.</li>
<li>Cross-platform support for Windows, Linux, and macOS.</li>
</ul>

<h2>Deno Usage</h2>
<ul>
<li><strong>Import Module:</strong> Use the <code>@pdf/pdftext</code> module in Deno by importing it directly:
<pre><code>import { pdfText } from 'jsr:@pdf/pdftext';

const pdfBuffer: ArrayBuffer = Deno.readFileSync('./path/to/pdf');
const page: { [pageno: number]: string } = await pdfText(pdfBuffer);

// To get page 1
console.log(\`Page 1 text: ${page[1]}\`);

// To get all page
// console.log(\`All page text: \n${page[0]}\`);
</code></pre>
</li>
</ul>

<h2>Browser Usage</h2>
<ol>
<li><strong>Download Module:</strong> Download the <code>pdftext.js</code> module using 
<code>curl</code> or a similar utility:
<pre><code>curl -L -O -C- https://jsr.io/@pdf/pdftext/1.2.1/src/pdftext.js</code></pre>
</li>
<li><strong>Minimal HTML Page Example:</strong>
<pre><code>&lt;script type="module"&gt;
import { pdfText } from './pdftext.js';

document.getElementById('file-input').addEventListener('change', async (event) =&gt; {
const file = event.target.files[0];
const pdfBuffer = await file.arrayBuffer();
const page = await pdfText(pdfBuffer);

// To get page 1
console.log(\`Page 1: ${page[1]}\`);

// To get all page
// console.log(\`All page: \n${page[0]}\`);
});
&lt;/script&gt;

&lt;input type="file" id="file-input" /&gt;
</code></pre>
</li>
</ol>


<h2>Command-Line Usage</h2>

<h3>i. With Deno Installed</h3>
<ol>
<li><strong>Install or Update:</strong>
<pre><code>deno install -frgA jsr:@pdf/pdftext/pdftxt</code></pre>
</li>
<li><strong>Usage:</strong> Extract text from a PDF:
<pre><code>pdftxt sample.pdf</code></pre>
</li>
<li><strong>Uninstall:</strong> To remove the command-line tool:
<pre><code>deno uninstall pdftxt</code></pre>
</li>
</ol>

<h3>ii. Without Deno Installed</h3>
<ol>
<li><strong>Download Executable:</strong> Download the appropriate version from the 
<a href="https://github.com/tinyCodes1/pdftext/releases">releases page</a>.
</li>
<li><strong>Usage:</strong>
<ul>
<li><strong>Windows:</strong>
<pre><code>.\pdftxt.exe sample.pdf</code></pre>
</li>
<li><strong>Linux:</strong>
<pre><code>./pdftxt sample.pdf</code></pre>
</li>
</ul>
</li>
</ol>

<h2>Testing</h2>
<p>For testing purposes, you can use the following TypeScript code:</p>
<pre><code>
import { test } from 'jsr:@pdf/pdftext';
console.log(await test());
</code></pre>

<h2>License</h2>
<p>This project is licensed under the <a href="./LICENSE/LICENSE.txt">MIT License</a>.</p>

<h3>Dependencies</h3>
<p>
Some dependencies of this project may be licensed under different terms. In particular, 
<a href="https://mozilla.github.io/pdf.js/">PDF.js</a> is licensed under the Apache License 2.0.
</p>
