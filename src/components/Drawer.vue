<script setup>
import axios from 'axios'
import { inject, ref, computed } from 'vue'
import DrawerHead from '@/components/DrawerHead.vue'
import CartItemList from '@/components/CartItemList.vue'
import InfoBlock from '@/components/InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

const { cart } = inject('cart')
const isCreating = ref(false)

const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true

    const { data } = await axios.post('https://6e1cedbfa5a689ef.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value,
    })
    cart.value = []
    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>

  <div class="bg-white w-96 h-full fixed top-0 right-0 z-20 p-8 flex flex-col">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        imageUrl="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        imageUrl="/order-success-icon.png"
      />
    </div>

    <div v-else class="flex flex-col h-full">
      <CartItemList />

      <div class="grow flex flex-col justify-end">
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <span class="font-bold">{{ totalPrice }} руб.</span>
          </div>

          <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ vatPrice }} руб.</span>
          </div>
        </div>

        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600 cursor-pointer disabled:bg-slate-300"
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
