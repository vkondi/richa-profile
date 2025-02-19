// Utility Functions

import { CHALDEAN_MAPPING, PYTHAGOREAN_MAPPING } from "./constants";

// Function to reduce a number to a single digit or Master Number (11, 22, 33)
export const reduceToSingleDigit = (num: number): number => {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return num;
};

// Convert Name to Number using given Mapping
export const convertNameToNumber = (
  name: string,
  mapping: Record<string, number> = PYTHAGOREAN_MAPPING
): number => {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
    .split("")
    .reduce((sum, char) => sum + (mapping[char] || 0), 0);
};

// Calculate Expression Number (Destiny Number)
export const getExpressionNumber = (
  name: string,
  system: "pythagorean" | "chaldean" = "pythagorean"
): number => {
  const mapping =
    system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING;
  return reduceToSingleDigit(convertNameToNumber(name, mapping));
};

// Calculate Personality Number (Sum of Consonants)
export const getPersonalityNumber = (
  name: string,
  system: "pythagorean" | "chaldean" = "pythagorean"
): number => {
  const mapping =
    system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING;
  return reduceToSingleDigit(
    name
      .toUpperCase()
      .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
      .split("")
      .filter((char) => !"AEIOU".includes(char)) // Keep only consonants
      .reduce((sum, char) => sum + (mapping[char] || 0), 0)
  );
};

// Calculate Soul Urge Number (Heart’s Desire) - Sum of Vowels
export const getSoulUrgeNumber = (
  name: string,
  system: "pythagorean" | "chaldean" = "pythagorean"
): number => {
  const mapping =
    system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING;
  return reduceToSingleDigit(
    name
      .toUpperCase()
      .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
      .split("")
      .filter((char) => "AEIOU".includes(char)) // Keep only vowels
      .reduce((sum, char) => sum + (mapping[char] || 0), 0)
  );
};

// Calculate Birth Day Number
export const getBirthDayNumber = (day: number): number => {
  return reduceToSingleDigit(day);
};

// Calculate Life Path Number from Birth Date (DD/MM/YYYY)
export const getLifePathNumber = (dateString: string): number => {
  const digits = dateString
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  return reduceToSingleDigit(digits.reduce((sum, digit) => sum + digit, 0));
};

// Compare Two Names for Compatibility (Difference in Expression Numbers)
export const getNameCompatibility = (
  name1: string,
  name2: string,
  system: "pythagorean" | "chaldean" = "pythagorean"
): number => {
  const num1 = getExpressionNumber(name1, system);
  const num2 = getExpressionNumber(name2, system);
  return Math.abs(num1 - num2);
};

// Suggest Lucky Name Alternatives (Increment or Decrement a Letter)
export const suggestLuckyNames = (
  name: string,
  targetNumber: number,
  system: "pythagorean" | "chaldean" = "pythagorean"
): string[] => {
  const mapping =
    system === "chaldean" ? CHALDEAN_MAPPING : PYTHAGOREAN_MAPPING;
  let variations: string[] = [];

  for (let i = 0; i < name.length; i++) {
    const charArray = name.toUpperCase().split("");
    const originalChar = charArray[i];

    for (let char of Object.keys(mapping)) {
      if (char !== originalChar) {
        charArray[i] = char;
        const newName = charArray.join("");
        if (getExpressionNumber(newName, system) === targetNumber) {
          variations.push(newName);
        }
      }
    }
  }
  return [...new Set(variations)].slice(0, 5); // Return max 5 unique suggestions
};
