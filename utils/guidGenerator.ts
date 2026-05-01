const defaultGuidLength = 10;
export class GuidGenerator {
  /**
   * Generates a numeric GUID of a specified length.
   * @param length - The desired length of the numeric GUID (default is 10).
   * @returns A string representation of the generated numeric GUID.
   * @throws Error if the length is less than 1.
   */
  static generateNumericGuid(length: number = defaultGuidLength): string {
    // Validate that the length is within the allowed range
    if (length < 1) {
      throw new Error('Length must be at least 1.');
    }

    let numericGuid = '';
    const digitRange = 10;
    // Generate a numeric GUID of the specified length
    for (let i = 0; i < length; i++) {
      const digit = Math.floor(Math.random() * digitRange); // Generate a random digit from 0 to 9
      numericGuid += digit.toString(); // Append the digit to the result string
    }

    return numericGuid; // Return the numeric GUID
  }
}
