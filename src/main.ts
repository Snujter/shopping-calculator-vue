import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp, readonly, shallowRef } from 'vue'
import App from '@/App.vue'
import { PAYMENT_TYPES } from '@/globals'
import ShareEqual from '@/components/icons/IconShareEqual.vue'
import ShareQuantity from '@/components/icons/IconShareQuantity.vue'
import SharePercentage from '@/components/icons/IconSharePercentage.vue'
import { createLocalStoragePlugin } from '@/store/plugins'

const app = createApp(App)
const pinia = createPinia()

/* pinia store */
pinia.use(createLocalStoragePlugin())
app.use(pinia)

/* directives */
app.directive('click-outside', {
  beforeMount(el, binding) {
    el.eventSetDrag = function() {
      el.setAttribute('data-dragging', 'yes')
    }
    el.eventClearDrag = function() {
      el.removeAttribute('data-dragging')
    }
    el.eventOnClick = function(event: Event) {
      const dragging = el.getAttribute('data-dragging')
      // check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        binding.value(event)
      }
    }
    document.addEventListener('touchstart', el.eventClearDrag)
    document.addEventListener('touchmove', el.eventSetDrag)
    document.addEventListener('click', el.eventOnClick)
    document.addEventListener('touchend', el.eventOnClick)
  },
  unmounted(el) {
    document.removeEventListener('touchstart', el.eventClearDrag)
    document.removeEventListener('touchmove', el.eventSetDrag)
    document.removeEventListener('click', el.eventOnClick)
    document.removeEventListener('touchend', el.eventOnClick)
    el.removeAttribute('data-dragging')
  }
})

/* provides */
app.provide('paymentTypesMap', readonly([
  { label: 'Equal', value: PAYMENT_TYPES.Equal, icon: shallowRef(ShareEqual) },
  { label: 'Quantity', value: PAYMENT_TYPES.Quantity, icon: shallowRef(ShareQuantity) },
  { label: 'Percentage', value: PAYMENT_TYPES.Percentage, icon: shallowRef(SharePercentage) }
]))

app.mount('#app')
