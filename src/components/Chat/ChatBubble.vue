<!-- src/components/ChatBubble.vue -->
<template>
  <transition name="bubble" appear>
    <q-chat-message
    :name="message.senderName"
      :text="[message.text]"
      :sent="message.sender === 'user'"
      :bg-color="message.sender === 'user' ? userBubbleColor : aiBubbleColor"
      :text-color="message.sender === 'user' ? userTextColor : aiTextColor"
      :avatar="message.sender === 'user' ? userAvatar : aiAvatar"
    >
      <template v-if="message.sender !== 'user'" #name>
        <div class="row no-wrap items-center">
          <div>{{ message.senderName }}</div>
          <q-btn
            v-if="associatedMemory"
            round
            flat
            color="amber"
            icon="lightbulb"
            size="xs"
          >
            <q-tooltip max-width="300px" class="bg-grey-10 text-white">
              <div class="text-body2 q-mb-xs">
                {{ message.senderName }}'s thoughts:
              </div>
              <div class="text-body2 q-mb-xs">{{ associatedMemory.info }}</div>
              <div class="text-caption">
                Impact: 
                <q-rating
                  v-model="associatedMemory.importance"
                  :max="5"
                  size="1.2em"
                  color="grey-7"
                  :color-selected="ratingColors"
                  icon="circle"
                  icon-selected="circle"
                  :icon-half="null"
                  readonly
                />
              </div>
            </q-tooltip>
          </q-btn>
        </div>
      </template>
      <template #stamp>
        <div class="text-caption">
          {{ formattedDate }}
        </div>
      </template>
    </q-chat-message>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useMemoryStore } from '../../stores/memoryStore'
import { useChatStore } from '../../stores/chatStore'
import { DateTime } from 'luxon'
import { getContrastColor } from '../../utils/colorUtils'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const memoryStore = useMemoryStore()
const chatStore = useChatStore()

const { userBubbleColor, aiBubbleColor, userAvatar, aiAvatar } = chatStore

const userTextColor = computed(() => getContrastColor(userBubbleColor))
const aiTextColor = computed(() => getContrastColor(aiBubbleColor))

const associatedMemory = computed(() => {
  if (props.message.memoryId) {
    return memoryStore.memories.find(m => m.id === props.message.memoryId)
  }
  return null
})

const formattedDate = computed(() => {
  const dateTime = DateTime.fromISO(props.message.timestamp)
  return dateTime.toFormat('MMM dd, yyyy \'at\' hh:mm a')
})

const ratingColors = [
  `light-${aiBubbleColor}-3`,
  `light-${aiBubbleColor}-6`,
  aiBubbleColor,
  `${aiBubbleColor}-9`,
  `${aiBubbleColor}-10`
]
</script>

<style scoped>
.q-message {
  margin-bottom: 1rem;
}

.bubble-enter-active,
.bubble-leave-active {
  transition: all 0.3s ease;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.bubble-enter-to,
.bubble-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.q-rating ::v-deep .q-icon {
  transition: all 0.2s;
}

.q-rating ::v-deep .q-icon.q-rating__icon--active {
  transform: scale(1.2);
}
</style>