<template>
  <q-card
    class="inspirational-quote-banner q-my-md"
    :style="{
      background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
      color: 'white'
    }"
  >
    <q-card-section>
      <div class="text-italic text-center">"{{ quote }}"</div>
      <div class="text-caption text-right">- {{ author }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { inspirationalQuotes } from '../../utils/quotes'

const quote = ref('')
const author = ref('')

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length)
  const randomQuote = inspirationalQuotes[randomIndex]
  quote.value = randomQuote.quote
  author.value = randomQuote.author
}

onMounted(getRandomQuote)
</script>

<style scoped>
.inspirational-quote-banner {
  transition: box-shadow 0.3s ease;
}

.inspirational-quote-banner:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>