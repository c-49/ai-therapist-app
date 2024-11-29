<!-- src/components/Home/ActivityCard.vue -->
<template>
  <q-card
    class="activity-card cursor-pointer"
    @click="$emit('click', activity)"
  >
    <q-card-section>
      <div class="text-h6">{{ activity.title }}</div>
      <q-icon :name="activity.icon" size="3em" class="q-mt-sm" />
    </q-card-section>
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
.activity-card {
  width: 200px;
  height: 150px;
  transition: all 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>