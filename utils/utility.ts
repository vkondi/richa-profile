// Utility Functions

import { PinnacleDataType } from "@/types/types";
import { CHALDEAN_MAPPING, PYTHAGOREAN_MAPPING } from "./constants";

// Function to reduce a number to a single digit or Master Number (11, 22, 33)
export const reduceToSingleDigit = (num: number): number => {
  // while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
  while (num > 9) {
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

// Calculate Destiny Number from Birth Date (DD/MM/YYYY)
export const getDestinyNumber = (dateString: string): number | string => {
  if (!dateString) return dateString;

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

/**
 * Pinnacle Number Calculation Formula:
 *
 * #1: Calculate Destiny Number (DN):
 *  - Sum all digits of the full birth date until a single digit is obtained.
 *  - Example: For 05/08/1990, calculate DN by summing month, day, and year digits until a single digit is reached i.e. 5.
 * #2: Extract First Phase Age Limit:
 *  - Formula: 36 - DN
 *  - Example: If DN is 5, then 36 -5 = 31
 * #3: Calculate Pinnacle Phases:
 *      - Phase 1: 0 to (36 - DN)
 *      - Phase 2: (36 - DN) + 1 to (36 - DN) + 9
 *      - Phase 3: (36 - DN) + 10 to (36 - DN) + 18
 *      - Phase 4: Beyond (36 - DN) + 18
 * #4: Calculate Pinnacle Number for Each Phase:
 *  - Pinnacle Number 1 (Phase 1): Birth Month + Birth Day
 *  - Pinnacle Number 2 (Phase 2): Birth Year + Birth Day
 *  - Pinnacle Number 3 (Phase 3): Pinnacle Number 1 + Pinnacle Number 2
 *  - Pinnacle Number 4 (Phase 4): Birth Month + Birth Year
 */
export const calculatePinnacleNumber = (
  dateString: string
): PinnacleDataType[] => {
  const destinyNumber = getDestinyNumber(dateString) as number;
  const dateObj = new Date(dateString);
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;

  // Phases
  const phase1End = 36 - destinyNumber;
  const phase2Start = phase1End + 1;
  const phase2End = phase1End + 9;
  const phase3Start = phase2End + 1;
  const phase3End = phase2End + 9;

  // Calculate pinnacle numbers for respective phase
  const pinnNumber1 = reduceToSingleDigit(month + day);
  const pinnNumber2 = reduceToSingleDigit(year + day);

  return [
    {
      id: 1,
      pinnacle: "First Pinnacle",
      ageStart: 0,
      ageEnd: phase1End,
      ageSpan: `0 to ${phase1End}`,
      number: pinnNumber1,
    },
    {
      id: 2,
      pinnacle: "Second Pinnacle",
      ageStart: phase2Start,
      ageEnd: phase2End,
      ageSpan: `${phase2Start} to ${phase2End}`,
      number: pinnNumber2,
    },
    {
      id: 3,
      pinnacle: "Third Pinnacle",
      ageStart: phase3Start,
      ageEnd: phase3End,
      ageSpan: `${phase3Start} to ${phase3End}`,
      number: reduceToSingleDigit(pinnNumber1 + pinnNumber2),
    },
    {
      id: 4,
      pinnacle: "Fourth Pinnacle",
      ageStart: phase3End,
      ageSpan: `${phase3End} and beyond`,
      number: reduceToSingleDigit(month + year),
    },
  ];
};
