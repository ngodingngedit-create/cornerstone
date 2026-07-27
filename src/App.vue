<template>
  <div class="app-root">
    <!-- Navbar Sticky Header -->
    <Navbar @open-tickets="openTicketModal('adult')" />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Rooted Relevant Collective Section -->
    <CollectiveSection @open-tickets="openTicketModal('adult')" />

    <!-- Registration & Pass Selection -->
    <RegistrationSection 
      @open-tickets="openTicketModal('adult')" 
      @select-ticket="handleSelectTicket"
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

    <!-- Floating Bottom Mobile Navigation Dock Bar -->
    <MobileNavbar @open-tickets="openTicketModal('adult')" />

    <!-- Ticket Checkout Modal -->
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

const isTicketModalOpen = ref(false)
const selectedTier = ref('adult')

const openTicketModal = (tier = 'adult') => {
  selectedTier.value = tier
  isTicketModalOpen.value = true
}

const handleSelectTicket = (passData) => {
  selectedTier.value = passData.title.toLowerCase().includes('youth') ? 'youth' : 'adult'
  isTicketModalOpen.value = true
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
  background-image: url('/image 2294.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  width: 100%;
}
</style>
