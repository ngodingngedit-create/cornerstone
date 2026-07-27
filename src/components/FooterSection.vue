<template>
  <footer class="footer-section">
    <div class="footer-container">
      <!-- Top Thin Divider Line -->
      <div class="footer-top-line"></div>

      <!-- Main Footer Row -->
      <div class="footer-main-row font-tech">
        <!-- Left Side: CONTACT US & Details -->
        <div class="contact-col">
          <h4 class="contact-title">CONTACT US</h4>

          <div class="contact-list">
            <!-- Email -->
            <a href="mailto:rootedrelevantcollective@gmail.com" class="contact-item">
              <svg class="contact-icon mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span>info@cornerstoneauditorium.com</span>
            </a>

            <!-- Instagram -->
            <a href="https://instagram.com/rootedrelevantcollective" target="_blank" rel="noopener" class="contact-item">
              <svg class="contact-icon ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span>@rootedrelevantcollective</span>
            </a>

            <!-- WhatsApp -->
            <a href="https://wa.me/628112211370" target="_blank" rel="noopener" class="contact-item">
              <svg class="contact-icon wa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>0811-2211-370</span>
            </a>
          </div>
        </div>

        <!-- Right Side: Copyright Statement -->
        <div class="copyright-col">
          <p class="copyright-text">
            © 2026 Rooted Relevant Collective. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-section {
  background: #000000;
  color: #ffffff;
  padding: 3rem 2rem 5rem;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.footer-container {
  max-width: 1430px;
  margin: 0 auto;
}

/* Top Horizontal Line (crisp & clearly visible) */
.footer-top-line {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.75);
  margin-bottom: 2.5rem;
}

/* Main Row */
.footer-main-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Contact Column */
.contact-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-title {
  font-family: 'Manrope', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-transform: uppercase;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  transition: opacity 0.25s ease;
}

.contact-item:hover {
  opacity: 0.8;
}

.contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.mail-icon {
  color: #ffffff;
}

.ig-icon {
  color: #e1306c;
}

.wa-icon {
  color: #25d366;
}

/* Copyright Column */
.copyright-col {
  align-self: flex-end;
}

.copyright-text {
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}

/* Responsive Rules */
@media (max-width: 768px) {
  .footer-section {
    padding: 2.5rem 1rem 4rem;
  }

  .footer-main-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
  }

  .copyright-col {
    align-self: flex-start;
  }

  .copyright-text {
    font-size: 0.85rem;
  }
}
</style>
