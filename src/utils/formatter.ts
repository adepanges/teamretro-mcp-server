import { markdownTable } from 'markdown-table';

const formatValue = (value: any, key: string): string => {
  if (Array.isArray(value)) {
    // If array contains objects (like members), show count
    if (value.length > 0 && typeof value[0] === 'object') {
      const singularKey = key.endsWith('s') ? key.slice(0, -1) : key;
      return `${value.length} ${value.length === 1 ? singularKey : key}`;
    }
    // If array of strings (like tags), show joined values
    return value.join(', ') || '-';
  }
  return String(value ?? '-');
};

interface TableMetadata {
  total: number;
  offset: number;
  count: number;
}

export const formatTable = <T extends Record<string, any>>(
  items: T[],
  meta?: TableMetadata
): string => {
  if (items.length === 0) return 'No data';

  // Create pagination info if metadata provided
  const paginationInfo = meta ? [
    `Total: ${meta.total}`,
    `Showing: ${meta.offset + 1}-${meta.offset + meta.count}`,
    ''  // Empty line before table
  ] : [];

  // Get all keys from first item
  const keys = Object.keys(items[0]);
  
  // Create table data for markdown-table
  const tableData = [
    keys.map(key => key.toUpperCase()), // Header row
    ...items.map(item => 
      keys.map(key => formatValue(item[key], key))) // Data rows
  ];

  const table = markdownTable(tableData);
  
  return [...paginationInfo, table].join('\n');
};

export const formatItem = <T extends Record<string, any>>(item: T): string => {
  const entries = Object.entries(item);
  const maxKeyLength = Math.max(...entries.map(([key]) => key.length));
  
  return entries
    .map(([key, value]) => {
      const formattedValue = Array.isArray(value) && typeof value[0] === 'object'
        ? '\n  ' + value.map(v => Object.values(v).join(' ')).join('\n  ')
        : formatValue(value, key);
      return `${key.padEnd(maxKeyLength)}: ${formattedValue}`;
    })
    .join('\n');
};
