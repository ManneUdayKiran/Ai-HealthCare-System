
/**
 * Utility functions to handle API key management
 */

const API_KEY_STORAGE_KEY = 'openai_api_key';

/**
 * Gets the OpenAI API key from localStorage
 */
export const getApiKey = (): string => {
  // Don't run this in SSR context
  if (typeof window === 'undefined') {
    return '';
  }

  const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  return storedKey || '';
};

/**
 * Sets the OpenAI API key in localStorage
 */
export const setApiKey = (key: string): void => {
  if (!key) return;
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
};

/**
 * Removes the OpenAI API key from localStorage
 */
export const removeApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

/**
 * Checks if an API key exists in localStorage
 */
export const hasApiKey = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(API_KEY_STORAGE_KEY);
};
