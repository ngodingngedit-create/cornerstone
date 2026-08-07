<template>
  <div class="registration-page" :class="{ 'is-success-page': isSubmitted }">
    <!-- Header Navbar (Black Bar like Homepage) -->
    <header class="reg-header font-tech">
      <div class="reg-header-container">
        <!-- Logo Image Left (Matching Homepage) -->
        <a href="#" class="logo-link" @click.prevent="$emit('go-back')">
          <img src="/R2C-Main Logo-White 2.avif" alt="R2C27 Logo" class="logo-img" />
        </a>

        <!-- Right Side Controls (Hamburger Menu Button) -->
        <button class="mobile-toggle" @click="headerMenuOpen = true" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Header Sidebar Menu Drawer -->
    <Teleport to="body">
      <transition name="sidebar-fade">
        <div v-if="headerMenuOpen" class="mobile-sidebar-backdrop" @click.self="headerMenuOpen = false">
          <div class="mobile-sidebar-panel font-tech">
            <div class="sidebar-header">
              <img src="/R2C-Main Logo-White 2.avif" alt="R2C27 Logo" class="sidebar-logo" />
              <button class="sidebar-close-btn" @click="headerMenuOpen = false" aria-label="Close menu">
                &times;
              </button>
            </div>

            <div class="sidebar-links-list">
              <a href="#" class="sidebar-link" @click.prevent="$emit('go-home'); headerMenuOpen = false">HOME</a>
              <a href="#collective" class="sidebar-link" @click="$emit('go-home'); headerMenuOpen = false">COLLECTIVE</a>
              <a href="#agenda" class="sidebar-link" @click="$emit('go-home'); headerMenuOpen = false">PROGRAMS</a>
              <a href="#speakers" class="sidebar-link" @click="$emit('go-home'); headerMenuOpen = false">SPEAKERS</a>
              <a href="#faq" class="sidebar-link" @click="$emit('go-home'); headerMenuOpen = false">FAQ</a>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Main Content Container -->
    <main class="reg-main-container">
      <div v-if="!isSubmitted">
        <!-- Page Title -->
        <h1 class="page-title font-display">Informasi Pemesan</h1>

        <!-- 2-Column Main Layout Grid -->
        <div class="registration-grid">
          <!-- LEFT COLUMN: Buyer & Participant Form Cards -->
          <div class="left-column">

            <!-- Card 1: Data Pemesan (Buyer Details) -->
            <div class="form-card">
              <div class="card-header-collapsible buyer-card-header" @click="toggleBuyerCard">
                <span class="card-title font-display">Data Pemesan</span>
                <svg 
                  class="chevron-icon" 
                  :class="{ 'is-open': isBuyerOpen }" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2.2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              <div v-show="isBuyerOpen" class="card-body font-tech">
                <div class="form-group">
                  <label class="form-label">Nama Lengkap <span class="required-star">*</span></label>
                  <input 
                    type="text" 
                    v-model="buyer.name" 
                    placeholder="Nama Lengkap" 
                    class="form-input"
                    :class="{ 'input-error': validationErrors.name }"
                    required
                    @input="syncBuyerDataToFirstParticipant"
                  />
                  <span v-if="validationErrors.name" class="error-msg-text">Nama Lengkap wajib diisi</span>
                </div>

                <div class="form-group">
                  <label class="form-label">Email <span class="required-star">*</span></label>
                  <input 
                    type="email" 
                    v-model="buyer.email" 
                    placeholder="Contoh: example@example.com" 
                    class="form-input"
                    :class="{ 'input-error': validationErrors.email }"
                    required
                    @input="syncBuyerDataToFirstParticipant"
                  />
                  <span v-if="validationErrors.email" class="error-msg-text">
                    {{ !buyer.email || !buyer.email.trim() ? 'Email wajib diisi' : 'Format email tidak valid' }}
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">No Telepon <span class="required-star">*</span></label>
                  <div class="phone-input-group">
                    <select v-model="buyer.countryCode" class="country-code-select">
                      <option value="+62">+62</option>
                      <option value="+1">+1</option>
                      <option value="+65">+65</option>
                      <option value="+60">+60</option>
                    </select>
                    <input 
                      type="tel" 
                      v-model="buyer.phone" 
                      placeholder="Contoh: 81234567890" 
                      class="form-input phone-input"
                      :class="{ 'input-error': validationErrors.phone }"
                      required
                      @input="syncBuyerDataToFirstParticipant"
                    />
                  </div>
                  <span v-if="validationErrors.phone" class="error-msg-text">No Telepon wajib diisi</span>
                </div>
              </div>
            </div>


            <!-- Card 2+: Pemilik Tiket Cards -->
            <div 
              v-for="(participant, index) in participants" 
              :key="index" 
              class="form-card"
            >
              <div class="card-header-collapsible" @click="toggleParticipantCard(index)">
                <!-- Top Row: Icon + Title/Subtext + Chevron Accordion -->
                <div class="card-header-top-row">
                  <div class="ticket-header-info">
                    <div class="sti-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"></path>
                        <path d="M13 5v14" stroke-dasharray="2 2"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="card-title-row">
                        <span class="card-title font-display">
                          {{ index + 1 }}. Pemilik Tiket ({{ getParticipantTierName(index) }})
                        </span>
                        <!-- Remove Participant Trash Icon Button -->
                        <button 
                          v-if="participants.length > 1"
                          type="button"
                          class="btn-trash"
                          @click.stop="removeParticipant(index)"
                          title="Hapus Participant"
                        >
                          <svg class="trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                      <div class="ticket-subtext font-tech">
                        1 Tiket x {{ formatRupiah(getParticipantIndividualPrice(index)) }}
                      </div>
                    </div>
                  </div>

                  <svg 
                    class="chevron-icon" 
                    :class="{ 'is-open': participant.isOpen }" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2.2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                <!-- Bottom Row: Toggle Switch (Gunakan Data Pemesan) -->
                <div class="card-header-bottom-row" @click.stop>
                  <label class="toggle-container" title="Gunakan Data Pemesan">
                    <span class="toggle-label font-tech">Gunakan Data Pemesan</span>
                    <input 
                      type="checkbox" 
                      v-model="participant.useBuyerData" 
                      @change="handleUseBuyerDataToggle(index)" 
                    />
                    <span class="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div v-show="participant.isOpen" class="card-body font-tech">
                <div class="form-group">
                  <label class="form-label">Nama Lengkap <span class="required-star">*</span></label>
                  <input 
                    type="text" 
                    v-model="participant.name" 
                    placeholder="Nama Lengkap" 
                    class="form-input"
                    :class="{ 'input-error': getParticipantError(index, 'name') }"
                    :disabled="participant.useBuyerData"
                    required
                  />
                  <span v-if="getParticipantError(index, 'name')" class="error-msg-text">Nama Lengkap wajib diisi</span>
                </div>

                <div class="form-group">
                  <label class="form-label">Gereja / Church <span class="required-star">*</span></label>
                  <input 
                    type="text" 
                    v-model="participant.church" 
                    placeholder="Nama Gereja" 
                    class="form-input"
                    :class="{ 'input-error': getParticipantError(index, 'church') }"
                    required
                  />
                  <span v-if="getParticipantError(index, 'church')" class="error-msg-text">Gereja / Church wajib diisi</span>
                </div>

                <div class="form-group">
                  <label class="form-label">Ministry Role <span class="required-star">*</span></label>
                  <input 
                    type="text" 
                    v-model="participant.ministryRole" 
                    placeholder="Peran Pelayanan (e.g. Youth Leader, Musician, Member)" 
                    class="form-input"
                    :class="{ 'input-error': getParticipantError(index, 'ministryRole') }"
                    required
                  />
                  <span v-if="getParticipantError(index, 'ministryRole')" class="error-msg-text">Ministry Role wajib diisi</span>
                </div>

                <div class="form-group">
                  <label class="form-label">No Telepon <span class="required-star">*</span></label>
                  <div class="phone-input-group">
                    <select v-model="participant.countryCode" class="country-code-select" :class="{ 'input-error': getParticipantError(index, 'phone') }" :disabled="participant.useBuyerData">
                      <option value="+62">+62</option>
                      <option value="+1">+1</option>
                      <option value="+65">+65</option>
                    </select>
                    <input 
                      type="tel" 
                      v-model="participant.phone" 
                      placeholder="Contoh: 81234567890" 
                      class="form-input phone-input"
                      :class="{ 'input-error': getParticipantError(index, 'phone') }"
                      :disabled="participant.useBuyerData"
                      required
                    />
                  </div>
                  <span v-if="getParticipantError(index, 'phone')" class="error-msg-text">No Telepon wajib diisi</span>
                </div>

                <div class="form-group">
                  <label class="form-label">Email <span class="required-star">*</span></label>
                  <input 
                    type="email" 
                    v-model="participant.email" 
                    placeholder="Contoh: example@example.com" 
                    class="form-input"
                    :class="{ 'input-error': getParticipantError(index, 'email') }"
                    :disabled="participant.useBuyerData"
                    required
                  />
                  <span v-if="getParticipantError(index, 'email')" class="error-msg-text">
                    {{ !participant.email || !participant.email.trim() ? 'Email wajib diisi' : 'Format email tidak valid' }}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: Event, Voucher, Pricing Schedule Table & Order Summary -->
          <div class="right-column">

            <!-- Card 1: Event Info Card -->
            <div class="sidebar-card event-card">
              <div class="event-thumb font-tech">
                <img src="/Frame 20.avif" alt="Event Poster" class="event-img" />
              </div>
              <div class="event-details font-tech">
                <div class="event-title font-display">Rooted Relevant Collective</div>
                <div class="event-date">19–20 Feb 2027 • Cornerstone Bandung, Paskal 23</div>
              </div>
            </div>

            <!-- Card 2: Voucher Card (Accordion) -->
            <div class="sidebar-card voucher-card font-tech">
              <div class="sidebar-card-title font-display accordion-header" @click="isVoucherOpen = !isVoucherOpen">
                <div class="title-left">
                  <span class="card-icon">🎟️</span> Voucher
                </div>
                <svg 
                  class="chevron-icon" 
                  :class="{ 'is-open': isVoucherOpen }" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2.2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              
              <div v-show="isVoucherOpen" class="voucher-body">
                <div class="voucher-input-row">
                  <input 
                    type="text" 
                    v-model="voucherCode" 
                    placeholder="Masukan Kode Voucher 1" 
                    class="voucher-input"
                  />
                </div>
                <button type="button" class="btn-voucher-submit" :disabled="!voucherCode">
                  Submit
                </button>
                
                <button type="button" class="btn-add-voucher">
                  + Tambah Voucher
                </button>
              </div>
            </div>

            <!-- Card 3: Ringkasan Pesanan (Order Summary Card) -->
            <div class="sidebar-card summary-card font-tech">
              <div class="sidebar-card-title font-display">
                Ringkasan Pesanan
              </div>

              <!-- Dynamic Itemized Ticket Breakdown -->
              <div class="summary-items-list">
                <!-- Adult + Youth Bundle Item -->
                <div v-if="pricingCalculation.bundleCount > 0" class="summary-ticket-item">
                  <div class="sti-left">
                    <div class="sti-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"></path>
                        <path d="M13 5v14" stroke-dasharray="2 2"></path>
                      </svg>
                    </div>

                    <div class="sti-info">
                      <strong class="sti-name">Adult + Youth x{{ pricingCalculation.bundleCount }}</strong>
                      <span class="badge-category-mini">Paket Bundling</span>
                    </div>
                  </div>

                  <div class="sti-right">
                    <div class="sti-price font-display">
                      {{ formatRupiah(pricingCalculation.bundleTotal) }}
                    </div>
                  </div>
                </div>

                <!-- Adult Item -->
                <div v-if="pricingCalculation.remainingAdults > 0" class="summary-ticket-item">
                  <div class="sti-left">
                    <div class="sti-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"></path>
                        <path d="M13 5v14" stroke-dasharray="2 2"></path>
                      </svg>
                    </div>

                    <div class="sti-info">
                      <strong class="sti-name">Adult x{{ pricingCalculation.remainingAdults }}</strong>
                      <span class="badge-category-mini">Tiket Satuan</span>
                    </div>
                  </div>

                  <div class="sti-right">
                    <div class="sti-price font-display">
                      {{ formatRupiah(pricingCalculation.adultTotal) }}
                    </div>
                  </div>
                </div>

                <!-- Extra Youth Item -->
                <div v-if="pricingCalculation.extraYouthCount > 0" class="summary-ticket-item">
                  <div class="sti-left">
                    <div class="sti-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"></path>
                        <path d="M13 5v14" stroke-dasharray="2 2"></path>
                      </svg>
                    </div>

                    <div class="sti-info">
                      <strong class="sti-name">+Extra Youth x{{ pricingCalculation.extraYouthCount }}</strong>
                      <span class="badge-category-mini">Tiket Tambahan</span>
                    </div>
                  </div>

                  <div class="sti-right">
                    <div class="sti-price font-display">
                      {{ formatRupiah(pricingCalculation.extraYouthTotal) }}
                    </div>
                  </div>
                </div>

                <!-- Standalone Youth Item -->
                <div v-if="pricingCalculation.standaloneYouthCount > 0" class="summary-ticket-item">
                  <div class="sti-left">
                    <div class="sti-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"></path>
                        <path d="M13 5v14" stroke-dasharray="2 2"></path>
                      </svg>
                    </div>

                    <div class="sti-info">
                      <strong class="sti-name">Youth x{{ pricingCalculation.standaloneYouthCount }}</strong>
                      <span class="badge-category-mini">Tiket Satuan</span>
                    </div>
                  </div>

                  <div class="sti-right">
                    <div class="sti-price font-display">
                      {{ formatRupiah(pricingCalculation.standaloneYouthTotal) }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Breakdown Table -->
              <div class="summary-breakdown">
                <div class="breakdown-row">
                  <span>Jumlah ({{ participants.length }} Tiket)</span>
                  <span>{{ formatRupiah(subtotalPrice) }}</span>
                </div>
                <div class="breakdown-row">
                  <span>Subtotal</span>
                  <span>{{ formatRupiah(subtotalPrice) }}</span>
                </div>
                <div class="breakdown-row">
                  <span>Biaya Admin</span>
                  <span>{{ formatRupiah(adminFee) }}</span>
                </div>

                <div class="divider"></div>

                <div class="breakdown-row total-row">
                  <span class="font-display">Total Pembayaran</span>
                  <span class="total-amount font-display">{{ formatRupiah(totalPrice) }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Submission Success Screen -->
      <div v-else class="success-screen font-tech">
        <div ref="lottieContainer" class="success-lottie-badge"></div>
        <h2 class="success-title font-display">Pendaftaran Berhasil</h2>
        <p class="success-desc">
          Konfirmasi pendaftaran peserta Rooted Relevant Collective 2027 akan dikirimkan ke email pemesan.
        </p>

        <div class="success-summary">
          <h3 class="font-display mb-3">Ringkasan Pendaftaran</h3>
          <p><strong>Tanggal Daftar:</strong> {{ registrationDate }}</p>
          <p><strong>Jumlah Tiket:</strong> {{ participants.length }}</p>
          <p><strong>Total Pembayaran:</strong> {{ formatRupiah(totalPrice) }}</p>
          <p><strong>Email Pemesan:</strong> {{ buyer.email }}</p>
        </div>

        <div class="success-actions">
          <button class="btn-secondary-download font-tech" @click="handleDownload">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
          <button class="btn-primary-home font-tech" @click="$emit('go-back')">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>

    <!-- Bottom Sticky Navigation Bar -->
    <div v-if="!isSubmitted" class="reg-bottom-bar font-tech">
      <div class="reg-bottom-bar-container">
        <!-- Left Side: Circular Countdown Pill -->
        <div class="reminder-pill">
          <div class="timer-circle-badge font-display">
            {{ formattedTimeLeft }}
          </div>
          <span class="reminder-text">Segera selesaikan pesananmu</span>
        </div>

        <!-- Right Side: Action Button -->
        <button class="btn-selanjutnya font-tech" @click="handleNextStep">
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import lottie from 'lottie-web'

const props = defineProps({
  orderData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['go-back', 'go-home'])

// 15-Minute Countdown Timer (15 * 60 = 900 seconds)
const timeLeft = ref(15 * 60)
let timerInterval = null

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  const padM = String(minutes).padStart(2, '0')
  const padS = String(seconds).padStart(2, '0')
  return `${padM}:${padS}`
})

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)
}

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

const headerMenuOpen = ref(false)
const isBuyerOpen = ref(true)
const isVoucherOpen = ref(false)
const isTableOpen = ref(true)
const voucherCode = ref('')
const isSubmitted = ref(false)
const selectedPeriod = ref('period1')
const showErrors = ref(false)

const adminFee = 7000

// Exact Pricing Table according to image
const PRICING_TABLE = {
  period1: {
    id: 'period1',
    name: '9 Aug - 10 Oct 2026',
    adultPrice: 450000,
    youthPrice: 450000,
    bundlePrice: 700000,     // 1 adult + 1 youth (2 persons)
    extraYouthPrice: 350000  // 1 youth (requires bundle)
  },
  period2: {
    id: 'period2',
    name: '11 Oct 2026 - 18 Feb 2027',
    adultPrice: 700000,
    youthPrice: 700000,
    bundlePrice: 900000,     // 1 adult + 1 youth (2 persons)
    extraYouthPrice: 400000  // 1 youth (requires bundle)
  }
}

// Buyer details
const buyer = reactive({
  name: '',
  email: '',
  phone: '',
  countryCode: '+62'
})

// Participant details list
const participants = ref([])

const createEmptyParticipant = (ageRange = 'Adult (≥30 years old)', isOpen = true) => ({
  name: '',
  church: '',
  ministryRole: '',
  phone: '',
  email: '',
  countryCode: '+62',
  ageRange,
  isOpen,
  useBuyerData: false
})

// Initialize participants based on passed orderData
onMounted(() => {
  if (props.orderData && props.orderData.selectedTickets && props.orderData.selectedTickets.length > 0) {
    const list = []
    props.orderData.selectedTickets.forEach(ticket => {
      for (let i = 0; i < ticket.qty; i++) {
        const id = ticket.id.toLowerCase()
        if (id.includes('adult_youth')) {
          // 1 bundle consists of 1 Adult and 1 Youth
          list.push(createEmptyParticipant('Adult (≥30 years old)', list.length === 0))
          list.push(createEmptyParticipant('Youth (<30 years old)', false))
        } else if (id.includes('youth')) {
          list.push(createEmptyParticipant('Youth (<30 years old)', list.length === 0))
        } else {
          list.push(createEmptyParticipant('Adult (≥30 years old)', list.length === 0))
        }
      }
    })
    participants.value = list
  }

  if (participants.value.length === 0) {
    participants.value = [createEmptyParticipant('Adult (≥30 years old)', true)]
  }

  startTimer()
})

const toggleBuyerCard = () => {
  isBuyerOpen.value = !isBuyerOpen.value
}

const toggleParticipantCard = (index) => {
  if (participants.value[index]) {
    participants.value[index].isOpen = !participants.value[index].isOpen
  }
}

const handleUseBuyerDataToggle = (index) => {
  const p = participants.value[index]
  if (p && p.useBuyerData) {
    p.name = buyer.name
    p.email = buyer.email
    p.phone = buyer.phone
    p.countryCode = buyer.countryCode
  }
}

const syncBuyerDataToFirstParticipant = () => {
  participants.value.forEach(p => {
    if (p.useBuyerData) {
      p.name = buyer.name
      p.email = buyer.email
      p.phone = buyer.phone
      p.countryCode = buyer.countryCode
    }
  })
}

const addParticipant = () => {
  if (participants.value.length < 10) {
    const defaultAge = (participants.value.length === 1 && participants.value[0].ageRange.includes('Adult'))
      ? 'Youth (<30 years old)'
      : 'Adult (≥30 years old)'

    participants.value.push({
      name: '',
      church: '',
      ministryRole: '',
      phone: '',
      email: '',
      countryCode: '+62',
      ageRange: defaultAge,
      isOpen: true,
      useBuyerData: false
    })
  }
}

const removeParticipant = (index) => {
  if (participants.value.length > 1) {
    participants.value.splice(index, 1)
  }
}

// Dynamic Pricing Calculation Logic based on table
const pricingCalculation = computed(() => {
  const currentPricing = PRICING_TABLE[selectedPeriod.value]
  
  let adultCount = 0
  let youthCount = 0

  participants.value.forEach(p => {
    if (p.ageRange === 'Adult (≥30 years old)') {
      adultCount++
    } else {
      youthCount++
    }
  })

  // 1. Calculate Bundles: Adult + Youth (1 Adult + 1 Youth)
  const bundleCount = Math.min(adultCount, youthCount)
  const remainingAdults = adultCount - bundleCount
  const remainingYouths = youthCount - bundleCount

  let extraYouthCount = 0
  let standaloneYouthCount = 0

  if (bundleCount > 0) {
    // Extra Youth applies only if "Adult + Youth" bundle is purchased
    extraYouthCount = remainingYouths
  } else {
    standaloneYouthCount = remainingYouths
  }

  const bundleTotal = bundleCount * currentPricing.bundlePrice
  const adultTotal = remainingAdults * currentPricing.adultPrice
  const extraYouthTotal = extraYouthCount * currentPricing.extraYouthPrice
  const standaloneYouthTotal = standaloneYouthCount * currentPricing.youthPrice

  const subtotal = bundleTotal + adultTotal + extraYouthTotal + standaloneYouthTotal

  return {
    adultCount,
    youthCount,
    bundleCount,
    remainingAdults,
    extraYouthCount,
    standaloneYouthCount,
    bundleTotal,
    adultTotal,
    extraYouthTotal,
    standaloneYouthTotal,
    subtotal,
    currentPricing
  }
})

// Calculate savings comparing to unbundled individual rates
const calculatedSavings = computed(() => {
  const { adultCount, youthCount, subtotal, currentPricing } = pricingCalculation.value
  const unbundledTotal = (adultCount * currentPricing.adultPrice) + (youthCount * currentPricing.youthPrice)
  return Math.max(0, unbundledTotal - subtotal)
})

const subtotalPrice = computed(() => pricingCalculation.value.subtotal)
const totalPrice = computed(() => subtotalPrice.value + adminFee)

const getParticipantTierName = (index) => {
  const p = participants.value && participants.value[index]
  if (!p) return 'Tiket Pass'
  const isAdult = p.ageRange && p.ageRange === 'Adult (≥30 years old)'
  
  let adultsUpToThis = 0
  let youthsUpToThis = 0
  for (let i = 0; i <= index && i < participants.value.length; i++) {
    if (participants.value[i] && participants.value[i].ageRange === 'Adult (≥30 years old)') adultsUpToThis++
    else youthsUpToThis++
  }

  const { bundleCount } = pricingCalculation.value

  if (isAdult) {
    if (adultsUpToThis <= bundleCount) {
      return 'Adult (Paket Adult + Youth)'
    }
    return 'Adult Pass'
  } else {
    if (youthsUpToThis <= bundleCount) {
      return 'Youth (Paket Adult + Youth)'
    }
    if (bundleCount > 0) {
      return '+Extra Youth Rate'
    }
    return 'Youth Pass'
  }
}

const getParticipantIndividualPrice = (index) => {
  const tierName = getParticipantTierName(index)
  const currentPricing = PRICING_TABLE[selectedPeriod.value]

  if (tierName.includes('Paket Adult + Youth')) {
    return currentPricing.bundlePrice / 2
  } else if (tierName.includes('+Extra Youth')) {
    return currentPricing.extraYouthPrice
  } else if (tierName === 'Youth Pass') {
    return currentPricing.youthPrice
  } else {
    return currentPricing.adultPrice
  }
}

const formatRupiah = (val) => {
  return 'Rp ' + val.toLocaleString('id-ID')
}

// Mandatory field validation state for Data Pemesan form
const validationErrors = reactive({
  name: false,
  email: false,
  phone: false
})

// Validate all mandatory participant (Pemilik Tiket) fields
const validateParticipant = (p) => {
  const errors = {
    name: !p.name || !p.name.trim(),
    church: !p.church || !p.church.trim(),
    ministryRole: !p.ministryRole || !p.ministryRole.trim(),
    phone: !p.phone || !p.phone.trim(),
    email: !p.email || !p.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim())
  }
  return errors
}

// Returns error state for a participant field
const getParticipantError = (index, field) => {
  if (!showErrors.value) return false
  const p = participants.value[index]
  if (!p) return false
  const errors = validateParticipant(p)
  return !!errors[field]
}

const handleNextStep = () => {
  // Reset previous errors
  validationErrors.name = false
  validationErrors.email = false
  validationErrors.phone = false

  showErrors.value = true

  let hasError = false

  // Validate mandatory Data Pemesan fields
  if (!buyer.name || !buyer.name.trim()) {
    validationErrors.name = true
    hasError = true
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!buyer.email || !buyer.email.trim() || !emailPattern.test(buyer.email.trim())) {
    validationErrors.email = true
    hasError = true
  }

  if (!buyer.phone || !buyer.phone.trim()) {
    validationErrors.phone = true
    hasError = true
  }

  if (hasError) {
    // Open buyer card and scroll to it so user sees the errors
    isBuyerOpen.value = true
    const buyerCard = document.querySelector('.form-card .card-header-collapsible')
    if (buyerCard) {
      buyerCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }

  // Validate mandatory participant (Pemilik Tiket) fields
  for (const p of participants.value) {
    const errors = validateParticipant(p)
    if (errors.name || errors.church || errors.ministryRole || errors.phone || errors.email) {
      hasError = true
      break
    }
  }

  if (hasError) {
    // Open first participant card with errors and scroll to it
    participants.value.forEach((p, i) => { p.isOpen = true })
    const firstErrorCard = document.querySelector('.form-card .card-header-top-row')
    if (firstErrorCard) {
      firstErrorCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }

  isSubmitted.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const lottieContainer = ref(null)
let lottieInstance = null

const registrationDate = computed(() => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return new Date().toLocaleDateString('id-ID', options)
})

watch(isSubmitted, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      if (lottieContainer.value) {
        lottieInstance = lottie.loadAnimation({
          container: lottieContainer.value,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/Animation - 1785947825045.json'
        })
      }
    }, 50)
  } else if (lottieInstance) {
    lottieInstance.destroy()
    lottieInstance = null
  }
})

onUnmounted(() => {
  if (lottieInstance) {
    lottieInstance.destroy()
  }
})

const handleDownload = () => {
  window.print()
}
</script>

<style scoped>
.registration-page {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #111827;
  padding-bottom: 7rem;
}

.registration-page.is-success-page {
  background-image: url('/Background 1.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Header Navbar */
.reg-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #000000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.85rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.reg-header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: inline-block;
  text-decoration: none;
}

.logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
  display: block;
}

.mobile-toggle {
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.mobile-toggle:hover {
  opacity: 0.8;
}

/* Sidebar Menu Drawer Styles */
.mobile-sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 9998;
  display: flex;
  justify-content: flex-end;
}

.mobile-sidebar-panel {
  width: 290px;
  max-width: 82vw;
  height: 100%;
  background: #000000;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.95);
  padding: 1.8rem 1.4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  z-index: 9999;
}

.mobile-sidebar-panel .sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.sidebar-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
}

.sidebar-close-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 2.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.4rem;
}

.sidebar-links-list {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: 1.5rem;
}

.sidebar-link {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: 0.12em;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  display: block;
}

.sidebar-link:hover {
  color: #00f0ff;
  transform: translateX(4px);
}

.sidebar-footer {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.sidebar-btn {
  width: 100%;
  justify-content: center;
  padding: 0.8rem;
  font-size: 0.85rem;
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 99px;
  font-weight: 800;
  cursor: pointer;
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #ffffff;
}

.back-icon {
  width: 16px;
  height: 16px;
}

/* Main Container */
.reg-main-container {
  max-width: 1400px;
  margin: 2rem auto 0;
  padding: 0 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.8rem;
  color: #111827;
}

/* 2-Column Layout Grid */
.registration-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 1.75rem;
  align-items: start;
}

/* Left Column Styling */
.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* White Form Cards */
.form-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.card-header-collapsible {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  user-select: none;
}

/* Data Pemesan header: text left, accordion chevron to the right on same line */
.buyer-card-header {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.card-header-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-header-bottom-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-top: 0.5rem;
  border-top: 1px dashed #e2e8f0;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #111827;
}

.btn-trash {
  background: transparent;
  border: none;
  color: #ef4444;
  padding: 0.25rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-trash:hover {
  background: #fee2e2;
  color: #dc2626;
}

.trash-icon {
  width: 16px;
  height: 16px;
}

.chevron-icon {
  width: 18px;
  height: 18px;
  color: #6b7280;
  cursor: pointer;
  transition: transform 0.25s ease, color 0.2s ease;
}

.chevron-icon:hover {
  color: #111827;
}

.chevron-icon.is-open {
  transform: rotate(180deg);
}

.ticket-header-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ticket-icon {
  font-size: 1.3rem;
}

.ticket-subtext {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.1rem;
}

.header-right-controls {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

/* Participant Quantity Counter Control Card */
.participant-counter-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.counter-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.counter-title {
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
}

.counter-subtitle {
  font-size: 0.8rem;
  color: #6b7280;
}

.counter-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: #f1f5f9;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.btn-qty {
  background: #ffffff;
  color: #111827;
  border: 1px solid #cbd5e1;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-qty:hover:not(:disabled) {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.btn-qty:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-count {
  font-size: 1.1rem;
  font-weight: 800;
  min-width: 24px;
  text-align: center;
  color: #111827;
}

/* Toggle Switch Styling */
.toggle-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.toggle-label {
  font-size: 0.8rem;
  color: #4b5563;
}

.toggle-container input {
  display: none;
}

.toggle-slider {
  width: 38px;
  height: 20px;
  background-color: #cbd5e1;
  border-radius: 99px;
  position: relative;
  transition: background-color 0.25s ease;
}

.toggle-slider::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.25s ease;
}

.toggle-container input:checked + .toggle-slider {
  background-color: #1d4ed8;
}

.toggle-container input:checked + .toggle-slider::before {
  transform: translateX(18px);
}

/* Card Body & Form Inputs */
.card-body {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: #ffffff;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
}

.required-star {
  color: #dc2626;
  font-weight: 700;
}

.form-input {
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #111827;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.form-input:disabled {
  background: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}

.form-input.input-error {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
}

.country-code-select.input-error {
  border-color: #dc2626;
}

.error-msg-text {
  display: block;
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
}

/* Phone input group */
.phone-input-group {
  display: flex;
  gap: 0.5rem;
}

.country-code-select {
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem 0.6rem;
  color: #111827;
  font-family: inherit;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
}

.phone-input {
  flex: 1;
}

/* Custom Select Dropdown */
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-select {
  width: 100%;
  appearance: none;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  color: #111827;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  pointer-events: none;
  font-size: 0.75rem;
  color: #6b7280;
}

/* Add Ticket Button */
.participant-actions {
  margin-top: 0.5rem;
}

.btn-add-ticket {
  width: 100%;
  background: #ffffff;
  border: 1px dashed #3b82f6;
  color: #1d4ed8;
  padding: 0.85rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-add-ticket:hover {
  background: #eff6ff;
  border-color: #1d4ed8;
}

/* Right Column Sidebar Cards (Sticky on Desktop) */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: sticky;
  top: 90px;
}

.sidebar-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.sidebar-card-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-card-title.accordion-header {
  margin-bottom: 0;
  cursor: pointer;
  justify-content: space-between;
  user-select: none;
}

.title-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.voucher-card .voucher-body {
  margin-top: 1rem;
}

.flex-between {
  justify-content: space-between;
  cursor: pointer;
}

.table-toggle-btn {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

/* Event Info Card */
.event-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.event-thumb {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  background: #f1f5f9;
  flex-shrink: 0;
}

.event-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
}

.event-date {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.2rem;
}

/* Pricing Table Container */
.pricing-table-container {
  margin-bottom: 1rem;
  overflow-x: auto;
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}

.pricing-table th,
.pricing-table td {
  border: 1px solid #e2e8f0;
  padding: 0.45rem 0.5rem;
  text-align: left;
}

.pricing-table th {
  background: #f8fafc;
  font-weight: 700;
  color: #334155;
}

.pricing-table th.active-period {
  background: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
}

.font-bold {
  font-weight: 700;
}

.table-note {
  font-size: 0.72rem;
  color: #64748b;
  margin-top: 0.5rem;
  font-style: italic;
  line-height: 1.3;
}

/* Period Selector Buttons */
.period-selector-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.period-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.6rem 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-option.selected {
  background: #eff6ff;
  border-color: #2563eb;
}

.period-text {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
}

.period-text strong {
  color: #1e293b;
}

.period-text span {
  font-size: 0.72rem;
  color: #64748b;
}

/* Voucher Card */
.voucher-input-row {
  margin-bottom: 0.75rem;
}

.voucher-input {
  width: 100%;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  color: #111827;
  font-size: 0.85rem;
  outline: none;
}

.btn-voucher-submit {
  width: 100%;
  background: #f1f5f9;
  color: #94a3b8;
  border: none;
  border-radius: 20px;
  padding: 0.45rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: not-allowed;
  margin-bottom: 0.85rem;
  transition: all 0.2s ease;
}

.btn-voucher-submit:not(:disabled) {
  background: #111827;
  color: #ffffff;
  cursor: pointer;
}

.btn-add-voucher {
  width: 100%;
  background: #ffffff;
  border: 1px solid #1d4ed8;
  color: #1d4ed8;
  border-radius: 20px;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-add-voucher:hover {
  background: #eff6ff;
}

/* Order Summary Card */
.summary-items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-ticket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e2e8f0;
}

.summary-ticket-item:last-child {
  border-bottom: none;
}

.sti-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex: 1;
  min-width: 0;
}

.sti-icon-box {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  flex-shrink: 0;
}

.sti-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.sti-name {
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge-category-mini {
  font-size: 0.68rem;
  color: #64748b;
  font-weight: 500;
  line-height: 1.2;
}

.sti-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.sti-price {
  font-size: 0.85rem;
  font-weight: 800;
  color: #0f172a;
}

.savings-banner {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #047857;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  font-size: 0.8rem;
  margin-top: 0.85rem;
}

.divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.85rem 0;
}

.summary-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: 0.85rem;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  color: #4b5563;
}

.total-row {
  color: #111827;
  font-size: 0.95rem;
  align-items: center;
}

.total-amount {
  font-size: 1.1rem;
  font-weight: 800;
  color: #111827;
}

/* Bottom Sticky Navigation Bar */
.reg-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.85rem 0;
  z-index: 999;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
}

.reg-bottom-bar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reminder-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
}

.timer-circle-badge {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  color: #ffffff;
  background: transparent;
  flex-shrink: 0;
  letter-spacing: -0.02em;
}

.reminder-text {
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
}

.btn-selanjutnya {
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 0.7rem 2.2rem;
  border-radius: 99px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.25);
}

.btn-selanjutnya:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

/* Success Screen */
.success-screen {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 600px;
  margin: 3rem auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.success-lottie-badge {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
}

.success-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
}

.success-desc {
  color: #4b5563;
  margin-bottom: 2rem;
}

.success-summary {
  background: #F9F7F7;
  padding: 1.2rem;
  border-radius: 10px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.success-actions {
  margin-top: 2.2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

@media (max-width: 480px) {
  .success-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
    width: 100%;
  }

  .btn-primary-home,
  .btn-secondary-download {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-size: 0.85rem;
  }
}

.btn-primary-home {
  background: #111827;
  color: #ffffff;
  border: none;
  padding: 0.8rem 2.2rem;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary-home:hover {
  background: #1f2937;
}

.btn-secondary-download {
  background: #ffffff;
  color: #111827;
  border: 1px solid #d1d5db;
  padding: 0.8rem 2.2rem;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-secondary-download:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

@media print {
  body {
    background: none !important;
  }
  
  body * {
    visibility: hidden;
  }
  
  .success-screen,
  .success-screen * {
    visibility: visible;
  }
  
  .success-screen {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 600px;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .success-actions {
    display: none !important;
  }
}

/* Responsive Media Queries */
@media (max-width: 960px) {
  .registration-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .left-column,
  .right-column {
    display: contents;
  }

  .event-card {
    order: 1;
  }

  .voucher-card {
    order: 2;
  }

  .form-card {
    order: 3;
  }

  .summary-card {
    order: 4;
  }
}

@media (max-width: 768px) {
  .reg-header-container {
    padding: 0 1rem;
  }

  .logo-img {
    height: 24px;
  }

  .reg-main-container {
    padding: 0 1rem;
    margin: 1rem auto 2rem;
    max-width: 480px;
    box-sizing: border-box;
  }

  .page-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .registration-grid {
    gap: 0.85rem;
    width: 100%;
  }

  .form-card,
  .sidebar-card {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  }

  .phone-input-group {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  .country-code-select {
    width: 72px;
    flex-shrink: 0;
  }

  .phone-input {
    flex: 1;
    min-width: 0;
  }

  .reg-bottom-bar-container {
    padding: 0 1rem;
    max-width: 480px;
    margin: 0 auto;
  }

  .card-header-collapsible {
    padding: 0.75rem 0.85rem;
    gap: 0.65rem;
  }

  .card-header-bottom-row {
    padding-top: 0.45rem;
  }

  .card-title {
    font-size: 0.8rem;
    font-weight: 800;
  }

  .ticket-subtext {
    font-size: 0.64rem;
    color: #94a3b8;
  }

  .toggle-label {
    font-size: 0.68rem;
    color: #94a3b8;
  }

  .toggle-container {
    gap: 0.5rem;
  }

  .toggle-slider {
    width: 26px;
    height: 15px;
  }

  .toggle-slider:before {
    height: 11px;
    width: 11px;
    left: 2px;
    bottom: 2px;
  }

  input[type="checkbox"]:checked + .toggle-slider:before {
    transform: translateX(11px);
  }

  .card-body {
    padding: 0.85rem;
    gap: 0.75rem;
  }

  .form-label {
    font-size: 0.7rem;
  }

  .form-input,
  .form-select,
  .country-code-select {
    padding: 0.45rem 0.65rem;
    font-size: 0.75rem;
    border-radius: 6px;
  }

  .sidebar-card {
    padding: 0.85rem;
    border-radius: 10px;
  }

  .sidebar-card-title {
    font-size: 0.85rem;
    margin-bottom: 0.65rem;
  }

  .sti-name {
    font-size: 0.75rem;
  }

  .badge-category-mini {
    font-size: 0.6rem;
  }

  .sti-price {
    font-size: 0.75rem;
  }

  .sti-icon-box {
    width: 26px;
    height: 26px;
  }

  .summary-breakdown {
    font-size: 0.75rem;
    gap: 0.45rem;
  }

  .total-amount {
    font-size: 0.88rem;
  }

  .voucher-input {
    padding: 0.45rem 0.65rem;
    font-size: 0.75rem;
  }

  .btn-voucher-submit {
    padding: 0.45rem 0.85rem;
    font-size: 0.75rem;
  }

  .btn-add-voucher {
    font-size: 0.72rem;
  }

  .reminder-pill {
    padding: 0;
    gap: 0.4rem;
  }

  .timer-circle-badge {
    width: 28px;
    height: 28px;
    font-size: 0.55rem;
    border-width: 1.5px;
  }

  .reminder-text {
    font-size: 0.65rem;
  }

  .btn-selanjutnya {
    padding: 0.42rem 1.1rem;
    font-size: 0.75rem;
  }

  .success-screen {
    padding: 2rem 1.25rem;
    margin: 1.5rem auto;
    border-radius: 12px;
  }

  .success-lottie-badge {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  .success-title {
    font-size: 1.45rem;
  }

  .success-desc {
    font-size: 0.82rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  .success-summary {
    padding: 1rem;
  }

  .success-summary h3 {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .success-summary p {
    font-size: 0.78rem;
    margin-bottom: 0.4rem;
  }

  .success-summary p:last-child {
    margin-bottom: 0;
  }
}
</style>
