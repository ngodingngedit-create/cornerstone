<template>
  <section id="faq" class="faq-section">
    <!-- Top Gradient Overlay for smooth transition from Speakers -->
    <div class="top-gradient-fade"></div>

    <div class="faq-container">
      <!-- Section Title -->
      <h2 class="faq-section-title font-tech">FAQ</h2>

      <div class="faq-outer-wrapper">
        <!-- Category Filter Tabs -->
        <div class="tabs-header-row font-tech">
          <button 
            v-for="cat in categories" 
            :key="cat"
            class="tab-box"
            :class="{ 'is-active': activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Outer Frame Box using Rectangle 201.avif background image -->
        <div class="outer-border-frame">
          <!-- Accordion Panel Container -->
          <div class="accordion-list">
            <div 
              v-for="(item, index) in filteredFaqs" 
              :key="index"
              class="accordion-card"
              :class="{ 'is-open': openIndex === index }"
            >
              <!-- Accordion Header Row -->
              <button class="accordion-header font-tech" @click="toggleAccordion(index)">
                <span class="question-text">{{ item.question }}</span>
                <span class="accordion-icon-circle">
                  <svg v-if="openIndex === index" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </button>

              <!-- Accordion Body Answer with Butter Smooth CSS Grid Animation -->
              <div class="accordion-body-wrapper">
                <div class="accordion-body-inner font-tech">
                  <div class="answer-text" v-html="item.answer"></div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('Tentang R2C')
const openIndex = ref(0) // First item open by default

const categories = [
  'Tentang R2C',
  'Jadwal & Transportasi',
  'Registrasi & Tiket',
  'Perubahan Dan Pembatalan',
  'Akomodasi'
]

const faqs = [
  {
    category: 'Tentang R2C',
    question: 'Apa itu R2C?',
    answer: 'R2C adalah singkatan dari <strong>Rooted Relevant Collective</strong>, sebuah gathering event yang diselenggarakan oleh Cornerstone Bandung. Melalui R2C, kami rindu untuk memperlengkapi dan memberdayakan gereja-gereja dalam membangun generasi berikutnya, membawa perubahan bagi komunitas, dan berjalan bersama sebagai satu tubuh Kristus.<br/><br/><em>Empowering Churches. Raising the Next Generation. Transforming Communities. Together.</em>'
  },
  {
    category: 'Tentang R2C',
    question: 'Siapa saja yang dapat mengikuti R2C?',
    answer: 'R2C terbuka untuk para pemimpin gereja, hamba Tuhan, pelayan, aktivis gereja, youth leaders, dan setiap orang yang memiliki kerinduan untuk membangun generasi berikutnya.'
  },
  {
    category: 'Tentang R2C',
    question: 'Apakah R2C hanya untuk gereja tertentu / denominasi tertentu?',
    answer: 'Tidak. R2C terbuka untuk berbagai gereja dan denominasi. Kami percaya bahwa membangun generasi berikutnya adalah panggilan bersama, dan kami rindu untuk belajar serta bertumbuh bersama sebagai tubuh Kristus.'
  },
  {
    category: 'Tentang R2C',
    question: 'Bahasa apa yang digunakan selama conference?',
    answer: 'Seluruh sesi R2C akan dibawakan dalam Bahasa Indonesia. Apabila terdapat sesi dengan bahasa lain, informasi lebih lanjut akan diberikan kepada peserta.'
  },
  {
    category: 'Tentang R2C',
    question: 'Apakah saya bisa mengikuti R2C secara online?',
    answer: 'Tidak. R2C tahun ini hanya akan diselenggarakan secara onsite (tatap muka). Kami percaya ada sesuatu yang spesial ketika kita dapat berkumpul, belajar, berdiskusi, dan terkoneksi secara langsung. Kami tidak sabar untuk menyambut Anda di R2C!' 
  },
  {
    category: 'Tentang R2C',
    question: 'Untuk pertanyaan lainnya?',
    answer: 'Hubungi tim kami melalui email rootedrelevantcollective@gmail.com atau WhatsApp 0811-2211-370'
  },
  {
    category: 'Jadwal & Transportasi',
    question: 'Kapan dan di mana R2C akan diselenggarakan?',
    answer: 'R2C akan diselenggarakan pada <strong>19–20 Februari 2027</strong> di <strong><a href="https://maps.app.goo.gl/jD23cnzGPSKGQ6ec6" target="_blank" rel="noopener noreferrer">Cornerstone Bandung, Paskal 23</a></strong>.'
  },
  {
    category: 'Jadwal & Transportasi',
    question: 'Bagaimana cara menuju venue R2C?',
    answer: 'Anda dapat menuju Cornerstone Bandung menggunakan beberapa pilihan transportasi seperti: <br/><br/> • Whoosh<br/> • Kereta Api Indonesia (KAI)<br/> • Travel antar kota<br/> • Kendaraan pribadi<br/><br/> Mohon diperhatikan bahwa tidak tersedia layanan shuttle dari Cornerstone Bandung, sehingga peserta dapat mengatur transportasi masing-masing menuju lokasi acara.'
  },
  {
    category: 'Jadwal & Transportasi',
    question: 'Apakah tersedia akses untuk penyandang disabilitas?',
    answer: 'Ya, tersedia akses untuk penyandang disabilitas di area venue.'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Bagaimana cara melakukan registrasi?',
    answer: 'Anda dapat melakukan registrasi melalui website: <strong>https://r2c.cornerstone.co.id</strong>.'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Berapa harga tiket R2C?',
    answer: 'Informasi mengenai harga tiket R2C dapat dilihat melalui halaman registrasi resmi kami <strong>https://r2c.cornerstone.co.id/pricing</strong>.'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Apa saja yang termasuk dalam biaya registrasi?',
    answer: 'Biaya registrasi mencakup: <br/><br/> • Akses masuk R2C selama 2 hari conference<br/> • Akses ke seluruh sesi conference sesuai tiket<br/> • Akses ke workshop<br/> • Voucher senilai Rp50.000 untuk digunakan di R2C Bazaar<br/> • Makan malam di hari pertama conference'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Apakah tersedia potongan harga atau promo registrasi?',
    answer: 'Ya. Sebagai penyelenggara, kerinduan kami adalah melihat semakin banyak gereja diperlengkapi dan generasi berikutnya dibangun. Karena itu, kami mendorong setiap gereja untuk membawa serta generasi muda mereka melalui paket bundling khusus: <strong>1 Adult + 1 Youth</strong>.'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Bagaimana cara mendaftar sebagai rombongan gereja?',
    answer: 'Pada halaman registrasi, Anda dapat memilih jumlah peserta yang ingin didaftarkan untuk mengikuti R2C. Apabila gereja Anda ingin melakukan pendaftaran dalam jumlah besar atau membutuhkan bantuan untuk registrasi rombongan, silakan menghubungi tim kami melalui <strong>rootedrelevantcollective@gmail.com</strong>. Tim kami akan dengan senang hati membantu proses pendaftaran gereja Anda.'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Apakah saya bisa memilih workshop yang ingin saya ikuti?',
    answer: 'Ya. Peserta akan mendapatkan kesempatan untuk memilih workshop yang tersedia. Informasi mengenai pilihan workshop dan proses pendaftaran akan diinformasikan lebih lanjut kepada peserta terdaftar.'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Apakah tersedia tiket untuk anak-anak?',
    answer: 'Tiket Youth tersedia untuk peserta mulai dari usia 17 tahun ke atas.'
  },
  {
    category: 'Registrasi & Tiket',
    question: 'Apakah saya dapat membawa keluarga atau anak?',
    answer: 'Anda diperbolehkan membawa keluarga, namun mohon diperhatikan bahwa kami tidak menyediakan fasilitas penitipan anak selama acara berlangsung. Kami menyediakan nursing room dengan kapasitas terbatas bagi peserta yang membutuhkan.'
  },
  {
    category: 'Perubahan Dan Pembatalan',
    question: 'Bagaimana cara mengubah data registrasi saya?',
    answer: 'Setelah pesanan Anda dikonfirmasi, silakan cek email konfirmasi yang telah dikirimkan untuk informasi detail mengenai registrasi Anda.'
  },
  {
    category: 'Perubahan Dan Pembatalan',
    question: 'Apakah saya bisa memindahkan tiket saya kepada orang lain?',
    answer: 'Ya. Jika Anda ingin melakukan perubahan data atau memindahkan registrasi kepada peserta lain, silakan hubungi tim kami paling lambat: <strong>11 Januari 2027</strong>.'
  },
  {
    category: 'Perubahan Dan Pembatalan',
    question: 'Apakah saya bisa membatalkan registrasi saya?',
    answer: 'Ya. Pembatalan registrasi dapat dilakukan dengan menghubungi tim kami melalui email paling lambat: <strong>20 Desember 2026</strong>.<br/><br/>Biaya pembatalan sebesar <strong>Rp100.000</strong> per registrasi akan dikenakan.<br/><br/>Mohon diperhatikan:<br/> • Registrasi yang sebelumnya sudah pernah dipindahkan kepada peserta lain tidak dapat diajukan untuk refund.<br/> • Proses refund akan dilakukan melalui transfer bank.'
  },
  {
    category: 'Akomodasi',
    question: 'Apakah akomodasi sudah termasuk dalam biaya registrasi?',
    answer: 'Tidak. Akomodasi tidak termasuk dalam biaya registrasi R2C. Setiap peserta bertanggung jawab untuk mengatur penginapan masing-masing selama mengikuti conference. Kami menyarankan Anda untuk melakukan pemesanan lebih awal.'
  },
  {
    category: 'Akomodasi',
    question: 'Apakah tersedia rekomendasi hotel?',
    answer: 'Ya. Kami memiliki daftar rekomendasi hotel serta informasi promo khusus yang akan dibagikan oleh tim kami melalui pesan kepada peserta.'
  }
]

const filteredFaqs = computed(() => {
  return faqs.filter(f => f.category === activeCategory.value)
})

const toggleAccordion = (idx) => {
  openIndex.value = openIndex.value === idx ? -1 : idx
}
</script>

<style scoped>
.faq-section {
  padding: 2.5rem 2rem 3rem;
  background: transparent;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.top-gradient-fade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 180px;
  background: linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  z-index: 1;
}

.bottom-gradient-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
  background: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  z-index: 1;
}

.faq-container {
  max-width: 1430px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.faq-section-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.5rem);
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

.faq-outer-wrapper {
  width: 100%;
  position: relative;
}

/* Tabs Header Row */
.tabs-header-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 2rem;
  margin-bottom: -0.2rem;
  position: relative;
  z-index: 5;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.tabs-header-row::-webkit-scrollbar {
  display: none;
}

.tab-box {
  padding: 0.6rem 1.2rem;
  background: rgba(160, 60, 20, 0.65);
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
  flex: 0 0 auto;
  white-space: nowrap;
}

.tab-box.is-active {
  background: #ea580c;
  color: #ffffff;
  font-weight: 700;
}

/* Outer Border Frame using Rectangle 201.avif background image */
.outer-border-frame {
  border: none;
  background-image: url('/Rectangle 201.avif');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 2.2rem 2.5rem 2.5rem;
  position: relative;
  width: 100%;
}

/* Accordion List with tight seamless gap */
.accordion-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Accordion Card with White Border Stroke */
.accordion-card {
  background: rgba(45, 40, 50, 0.55);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

/* OPEN State: PURE WHITE background */
.accordion-card.is-open {
  background: #ffffff !important;
  color: #000000 !important;
  border-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.accordion-header {
  width: 100%;
  padding: 1.25rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.question-text {
  font-family: 'Manrope', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  transition: color 0.3s ease;
}

.accordion-card.is-open .question-text {
  color: #000000;
  font-weight: 800;
  font-size: 1.25rem;
}

/* Icon circle */
.accordion-icon-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.accordion-card.is-open .accordion-icon-circle {
  background: #cbd5e1;
  color: #334155;
}

/* Smooth CSS Grid Expand/Collapse Animation */
.accordion-body-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-card.is-open .accordion-body-wrapper {
  grid-template-rows: 1fr;
}

.accordion-body-inner {
  overflow: hidden;
}

.answer-text {
  padding: 0 1.6rem 1.4rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.92rem;
  line-height: 1.75;
  color: #333333;
}

.answer-text :deep(a) {
  color: #000000;
  text-decoration: underline;
  font-weight: 700;
  transition: opacity 0.2s ease;
}

.answer-text :deep(a:hover) {
  opacity: 0.7;
}

/* Responsive Rules */
@media (max-width: 768px) {
  .faq-section {
    padding: 4rem 1rem 5rem;
  }

  .tabs-header-row {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    gap: 0.5rem;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .tabs-header-row::-webkit-scrollbar {
    display: none;
  }

  .tab-box {
    padding: 0.45rem 0.95rem;
    font-size: 0.78rem;
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .outer-border-frame {
    padding: 1.5rem 1rem 1.8rem;
  }

  .question-text {
    font-size: 1rem;
  }

  .accordion-card.is-open .question-text {
    font-size: 1.05rem;
  }
}
</style>
