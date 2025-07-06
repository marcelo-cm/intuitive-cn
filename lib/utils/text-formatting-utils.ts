export function prettifyText(text: string) {
  return text
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function capitalizeText(text: string) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
