<template>
  <main class='p-10 w-screen h-screen'>
    <div class='w-full h-full overflow-auto'>
      <table class='mx-auto break-words'>
        <thead>
        <tr>
          <TableHeader class='text-right min-w-[4rem] w-[4rem]'>#</TableHeader>
          <TableHeader class='text-left min-w-[20rem] w-[28rem]'>Name</TableHeader>
          <TableHeader class='text-right min-w-[5rem] w-[6rem]'>Qty</TableHeader>
          <TableHeader class='text-right min-w-[12rem] w-[12rem]'>Price</TableHeader>
          <TableHeader class='min-w-[16rem] w-[16rem]'>Split</TableHeader>
          <TableHeader
            v-for='payer in store.state.payers'
            :key='payer.id'
            class='text-center min-w-[16rem] w-[20rem]'
          >
            {{ payer.name }}
          </TableHeader>
        </tr>
        </thead>

        <tbody>
        <TableRow
          v-for='item in store.state.items'
          :key='item.id'
          :id='item.id'
          :name='item.name'
          :quantity='item.quantity'
          :price='item.price'
          :payment-group='item.paymentGroup'
        />
        <tr>
          <TableFooter class='text-right' colspan='3'>
            Totals
          </TableFooter>
          <TableFooter class='text-right' no-background>
            <ItemPrice :price='store.getters.totalPrice' />
          </TableFooter>
          <TableFooter no-background></TableFooter>
          <TableFooter
            v-for='payer in store.state.payers'
            :key='payer.id'
            class='text-center'
            no-background
          >
            <ItemPrice :price='store.getters.payerTotalPayments[payer.id]' />
          </TableFooter>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang='ts'>
import { useStore } from 'vuex'
import { TEST_ITEMS, TEST_PAYERS } from '@/testData'
import TableHeader from '@/components/TableHeader.vue'
import TableRow from '@/components/TableRow.vue'
import ItemPrice from '@/components/ItemPrice.vue'
import TableFooter from '@/components/TableFooter.vue'

const store = useStore()

// @TODO - remove test data
store.state.items = TEST_ITEMS
store.state.payers = TEST_PAYERS
</script>
