// Import notes from each category
import { dotNetNotes } from './dotNetNotes';
import { reactNotes } from './reactNotes';
import { sqlNotes } from './sqlNotes';
import { angularNotes } from './angularNotes';
import { csharpNotes } from './csharpNotes';
import { microservicesNotes } from './microservicesNotes';
import { designPatternsNotes } from './designPatternsNotes';
import { entityFrameworkNotes } from './entityFrameworkNotes';
import { mvcNotes } from './mvcNotes';
import { cheatSheetNotes } from './cheatSheetNotes';
import { generalQuestionsNotes } from './generalQuestionsNotes';
import { categories } from './categories';

// Combine all notes from different categories
export const sampleNotes = [
  ...generalQuestionsNotes,
  ...dotNetNotes,
  ...reactNotes,
  ...sqlNotes,
  ...angularNotes,
  ...csharpNotes,
  ...microservicesNotes,
  ...designPatternsNotes,
  ...entityFrameworkNotes,
  ...mvcNotes,
  ...cheatSheetNotes
];

// Export categories
export { categories };
