<template>
  <AppModal v-model='isModalOpen'>
    <template #header>Payers</template>
    <FormInputGroup v-for='payer in store.state.payers' :key='payer.id'>
      <template #input>
        <div class='flex'>
          <AppInput :value='payer.name' @input='updatePayerName(payer.id, $event.target.value)' />
          <AppButton @click='store.dispatch(ActionTypes.DELETE_PAYER, payer.id)' no-background>
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
import { useStore } from 'vuex'
import AppButton from '@/components/inputs/AppButton.vue'
import { computed } from 'vue'
import type { Payer } from '@/interfaces'
import FormInputGroup from '@/components/inputs/FormInputGroup.vue'
import AppModal from '@/components/modals/AppModal.vue'
import { MutationTypes } from '@/store/mutations'
import AppInput from '@/components/inputs/AppInput.vue'
import IconManagePayer from '@/components/icons/IconManagePayer.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { ActionTypes } from '@/store/actions'

const store = useStore()

/* computed */
const isModalOpen = computed({
  get: () => store.state.managePayersModalOpen,
  set: (value) => store.commit(MutationTypes.UPDATE_IS_MANAGE_PAYERS_MODAL_OPEN, value)
})

/* methods */
function addNewPayer() {
  store.dispatch(ActionTypes.ADD_PAYER, { name: '' })
}
function updatePayerName(payerId: Payer['id'], newName: string) {
  store.commit(MutationTypes.UPDATE_PAYER, { id: payerId, name: newName })
}
</script>
