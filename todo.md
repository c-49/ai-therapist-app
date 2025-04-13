# AI Therapist App - To-Do List

## UI Improvements
- [ ] Update activity cards to prevent text/icon overlap and improve visual presentation
  - Current implementation in `ActivityCard.vue` has fixed width/height that may cause overlap issues
- [x] Activity content already uses stepper view (in `ActivityContent.vue`) but could be improved visually
- [ ] Create a proper settings page
  - Settings functionality exists in the store but no dedicated UI component for it

## Customization Features
- [x] Allow users to change theme colors - Already implemented in `chatStore.js` via `setCustomColor` and `updateCustomization`
- [x] Allow users to change text bubble colors - Already implemented in `chatStore.js`
- [ ] Allow users to change bot personality - Functionality not found
- [x] Allow users to change bot image/avatar - Already implemented in `chatStore.js` via `updateCustomization`
- [x] Allow users to change bot name - Already implemented via `setBotName` in `chatStore.js`
- [x] Allow users to change their own name - Already implemented via `setUserName` in `chatStore.js`

## Content Expansion
- [ ] Add journal functionality
  - Tab exists in navigation but the implementation is missing
- [x] Several wellness activities already implemented:
  - Mindfulness Exercise
  - Gratitude Practice
  - 5-4-3-2-1 Grounding Technique
  - Progressive Muscle Relaxation
  - Visualizing Your Safe Place
- [ ] Additional activities to consider:
  - [ ] Burning letter animation
  - [ ] Mood tracker
  - [ ] More advanced breathing exercises with visual feedback
  - [ ] Daily affirmations generator

## Technical Tasks
- [x] Component structure is already well organized
- [x] Basic error handling implemented in `chatStore.js` with error logging
- [x] Data persistence implemented using Dexie.js in `db.js`
- [ ] Optimize performance for mobile devices

## Future Enhancements
- [ ] Add export functionality for journal entries
- [ ] Create progress tracking for completed activities
- [ ] Implement notifications/reminders
- [ ] Add audio elements for guided exercises