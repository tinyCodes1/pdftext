<div style="padding: 5px; font-weight:bold"> [EXPERIMENTAL] </div>
<div style="padding: 5px"> - Always use with version number </div>

<br/>


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
<li>Easy to use for deno, browser, and command-line.</li>
<li>PDF text extraction with minimal configuration.</li>
<li>Cross-platform support for Windows, Linux, and macOS.</li>
</ul>

<h2>Deno Usage</h2>
<pre><code>import { pdfText } from 'jsr:@pdf/pdftext@1.3.2';

const pdfBuffer = Deno.readFileSync('./path/to/pdf');
const page: { [pageno: number]: string } = await pdfText(pdfBuffer);

// To get page 1
// console.log(\`Page 1 text: ${page[1]}\`);

</code></pre>

<h2>Browser Usage</h2>
<ol>
<li><strong>Download Module:</strong> Download the <code>pdftext.js</code> module using 
<code>curl</code> or a similar utility:
<pre><code>curl -L -O -C- https://jsr.io/@pdf/pdftext/1.3.2/src/pdftext.js</code></pre>
</li>
<li><strong>Minimal HTML Page :</strong>
<pre><code>&lt;script type="module"&gt;
import { pdfText } from './pdftext.js';

document.getElementById('file-input').addEventListener('change', async (event) =&gt; {
const file = event.target.files[0];
const pdfBuffer = await file.arrayBuffer();
const page = await pdfText(new Uint8Array(pdfBuffer));

// To get page 1
// console.log(\`Page 1: ${page[1]}\`);

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
<pre><code>deno install -frgA jsr:@pdf/pdftext@1.3.2/pdftxt -n pdftxt</code></pre>
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
<p>Typescript code for testing purposes :</p>
<pre><code>
import { test } from "jsr:@pdf/pdftext";
console.log(await test());
</code></pre>

<h2>License</h2>
<p>This project is licensed under the <a href="./LICENSES/LICENSE.txt">MIT License</a>.</p>

<h3>Dependencies</h3>
<p> Some dependencies of this project may be licensed under different terms. (see <a href="./LICENSES">LICENSES</a> for more details)</p>
