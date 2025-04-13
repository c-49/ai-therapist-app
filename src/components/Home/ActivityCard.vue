<!-- src/components/Home/ActivityCard.vue -->
<template>
  <q-card class="modern-activity-card cursor-pointer">
    <div class="row no-wrap full-height">
      <!-- Content Section -->
      <div class="col content-section q-pa-md">
        <div class="text-h6 text-weight-bold q-mb-sm">{{ activity.title }}</div>
        <div class="text-body2 text-grey-8 description q-mb-md">{{ activity.description }}</div>
        <q-btn 
          unelevated 
          rounded 
          color="primary" 
          label="Start" 
          class="q-mt-auto"
          @click="$emit('click', activity)" 
        />
      </div>
      
      <!-- Icon/Image Section -->
      <div class="icon-section flex items-center justify-center q-pa-md">
        <q-icon :name="activity.icon" size="4rem" class="activity-icon" />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped>
.modern-activity-card {
  /* height: 160px; */
  height: 100%;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.modern-activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.content-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.icon-section {
  width: 120px;
  background-color: rgba(0, 0, 0, 0.03);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.activity-icon {
  color: var(--q-primary);
  opacity: 0.8;
}
</style>