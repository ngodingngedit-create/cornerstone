<template>
  <div class="app-root">
    <div class="home-view">
      <!-- Navbar Sticky Header -->
      <Navbar @open-tickets="navigateToEvent" />

      <!-- Hero Section -->
      <HeroSection />

      <!-- Rooted Relevant Collective Section -->
      <CollectiveSection @open-tickets="navigateToEvent" />

      <!-- Registration & Pass Selection -->
      <RegistrationSection
        @open-tickets="navigateToEvent"
        @select-ticket="navigateToEvent"
      />

      <!-- Agenda & Schedule Section -->
      <ScheduleSection />

      <!-- Speakers Section -->
      <!-- <SpeakersSection /> -->

      <!-- Continuous Background Wrapper for FAQ & Updates Sections -->
      <div class="faq-updates-wrapper">
        <FaqSection />
        <UpdatesSection />
      </div>

      <!-- Footer Section -->
      <FooterSection />

      <!-- Sticky Bottom Bar (hidden) -->
      <!-- <BottomBar @submit="navigateToEvent" /> -->

      <!-- Floating Bottom Mobile Navigation Dock Bar -->
      <MobileNavbar @open-tickets="navigateToEvent" />
    </div>

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
import { useRouter } from 'vue-router'

import Navbar from '../components/Navbar.vue'
import MobileNavbar from '../components/MobileNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import CollectiveSection from '../components/CollectiveSection.vue'
import TickerBanner from '../components/TickerBanner.vue'
import RegistrationSection from '../components/RegistrationSection.vue'
import ScheduleSection from '../components/ScheduleSection.vue'
import SpeakersSection from '../components/SpeakersSection.vue'
import FaqSection from '../components/FaqSection.vue'
import UpdatesSection from '../components/UpdatesSection.vue'
import FooterSection from '../components/FooterSection.vue'
import TicketModal from '../components/TicketModal.vue'
import BottomBar from '../components/BottomBar.vue'

const router = useRouter()

const isTicketModalOpen = ref(false)
const selectedTier = ref('adult')

const navigateToEvent = () => {
  router.push('/event/r2c')
}

const openTicketModal = (tier = 'adult') => {
  selectedTier.value = tier
  isTicketModalOpen.value = true
}
</script>

<style scoped>
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