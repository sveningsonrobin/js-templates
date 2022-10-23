const FONT_RESET = '\x1b[0m';
const FONT_DIM = '\x1b[2m';

export const fontDim = (m: string) => `${FONT_DIM}${m}${FONT_RESET}`;
