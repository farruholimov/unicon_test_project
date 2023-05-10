export function getFirst(v: any[]) {
  return v[0];
}

export function parseStringArray(data: string | unknown[]): any[] {
  return Array.isArray(data) ? data : typeof data == 'string' ? JSON.parse(data) : [];
}

export function generateUpdateSetClause(body): string {
  return Object.keys(body)
    .map((column) => `${column} = ${body[column] ? `'${body[column]}'` : null}`)
    .join(', ');
}
