<template>
  <nav class="mobile-bottom-navbar font-tech">
    <div class="mobile-nav-dock">
      <!-- Home Link -->
      <a 
        href="#hero" 
        class="nav-tab-item"
        :class="{ 'is-active': activeTab === 'home' }"
        @click="setActive('home')"
      >
        <span class="active-indicator" v-if="activeTab === 'home'"></span>
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="tab-label">Home</span>
      </a>

      <!-- Collective Link -->
      <a 
        href="#collective" 
        class="nav-tab-item"
        :class="{ 'is-active': activeTab === 'collective' }"
        @click="setActive('collective')"
      >
        <span class="active-indicator" v-if="activeTab === 'collective'"></span>
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span class="tab-label">Collective</span>
      </a>

      <!-- Schedule Link -->
      <a 
        href="#agenda" 
        class="nav-tab-item"
        :class="{ 'is-active': activeTab === 'schedule' }"
        @click="setActive('schedule')"
      >
        <span class="active-indicator" v-if="activeTab === 'schedule'"></span>
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
        <span class="tab-label">Schedule</span>
      </a>

      <!-- Speakers Link (Temporarily hidden) -->
      <!--
      <a 
        href="#speakers" 
        class="nav-tab-item"
        :class="{ 'is-active': activeTab === 'speakers' }"
        @click="setActive('speakers')"
      >
        <span class="active-indicator" v-if="activeTab === 'speakers'"></span>
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
        <span class="tab-label">Speakers</span>
      </a>
      -->

      <!-- Register / Ticket Button -->
      <div 
        class="nav-tab-item register-tab"
        :class="{ 'is-active': activeTab === 'register' }"
        @click="handleRegister"
      >
        <span class="active-indicator" v-if="activeTab === 'register'"></span>
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
          <path d="M13 5v2"/>
          <path d="M13 17v2"/>
          <path d="M13 11v2"/>
        </svg>
        <span class="tab-label">Register</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['open-tickets'])
const activeTab = ref('home')

const setActive = (tabName) => {
  activeTab.value = tabName
}

const handleRegister = () => {
  activeTab.value = 'register'
  emit('open-tickets')
}
</script>

<style scoped>
.mobile-bottom-navbar {
  display: none;
}

@media (max-width: 768px) {
  .mobile-bottom-navbar {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 990;
    pointer-events: none;
  }

  .mobile-nav-dock {
    pointer-events: auto;
    width: 100%;
    max-width: 100vw;
    background: #000000;
    color: #ffffff;
    border-radius: 22px 22px 0 0;
    padding: 0.65rem 0.4rem 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -10px 35px rgba(0, 0, 0, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }

  .nav-tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.55);
    position: relative;
    padding: 0.25rem 0.4rem 0.1rem;
    flex: 1;
    cursor: pointer;
    transition: color 0.25s ease;
  }

  .active-indicator {
    position: absolute;
    top: -0.65rem;
    width: 28px;
    height: 3px;
    background: #ffffff;
    border-radius: 99px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }

  .nav-tab-item.is-active {
    color: #ffffff;
    font-weight: 800;
  }

  .tab-icon {
    width: 22px;
    height: 22px;
    margin-bottom: 0.2rem;
    transition: transform 0.2s ease;
  }

  .nav-tab-item.is-active .tab-icon {
    transform: translateY(-1px);
    stroke: #ffffff;
  }

  .tab-label {
    font-family: 'Manrope', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .nav-tab-item.is-active .tab-label {
    font-weight: 800;
    color: #ffffff;
  }
}
</style>
