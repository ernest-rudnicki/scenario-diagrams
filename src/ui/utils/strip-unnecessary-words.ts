export const stripUnnecessaryWords = (text: string): string => {
    return text
        .replace(/\b(the|a|an|in|to|from)\b/gi, '')
        .replace(/\./g, '')
        .replace(/\s+/g, ' ')
        .trim()
}
