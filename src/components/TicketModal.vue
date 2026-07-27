<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-card glass-panel">
        <button class="close-btn" @click="$emit('close')">&times;</button>

        <!-- Step 1: Selection & Checkout Form -->
        <div v-if="!isConfirmed" class="checkout-step">
          <div class="modal-header">
            <span class="modal-tag font-tech">R2C27 BANDUNG TICKET CHECKOUT</span>
            <h3 class="modal-title font-display">SECURE YOUR PASS</h3>
            <p class="modal-sub font-tech">19-20 FEBRUARY 2027 • THE HIVE @ HIVEMIND COLLECTIVE</p>
          </div>

          <!-- Pass Selector -->
          <div class="pass-selector font-tech">
            <div 
              class="pass-option"
              :class="{ 'selected': selectedTier === 'adult' }"
              @click="selectedTier = 'adult'"
            >
              <div class="pass-info">
                <span class="pass-name">ADULT PASS</span>
                <span class="pass-desc">Full 2-Day Conference & Gala Dinner</span>
              </div>
              <span class="pass-price">RP 2.000.000</span>
            </div>

            <div 
              class="pass-option"
              :class="{ 'selected': selectedTier === 'youth' }"
              @click="selectedTier = 'youth'"
            >
              <div class="pass-info">
                <span class="pass-name">ADULT YOUTH</span>
                <span class="pass-desc">Under 25 Student / Youth Discount</span>
              </div>
              <span class="pass-price">RP 1.500.000</span>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div class="quantity-row font-tech">
            <span>NUMBER OF PASSES:</span>
            <div class="counter-box">
              <button class="cnt-btn" @click="quantity = Math.max(1, quantity - 1)">-</button>
              <span class="cnt-value">{{ quantity }}</span>
              <button class="cnt-btn" @click="quantity = Math.min(10, quantity + 1)">+</button>
            </div>
          </div>

          <!-- Attendee Information Form -->
          <form @submit.prevent="handleCheckout" class="checkout-form font-tech">
            <div class="form-group">
              <label>FULL NAME</label>
              <input type="text" v-model="form.name" placeholder="e.g. Budi Santoso" required />
            </div>

            <div class="form-group">
              <label>EMAIL ADDRESS</label>
              <input type="email" v-model="form.email" placeholder="budi@example.com" required />
            </div>

            <div class="form-group">
              <label>PHONE / WHATSAPP</label>
              <input type="tel" v-model="form.phone" placeholder="+62 812 3456 7890" required />
            </div>

            <!-- Price Breakdown Summary -->
            <div class="total-box">
              <span>TOTAL AMOUNT:</span>
              <span class="total-price font-display">{{ formattedTotal }}</span>
            </div>

            <button type="submit" class="btn-checkout font-tech">
              CONFIRM & PROCEED TO PAYMENT
            </button>
          </form>
        </div>

        <!-- Step 2: Instant Ticket Confirmation Badge -->
        <div v-else class="confirmation-step">
          <div class="success-icon">✓</div>
          <h3 class="success-title font-display">TICKET RESERVED!</h3>
          <p class="success-sub font-tech">CONGRATULATIONS, YOUR PASS IS CONFIRMED.</p>

          <div class="virtual-ticket font-tech">
            <div class="vt-header">
              <span class="vt-logo font-display">R2C27</span>
              <span class="vt-tier">{{ selectedTier === 'adult' ? 'ADULT PASS' : 'ADULT YOUTH PASS' }}</span>
            </div>
            
            <div class="vt-body">
              <div class="vt-row">
                <span>ATTENDEE:</span>
                <strong>{{ form.name }}</strong>
              </div>
              <div class="vt-row">
                <span>TICKET ID:</span>
                <strong>R2C27-{{ Math.floor(100000 + Math.random() * 900000) }}</strong>
              </div>
              <div class="vt-row">
                <span>DATE:</span>
                <strong>19-20 FEB 2027</strong>
              </div>
              <div class="vt-row">
                <span>VENUE:</span>
                <strong>The Hive, Bandung</strong>
              </div>
            </div>

            <div class="vt-barcode">
              ||| | |||| | ||||| ||| |||| ||||| ||||
            </div>
          </div>

          <button @click="resetAndClose" class="btn-primary font-tech">
            DONE & BACK TO HOMEPAGE
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  initialTier: String
})

const emit = defineEmits(['close'])

const selectedTier = ref('adult')
const quantity = ref(1)
const isConfirmed = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: ''
})

watch(() => props.initialTier, (newVal) => {
  if (newVal) {
    selectedTier.value = newVal.toLowerCase().includes('youth') ? 'youth' : 'adult'
  }
})

const unitPrice = computed(() => selectedTier.value === 'adult' ? 2000000 : 1500000)
const totalPrice = computed(() => unitPrice.value * quantity.value)

const formattedTotal = computed(() => {
  return 'RP ' + totalPrice.value.toLocaleString('id-ID')
})

const handleCheckout = () => {
  if (!form.value.name || !form.value.email) return
  isConfirmed.value = true
}

const resetAndClose = () => {
  isConfirmed.value = false
  form.value = { name: '', email: '', phone: '' }
  quantity.value = 1
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  display: none !important; /* Hidden for now per user request */
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(12px);
  z-index: 500;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-card {
  display: none !important; /* Hidden for now per user request */
  max-width: 580px;
  width: 100%;
  background: #090e1f;
  border: 1px solid rgba(6, 182, 212, 0.4);
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
}

.close-btn {
  position: absolute;
  top: 15px; right: 20px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 2.2rem;
  cursor: pointer;
}

.modal-header {
  margin-bottom: 1.8rem;
}

.modal-tag {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--color-bright-cyan);
}

.modal-title {
  font-size: 2rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0.2rem 0;
}

.modal-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
}

/* Pass options */
.pass-selector {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.pass-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.pass-option:hover,
.pass-option.selected {
  background: rgba(6, 182, 212, 0.12);
  border-color: var(--color-bright-cyan);
}

.pass-name {
  font-weight: 800;
  font-size: 0.95rem;
  color: #fff;
  display: block;
}

.pass-desc {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
}

.pass-price {
  font-weight: 900;
  color: var(--color-bright-cyan);
  font-size: 1rem;
}

/* Quantity */
.quantity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.8);
}

.counter-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
}

.cnt-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 900;
  cursor: pointer;
  width: 24px;
}

.cnt-value {
  font-size: 1rem;
  color: var(--color-bright-cyan);
}

/* Form */
.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group label {
  display: block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.4rem;
}

.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #ffffff;
  font-family: inherit;
  font-size: 0.9rem;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-bright-cyan);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
}

.total-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  font-weight: 800;
}

.total-price {
  font-size: 1.6rem;
  color: var(--color-bright-cyan);
}

.btn-checkout {
  width: 100%;
  padding: 0.95rem;
  background: var(--color-bright-cyan);
  color: #050814;
  border: none;
  border-radius: 6px;
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 240, 255, 0.4);
  transition: all 0.25s ease;
}

.btn-checkout:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

/* Confirmation Badge */
.confirmation-step {
  text-align: center;
  padding: 1rem 0;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #10b981;
  color: #fff;
  border-radius: 50%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
}

.success-title {
  font-size: 2rem;
  color: #fff;
}

.success-sub {
  font-size: 0.8rem;
  color: var(--color-bright-cyan);
  margin-bottom: 1.8rem;
}

.virtual-ticket {
  background: linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.vt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 0.8rem;
  margin-bottom: 1rem;
}

.vt-logo {
  font-size: 1.4rem;
  font-weight: 900;
  color: #fff;
}

.vt-tier {
  font-size: 0.75rem;
  font-weight: 800;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.vt-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  margin-bottom: 0.4rem;
}

.vt-barcode {
  text-align: center;
  margin-top: 1.2rem;
  font-size: 1.2rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.8);
}
</style>
