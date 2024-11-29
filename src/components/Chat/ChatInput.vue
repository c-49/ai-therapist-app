<!-- src/components/ChatInput.vue -->
<template>
  <div class="chat-input q-pa-sm q-gutter-sm">
    <q-input
      v-model="inputText"
      @keyup.enter="sendMessage"
      placeholder="Type your message..."
      borderless
      autogrow
      :disable="isProcessing"
      class="input-field"
      ref="chatInput"
      dense
    >
      <template v-slot:after>
        <q-btn
          round
          flat
          color="primary"
          icon="send"
          :disable="isProcessing"
          @click="sendMessage"
        >
          <q-tooltip>Send message</q-tooltip>
        </q-btn>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue'
import { useChatStore } from '../../stores/chatStore'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { isThinking, isTyping } = storeToRefs(chatStore)

const chatInput = ref(null)
const inputText = ref('')

const isProcessing = computed(() => isThinking.value || isTyping.value)

const sendMessage = () => {
  if (inputText.value.trim() === '' || isProcessing.value) return
  chatStore.sendMessage(inputText.value)
  inputText.value = ''
}

watch(isProcessing, (newValue) => {
  if (!newValue) {
    nextTick(() => { 
      chatInput.value?.focus()
    })
  }
})
</script>

<style scoped>
.chat-input {
  position: sticky;
  bottom: 0;
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

.input-field {
  border-radius: 24px;
}
</style>