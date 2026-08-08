<template>
  <div class="registration-page is-success-page">
    <!-- Header Navbar (Black Bar like Homepage) -->
    <header class="reg-header font-tech">
      <div class="reg-header-container">
        <!-- Logo Image Left (Matching Homepage) -->
        <router-link to="/" class="logo-link">
          <img src="/R2C-Main Logo-White 2.avif" alt="R2C27 Logo" class="logo-img" />
        </router-link>

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
              <router-link to="/" class="sidebar-link" @click="headerMenuOpen = false">HOME</router-link>
              <a href="/#collective" class="sidebar-link" @click="headerMenuOpen = false">COLLECTIVE</a>
              <a href="/#agenda" class="sidebar-link" @click="headerMenuOpen = false">PROGRAMS</a>
              <a href="/#faq" class="sidebar-link" @click="headerMenuOpen = false">FAQ</a>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Main Content Container -->
    <main class="reg-main-container">
      <!-- Submission Success Screen -->
      <div class="success-screen font-tech">
        <div ref="lottieContainer" class="success-lottie-badge"></div>
        <h2 class="success-title font-display">Pendaftaran Berhasil</h2>
        <p class="success-desc">
          Konfirmasi pendaftaran peserta Rooted Relevant Collective 2027 akan dikirimkan ke email pemesan.
        </p>

        <div class="success-summary">
          <h3 class="font-display mb-3">Ringkasan Pendaftaran</h3>
          <p><strong>Nomor Invoice:</strong> {{ invoiceNumber }}</p>
          <p><strong>Tanggal Daftar:</strong> {{ registrationDate }}</p>
          <p><strong>Jumlah Tiket:</strong> {{ ticketCount }}</p>
          <p><strong>Total Pembayaran:</strong> {{ formatRupiah(grandTotal) }}</p>
          <p><strong>Email Pemesan:</strong> {{ buyerEmail }}</p>
        </div>

        <div class="success-actions">
          <button class="btn-secondary-download font-tech" :disabled="isDownloadBlocked" @click="handleDownload">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {{ isDownloadBlocked ? 'E-Ticket Belum Tersedia' : 'Download E-Ticket' }}
          </button>
          <button class="btn-primary-home font-tech" @click="$router.push('/')">
            Kembali ke Beranda
          </button>
        </div>
        <p v-if="isDownloadBlocked" class="success-status-hint font-tech">
          Transaksi dalam status <strong>{{ paymentStatus }}</strong>, e-ticket baru bisa diunduh setelah pembayaran sukses.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

import { orderStore } from '../store/order'
import { getTransactionFinish, getTransactionDocumentUrl } from '../services/api'

const route = useRoute()

const headerMenuOpen = ref(false)
const lottieContainer = ref(null)
let lottieInstance = null

const invoiceData = ref(null)
const loadingInvoice = ref(true)
const invoiceError = ref('')

const externalId = computed(() => route.params.invoice || orderStore.invoiceNumber || '')

const paymentStatus = computed(() => {
  const data = invoiceData.value
  if (!data) return ''
  return (data.payment_status || data.status || '').toLowerCase()
})

const isDownloadBlocked = computed(() => ['pending', 'expired'].includes(paymentStatus.value))

const invoiceNumber = computed(
  () =>
    (invoiceData.value &&
      (invoiceData.value.invoice_no ||
        invoiceData.value.invoice_number ||
        invoiceData.value.transaction_number ||
        invoiceData.value.invoice_id ||
        invoiceData.value.id)) ||
    externalId.value ||
    '-'
)

const registrationDate = computed(() => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  const raw =
    (invoiceData.value && (invoiceData.value.created_at || invoiceData.value.createdAt || invoiceData.value.date)) || ''
  if (raw) {
    return new Date(raw).toLocaleDateString('id-ID', options)
  }
  return new Date().toLocaleDateString('id-ID', options)
})

const ticketCount = computed(
  () =>
    (invoiceData.value &&
      (invoiceData.value.totalQuantity ||
        invoiceData.value.total_quantity ||
        invoiceData.value.ticketCount ||
        invoiceData.value.ticket_count)) ||
    orderStore.totalQuantity ||
    '-'
)

const grandTotal = computed(
  () =>
    (invoiceData.value &&
      (invoiceData.value.grandTotal || invoiceData.value.grand_total || invoiceData.value.grandtotal)) ||
    orderStore.grandTotal ||
    0
)

const buyerEmail = computed(() => {
  const data = invoiceData.value
  if (data) {
    const buyer = data.buyer || {}
    return buyer.email || buyer.buyer_email || data.buyer_email || data.email || ''
  }
  return orderStore.buyerEmail || '-'
})

const formatRupiah = (val) => {
  return 'Rp ' + Number(val || 0).toLocaleString('id-ID')
}

onMounted(() => {
  if (externalId.value) {
    getTransactionFinish(externalId.value)
      .then((resp) => {
        invoiceData.value = resp?.data || resp || null
      })
      .catch((e) => {
        invoiceError.value = e.message || 'Gagal memuat data invoice.'
      })
      .finally(() => {
        loadingInvoice.value = false
      })
  } else {
    loadingInvoice.value = false
  }

  import('lottie-web')
    .then(({ default: lottie }) => {
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
    })
    .catch(() => {})
})

onBeforeUnmount(() => {
  if (lottieInstance) {
    lottieInstance.destroy()
  }
})

const handleDownload = () => {
  if (!externalId.value || isDownloadBlocked.value) return
  window.location.href = getTransactionDocumentUrl(externalId.value)
}
</script>

<style scoped>
.registration-page {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #111827;
  padding-bottom: 4rem;
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

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}

/* Main Container */
.reg-main-container {
  max-width: 1400px;
  margin: 2rem auto 0;
  padding: 0 2rem;
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

.btn-secondary-download:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary-download:disabled:hover {
  background: #ffffff;
  border-color: #d1d5db;
}

.success-status-hint {
  margin-top: 1rem;
  color: #b45309;
  font-size: 0.85rem;
}

@media (max-width: 480px) {
  .success-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
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

  .success-screen {
    padding: 2rem 1.25rem;
    margin: 1.5rem auto;
  }

  .success-title {
    font-size: 1.4rem;
  }
}
</style>