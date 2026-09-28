<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
})
</script>

<template>
  <div>
    <div
      class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition h-full flex flex-col"
    >
      <img
        class="cursor-pointer absolute top-8 left-8"
        :src="isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
        @click="onClickFavorite"
      />

      <img class="max-h-[70%]" :src="imageUrl" alt="Sneaker" />
      <p class="mt-5">{{ title }}</p>

      <div class="flex justify-between mt-auto">
        <div class="flex flex-col">
          <span class="text-slate-400">Цена:</span>
          <b>{{ price }} руб.</b>
        </div>

        <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
