/* =====================================================
   PT SINAR BUNGA MAS & LEGALITASKU — JAVASCRIPT MASTER
   Benchmark: sinarbungamas.co.id (Clean, Fast & Robust)
   ===================================================== */

const WA_PHONE = '628131038107';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpy();
});

// ==========================================
// 1. MOBILE MENU DRAWER
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', isExpanded);
  });
}

function closeMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
}

// ==========================================
// 2. CLEAN FAQ ACCORDION
// ==========================================
function toggleCleanFAQ(button) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const panel = button.nextElementSibling;
  
  // Close all other open FAQ panels
  document.querySelectorAll('.faq-btn').forEach(btn => {
    if (btn !== button) {
      btn.setAttribute('aria-expanded', 'false');
      if (btn.nextElementSibling) {
        btn.nextElementSibling.style.maxHeight = null;
      }
    }
  });

  // Toggle clicked panel
  if (isExpanded) {
    button.setAttribute('aria-expanded', 'false');
    if (panel) panel.style.maxHeight = null;
  } else {
    button.setAttribute('aria-expanded', 'true');
    if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

// ==========================================
// 3. CONTACT FORM TO WHATSAPP
// ==========================================
function handleContactSubmit(e) {
  e.preventDefault();

  const namaEl = document.getElementById('namaInput');
  const waEl = document.getElementById('waInput');
  const emailEl = document.getElementById('emailInput');
  const layananEl = document.getElementById('layananSelect');
  const pesanEl = document.getElementById('pesanInput');

  const nama = namaEl ? namaEl.value.trim() : '';
  const wa = waEl ? waEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const layanan = layananEl ? layananEl.value : 'Konsultasi Terpadu';
  const pesan = pesanEl ? pesanEl.value.trim() : '';

  if (!nama) {
    alert('Silakan masukkan nama lengkap Anda.');
    namaEl?.focus();
    return;
  }

  if (!wa || wa.length < 8) {
    alert('Silakan masukkan nomor WhatsApp yang valid.');
    waEl?.focus();
    return;
  }

  const message = `Halo Tim PT Sinar Bunga Mas & Legalitasku, saya ingin berkonsultasi mengenai kebutuhan usaha.

*Nama:* ${nama}
*WhatsApp:* ${wa}
*Email:* ${email || '-'}
*Kebutuhan Layanan:* ${layanan}
*Catatan / Kebutuhan:* ${pesan || '-'}

Mohon informasi estimasi proses dan penawaran resminya. Terima kasih!`;

  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  e.target.reset();
}

// ==========================================
// 4. SCROLL SPY ACTIVE NAV
// ==========================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-item');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ==========================================
// 5. KUESIONER INTERAKTIF 3 LANGKAH
// ==========================================
const quizState = {
  step1: null, // '1_orang' | '2_plus' | 'sudah_jalan'
  step2: null, // 'badan_usaha' | 'izin_usaha' | 'hak_merek'
  step3: null  // 'mikro' | 'menengah'
};

let currentQuizResult = null;

function selectQuizOption(step, value, element) {
  quizState[`step${step}`] = value;

  // Visual active feedback
  const parentGrid = element.closest('.quiz-options-grid');
  if (parentGrid) {
    parentGrid.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
  element.classList.add('active');

  // Enable corresponding advance button
  if (step === 1) {
    const nextBtn = document.getElementById('nextBtn1');
    if (nextBtn) nextBtn.disabled = false;
  } else if (step === 2) {
    const nextBtn = document.getElementById('nextBtn2');
    if (nextBtn) nextBtn.disabled = false;
  } else if (step === 3) {
    const finishBtn = document.getElementById('finishBtn');
    if (finishBtn) finishBtn.disabled = false;
  }
}

function nextQuizStep(targetStep) {
  // Hide all panes
  document.querySelectorAll('.quiz-step-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  // Show target pane
  const targetPane = document.getElementById(`quizStep${targetStep}`);
  if (targetPane) targetPane.classList.add('active');

  // Update progress bar & indicators
  updateQuizIndicators(targetStep);
}

function prevQuizStep(targetStep) {
  // Hide all panes
  document.querySelectorAll('.quiz-step-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  // Show target pane
  const targetPane = document.getElementById(`quizStep${targetStep}`);
  if (targetPane) targetPane.classList.add('active');

  // Update progress bar & indicators
  updateQuizIndicators(targetStep);
}

function updateQuizIndicators(step) {
  const progressBar = document.getElementById('quizProgressBar');
  if (progressBar) {
    if (step === 1) progressBar.style.width = '33.33%';
    else if (step === 2) progressBar.style.width = '66.66%';
    else if (step === 3) progressBar.style.width = '100%';
  }

  // Update step circles
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`indicator-${i}`);
    if (!indicator) continue;

    indicator.classList.remove('active', 'done');
    if (i === step) {
      indicator.classList.add('active');
    } else if (i < step) {
      indicator.classList.add('done');
    }
  }
}

function calculateQuizResult() {
  const { step1, step2, step3 } = quizState;

  let result = {
    title: 'PT Perorangan (Perseroan Perorangan)',
    summary: 'Pilihan paling efisien untuk pendiri mandiri berskala mikro/kecil. Sah berbadan hukum resmi Kemenkumham RI dengan pemisahan tanggung jawab harta pribadi tanpa perlu akta notaris rumit.',
    duration: '1 – 2 Hari Kerja',
    price: 'Rp 1.450.000 – Rp 1.950.000 (All-in)',
    legal: 'Sah Berbadan Hukum Kemenkumham',
    serviceOptionValue: 'Legalitas - Pendirian PT / CV / PT Perorangan',
    docs: [
      'Sertifikat Pendaftaran Pendirian Kemenkumham AHU',
      'Surat Pernyataan Pendirian Perseroan Mandiri',
      'NPWP Badan Usaha & Surat Keterangan Terdaftar (SKT)',
      'Nomor Induk Berusaha (NIB) OSS RBA Berbasis Risiko',
      'Sertifikat Standar Izin Usaha KBLI Sektoral',
      'Rekomendasi Pembukaan Rekening Giro Bank Perusahaan'
    ]
  };

  if (step2 === 'hak_merek') {
    result = {
      title: 'Pendaftaran Hak Merek & Perlindungan HAKI (DJKI)',
      summary: 'Perlindungan monopoli hukum atas nama brand, etiket, dan logo bisnis Anda di Direktorat Jenderal Kekayaan Intelektual untuk mencegah pencatutan nama usaha.',
      duration: '1 – 2 Hari Kerja (Penerbitan Bukti Resmi)',
      price: 'Rp 1.950.000 (Termasuk PNBP Resmi DJKI)',
      legal: 'Sertifikat Eksklusif DJKI Kemenkumham RI',
      serviceOptionValue: 'Legalitas - Pendirian PT / CV / PT Perorangan',
      docs: [
        'Bukti Penerimaan Permohonan Resmi DJKI Kemenkumham',
        'Analisis Penelusuran Kelas Merek (Nice Classification)',
        'Etiket & Spesifikasi Merek Terdaftar',
        'Surat Kuasa Konsultan & Perlindungan Hak Prioritas',
        'Monitoring Berkala Masa Pengumuman Berita Resmi Merek',
        'Sertifikat Merek Resmi DJKI (Masa Perlindungan 10 Tahun)'
      ]
    };
  } else if (step2 === 'izin_usaha') {
    result = {
      title: 'Pengurusan NIB & Perizinan Berusaha OSS RBA',
      summary: 'Solusi legalitas izin operasional dan komersial berbasis risiko tanpa harus mengubah struktur anggaran dasar badan usaha.',
      duration: '1 – 3 Hari Kerja',
      price: 'Rp 950.000 – Rp 1.500.000',
      legal: 'Kementerian Investasi / BKPM RI Melalui OSS RBA',
      serviceOptionValue: 'Legalitas - Pendirian PT / CV / PT Perorangan',
      docs: [
        'Nomor Induk Berusaha (NIB) OSS RBA Berbasis Risiko',
        'Sertifikat Standar Perizinan Berusaha KBLI 2020',
        'Surat Pernyataan Pengelolaan Lingkungan Hidup (SPPL)',
        'NPWP Badan / Pengusaha & Integrasi Validasi KSWP Pajak',
        'Hak Akses Akun Resmi OSS RBA BKPM RI'
      ]
    };
  } else if (step1 === 'sudah_jalan' && step2 === 'badan_usaha') {
    result = {
      title: 'Perubahan Akta & Peningkatan Status Usaha (CV / PT)',
      summary: 'Pembaruan legalitas usaha berjalan meliputi penyesuaian modal, masuknya pemegang saham baru, penyesuaian KBLI 2020, atau peningkatan status menjadi PT Standar.',
      duration: '3 – 5 Hari Kerja',
      price: 'Rp 3.000.000 – Rp 4.500.000',
      legal: 'Akta Notaris & Persetujuan Kemenkumham RI',
      serviceOptionValue: 'Legalitas - Pendirian PT / CV / PT Perorangan',
      docs: [
        'Akta Perubahan Anggaran Dasar Notaris Resmi',
        'Surat Keputusan (SK) Persetujuan Menkumham RI',
        'Berita Acara RUPS / Keputusan Sirkuler Pemegang Saham',
        'Pembaruan NIB OSS RBA dengan Klasifikasi KBLI 2020',
        'Sinkronisasi NPWP Badan & KSWP Kemenkeu'
      ]
    };
  } else if (step1 === '2_plus' && step3 === 'mikro') {
    result = {
      title: 'Pendirian CV (Persekutuan Komanditer)',
      summary: 'Format usaha paling populer dan hemat untuk kemitraan 2 orang atau lebih pada skala usaha mikro/kecil dengan birokrasi dan perpajakan yang fleksibel.',
      duration: '2 – 3 Hari Kerja',
      price: 'Rp 2.500.000 – Rp 3.200.000 (All-in)',
      legal: 'Akta Notaris & SK Terdaftar Kemenkumham (SABU)',
      serviceOptionValue: 'Legalitas - Pendirian PT / CV / PT Perorangan',
      docs: [
        'Akta Pendirian CV oleh Notaris Resmi',
        'SK Pengesahan Kemenkumham RI (SABU)',
        'NPWP Badan Usaha CV & SKT Pajak',
        'NIB OSS RBA Berbasis Risiko',
        'Sertifikat Standar Izin Usaha KBLI 2020',
        'Draft Pembagian Peran Sekutu Aktif & Sekutu Pasif'
      ]
    };
  } else if ((step1 === '2_plus' && step3 === 'menengah') || (step1 === '1_orang' && step3 === 'menengah')) {
    result = {
      title: 'Pendirian PT Standar (Perseroan Terbatas)',
      summary: 'Bentuk korporasi berwibawa dengan tanggung jawab modal terpisah. Syarat mutlak untuk tender proyek pemerintah, BUMN, perbankan, dan kemitraan skala besar.',
      duration: '3 – 5 Hari Kerja',
      price: 'Rp 3.850.000 – Rp 5.500.000 (All-in)',
      legal: 'Akta Notaris & SK Pengesahan Menkumham RI (SABH)',
      serviceOptionValue: 'Legalitas - Pendirian PT / CV / PT Perorangan',
      docs: [
        'Pengecekan & Pemesanan Nama PT Resmi di AHU Kemenkumham',
        'Akta Notaris Pendirian PT Berstandar Hukum',
        'SK Pengesahan Badan Hukum Menkumham RI',
        'NPWP Badan Usaha PT & SKT Kantor Pelayanan Pajak',
        'NIB OSS RBA Berbasis Risiko Sesuai KBLI 2020',
        'Pernyataan Mandiri K3L, SPPL Lingkungan, & Tata Ruang'
      ]
    };
  }

  currentQuizResult = result;

  // Render values to DOM
  const titleEl = document.getElementById('resTitle');
  const summaryEl = document.getElementById('resSummary');
  const durEl = document.getElementById('resDuration');
  const priceEl = document.getElementById('resPrice');
  const legalEl = document.getElementById('resLegal');
  const docsListEl = document.getElementById('resDocsList');

  if (titleEl) titleEl.textContent = result.title;
  if (summaryEl) summaryEl.textContent = result.summary;
  if (durEl) durEl.textContent = result.duration;
  if (priceEl) priceEl.textContent = result.price;
  if (legalEl) legalEl.textContent = result.legal;

  if (docsListEl) {
    docsListEl.innerHTML = '';
    result.docs.forEach(doc => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="bi bi-check-circle-fill"></i> <span>${doc}</span>`;
      docsListEl.appendChild(li);
    });
  }

  // Hide all step panes, show result pane
  document.querySelectorAll('.quiz-step-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const resPane = document.getElementById('quizResultPane');
  if (resPane) resPane.classList.add('active');

  // Progress to 100%
  const progressBar = document.getElementById('quizProgressBar');
  if (progressBar) progressBar.style.width = '100%';

  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`indicator-${i}`);
    if (indicator) {
      indicator.classList.remove('active');
      indicator.classList.add('done');
    }
  }
}

function triggerQuizWhatsApp() {
  if (!currentQuizResult) return;

  const pendiriLabels = {
    '1_orang': '1 Orang (Mandiri)',
    '2_plus': '2 Orang atau Lebih (Kemitraan)',
    'sudah_jalan': 'Usaha Sudah Jalan & Mau Legalitas Tambahan'
  };
  const fokusLabels = {
    'badan_usaha': 'Mendirikan Badan Usaha Resmi (PT / CV)',
    'izin_usaha': 'Mengurus Izin Usaha / NIB Saja',
    'hak_merek': 'Daftar Hak Merek (Logo / Nama DJKI)'
  };
  const modalLabels = {
    'mikro': 'Mikro / Kecil (< Rp 1 Miliar)',
    'menengah': 'Menengah / Besar (≥ Rp 1 Miliar)'
  };

  const message = `Halo Tim PT Sinar Bunga Mas & Legalitasku, saya telah mencoba Kuesioner Legalitas di website dan mendapatkan rekomendasi:

*Rekomendasi:* ${currentQuizResult.title}
*Jumlah Pendiri:* ${pendiriLabels[quizState.step1] || '-'}
*Fokus Utama:* ${fokusLabels[quizState.step2] || '-'}
*Skala Modal:* ${modalLabels[quizState.step3] || '-'}
*Estimasi Durasi:* ${currentQuizResult.duration}
*Estimasi Biaya:* ${currentQuizResult.price}

Mohon konsultasi lebih lanjut dan surat penawaran resminya. Terima kasih!`;

  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

function applyQuizToContact() {
  if (!currentQuizResult) return;

  const layananSelect = document.getElementById('layananSelect');
  const pesanInput = document.getElementById('pesanInput');

  if (layananSelect) {
    layananSelect.value = currentQuizResult.serviceOptionValue;
  }

  if (pesanInput) {
    const pendiriLabels = {
      '1_orang': '1 Orang (Mandiri)',
      '2_plus': '2 Orang atau Lebih',
      'sudah_jalan': 'Usaha Sudah Jalan'
    };
    const modalLabels = {
      'mikro': 'Mikro/Kecil (< 1 Miliar)',
      'menengah': 'Menengah/Besar (≥ 1 Miliar)'
    };

    pesanInput.value = `Saya tertarik dengan hasil rekomendasi: ${currentQuizResult.title} (Profil: ${pendiriLabels[quizState.step1] || '-'}, Modal: ${modalLabels[quizState.step3] || '-'}). Mohon penawaran dan jadwal konsultasinya.`;
  }
}

function resetQuiz() {
  quizState.step1 = null;
  quizState.step2 = null;
  quizState.step3 = null;
  currentQuizResult = null;

  // Uncheck all options
  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Disable advance buttons
  const nextBtn1 = document.getElementById('nextBtn1');
  const nextBtn2 = document.getElementById('nextBtn2');
  const finishBtn = document.getElementById('finishBtn');

  if (nextBtn1) nextBtn1.disabled = true;
  if (nextBtn2) nextBtn2.disabled = true;
  if (finishBtn) finishBtn.disabled = true;

  // Return to step 1
  nextQuizStep(1);
}

// ==========================================
// 6. CLIENT PORTFOLIO FILTER
// ==========================================
function filterClients(category, button) {
  const pills = document.querySelectorAll('.client-filter-pills .pill-btn');
  pills.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');

  const cards = document.querySelectorAll('.client-logo-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.3s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}