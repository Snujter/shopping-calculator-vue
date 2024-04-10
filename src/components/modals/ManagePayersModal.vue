<template>
  <AppModal v-model='isModalOpen'>
    <template #header>Payers</template>
    <FormInputGroup v-for='payer in payersStore.payers' :key='payer.id'>
      <template #input>
        <div class='flex'>
          <AppInput :value='payer.name' @input='updatePayerName(payer.id, $event.target.value)' />
          <AppButton @click='deletePayer(payer.id)' no-background>
            <template #leading-icon>
              <IconDelete class='fill-red-900' />
            </template>
          </AppButton>
        </div>
      </template>
    </FormInputGroup>
    <AppButton @click='addNewPayer' class='mx-auto'>
      <template #leading-icon>
        <IconManagePayer class='fill-white' />
      </template>
    </AppButton>
  </AppModal>
</template>

<script setup lang='ts'>
import AppButton from '@/components/inputs/AppButton.vue'
import { computed } from 'vue'
import type { Payer } from '@/interfaces'
import FormInputGroup from '@/components/inputs/FormInputGroup.vue'
import AppModal from '@/components/modals/AppModal.vue'
import AppInput from '@/components/inputs/AppInput.vue'
import IconManagePayer from '@/components/icons/IconManagePayer.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { usePayersStore } from '@/store/payersStore'
import { ModalNames, useModalsStore } from '@/store/modalsStore'
import { useItemsStore } from '@/store/itemsStore'

const modalsStore = useModalsStore()
const payersStore = usePayersStore()
const itemsStore = useItemsStore()

/* computed */
const isModalOpen = computed({
  get: () => modalsStore.managePayersModal,
  set: (value) => modalsStore.setModal(ModalNames.ManagePayersModal, value)
})

/* methods */
const addNewPayer = () => {
  const newId = payersStore.payers.length + 1
  payersStore.addPayer({ id: newId, name: '' })
  itemsStore.addPayerToItems(newId)
}
const deletePayer = (payerId: Payer['id']) => {
  payersStore.deletePayer(payerId)
  itemsStore.deletePayerFromItems(payerId)
}
const updatePayerName = (payerId: Payer['id'], newName: string) => {
  payersStore.updatePayer(payerId, { name: newName })
}
</script>
