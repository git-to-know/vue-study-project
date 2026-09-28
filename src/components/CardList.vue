<script setup>
import Card from '@/components/Card.vue'
const baseUrl = import.meta.env.BASE_URL
defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="`${baseUrl}${item.imageUrl}`"
      :title="item.title"
      :price="item.price"
      :onClickAdd="() => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>

<style scoped></style>
