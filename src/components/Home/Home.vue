<!-- src/components/Home/Home.vue -->
<template>
  <div class="home q-pa-md">
    <InspirationQuoteBanner />
    
    <h5 class="q-mt-lg">Explore Wellness Activities</h5>
    <div class="row q-col-gutter-md q-mt-md">
      <div v-for="activity in activityTopics" :key="activity.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <ActivityCard :activity="activity" @click="openActivity(activity)" />
      </div>
    </div>

    <q-dialog v-model="showActivity" persistent>
      <q-card style="width: 400px; max-width: 90vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ selectedActivity?.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="closeActivity" />
        </q-card-section>

        <q-card-section v-if="selectedActivity">
          <ActivityContent 
            :activity="selectedActivity" 
            @complete="completeActivity"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InspirationQuoteBanner from './InspirationQuoteBanner.vue';
import ActivityCard from './ActivityCard.vue';
import ActivityContent from './ActivityContent.vue';
import { activityTopics } from '../../utils/articleTopics';

const showActivity = ref(false);
const selectedActivity = ref(null);

const openActivity = (activity) => {
  selectedActivity.value = activity;
  showActivity.value = true;
};

const closeActivity = () => {
  showActivity.value = false;
  selectedActivity.value = null;
};

const completeActivity = () => {
  // Handle activity completion (e.g., show a completion message, update user progress, etc.)
  closeActivity();
};
</script>