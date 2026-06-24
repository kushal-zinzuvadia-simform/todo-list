import type { AddResult } from '@/types/AddResult';

type ValidationResult = {
  isValid: boolean;
  message?: AddResult;
  text?: string;
};

export const validateTodos = (text: string): ValidationResult => {
  const trimmedText = text.trim();

  if (!trimmedText) return { isValid: false, message: 'empty' };

  const alphanumericCount = (trimmedText.match(/[a-zA-Z0-9]/g) ?? []).length;

  const specialCharacterCount = (trimmedText.match(/[^a-zA-Z0-9\s]/g) ?? [])
    .length;

  if (specialCharacterCount > 5) {
    return { isValid: false, message: 'too-many-special-characters' };
  }

  if (alphanumericCount < 3) {
    return { isValid: false, message: 'too-short' };
  }

  return { isValid: true, text: trimmedText };
};
