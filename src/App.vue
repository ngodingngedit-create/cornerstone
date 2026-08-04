<template>
  <div class="app-root">
    <!-- View 1: Main Home Landing Page -->
    <div v-if="currentView === 'home'" class="home-view">
      <!-- Navbar Sticky Header -->
      <Navbar @open-tickets="navigateToRegistration" />

      <!-- Hero Section -->
      <HeroSection />

      <!-- Rooted Relevant Collective Section -->
      <CollectiveSection @open-tickets="navigateToRegistration" />

      <!-- Registration & Pass Selection -->
      <RegistrationSection 
        @open-tickets="navigateToRegistration" 
        @select-ticket="navigateToRegistration"
      />

      <!-- Agenda & Schedule Section -->
      <ScheduleSection />

      <!-- Speakers Section -->
      <SpeakersSection />

      <!-- Continuous Background Wrapper for FAQ & Updates Sections -->
      <div class="faq-updates-wrapper">
        <!-- FAQ Accordion Section -->
        <FaqSection />

        <!-- Filmstrip Social Updates Section -->
        <UpdatesSection />
      </div>

      <!-- Footer Section -->
      <FooterSection />

      <!-- Sticky Bottom Bar (hidden) -->
      <!-- <BottomBar @submit="navigateToRegistration" /> -->

      <!-- Floating Bottom Mobile Navigation Dock Bar -->
      <MobileNavbar @open-tickets="navigateToRegistration" />
    </div>

    <!-- View 2: Ticket Selection Page -->
    <TicketSelectionPage 
      v-else-if="currentView === 'ticket-selection'"
      @go-back="navigateToHome"
      @proceed-to-form="navigateToRegistrationForm"
    />

    <!-- View 3: Full Registration Form Page -->
    <RegistrationFormPage 
      v-else-if="currentView === 'registration'"
      :orderData="selectedOrderData" 
      @go-back="navigateToTicketSelection" 
      @go-home="navigateToHome"
    />

    <!-- Ticket Checkout Modal (Optional Fallback) -->
    <TicketModal 
      :isOpen="isTicketModalOpen"
      :initialTier="selectedTier"
      @close="isTicketModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Navbar from './components/Navbar.vue'
import MobileNavbar from './components/MobileNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import CollectiveSection from './components/CollectiveSection.vue'
import TickerBanner from './components/TickerBanner.vue'
import RegistrationSection from './components/RegistrationSection.vue'
import ScheduleSection from './components/ScheduleSection.vue'
import SpeakersSection from './components/SpeakersSection.vue'
import FaqSection from './components/FaqSection.vue'
import UpdatesSection from './components/UpdatesSection.vue'
import FooterSection from './components/FooterSection.vue'
import TicketModal from './components/TicketModal.vue'
import BottomBar from './components/BottomBar.vue'
import TicketSelectionPage from './components/TicketSelectionPage.vue'
import RegistrationFormPage from './components/RegistrationFormPage.vue'

const currentView = ref('home')
const isTicketModalOpen = ref(false)
const selectedTier = ref('adult')
const selectedOrderData = ref(null)

const navigateToRegistration = () => {
  currentView.value = 'ticket-selection'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToTicketSelection = () => {
  currentView.value = 'ticket-selection'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToRegistrationForm = (orderData) => {
  selectedOrderData.value = orderData
  currentView.value = 'registration'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToHome = () => {
  currentView.value = 'home'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openTicketModal = (tier = 'adult') => {
  selectedTier.value = tier
  isTicketModalOpen.value = true
}

const handleSelectTicket = (passData) => {
  selectedTier.value = passData.title.toLowerCase().includes('youth') ? 'youth' : 'adult'
  navigateToRegistration()
}
</script>

<style>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-dark);
}

/* Single Continuous Background Image Wrapper across FAQ and Updates */
.faq-updates-wrapper {
  background-image: url('/image 2294.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  min-height: 500px;
  overflow: hidden;
}
</style>
