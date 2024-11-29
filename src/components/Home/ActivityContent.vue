<!-- src/components/Home/ActivityContent.vue -->
<template>
    <div class="activity-content">
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
      >
        <q-step
          v-for="(item, index) in activity.content"
          :key="index"
          :name="index"
          :title="getStepTitle(item, index)"
          :done="step > index"
        >
          <div v-if="item.type === 'text'" class="text-body1 q-mb-md">
            {{ item.value }}
          </div>
          <div v-else-if="item.type === 'instruction'" class="text-body1 text-weight-bold q-mb-md">
            {{ item.value }}
          </div>
          <div v-else-if="item.type === 'input'" class="q-mb-md">
            <div class="text-body1 text-weight-bold q-mb-sm">{{ item.value }}</div>
            <ActivityInput 
              :inputLabel="item.inputLabel"
              :isTimerRunning="!!item.timer && !timerCompleted"
              @input="updateUserInput"
            />
          </div>
          <div v-else-if="item.type === 'ai-discuss'" class="q-mb-md">
            <div class="text-body1 q-mb-sm">{{ item.value }}</div>
            <q-btn 
              label="Send to AI for Analysis" 
              color="primary" 
              @click="sendToAI" 
              :loading="chatStore.isProcessingBackground"
            />
          </div>
          
          <ActivityTimer 
            v-if="item.timer" 
            :timer="item.timer" 
            :key="`${index}-${currentRepetition}`"
            @timer-complete="onTimerComplete" 
          />
  
          <q-stepper-navigation>
            <q-btn v-if="index > 0" flat color="primary" @click="step = index - 1" label="Back" class="q-mr-sm" />
            <q-btn 
              v-if="index < activity.content.length - 1" 
              color="primary" 
              @click="nextStep" 
              :label="getNextButtonLabel(item)"
              :disable="(item.timer && !timerCompleted) || (item.type === 'input' && !userInput)"
            />
            <q-btn v-else color="positive" @click="completeActivity" label="Complete" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import ActivityTimer from './ActivityTimer.vue';
  import ActivityInput from './ActivityInput.vue';
  import { useChatStore } from '../../stores/chatStore';
  
  const chatStore = useChatStore();
  
  const props = defineProps({
    activity: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['complete']);
  
  const step = ref(0);
  const timerCompleted = ref(false);
  const currentRepetition = ref(1);
  const userInput = ref('');
  const userInputs = ref([]);
  
  const currentItem = computed(() => props.activity.content[step.value]);
  
  const getStepTitle = (item, index) => {
    if (item.type === 'instruction' || item.type === 'input') return `Step ${index + 1}`;
    return 'Info';
  };
  
  const getNextButtonLabel = (item) => {
    if (props.activity.repeat && currentRepetition.value < props.activity.repeat) {
      return 'Next Item';
    }
    return 'Next';
  };
  
  const nextStep = () => {
    if (currentItem.value.type === 'input') {
      userInputs.value.push(userInput.value);
      userInput.value = '';
    }
    
    if (props.activity.repeat && currentRepetition.value < props.activity.repeat && step.value === props.activity.content.length - 1) {
      currentRepetition.value++;
      step.value = 1; // Reset to the first input step
    } else {
      step.value++;
    }
    timerCompleted.value = false;
  };
  
  const onTimerComplete = () => {
    timerCompleted.value = true;
  };
  
  const updateUserInput = (value) => {
    userInput.value = value;
  };
  
  const sendToAI = () => {
  const gratitudeList = userInputs.value.join('\n');
  const message = `I've just completed a gratitude practice. Here are the things I'm grateful for:\n${gratitudeList}\n\nCan you provide some insights or reflections based on my gratitude list?`;
  chatStore.sendBackgroundMessage(message);
};
  
  const completeActivity = () => {
    emit('complete');
  };
  </script>