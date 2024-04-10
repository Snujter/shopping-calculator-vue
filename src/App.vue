<template>
  <AppSidebar :menu-groups='[
    [
      {id: 1, icon: IconImportItems, text: "Import Items", onClick: handleImportItemsClick},
      {id: 2, icon: IconManagePayer, text: "Manage Payers", onClick: handleManagePayersClick},
    ],
    [
      {id: 3, icon: IconFileSave, text: "Download CSV", onClick: handleCSVDownloadClick},
    ],
  ]' />
  <ImportItemsModal />
  <ManagePayersModal />
  <main class='p-10 pl-24 w-screen h-screen'>
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
            v-for='payer in payers'
            :key='payer.id'
            class='text-center min-w-[16rem] w-[20rem]'
          >
            {{ payer.name }}
          </TableHeader>
          <TableHeader class='cursor-pointer' @click='handleManagePayersClick'>
            <IconManagePayer class='fill-text' />
          </TableHeader>
        </tr>
        </thead>

        <tbody>
        <tr v-if='items.length == 0' class='text-text'>
          <td colspan='100%' class='py-4'>
            <div class='flex justify-center'>
              <AppButton @click='handleImportItemsClick'>
                <template #leading-icon>
                  <IconImportItems />
                </template>
                Import items
              </AppButton>
            </div>
          </td>
        </tr>
        <TableRow
          v-for='item in items'
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
            <ItemPrice :price='itemsStore.totalPrice' />
          </TableFooter>
          <TableFooter no-background></TableFooter>
          <TableFooter
            v-for='payer in payers'
            :key='payer.id'
            class='text-center'
            no-background
          >
            <ItemPrice :price='itemsStore.payerTotalPayments[payer.id] || 0' />
          </TableFooter>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang='ts'>
import TableHeader from '@/components/TableHeader.vue'
import TableRow from '@/components/TableRow.vue'
import ItemPrice from '@/components/ItemPrice.vue'
import TableFooter from '@/components/TableFooter.vue'
import { convertToCSV, downloadCSV, formatPrice } from '@/helpers'
import { computed } from 'vue'
import IconFileSave from '@/components/icons/IconFileSave.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import ImportItemsModal from '@/components/modals/ImportItemsModal.vue'
import IconImportItems from '@/components/icons/IconImportItems.vue'
import AppButton from '@/components/inputs/AppButton.vue'
import IconManagePayer from '@/components/icons/IconManagePayer.vue'
import ManagePayersModal from '@/components/modals/ManagePayersModal.vue'
import { useCommonStore } from '@/store/commonStore'
import { useItemsStore } from '@/store/itemsStore'
import { usePayersStore } from '@/store/payersStore'
import { ModalNames, useModalsStore } from '@/store/modalsStore'
import { Item, Payer, Payment } from '@/interfaces'

/* stores */
const commonStore = useCommonStore()
const itemsStore = useItemsStore()
const payersStore = usePayersStore()
const modalsStore = useModalsStore()

/* computed */
const downloadFileName = computed(() => commonStore.getCsvDownloadFileName)
const items = computed(() => itemsStore.items)
const payers = computed(() => payersStore.payers)

/* methods */
const handleCSVDownloadClick = () => {
  const headers = [
    "#",
    "Name",
    "Quantity",
    "Price",
    ...payers.value.map((payer: Payer) => {
      return payer.name
    })
  ]

  const rows = items.value.map((item: Item) => {
    return [
      item.id,
      item.name,
      item.quantity,
      formatPrice(item.price),
      ...item.paymentGroup.payments.map((payment: Payment): string => {
        return formatPrice(itemsStore.paymentsMatrix[item.id][payment.payerId])
      })
    ]
  })

  const totals = [
    " ",
    " ",
    "TOTALS",
    formatPrice(itemsStore.totalPrice),
    ...payers.value.map((payer: Payer): string => {
      return formatPrice(itemsStore.payerTotalPayments[payer.id])
    })
  ]

  const data = [
    headers,
    ...rows,
    totals
  ]

  const CSVstr = convertToCSV(data)
  downloadCSV(CSVstr, downloadFileName.value)
}
const handleImportItemsClick = () => {
  modalsStore.openModal(ModalNames.ItemsImportModal)
}
const handleManagePayersClick = () => {
  modalsStore.openModal(ModalNames.ManagePayersModal)
}
</script>
