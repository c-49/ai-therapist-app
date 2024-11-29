<script setup>
import ChatInterface from './Chat/ChatInterface.vue';
import Home from './Home/Home.vue';
import { tabs } from '../utils/constants';
defineProps({
    tab: { type: String }
})

const mappedComponents = {
    home: Home,
    chat: ChatInterface,
    fun: '',
    journal: ''
}
</script>

<template>
    <q-tab-panels :model-value="tab" animated transition-prev="jump-down" transition-next="jump-up">
        <q-tab-panel v-for="t in tabs" :key="t.name" v-bind="t"  class="overflow-hidden">
        <component :is="mappedComponents[t.name]" />
    </q-tab-panel>
</q-tab-panels>
</template>