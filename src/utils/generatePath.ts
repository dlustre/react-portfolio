export function generatePath(src: string) {
  return process.env.NODE_ENV === 'development' ? src : `/dennislustre.com${src}`;
}
