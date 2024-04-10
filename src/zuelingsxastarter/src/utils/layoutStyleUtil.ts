export function ensureValidValue(input: string): string {
  // Define an array of valid patterns
  const validPatterns = ['corp-12-col', 'corp-10-col', 'corp-8-col'];

  // Create a regular expression pattern by joining the valid patterns with the OR operator (|)
  const pattern = new RegExp(validPatterns.join('|'));

  // Check if the input string matches the pattern
  if (pattern.test(input)) {
    // If the string already contains a valid value, return the input string unchanged
    return input;
  } else {
    // If the string does not contain a valid value, add 'corp-12-col' to the string
    return input + ' corp-12-col';
  }
}
