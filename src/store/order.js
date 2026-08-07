import { reactive } from 'vue'

export const orderStore = reactive({
  event: null,
  selectedTickets: [],
  totalQuantity: 0,
  subtotal: 0,
  adminFee: 0,
  ppnType: 'nominal',
  ppn: 0,
  ppnAmount: 0,
  grandTotal: 0
})