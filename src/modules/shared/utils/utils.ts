export function getFirst(v: any[]) {
  return v[0];
}

export function parseStringArray(data: string | unknown[]): any[] {
  return Array.isArray(data) ? data : typeof data == 'string' ? JSON.parse(data) : [];
}
