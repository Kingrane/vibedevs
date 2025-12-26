import { CategoryType, Prompt } from './types.ts';

const generatePrompts = (): Prompt[] => {
  const prompts: Prompt[] = [];
  const categories = Object.values(CategoryType);
  
  let idCounter = 1;

  categories.forEach((cat) => {
    for (let i = 1; i <= 12; i++) {
      prompts.push({
        id: `p-${idCounter++}`,
        category: cat,
        title: `${cat} Generator #${i}`,
        description: `High-efficiency AI prompt to generate robust solutions for ${cat}. Optimized for GPT-4 and Claude 3.5.`,
        code: `You are an expert in ${cat}. \n\nTask: Create a sophisticated solution involving [SPECIFIC_TOPIC]. \n\nRequirements:\n1. Use modern best practices.\n2. Ensure high performance and security.\n3. Include detailed comments explaining the logic.\n\nContext: This is for a production-grade application focusing on scalability.`,
        tags: [cat.split(' ')[0], "AI", "Production"]
      });
    }
  });

  return prompts;
};

export const ALL_PROMPTS = generatePrompts();

export const CATEGORIES_LIST = Object.values(CategoryType);
