# 📋 Selected Work Data Intake Checklist

Dokumen ini disiapkan agar Anda dapat mengisi data akurat untuk masing-masing dari 6 proyek di bagian **Selected Work**. Cukup beri tanda centang `[x]` pada opsi yang sesuai dan isi kolom teks singkat. Data ini akan langsung dipakai untuk memperbarui `app/data/portfolio.ts` dan artikel deep dive di `/thoughts`.

---

## 🔒 Kebijakan Kerahasiaan (NDA Guidance)
Jika proyek dikerjakan di bawah NDA:
- Anda **tidak perlu menyebutkan nama perusahaan atau klien**.
- Cukup gunakan nama fungsional (misal: *PROMOTION SYSTEM*, *MERCHANT PLATFORM*).
- Fokuskan pada **arsitektur teknis, skala transaksi, dan metrik performa** (hal ini 100% aman dan paling dihargai oleh CEO/CTO).

---

## 01. HELIX — Trading & Execution System

### Identitas Proyek
- [ ] **Nama Proyek**: `HELIX` (apakah tetap nama ini, atau ada nama lain: `____________________`)
- [ ] **Tipe Industri**:
  - [ ] Crypto / Web3
  - [ ] Forex / Commodity
  - [ ] Equity / Stock Market
  - [ ] Internal Algorithmic Trading Desk
- [ ] **Periode Waktu**: `2024–Present` (atau: `____________________`)

### Peran & Kepemilikan (Ownership)
- [ ] Lead Architect (Merancang arsitektur sistem dari awal)
- [ ] Core Engine Developer (Membangun logic order execution & risk telemetry)
- [ ] Solo Builder (Membangun end-to-end secara mandiri)

### Tech Stack yang Sebenarnya Digunakan
- Bahasa: `[ ] Rust  [ ] Go  [ ] Python  [ ] C++  [ ] TypeScript`
- Database & Cache: `[ ] PostgreSQL  [ ] Redis  [ ] TimescaleDB  [ ] ClickHouse`
- Messaging & Transport: `[ ] WebSockets  [ ] gRPC  [ ] NATS  [ ] ZeroMQ  [ ] Kafka`
- Infra: `[ ] Linux VPS  [ ] Docker  [ ] Kubernetes  [ ] Bare Metal`

### Metrik Kuantitatif & Dampak Bisnis *(Isi yang ada/relevan)*
- [ ] **Latency Eksekusi**: `[  ] sub-millisecond (< 1ms)  [  ] < 10ms  [  ] < 50ms`
- [ ] **Throughput / Volume**: `____________________` *(misal: 5,000 order/sec atau volume trading bulanan)*
- [ ] **Risk / Safety Check**: `[  ] Pre-trade risk control  [  ] Automated circuit breaker  [  ] Real-time liquidation`

### Masalah Terberat yang Diselesaikan
- Deskripsi 1-2 kalimat: `____________________________________________________________________________________________________`

---

## 02. PROMOTION SYSTEM — Campaign, Voucher & Dynamic Discount Engine

### Identitas Proyek
- [ ] **Nama Tampilan**: 
  - [ ] `PROMOTION SYSTEM`
  - [ ] `CAMPAIGN & PROMOTION ENGINE`
  - [ ] Nama lain: `____________________`
- [ ] **Tipe Platform**:
  - [ ] E-Commerce / Marketplace Flash Sale
  - [ ] Fintech / Payment Discount & Cashback Engine
  - [ ] Ride Hailing / Food Delivery Promo Engine
- [ ] **Periode Waktu**: `2023–2024` (atau: `____________________`)

### Tech Stack yang Sebenarnya Digunakan
- Bahasa: `[ ] Go  [ ] PHP/Laravel  [ ] Java  [ ] Node.js/TypeScript`
- Database: `[ ] PostgreSQL  [ ] MySQL  [ ] Redis Cluster  [ ] MongoDB`
- Concurrency & Lock: `[ ] Redis Distributed Lock (Redlock)  [ ] DB Row-level locking (Pessimistic)  [ ] Optimistic Lock`
- Queue / Events: `[ ] Kafka  [ ] RabbitMQ  [ ] NATS  [ ] Redis Streams`

### Metrik Kuantitatif Kunci
- [ ] **Traffic Peak (Double Date / Flash Sale)**: `____________________ TPS / RPM` *(misal: 10,000+ TPS saat 11.11)*
- [ ] **Proteksi Kuota & Anti-Double Claim**:
  - [ ] Zero race condition pada perebutan voucher terbatas
  - [ ] Real-time quota deduction dengan rollback otomatis jika checkout batal
- [ ] **Kecepatan Evaluasi Aturan Promo**: `____________________ ms` *(misal: < 15ms evaluasi kombinasi multi-voucher)*

### Masalah Terberat yang Diselesaikan
- [ ] Mencegah voucher jebol / overselling kuota saat traffic lonjak ribuan request per detik
- [ ] Evaluasi rule promo yang kompleks (misal: syarat metode pembayaran, minimum belanja, kuota per user)
- [ ] Catatan singkat solusi Anda: `________________________________________________________________________________`

---

## 03. MERCHANT SYSTEM — Multi-Tier Partner Platform & Settlement Ledger

### Identitas Proyek
- [ ] **Nama Tampilan**: 
  - [ ] `MERCHANT SYSTEM`
  - [ ] `MERCHANT PLATFORM & SETTLEMENT`
  - [ ] Nama lain: `____________________`
- [ ] **Tipe Bisnis**:
  - [ ] Payment Gateway / QRIS Acquirer
  - [ ] PPOB / Billers Platform
  - [ ] POS / Retail Multi-outlet Management
- [ ] **Periode Waktu**: `2023–2024` (atau: `____________________`)

### Fitur & Tanggung Jawab Utama
- [ ] **Hierarki Merchant**: Kantor Pusat (HQ) -> Cabang (Branch) -> Kasir / Terminal
- [ ] **Settlement & Payout**: Rekonsiliasi transaksi otomatis & transfer saldo ke rekening bank merchant
- [ ] **Fee Engine**: Pemotongan MDR (Merchant Discount Rate), admin fee, dan bagi hasil mitra
- [ ] **KYC & Onboarding**: Verifikasi dokumen legalitas & aktivasi QRIS

### Tech Stack yang Sebenarnya Digunakan
- Bahasa: `[ ] Go  [ ] PHP/Laravel  [ ] Python  [ ] Node.js`
- Database: `[ ] PostgreSQL  [ ] MySQL  [ ] Redis`
- Ledger Integrity: `[ ] Double-entry bookkeeping  [ ] ACID Transaction loops  [ ] Periodic reconciliation cron`
- Integrasi Bank/Disbursement: `[ ] Direct Bank Host-to-Host  [ ] Third-party Payout API (Xendit/Midtrans/dll)`

### Metrik Kuantitatif Kunci
- [ ] **Jumlah Merchant yang Dikelola**: `____________________` *(misal: 50,000+ merchant aktif)*
- [ ] **Volume Transaksi yang Disettle**: `Rp ____________________ / bulan` *(misal: ratusan miliar IDR/bulan)*
- [ ] **SLA Rekonsiliasi**: `[  ] Real-time  [  ] T+1 settlement otomatis tanpa selisih ledger`

---

## 04. LOYALTY SYSTEM — Points Ledger & Gamified Rewards Engine

### Identitas Proyek
- [ ] **Nama Tampilan**: 
  - [ ] `LOYALTY SYSTEM`
  - [ ] `REWARDS & LOYALTY ENGINE`
  - [ ] Nama lain: `____________________`
- [ ] **Periode Waktu**: `2022–2023` (atau: `____________________`)

### Fitur Utama Sistem
- [ ] **Points Accrual (Perolehan Poin)**: Event-driven kalkulasi poin otomatis setiap user selesai transaksi
- [ ] **Tier Status**: Evaluasi kenaikan/penurunan tier user (Silver, Gold, Platinum) berdasarkan spending
- [ ] **Expiration Engine**: Background worker yang menghanguskan poin kadaluarsa sesuai batching period
- [ ] **Reward Redemption**: Penukaran poin dengan voucher, pulsa, atau barang fisik dengan jaminan atomic saldo

### Tech Stack yang Sebenarnya Digunakan
- Bahasa: `[ ] Go  [ ] PHP/Laravel  [ ] Java  [ ] Python`
- Database: `[ ] PostgreSQL  [ ] MySQL  [ ] Redis`
- Message Broker: `[ ] NATS  [ ] RabbitMQ  [ ] Kafka  [ ] Redis Pub/Sub`

### Metrik Kuantitatif Kunci
- [ ] **Skala User/Member**: `____________________ active users`
- [ ] **Akurasi Saldo Poin**: `100% audit log auditability` (immutable point ledger)
- [ ] **Kecepatan Ingestion**: `____________________ events/second`

---

## 05. ECOMMERCE SYSTEM — Distributed Checkout & Order Orchestration

### Identitas Proyek
- [ ] **Nama Tampilan**: 
  - [ ] `ECOMMERCE SYSTEM`
  - [ ] `ECOMMERCE CORE PLATFORM`
  - [ ] Nama lain: `____________________`
- [ ] **Periode Waktu**: `2022–2023` (atau: `____________________`)

### Fitur & Arsitektur Utama
- [ ] **Cart & Catalog**: Manajemen varian produk, harga dinamis, dan keranjang belanja
- [ ] **Inventory Reservation**: Reservasi stok sementara saat user checkout (mencegah double booking)
- [ ] **Order State Machine**: Status `CREATED` -> `PAID` -> `PROCESSING` -> `SHIPPED` -> `COMPLETED`
- [ ] **Payment Orchestration**: Integrasi multi-metode pembayaran (VA, E-Wallet, QRIS, Kartu Kredit)

### Tech Stack yang Sebenarnya Digunakan
- Bahasa: `[ ] Go  [ ] PHP (Laravel / Lumen)  [ ] Python  [ ] TypeScript`
- Database: `[ ] PostgreSQL  [ ] MySQL  [ ] Redis`
- Worker / Background Job: `[ ] Redis Queues  [ ] Celery  [ ] Laravel Queue  [ ] Temporal / Camunda`

### Metrik Kuantitatif Kunci
- [ ] **Volume Pesanan (Orders)**: `____________________ pesanan / hari`
- [ ] **Cart-to-Order Conversion Latency**: `[  ] < 100ms  [  ] < 250ms`
- [ ] **Inventory Consistency**: Zero phantom stock / overselling

---

## 06. NEXUS — AI Video Generation & Media Automation Platform

### Identitas Proyek
- [ ] **Nama Proyek**: `NEXUS` (atau: `____________________`)
- [ ] **Periode Waktu**: `2024` (atau: `____________________`)

### Fitur Utama
- [ ] Otomasi pembuatan video pendek (Shorts / Reels / TikTok) dari text prompt / script
- [ ] Text-to-Speech (TTS) & integrasi voiceover otomatis
- [ ] Transkripsi subtitle otomatis (Whisper / Speech-to-Text)
- [ ] Rendering & encoding hardware acceleration via FFmpeg

### Tech Stack yang Sebenarnya Digunakan
- Backend & Orchestration: `[ ] Go  [ ] Python  [ ] Node.js`
- Media Engine: `[ ] FFmpeg  [ ] OpenCV  [ ] Whisper  [ ] Stable Diffusion / Video Models`
- Queue & Storage: `[ ] Redis / Celery  [ ] S3 / Cloudflare R2  [ ] PostgreSQL`
- Frontend: `[ ] Next.js / React  [ ] Tailwind CSS`

### Metrik Kuantitatif Kunci
- [ ] **Kecepatan Render**: `____________________ detik per 60s video`
- [ ] **Task Concurrency**: Mampu memproses `____________________ concurrent rendering jobs` tanpa OOM crash

---

## 🚀 Langkah Selanjutnya
Setelah Anda mengisi atau menentukan beberapa poin di atas:
1. Simpan dokumen ini.
2. Beritahu saya bagian mana yang ingin langsung di-update di `app/data/portfolio.ts`.
3. Jika ada satu atau dua proyek yang ingin dibuatkan artikel teknis mendalam (*deep dive case study*) di menu `/thoughts`, beri tahu saya agar saya buatkan tulisan teknis yang komprehensif!
