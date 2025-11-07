export const typographyContent = `
<h1>ProseKit Typography</h1>

<p>This example shows the typography styles provided by <code>prosekit/basic/typography.css</code>.</p>

<h2>Inline marks</h2>

<p>Text can be formatted in different ways: <strong>bold text</strong>, <em>italic text</em>, <u>underlined text</u>, <s>strikethrough text</s>, <code>inline code</code> and <a href="https://example.com">links</a>.</p>

<h2>Lists</h2>

<p>Here are different types of lists:</p>

<ul>
<li>Unordered list item 1</li>
<li>Unordered list item 2
  <ul>
    <li>Nested item A</li>
    <li>Nested item B</li>
  </ul>
</li>
</ul>

<ol>
<li>First ordered item</li>
<li>Second ordered item</li>
</ol>

<ul>
<li><input type="checkbox" checked />Completed task</li>
<li><input type="checkbox" />Pending task</li>
</ul>

<h2>Blockquotes</h2>

<blockquote>
<p>This is a blockquote demonstrating how quoted content appears in the editor. It can span multiple lines and maintains proper formatting.</p>
</blockquote>

<h2>Code Blocks</h2>

<pre><code>function example() {
  const greeting = 'Hello ProseKit!';
  console.log(greeting);
  return greeting;
}</code></pre>

<h2>Horizontal Rule</h2>

<hr />

<h2>Images</h2>

<img src="https://static.photos/blurred/640x360/42" alt="Sample image" />

<h2>Tables</h2>

<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
  <tr>
    <td>Cell 3</td>
      <td>Cell 4</td>
    </tr>
  </tbody>
</table>
`
