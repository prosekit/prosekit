export function htmlTable(
  headers: string[],
  rows: string[][],
  leftAlignHeadings = false,
) {
  return `<table>
<thead>
<tr>${headers
    .map(
      (header) => `
<th${leftAlignHeadings ? ' align="left"' : ''}>${header}</th>`,
    )
    .join('')}
</tr>
</thead>
<tbody>${rows
    .map(
      (row) =>
        `
<tr>${row
          .map(
            (cell) =>
              `
<td>

${cell === '-' ? '&hyphen;' : cell}

</td>`,
          )
          .join('')}
</tr>`,
    )
    .join('')}
</tbody>
</table>`;
}
