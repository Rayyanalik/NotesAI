
import { toast } from 'sonner';

// Storage key constant to ensure consistency
const API_KEY_STORAGE_KEY = 'openai_api_key';
// Real OpenAI API implementation
export const enhanceText = async (text: string, apiKey?: string): Promise<string> => {
  if (!apiKey) {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (!storedApiKey) {
      toast.error('OpenAI API key is required');
      throw new Error('OpenAI API key is required');
    }
    apiKey = storedApiKey;
  }

  toast.info('Processing with OpenAI...');
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that enhances and improves text content. Make the text more professional, clear, and engaging without changing the overall meaning. Add relevant details, improve structure, and fix any grammatical issues.'
          },
          {
            role: 'user',
            content: `Please enhance the following text:\n\n${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to enhance text with OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI enhancement error:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to enhance text with OpenAI');
    }
    throw error;
  }
};
/**
 * Saves the OpenAI API key to localStorage
 * @param apiKey The API key to save
 * @returns void
 */
export const saveApiKey = (apiKey: string): void => {
  if (!apiKey || apiKey.trim() === '') {
    toast.error('API key cannot be empty');
    return;
  }
  
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
    toast.success('API key saved successfully');
    console.log('API key saved to localStorage');
  } catch (error) {
    console.error('Error saving API key:', error);
    toast.error('Failed to save API key');
  }
};

/**
 * Retrieves the OpenAI API key from localStorage
 * @returns The API key if it exists, null otherwise
 */
export const getApiKey = (): string | null => {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return null;
  }
};

/**
 * Checks if an API key exists in localStorage
 * @returns boolean indicating if API key exists
 */
export const hasApiKey = (): boolean => {
  try {
    const key = localStorage.getItem(API_KEY_STORAGE_KEY);
    return !!key && key.trim() !== '';
  } catch (error) {
    console.error('Error checking API key:', error);
    return false;
  }
};

/**
 * Removes the API key from localStorage
 */
export const clearApiKey = (): void => {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    toast.success('API key removed');
    console.log('API key removed from localStorage');
  } catch (error) {
    console.error('Error removing API key:', error);
    toast.error('Failed to remove API key');
  }
};


