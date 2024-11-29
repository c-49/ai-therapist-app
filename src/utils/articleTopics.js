// src/utils/activityTopics.js
export const activityTopics = [
  {
    id: 1,
    title: 'Mindfulness Exercise',
    icon: 'self_improvement',
    content: [
      { type: 'text', value: 'Welcome to the Mindfulness Exercise. This simple practice can help reduce stress and increase focus.' },
      { type: 'instruction', value: 'Find a comfortable seated position and close your eyes.' },
      { 
        type: 'instruction', 
        value: 'We\'ll practice a simple breathing exercise.',
        timer: {
          totalDuration: 12,
          intervals: [
            { duration: 4, text: 'Breathe in slowly' },
            { duration: 4, text: 'Hold your breath' },
            { duration: 4, text: 'Exhale slowly' }
          ]
        },
        repeat: 5
      },
      { type: 'text', value: 'How do you feel? Remember, you can practice this exercise anytime you need to center yourself.' }
    ]
  },
  {
    id: 2,
    title: 'Gratitude Practice',
    icon: 'favorite',
    content: [
      { type: 'text', value: 'Practicing gratitude can significantly improve your mood and overall well-being.' },
      { 
        type: 'input', 
        value: 'Think of something you\'re grateful for today and write it down.',
        inputLabel: 'I\'m grateful for...',
        timer: {
          totalDuration: 10,
          intervals: [
            { duration: 10, text: 'Think of something you\'re grateful for' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'Reflect on why you\'re grateful for this. How does it impact your life?',
        inputLabel: 'I\'m grateful for this because...',
        timer: {
          totalDuration: 10,
          intervals: [
            { duration: 10, text: 'Reflect on your gratitude' },
          ]
        }
      },
      { type: 'text', value: 'Great job! Repeat this process two more times for different things you\'re grateful for.' },
      { type: 'text', value: 'Consider making this a daily practice. Over time, you may notice a positive shift in your perspective.' },
      { type: 'ai-discuss', value: 'Would you like to discuss your gratitude practice with the AI assistant?' }
    ],
    repeat: 3
  },
  {
    id: 3,
    title: '5-4-3-2-1 Grounding Technique',
    icon: 'touch_app',
    content: [
      { type: 'text', value: 'The 5-4-3-2-1 technique is a powerful grounding exercise that uses your five senses to help you focus on the present moment.' },
      { type: 'instruction', value: 'Let\'s begin. Look around you and follow these steps:' },
      { 
        type: 'input', 
        value: 'Name 5 things you can see in the room with you.',
        inputLabel: 'I can see...',
        timer: {
          totalDuration: 30,
          intervals: [
            { duration: 30, text: 'Identify 5 things you can see' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'Name 4 things you can feel (e.g., your feet on the floor, the air on your skin).',
        inputLabel: 'I can feel...',
        timer: {
          totalDuration: 20,
          intervals: [
            { duration: 20, text: 'Identify 4 things you can feel' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'Name 3 things you can hear right now.',
        inputLabel: 'I can hear...',
        timer: {
          totalDuration: 20,
          intervals: [
            { duration: 20, text: 'Identify 3 things you can hear' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'Name 2 things you can smell right now.',
        inputLabel: 'I can smell...',
        timer: {
          totalDuration: 20,
          intervals: [
            { duration: 20, text: 'Identify 2 things you can smell' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'Name 1 thing you can taste.',
        inputLabel: 'I can taste...',
        timer: {
          totalDuration: 10,
          intervals: [
            { duration: 10, text: 'Identify 1 thing you can taste' }
          ]
        }
      },
      { type: 'text', value: 'Well done! This exercise helps bring your attention to the present moment, grounding you in your current surroundings.' },
      { type: 'ai-discuss', value: 'Would you like to discuss how this grounding technique made you feel?' }
    ]
  },
  {
    id: 4,
    title: 'Progressive Muscle Relaxation',
    icon: 'fitness_center',
    content: [
      { type: 'text', value: 'Progressive Muscle Relaxation is a technique that helps you relax by systematically tensing and then relaxing different muscle groups.' },
      { type: 'instruction', value: 'Find a comfortable position, either sitting or lying down. We\'ll go through different muscle groups, tensing each for 5 seconds and then relaxing for 10 seconds.' },
      { 
        type: 'instruction', 
        value: 'Let\'s start with your hands. Clench your fists tightly.',
        timer: {
          totalDuration: 15,
          intervals: [
            { duration: 5, text: 'Tense your fists' },
            { duration: 10, text: 'Relax your hands' }
          ]
        }
      },
      { 
        type: 'instruction', 
        value: 'Now, tense your arm muscles.',
        timer: {
          totalDuration: 15,
          intervals: [
            { duration: 5, text: 'Tense your arms' },
            { duration: 10, text: 'Relax your arms' }
          ]
        }
      },
      { 
        type: 'instruction', 
        value: 'Tense your facial muscles by squeezing your eyes shut and clenching your jaw.',
        timer: {
          totalDuration: 15,
          intervals: [
            { duration: 5, text: 'Tense your face' },
            { duration: 10, text: 'Relax your face' }
          ]
        }
      },
      // ... Continue with other muscle groups (shoulders, chest, stomach, legs, feet) ...
      { type: 'text', value: 'Great job! Take a moment to notice how your body feels now compared to when you started.' },
      { 
        type: 'input', 
        value: 'How do you feel after this relaxation exercise?',
        inputLabel: 'I feel...',
        timer: {
          totalDuration: 30,
          intervals: [
            { duration: 30, text: 'Reflect on how you feel' }
          ]
        }
      },
      { type: 'ai-discuss', value: 'Would you like to discuss your experience with Progressive Muscle Relaxation?' }
    ]
  },
  {
    id: 5,
    title: 'Visualizing Your Safe Place',
    icon: 'landscape',
    content: [
      { type: 'text', value: 'Visualization is a powerful technique for relaxation and stress relief. We\'ll guide you through creating and visiting your safe, peaceful place.' },
      { type: 'instruction', value: 'Find a comfortable position and close your eyes. Take a few deep breaths to center yourself.' },
      { 
        type: 'instruction', 
        value: 'Imagine a place where you feel completely safe, calm, and at peace. It can be real or imaginary.',
        timer: {
          totalDuration: 30,
          intervals: [
            { duration: 30, text: 'Visualize your safe place' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'Describe what you see in your safe place.',
        inputLabel: 'In my safe place, I see...',
        timer: {
          totalDuration: 30,
          intervals: [
            { duration: 30, text: 'Describe what you see' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'What sounds do you hear in your safe place?',
        inputLabel: 'I hear...',
        timer: {
          totalDuration: 20,
          intervals: [
            { duration: 20, text: 'Describe what you hear' }
          ]
        }
      },
      { 
        type: 'input', 
        value: 'What do you feel (temperature, textures) in your safe place?',
        inputLabel: 'I feel...',
        timer: {
          totalDuration: 20,
          intervals: [
            { duration: 20, text: 'Describe what you feel' }
          ]
        }
      },
      { type: 'instruction', value: 'Spend a few moments fully immersing yourself in this safe place. Remember, you can return here anytime you need to feel calm and grounded.' },
      { 
        type: 'input', 
        value: 'How do you feel after this visualization exercise?',
        inputLabel: 'After visualizing my safe place, I feel...',
        timer: {
          totalDuration: 30,
          intervals: [
            { duration: 30, text: 'Reflect on your feelings' }
          ]
        }
      },
      { type: 'ai-discuss', value: 'Would you like to discuss your safe place visualization with the AI assistant?' }
    ]
  }
];