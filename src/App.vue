<!-- src/App.vue -->
<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated :class="`bg-${mainColor} text-white`">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          AI Therapist
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <ContentSelect :tab="tab" />
    </q-page-container>

    <q-footer :class="`bg-${mainColor} text-white`">
      <q-toolbar>
        <Tabs v-model="tab" @update:model-value="updateTab" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChatStore } from './stores/chatStore'
import ContentSelect from './components/ContentSelect.vue'
import Tabs from './components/Layout/Tabs.vue'
import { ref, watch  } from 'vue'

// In your component or store
const chatStore = useChatStore()
const { mainColor } = storeToRefs(chatStore)
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => { leftDrawerOpen.value = !leftDrawerOpen.value }
const tab = ref('home')

const updateTab = (newTab) => {
  tab.value = newTab
  chatStore.setCurrentTab(newTab)
}

watch(tab, (newTab) => {
  if (newTab === 'chat') {
    chatStore.clearUnreadMessages()
  }
})
</script>