<template>
  <header class="navbar-header" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo Image Left -->
      <a href="#" class="logo-link">
        <img src="/R2C-Main Logo-White 2.png" alt="R2C27 Logo" class="logo-img" />
      </a>

      <!-- Desktop Navigation Menu Right -->
      <nav class="desktop-menu">
        <button @click="$emit('open-tickets')" class="btn-register-now font-tech">
          REGISTER NOW <span class="arrow">&rarr;</span>
        </button>
      </nav>

      <!-- Mobile Hamburger Toggle Button -->
      <button class="mobile-toggle" @click="mobileMenuOpen = true" aria-label="Open menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Sidebar Menu Overlay & Drawer Panel -->
    <Teleport to="body">
      <transition name="sidebar-fade">
        <div v-if="mobileMenuOpen" class="mobile-sidebar-backdrop" @click.self="mobileMenuOpen = false">
          <div class="mobile-sidebar-panel font-tech">
            <!-- Sidebar Top Header with Close Button -->
            <div class="sidebar-header">
              <img src="/R2C-Main Logo-White 2.png" alt="R2C27 Logo" class="sidebar-logo" />
              <button class="sidebar-close-btn" @click="mobileMenuOpen = false" aria-label="Close menu">
                &times;
              </button>
            </div>

            <!-- Sidebar Navigation Links -->
            <div class="sidebar-links-list">
              <a href="#hero" class="sidebar-link" @click="mobileMenuOpen = false">HOME</a>
              <a href="#collective" class="sidebar-link" @click="mobileMenuOpen = false">COLLECTIVE</a>
              <a href="#agenda" class="sidebar-link" @click="mobileMenuOpen = false">PROGRAMS</a>
              <a href="#speakers" class="sidebar-link" @click="mobileMenuOpen = false">SPEAKERS</a>
              <a href="#faq" class="sidebar-link" @click="mobileMenuOpen = false">FAQ</a>
            </div>

            <!-- REGISTER NOW Button inside Sidebar Menu Bar -->
            <div class="sidebar-footer">
              <button @click="$emit('open-tickets'); mobileMenuOpen = false" class="btn-register-now sidebar-btn font-tech">
                REGISTER NOW <span class="arrow">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['open-tickets'])

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.1rem 2rem;
  transition: all 0.3s ease;
  background: #000000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}

.navbar-header.scrolled {
  padding: 0.8rem 2rem;
  background: #000000;
  border-bottom-color: rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
}

.nav-container {
  max-width: 1430px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
  transition: transform 0.25s ease, height 0.25s ease;
}

.logo-img:hover {
  transform: scale(1.04);
}

.desktop-menu {
  display: flex;
  align-items: center;
}

.btn-register-now {
  background: #000000;
  color: #ffffff;
  border: 1.5px solid #ffffff;
  padding: 0.65rem 1.8rem;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.btn-register-now .arrow {
  font-size: 1.1rem;
  transition: transform 0.25s ease;
}

.btn-register-now:hover {
  background: #ffffff;
  color: #000000;
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-register-now:hover .arrow {
  transform: translateX(4px);
}

/* Mobile Toggle Button */
.mobile-toggle {
  display: none;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

@media (max-width: 900px) {
  .navbar-header {
    padding: 0.75rem 1rem;
  }

  .logo-img {
    height: 28px; /* Compact mobile logo size */
  }

  .desktop-menu {
    display: none;
  }

  .mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<!-- Unscoped Styles for Teleported Mobile Sidebar Backdrop & Drawer Panel -->
<style>
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
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 9999;
}

.sidebar-header {
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
  margin: 2rem 0;
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

/* Sidebar Animation */
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
</style>
