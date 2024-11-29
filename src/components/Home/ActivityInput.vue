<!-- src/components/Home/ActivityInput.vue -->
<template>
    <div class="activity-input q-mt-md">
      <q-input
        v-model="inputValue"
        :label="inputLabel"
        filled
        type="textarea"
        :disable="isTimerRunning"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    inputLabel: {
      type: String,
      required: true
    },
    isTimerRunning: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['input']);
  
  const inputValue = ref('');
  
  watch(inputValue, (newValue) => {
    emit('input', newValue);
  });
  </script>