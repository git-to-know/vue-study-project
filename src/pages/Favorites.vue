<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '@/components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://6e1cedbfa5a689ef.mokky.dev/favorites?_relations=items',
    )
    favorites.value = data.map(obj => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <CardList :items="items"/>
</template>

<style scoped></style>
