<!-- src/components/Layout/Tabs.vue -->
<template>
    <q-tabs :model-value="tab" class="full-width" align="justify" dense @update:model-value="updateTab">
      <q-tab v-for="item in tabs" :key="item.name" v-bind="item">
        <q-badge v-if="item.name === 'chat' && chatStore.unreadMessages > 0" color="red" floating>
          {{ chatStore.unreadMessages }}
        </q-badge>
      </q-tab>
    </q-tabs>
  </template>
  
  <script setup>
  import { tabs } from '../../utils/constants';
  import { useChatStore } from '../../stores/chatStore';
  
  const chatStore = useChatStore();
  
  const emit = defineEmits(['update:model-value']);
  const props = defineProps({
    tab: { type: String }
  });
  
  const updateTab = (newTab) => {
    if (newTab === 'chat') {
      chatStore.clearUnreadMessages();
    }
    emit('update:model-value', newTab);
  };
  </script>