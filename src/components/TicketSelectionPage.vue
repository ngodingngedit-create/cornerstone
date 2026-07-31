<template>
  <div class="ticket-selection-page font-tech">
    <!-- Header Navbar -->
    <header class="ts-header font-tech">
      <div class="ts-header-container">
        <a href="#" class="logo-link" @click.prevent="$emit('go-back')">
          <img src="/R2C-Main Logo-White 2.avif" alt="R2C27 Logo" class="logo-img" />
        </a>

        <!-- Hamburger Sidebar Menu Toggle Button -->
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
              <a href="#" class="sidebar-link" @click.prevent="$emit('go-back'); headerMenuOpen = false">HOME</a>
              <a href="#collective" class="sidebar-link" @click="$emit('go-back'); headerMenuOpen = false">COLLECTIVE</a>
              <a href="#agenda" class="sidebar-link" @click="$emit('go-back'); headerMenuOpen = false">PROGRAMS</a>
              <a href="#speakers" class="sidebar-link" @click="$emit('go-back'); headerMenuOpen = false">SPEAKERS</a>
              <a href="#faq" class="sidebar-link" @click="$emit('go-back'); headerMenuOpen = false">FAQ</a>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Main Container -->
    <div class="ts-main-container">
      <!-- Content Grid: Left (Pass Selection Categories & Cards), Right (Sidebar Summary on Desktop) -->
      <div class="ts-content-grid">
        <!-- LEFT COLUMN: Categories & Ticket Cards -->
        <div class="ts-left-col">
          <!-- CATEGORY ACCORDIONS (Early Bird & Regular) -->
          <div 
            v-for="cat in categories" 
            :key="cat.key" 
            class="outer-category-card"
          >
            <!-- Category Header -->
            <div 
              class="category-header" 
              @click="accordionState[cat.key] = !accordionState[cat.key]"
            >
              <div class="category-header-info">
                <h2 class="category-title font-display">{{ cat.name }}</h2>
              </div>

              <div class="category-header-right">
                <svg 
                  class="chevron-icon" 
                  :class="{ 'rotated': !accordionState[cat.key] }"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            </div>

            <!-- Category Body with Custom Ticket Cards -->
            <div v-show="accordionState[cat.key]" class="category-body">
              <div 
                v-for="ticket in cat.tickets" 
                :key="ticket.id" 
                class="custom-ticket-card"
                :class="{ 
                  'ticket-locked': (ticket.requiresBundle && !canAddTicket(ticket)) || ticket.soldOut,
                  'ticket-is-sold-out': ticket.soldOut 
                }"
              >
                <!-- Side Notches (Ticket Stub Effect) -->
                <div class="card-notch notch-left"></div>
                <div class="card-notch notch-right"></div>

                <!-- CARD TOP HEADER ROW -->
                <div class="ticket-header-row" @click="toggleTicketDetails(ticket.id)">
                  <div class="ticket-title-area">
                    <h3 class="ticket-main-title font-display">{{ ticket.name }}</h3>

                    <!-- Mini Status Badge Pill -->
                    <div 
                      class="status-badge-pill" 
                      :class="ticket.soldOut ? 'status-sold-out' : 'status-selling'"
                    >
                      <svg v-if="!ticket.soldOut" class="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 16 14"></polyline>
                      </svg>
                      <svg v-else class="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      <span>{{ ticket.soldOut ? 'TERJUAL HABIS' : 'PENJUALAN BERLANGSUNG' }}</span>
                    </div>
                  </div>

                  <div class="ticket-header-right">
                    <div class="price-stack">
                      <span class="price-label">Harga</span>
                      <span class="price-amount font-display">Rp {{ ticket.price.toLocaleString('id-ID') }}</span>
                    </div>
                    <button class="btn-chevron-toggle" aria-label="Toggle accordion">
                      <svg 
                        class="chevron-arrow" 
                        :class="{ 'is-open': expandedTickets.includes(ticket.id) }"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- CARD MIDDLE EXPANDABLE CONTENT (Tanggal Event & Informasi Tiket) -->
                <div v-show="expandedTickets.includes(ticket.id)" class="ticket-middle-content">
                  <!-- Tanggal Event Section -->
                  <div class="info-section">
                    <span class="section-label">Tanggal Event</span>
                    <div class="event-date-row">
                      <div class="calendar-badge">
                        <span class="cal-day">{{ ticket.calDay }}</span>
                        <span class="cal-num font-display">{{ ticket.calNum }}</span>
                        <span class="cal-month">{{ ticket.calMonth }}</span>
                      </div>
                      <span class="validity-text">Masa berlaku: <strong>{{ ticket.validityText }}</strong></span>
                    </div>
                  </div>

                  <div class="divider-line"></div>

                  <!-- Informasi Tiket Section -->
                  <div class="info-section">
                    <span class="section-label">Informasi Tiket</span>
                    <div class="features-row">
                      <!-- Age Requirement Feature -->
                      <div class="feature-item highlight-age">
                        <svg class="feat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Kategori Umur: <strong>{{ ticket.ageText }}</strong></span>
                      </div>

                      <div class="feature-item">
                        <svg class="feat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>E-Ticket Konfirmasi Instan</span>
                      </div>

                      <div class="feature-item">
                        <svg class="feat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                          <path d="M12 12h.01"></path>
                        </svg>
                        <span>Akses Conference & Kit</span>
                      </div>

                      <div class="feature-item">
                        <svg class="feat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        <span>Termasuk Pajak 10%</span>
                      </div>

                      <div class="feature-item">
                        <svg class="feat-icon alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        </svg>
                        <span>Tidak Bisa Refund</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CARD BOTTOM ROW (+ Tambah Button on Right, ABOVE Expiry Text) -->
                <div class="ticket-bottom-row">
                  <div class="bottom-right-stack">
                    <div class="action-block">
                      <!-- Sold Out Disabled Button -->
                      <div v-if="ticket.soldOut" class="btn-sold-out-disabled font-tech">
                        Terjual Habis
                      </div>

                      <!-- Locked state notice for Extra Youth -->
                      <div v-else-if="ticket.requiresBundle && !canAddTicket(ticket)" class="locked-notice">
                        <svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Butuh Paket "Adult + Youth"</span>
                      </div>

                      <!-- Add Button or Qty Counter -->
                      <div v-else-if="ticket.qty === 0">
                        <button 
                          class="btn-add-pill font-tech" 
                          @click.stop="updateQty(ticket, 1)"
                        >
                          + Tambah
                        </button>
                      </div>

                      <div v-else class="qty-counter" @click.stop>
                        <button class="qty-btn" @click="updateQty(ticket, ticket.qty - 1)">-</button>
                        <span class="qty-num font-tech">{{ ticket.qty }}</span>
                        <button class="qty-btn" @click="updateQty(ticket, ticket.qty + 1)">+</button>
                      </div>
                    </div>

                    <div class="expiry-block">
                      <span class="expiry-label">Berakhir pada: <br class="expiry-break" /><strong class="expiry-val font-tech">{{ ticket.expiry }}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTNOTE NOTICE -->
          <div class="footnote-banner font-tech">
            <span class="star font-display">*</span> Extra Youth can only be purchased if the user buys the <strong>"Adult + Youth"</strong> package.
          </div>
        </div>

        <!-- RIGHT COLUMN: Sticky Outer Sidebar Card (Desktop) -->
        <div class="ts-right-col">
          <div class="outer-sidebar-card">
            <!-- Inner White Card containing Header and Content Box -->
            <div class="inner-sidebar-card">
              <div class="sidebar-header">
                <span class="sidebar-title font-display">Tiket Dipilih</span>
                <button 
                  v-if="selectedCount > 0" 
                  class="btn-clear-selection font-tech" 
                  @click="isEditingSidebar = !isEditingSidebar"
                >
                  {{ isEditingSidebar ? 'Selesai' : 'Ubah' }}
                </button>
              </div>

              <!-- Empty State -->
              <div v-if="selectedCount === 0" class="sidebar-empty-box">
                <div class="ticket-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="6" width="18" height="12" rx="3" />
                    <circle cx="3" cy="12" r="2" fill="#ffffff" />
                    <circle cx="21" cy="12" r="2" fill="#ffffff" />
                    <line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="2 2" />
                  </svg>
                </div>
                <p class="empty-text font-tech">Pilih tiket terlebih dahulu</p>
              </div>

              <!-- Selected List with Divider Lines between Items -->
              <div v-else class="selected-tickets-list custom-scroll">
                <div 
                  v-for="t in selectedTickets" 
                  :key="t.id" 
                  class="selected-item"
                >
                  <div class="selected-item-left">
                    <!-- Ticket Stub Icon -->
                    <div class="selected-item-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"></path>
                        <path d="M13 5v14" stroke-dasharray="2 2"></path>
                      </svg>
                    </div>

                    <div class="selected-item-info">
                      <strong class="selected-item-title">{{ t.name }}</strong>
                      <span class="badge-category-mini">{{ t.category }}</span>
                    </div>
                  </div>

                  <div class="selected-item-right">
                    <div class="selected-item-subtotal font-display">
                      Rp {{ (t.price * t.qty).toLocaleString('id-ID') }}
                    </div>

                    <!-- Delete/Trash Button when in Ubah/Edit mode -->
                    <button 
                      v-if="isEditingSidebar" 
                      class="btn-remove-item"
                      title="Hapus tiket" 
                      @click="removeTicketItem(t)"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Ticket Details Sheet Overlay with Slide-Up Transition -->
    <Transition name="slide-up">
      <div 
        v-if="showMobileDetailModal" 
        class="mobile-detail-overlay" 
        @click.self="showMobileDetailModal = false"
      >
        <div class="mobile-detail-sheet">
          <div class="sheet-drag-pill"></div>
          <div class="outer-sidebar-card">
            <div class="inner-sidebar-card">
              <div class="sidebar-header">
                <span class="sidebar-title font-display">Tiket Dipilih</span>
                <div class="sheet-header-actions">
                  <button 
                    v-if="selectedCount > 0" 
                    class="btn-clear-selection font-tech" 
                    @click="isEditingSidebar = !isEditingSidebar"
                  >
                    {{ isEditingSidebar ? 'Selesai' : 'Ubah' }}
                  </button>
                  <button v-else class="btn-clear-selection font-tech disabled-text">
                    Ubah
                  </button>
                </div>
              </div>

              <div v-if="selectedCount === 0" class="sidebar-empty-box">
                <div class="ticket-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="6" width="18" height="12" rx="3" />
                    <circle cx="3" cy="12" r="2" fill="#ffffff" />
                    <circle cx="21" cy="12" r="2" fill="#ffffff" />
                    <line x1="12" y1="6" x2="12" y2="18" stroke-dasharray="2 2" />
                  </svg>
                </div>
                <p class="empty-text font-tech">Pilih tiket terlebih dahulu</p>
              </div>

              <div v-else class="selected-tickets-list custom-scroll">
                <div 
                  v-for="t in selectedTickets" 
                  :key="t.id" 
                  class="selected-item"
                >
                  <div class="selected-item-left">
                    <div class="selected-item-icon-box">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"></path>
                        <path d="M13 5v14" stroke-dasharray="2 2"></path>
                      </svg>
                    </div>

                    <div class="selected-item-info">
                      <strong class="selected-item-title">{{ t.name }}</strong>
                      <span class="badge-category-mini">{{ t.category }}</span>
                    </div>
                  </div>

                  <div class="selected-item-right">
                    <div class="selected-item-subtotal font-display">
                      Rp {{ (t.price * t.qty).toLocaleString('id-ID') }}
                    </div>

                    <button 
                      v-if="isEditingSidebar" 
                      class="btn-remove-item"
                      title="Hapus tiket" 
                      @click="removeTicketItem(t)"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Bottom Sheet Buy Button -->
              <div class="sheet-buy-block">
                <button 
                  class="btn-buy-now font-tech" 
                  :disabled="totalQuantity === 0"
                  @click="handleBuyTickets"
                >
                  Beli Tiket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Desktop Sticky Bottom Bar (Light background with left label & right black Beli Tiket button) -->
    <div class="ts-desktop-bottom-bar font-tech">
      <div class="desktop-bottom-bar-container">
        <div class="desktop-total-stack">
          <span class="desktop-total-label">Total ({{ totalQuantity }}) Tiket</span>
          <strong class="desktop-total-amount font-display">Rp {{ grandTotal.toLocaleString('id-ID') }}</strong>
        </div>

        <button 
          class="btn-desktop-buy font-tech" 
          :disabled="totalQuantity === 0"
          @click="proceedToFormData"
        >
          Beli Tiket
        </button>
      </div>
    </div>

    <!-- Mobile Bottom Sticky Bar -->
    <div class="ts-mobile-bottom-bar font-tech">
      <div class="bottom-bar-container">
        <!-- Top Row: Compact Total Harga & Simple Detail Text Button -->
        <div class="bottom-bar-top-row">
          <div class="total-price-stack">
            <span class="total-label">Total Harga</span>
            <strong class="total-amount font-display">Rp {{ grandTotal.toLocaleString('id-ID') }}</strong>
          </div>

          <button 
            class="btn-detail-text font-tech" 
            @click="showMobileDetailModal = !showMobileDetailModal"
          >
            <span>Detail ({{ totalQuantity }})</span>
            <svg 
              class="chevron-detail-icon" 
              :class="{ 'is-open': showMobileDetailModal }"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>

        <!-- Bottom Row: Full Width "Beli Tiket Sekarang" Button -->
        <div class="bottom-bar-action-row">
          <button 
            class="btn-buy-now font-tech" 
            :disabled="totalQuantity === 0"
            @click="proceedToFormData"
          >
            Beli Tiket Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const emit = defineEmits(['go-back', 'proceed-to-form'])

// Accordion open/close states for categories (open by default)
const accordionState = reactive({
  early_bird: true,
  regular: true
})

// Sidebar edit/delete mode toggle
const isEditingSidebar = ref(false)

// Header mobile sidebar menu toggle
const headerMenuOpen = ref(false)

// Mobile details sheet modal toggle
const showMobileDetailModal = ref(false)

// Expanded ticket detail cards IDs - DEFAULT CLOSED
const expandedTickets = ref([])

// Structured categories
const categories = ref([
  {
    key: 'early_bird',
    name: 'Early Bird',
    dateRange: '9 Aug - 10 Oct 2026',
    tickets: [
      {
        id: 'eb_adult',
        name: 'Adult',
        category: 'Early Bird',
        price: 450000,
        calDay: 'Sun',
        calNum: '9',
        calMonth: 'Aug',
        validityText: '9 Aug - 10 Oct 2026',
        expiry: '10 Oktober 2026, 23:59:59 WIB',
        ageText: 'Adult (≥30 years old)',
        qty: 0,
        soldOut: false,
        requiresBundle: false
      },
      {
        id: 'eb_youth',
        name: 'Youth',
        category: 'Early Bird',
        price: 450000,
        calDay: 'Sun',
        calNum: '9',
        calMonth: 'Aug',
        validityText: '9 Aug - 10 Oct 2026',
        expiry: '10 Oktober 2026, 23:59:59 WIB',
        ageText: 'Youth (<30 years old)',
        qty: 0,
        soldOut: true,
        requiresBundle: false
      },
      {
        id: 'eb_adult_youth',
        name: 'Adult + Youth',
        category: 'Early Bird',
        price: 700000,
        calDay: 'Sun',
        calNum: '9',
        calMonth: 'Aug',
        validityText: '9 Aug - 10 Oct 2026',
        expiry: '10 Oktober 2026, 23:59:59 WIB',
        ageText: 'Adult (≥30 years old) & Youth (<30 years old)',
        qty: 0,
        soldOut: false,
        requiresBundle: false
      },
      {
        id: 'eb_extra_youth',
        name: '+Extra Youth*',
        category: 'Early Bird',
        price: 350000,
        calDay: 'Sun',
        calNum: '9',
        calMonth: 'Aug',
        validityText: '9 Aug - 10 Oct 2026',
        expiry: '10 Oktober 2026, 23:59:59 WIB',
        ageText: 'Youth (<30 years old)',
        qty: 0,
        soldOut: false,
        requiresBundle: true,
        parentBundleId: 'eb_adult_youth'
      }
    ]
  },
  {
    key: 'regular',
    name: 'Regular',
    dateRange: '11 Oct 2026 - 18 Feb 2027',
    tickets: [
      {
        id: 'reg_adult',
        name: 'Adult',
        category: 'Regular',
        price: 700000,
        calDay: 'Sun',
        calNum: '11',
        calMonth: 'Oct',
        validityText: '11 Oct 2026 - 18 Feb 2027',
        expiry: '18 Februari 2027, 23:59:59 WIB',
        ageText: 'Adult (≥30 years old)',
        qty: 0,
        soldOut: false,
        requiresBundle: false
      },
      {
        id: 'reg_youth',
        name: 'Youth',
        category: 'Regular',
        price: 700000,
        calDay: 'Sun',
        calNum: '11',
        calMonth: 'Oct',
        validityText: '11 Oct 2026 - 18 Feb 2027',
        expiry: '18 Februari 2027, 23:59:59 WIB',
        ageText: 'Youth (<30 years old)',
        qty: 0,
        soldOut: false,
        requiresBundle: false
      },
      {
        id: 'reg_adult_youth',
        name: 'Adult + Youth',
        category: 'Regular',
        price: 900000,
        calDay: 'Sun',
        calNum: '11',
        calMonth: 'Oct',
        validityText: '11 Oct 2026 - 18 Feb 2027',
        expiry: '18 Februari 2027, 23:59:59 WIB',
        ageText: 'Adult (≥30 years old) & Youth (<30 years old)',
        qty: 0,
        soldOut: false,
        requiresBundle: false
      },
      {
        id: 'reg_extra_youth',
        name: '+Extra Youth*',
        category: 'Regular',
        price: 400000,
        calDay: 'Sun',
        calNum: '11',
        calMonth: 'Oct',
        validityText: '11 Oct 2026 - 18 Feb 2027',
        expiry: '18 Februari 2027, 23:59:59 WIB',
        ageText: 'Youth (<30 years old)',
        qty: 0,
        soldOut: false,
        requiresBundle: true,
        parentBundleId: 'reg_adult_youth'
      }
    ]
  }
])

// Flat array of all tickets
const allTickets = computed(() => {
  const list = []
  categories.value.forEach(cat => {
    cat.tickets.forEach(t => list.push(t))
  })
  return list
})

// Validation: +Extra Youth* can only be added if parent bundle qty > 0 and ticket is not sold out
const canAddTicket = (ticket) => {
  if (ticket.soldOut) return false
  if (!ticket.requiresBundle) return true
  const parent = allTickets.value.find(t => t.id === ticket.parentBundleId)
  return parent ? parent.qty > 0 : false
}

const toggleTicketDetails = (id) => {
  if (expandedTickets.value.includes(id)) {
    expandedTickets.value = expandedTickets.value.filter(item => item !== id)
  } else {
    expandedTickets.value.push(id)
  }
}

const updateQty = (ticket, newQty) => {
  if (ticket.soldOut) return
  const targetQty = Math.max(0, newQty)
  if (targetQty > ticket.qty && !canAddTicket(ticket)) {
    return
  }
  ticket.qty = targetQty

  // Reset extra youth if parent bundle becomes 0
  if (ticket.id === 'eb_adult_youth' && ticket.qty === 0) {
    const extra = allTickets.value.find(t => t.id === 'eb_extra_youth')
    if (extra) extra.qty = 0
  }
  if (ticket.id === 'reg_adult_youth' && ticket.qty === 0) {
    const extra = allTickets.value.find(t => t.id === 'reg_extra_youth')
    if (extra) extra.qty = 0
  }
}

const removeTicketItem = (ticket) => {
  updateQty(ticket, 0)
  if (selectedTickets.value.length === 0) {
    isEditingSidebar.value = false
    showMobileDetailModal.value = false
  }
}

const resetAllQty = () => {
  allTickets.value.forEach(t => t.qty = 0)
  isEditingSidebar.value = false
  showMobileDetailModal.value = false
}

const selectedTickets = computed(() => {
  return allTickets.value.filter(t => t.qty > 0)
})

const selectedCount = computed(() => selectedTickets.value.length)

const totalQuantity = computed(() => {
  return allTickets.value.reduce((sum, t) => sum + t.qty, 0)
})

const grandTotal = computed(() => {
  return allTickets.value.reduce((sum, t) => sum + (t.price * t.qty), 0)
})

const proceedToFormData = () => {
  if (totalQuantity.value > 0) {
    emit('proceed-to-form', {
      selectedTickets: selectedTickets.value,
      totalQuantity: totalQuantity.value,
      grandTotal: grandTotal.value
    })
  }
}
</script>

<style scoped>
.ticket-selection-page {
  min-height: 100vh;
  background-color: #ffffff;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  padding-bottom: 65px;
}

/* Header Navbar */
.ts-header {
  background: #000000;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.ts-header-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-img {
  height: 34px;
  width: auto;
  object-fit: contain;
}

.mobile-toggle {
  background: transparent;
  border: none;
  padding: 0;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.mobile-toggle:hover {
  opacity: 0.8;
}

/* MOBILE SIDEBAR MENU DRAWER STYLES */
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
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-fade-enter-active .mobile-sidebar-panel,
.sidebar-fade-leave-active .mobile-sidebar-panel {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}

.sidebar-fade-enter-from .mobile-sidebar-panel,
.sidebar-fade-leave-to .mobile-sidebar-panel {
  transform: translateX(100%);
}

/* Main Container */
.ts-main-container {
  max-width: 1600px;
  width: 100%;
  margin: 1.2rem auto;
  padding: 0 1.5rem;
  flex: 1;
}

.ts-content-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1rem;
  align-items: start;
}

.ts-left-col {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

/* STICKY RIGHT COLUMN FOR SIDEBAR CARD (Desktop Only) */
.ts-right-col {
  position: sticky;
  top: 80px;
  z-index: 10;
}

/* Outer Category Card */
.outer-category-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.9rem 1.05rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.category-header-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.category-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.category-header-right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.chevron-icon {
  width: 18px;
  height: 18px;
  color: #0f172a;
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.category-body {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.75rem;
}

/* CUSTOM TICKET CARD */
.custom-ticket-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.custom-ticket-card.ticket-is-sold-out {
  background: #fafafa;
  border-color: #f1f5f9;
}

/* Side Notches */
.card-notch {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 22px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  transform: translateY(-50%);
  z-index: 2;
}

.notch-left {
  left: -6px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-left: none;
}

.notch-right {
  right: -6px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-right: none;
}

/* CARD TOP HEADER ROW - Scaled Down Typography */
.ticket-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 0.85rem 1.25rem;
  cursor: pointer;
  user-select: none;
}

.ticket-is-sold-out .ticket-header-row {
  background: #fafafa;
}

.ticket-title-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ticket-main-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.ticket-is-sold-out .ticket-main-title {
  color: #64748b;
}

/* MICRO STATUS BADGE PILL (Scaled Down) */
.status-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.55rem;
  font-weight: 800;
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  width: fit-content;
  margin-top: 0.2rem;
  letter-spacing: 0.02em;
}

.status-badge-pill.status-selling {
  background: #e6f7ef;
  color: #10b981;
}

.status-badge-pill.status-sold-out {
  background: #fee2e2;
  color: #dc2626;
}

.clock-icon {
  width: 9px;
  height: 9px;
  flex-shrink: 0;
}

.ticket-header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1rem;
  border-left: 1px solid #f1f5f9;
}

.price-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-label {
  font-size: 0.64rem;
  color: #94a3b8;
  font-weight: 600;
}

.price-amount {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
}

.ticket-is-sold-out .price-amount {
  color: #64748b;
}

.btn-chevron-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.15rem;
  color: #475569;
  display: flex;
  align-items: center;
}

.chevron-arrow {
  width: 15px;
  height: 15px;
  transition: transform 0.25s ease;
}

.chevron-arrow.is-open {
  transform: rotate(180deg);
}

/* CARD MIDDLE EXPANDABLE CONTENT - Scaled Down */
.ticket-middle-content {
  background: #f8fafc;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ticket-is-sold-out .ticket-middle-content {
  background: #f8fafc;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.section-label {
  font-size: 0.66rem;
  color: #94a3b8;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.event-date-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.calendar-badge {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 38px;
  line-height: 1.1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.ticket-is-sold-out .calendar-badge {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.cal-day {
  font-size: 0.58rem;
  color: #94a3b8;
  font-weight: 700;
}

.cal-num {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.ticket-is-sold-out .cal-num {
  color: #64748b;
}

.cal-month {
  font-size: 0.58rem;
  color: #0f172a;
  font-weight: 800;
}

.ticket-is-sold-out .cal-month {
  color: #64748b;
}

.validity-text {
  font-size: 0.78rem;
  color: #334155;
}

.ticket-is-sold-out .validity-text {
  color: #64748b;
}

.divider-line {
  height: 1px;
  background: #e2e8f0;
  width: 100%;
}

.features-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #334155;
  background: transparent;
  padding: 0;
  border: none;
}

.feature-item.highlight-age {
  color: #0f172a;
}

.feature-item.highlight-age strong {
  color: #0f172a;
  font-weight: 700;
}

.ticket-is-sold-out .feature-item {
  color: #94a3b8;
}

.ticket-is-sold-out .feature-item.highlight-age {
  color: #64748b;
}

.ticket-is-sold-out .feature-item.highlight-age strong {
  color: #64748b;
}

.feat-icon {
  width: 13px;
  height: 13px;
  color: #0f172a;
  flex-shrink: 0;
}

.ticket-is-sold-out .feat-icon {
  color: #94a3b8;
}

.feat-icon.alert {
  color: #dc2626;
}

.ticket-is-sold-out .feat-icon.alert {
  color: #94a3b8;
}

/* CARD BOTTOM ROW (+ Tambah Button on Right, Expiry Text on Left) */
.ticket-bottom-row {
  background: #f8fafc;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-right-stack {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 0.35rem;
  width: 100%;
}

.expiry-break {
  display: none;
}

.expiry-block {
  display: flex;
  align-items: center;
}

.expiry-label {
  font-size: 0.62rem;
  color: #94a3b8;
  font-weight: 600;
}

.expiry-val {
  font-size: 0.72rem;
  font-weight: 800;
  color: #0f172a;
}

.ticket-is-sold-out .expiry-val {
  color: #64748b;
}

.action-block {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-add-pill {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 0.42rem 1.3rem;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-add-pill:hover {
  background: #1e293b;
  transform: translateY(-1px);
}

.btn-sold-out-disabled {
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #cbd5e1;
  padding: 0.42rem 1.2rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.78rem;
  cursor: not-allowed;
  user-select: none;
}

.qty-counter {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #ffffff;
  padding: 0.18rem 0.45rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}

.qty-btn {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-weight: 800;
  font-size: 0.9rem;
  color: #0f172a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.qty-btn:hover {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
}

.qty-num {
  font-weight: 800;
  font-size: 0.85rem;
  min-width: 16px;
  text-align: center;
  color: #0f172a;
}

.locked-notice {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  color: #475569;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 0.32rem 0.65rem;
  border-radius: 6px;
  font-weight: 700;
}

.lock-icon {
  width: 12px;
  height: 12px;
  color: #475569;
}

/* Footnote Banner */
.footnote-banner {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.65rem 0.95rem;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.4;
}

.footnote-banner .star {
  color: #0f172a;
  font-weight: 800;
  font-size: 0.85rem;
}

/* Sidebar Right Outer & Inner Card */
.outer-sidebar-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.85rem;
}

.inner-sidebar-card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
}

.sheet-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.btn-clear-selection {
  background: transparent;
  border: none;
  color: #0f172a;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.15s ease;
}

.btn-clear-selection:hover {
  text-decoration: underline;
}

.sidebar-empty-box {
  background: #ffffff;
  border: 1.5px dashed #e2e8f0;
  border-radius: 8px;
  padding: 1.8rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ticket-icon {
  margin-bottom: 0.6rem;
  opacity: 0.75;
}

.empty-text {
  font-size: 0.78rem;
  color: #94a3b8;
  font-weight: 700;
}

/* Selected List with vertical scrollbar when > 4 items */
.selected-tickets-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 290px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

/* Custom Scrollbar */
.custom-scroll::-webkit-scrollbar {
  width: 5px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* SELECTED ITEM */
.selected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: none;
  transition: background-color 0.15s ease;
}

.selected-item:last-child {
  border-bottom: none;
}

.selected-item-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex: 1;
  min-width: 0;
}

.selected-item-icon-box {
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

.selected-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.selected-item-title {
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Category badge positioned directly below title */
.badge-category-mini {
  font-size: 0.68rem;
  color: #64748b;
  font-weight: 500;
  line-height: 1.2;
}

.selected-item-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.selected-item-subtotal {
  font-weight: 800;
  color: #0f172a;
  font-size: 0.92rem;
  white-space: nowrap;
}

.btn-remove-item {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #dc2626;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.btn-remove-item:hover {
  background: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
}

/* MOBILE TICKET DETAIL SHEET OVERLAY & ANIMATION */
.mobile-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 105;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-detail-sheet {
  width: 100%;
  max-width: 100%;
  position: relative;
  background: #ffffff;
  border-radius: 20px 20px 0 0;
  padding: 0.6rem 1rem 1.5rem 1rem;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.25);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.sheet-drag-pill {
  width: 42px;
  height: 4.5px;
  background: #e2e8f0;
  border-radius: 10px;
  margin: 0.3rem auto 0.8rem auto;
}

.mobile-detail-sheet .outer-sidebar-card {
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.mobile-detail-sheet .inner-sidebar-card {
  border: none;
  background: transparent;
  padding: 0;
}

.mobile-detail-sheet .sidebar-header {
  padding-bottom: 0.85rem;
  border-bottom: none;
}

.mobile-detail-sheet .sidebar-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.btn-clear-selection.disabled-text {
  color: #000000;
  font-weight: 700;
  font-size: 0.85rem;
  opacity: 1;
  cursor: default;
}

.sheet-buy-block {
  margin-top: 1.25rem;
  width: 100%;
}

.sheet-buy-block .btn-buy-now {
  width: 100%;
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 0.82rem 1.5rem;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.sheet-buy-block .btn-buy-now:disabled {
  background: #000000;
  color: #ffffff;
  opacity: 1;
  box-shadow: none;
  cursor: pointer;
}

.slide-up-enter-from {
  opacity: 0;
}

.slide-up-enter-from .mobile-detail-sheet {
  transform: translateY(100%);
}

.slide-up-leave-to {
  opacity: 0;
}

.slide-up-leave-to .mobile-detail-sheet {
  transform: translateY(100%);
}

.btn-close-sheet {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.75rem;
  cursor: pointer;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* DESKTOP STICKY BOTTOM BAR */
.ts-desktop-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
  z-index: 90;
  padding: 0.55rem 0;
}

.desktop-bottom-bar-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.desktop-total-stack {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.desktop-total-label {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 600;
}

.desktop-total-amount {
  font-size: 1.05rem;
  font-weight: 800;
  color: #ffffff;
}

.btn-desktop-buy {
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 0.52rem 1.6rem;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.1);
}

.btn-desktop-buy:hover:not(:disabled) {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.btn-desktop-buy:disabled {
  background: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.38);
  box-shadow: none;
  cursor: not-allowed;
}

/* MOBILE BOTTOM STICKY BAR */
.ts-mobile-bottom-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.4);
  z-index: 90;
  padding: 0.75rem 0;
}

.bottom-bar-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

/* Top Row inside Bottom Bar */
.bottom-bar-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.total-price-stack {
  display: flex;
  flex-direction: column;
}

.total-label {
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 600;
  line-height: 1.2;
}

.total-amount {
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.25;
}

/* Simple Clean Detail Text Button */
.btn-detail-text {
  background: transparent;
  color: #ffffff;
  border: none;
  padding: 0.2rem 0;
  font-size: 0.82rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-detail-text:hover {
  opacity: 0.85;
  text-decoration: underline;
}

.chevron-detail-icon {
  width: 14px;
  height: 14px;
  color: #ffffff;
  transition: transform 0.25s ease;
}

.chevron-detail-icon.is-open {
  transform: rotate(180deg);
}

/* Bottom Action Row: Wide Full-Width "Beli Tiket Sekarang" Button */
.bottom-bar-action-row {
  width: 100%;
}

.btn-buy-now {
  width: 100%;
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 0.72rem 1.5rem;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  text-align: center;
}

.btn-buy-now:hover:not(:disabled) {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.btn-buy-now:disabled {
  background: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.38);
  box-shadow: none;
  cursor: not-allowed;
}

/* RESPONSIVE MEDIA QUERIES FOR DESKTOP, TABLET & MOBILE */
@media (max-width: 1280px) {
  .ts-content-grid {
    grid-template-columns: 1fr 320px;
    gap: 0.9rem;
  }
}

@media (max-width: 1024px) {
  .ticket-selection-page {
    padding-bottom: 120px;
  }

  .ts-desktop-bottom-bar {
    display: none;
  }

  .ts-mobile-bottom-bar {
    display: block;
  }

  .ts-content-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  
  /* On Mobile / Tablet, hide sidebar from page flow */
  .ts-right-col {
    display: none;
  }

  .selected-tickets-list {
    max-height: 320px;
  }
}

@media (max-width: 768px) {
  .ts-main-container {
    padding: 0 1.2rem;
    margin: 1rem auto;
  }

  .category-title {
    font-size: 1.05rem;
  }

  .ticket-main-title {
    font-size: 0.98rem;
  }

  .price-amount {
    font-size: 0.98rem;
  }

  .total-amount {
    font-size: 1.05rem;
  }

  .btn-buy-now {
    font-size: 0.9rem;
    padding: 0.68rem 1.2rem;
  }

  .btn-add-pill {
    font-size: 0.7rem;
    padding: 0.32rem 0.85rem;
    border-radius: 5px;
  }

  .btn-sold-out-disabled {
    font-size: 0.68rem;
    padding: 0.32rem 0.85rem;
    border-radius: 5px;
  }

  .expiry-break {
    display: block;
  }

  .expiry-label {
    font-size: 0.52rem;
    line-height: 1.3;
  }

  .expiry-val {
    font-size: 0.52rem;
  }
}

@media (max-width: 640px) {
  .ts-main-container {
    padding: 0 0.85rem;
    margin: 0.8rem auto;
  }

  .ts-header-container {
    padding: 0 0.85rem;
  }

  .logo-img {
    height: 28px;
  }

  .outer-category-card {
    padding: 0.8rem 0.85rem;
  }

  .category-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .ticket-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.75rem 0.85rem;
  }

  .ticket-header-right {
    width: 100%;
    padding-left: 0;
    border-left: none;
    border-top: 1px solid #f1f5f9;
    padding-top: 0.4rem;
    justify-content: space-between;
  }

  .price-stack {
    align-items: flex-start;
  }

  .ticket-middle-content {
    padding: 0.75rem 0.85rem;
  }

  .features-row {
    gap: 0.4rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .ticket-bottom-row {
    padding: 0.75rem 0.85rem;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .bottom-right-stack {
    width: 100%;
    align-items: flex-end;
  }

  .action-block {
    width: 100%;
    justify-content: flex-end;
  }

  .btn-add-pill {
    width: auto;
    min-width: 100px;
  }

  .btn-sold-out-disabled {
    width: auto;
    text-align: center;
  }

  .locked-notice {
    font-size: 0.58rem;
    padding: 0.22rem 0.45rem;
    gap: 0.25rem;
  }

  .lock-icon {
    width: 10px;
    height: 10px;
  }

  .footnote-banner {
    font-size: 0.62rem;
    padding: 0.45rem 0.65rem;
    line-height: 1.35;
  }

  .footnote-banner .star {
    font-size: 0.7rem;
  }

  .selected-item {
    padding: 0.55rem 0;
  }

  .selected-item-icon-box {
    width: 28px;
    height: 28px;
  }

  .selected-item-title {
    font-size: 0.8rem;
  }

  .selected-item-subtotal {
    font-size: 0.85rem;
  }

  .bottom-bar-container {
    padding: 0 1rem;
    gap: 0.55rem;
  }

  .total-amount {
    font-size: 1.05rem;
  }

  .btn-buy-now {
    padding: 0.65rem 1rem;
    font-size: 0.88rem;
  }
}
</style>
