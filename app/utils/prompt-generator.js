//Function to get the Prompt
export function getGenerateDescriptionPrompt(data) {
  return `Your task is to generate concise product descriptions based on the 'name' field in the JSON data provided below. Please follow these guidelines:

  1. Use the 'name' field as inspiration for the description.
  2. Add a new 'description' field to each product object.
  3. Return the entire modified JSON array with the new descriptions included.
  4. Enclose all property names (e.g., "id", "name", "description") in double quotes.
  5. Ensure that string values are enclosed in double quotes.

  **JSON Data:**
  ${data}

  **Important:** 

  * Ensure the returned response is a strictly valid JSON array.
  * Do not include any additional text or explanations outside of the JSON structure.`
}

export function getGenerateLanguagePrompt(language, data) {
  return `Task: Translate product descriptions in the given JSON data into ${language}.

  Input JSON:
  ${data}

  Instructions:
  1. Translate all fields of each product object into natural, engaging ${language} suitable.
  2. Maintain all other data (id, name, price, image, link) exactly as they are in the input.
  3. Do NOT include any additional text, explanations, or formatting.

  Output JSON:
  [ ... ]  // Only the modified JSON array is expected here
  `
}
