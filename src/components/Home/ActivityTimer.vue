<!-- src/components/Home/ActivityTimer.vue -->
<template>
  <div class="activity-timer q-mt-md q-mb-lg">
    <q-circular-progress
      show-value
      class="text-primary q-ma-md"
      :value="progress"
      size="100px"
      :thickness="0.22"
    >
      {{ timeLeft }}
    </q-circular-progress>
    <div class="text-h6 q-my-md">{{ currentIntervalText }}</div>
    <q-btn 
      v-if="!isComplete"
      :label="buttonLabel" 
      :color="isRunning ? 'negative' : 'positive'"
      @click="toggleTimer" 
      class="q-mt-sm"
    />
    <div v-else class="text-positive text-bold q-mt-sm">Timer Complete!</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  timer: {
    type: Object,
    required: true,
    validator: (obj) => {
      return obj.totalDuration && Array.isArray(obj.intervals);
    }
  }
});

const emit = defineEmits(['timer-complete']);

const timeLeft = ref(props.timer.totalDuration);
const isRunning = ref(true);
const isComplete = ref(false);
const currentIntervalIndex = ref(0);
let interval = null;

const progress = computed(() => {
  return ((props.timer.totalDuration - timeLeft.value) / props.timer.totalDuration) * 100;
});

const buttonLabel = computed(() => {
  if (isComplete.value) return '';
  return isRunning.value ? 'Pause' : 'Resume';
});

const currentIntervalText = computed(() => {
  if (isComplete.value) return 'Complete';
  return props.timer.intervals[currentIntervalIndex.value].text;
});

const startTimer = () => {
  isRunning.value = true;
  interval = setInterval(() => {
    if (timeLeft.value > 1) {
      timeLeft.value--;
      updateInterval();
    } else {
      clearInterval(interval);
      timeLeft.value = 0;
      isRunning.value = false;
      isComplete.value = true;
      emit('timer-complete');
    }
  }, 1000);
};

const updateInterval = () => {
  const elapsedTime = props.timer.totalDuration - timeLeft.value;
  let accumulatedTime = 0;
  for (let i = 0; i < props.timer.intervals.length; i++) {
    accumulatedTime += props.timer.intervals[i].duration;
    if (elapsedTime < accumulatedTime) {
      currentIntervalIndex.value = i;
      break;
    }
  }
};

const toggleTimer = () => {
  if (isRunning.value) {
    clearInterval(interval);
  } else {
    startTimer();
  }
  isRunning.value = !isRunning.value;
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>