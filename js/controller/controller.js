import { createMiniature } from '../miniatures.js';
import { createMockDescription } from '../data.js';

const miniaturesList = [];

const start = function() {
  for (let i = 1; i <= 25; i++) {
    const miniature = createMiniature(createMockDescription(i));
    miniaturesList.push(miniature);
  }
};

export { start };
