# PROGRESS — দারুল কোরআন ক্যাডেট মাদ্রাসা ম্যানেজমেন্ট সফটওয়্যার

> প্রতিবার কাজ থামানোর আগে এই ফাইল হালনাগাদ করা হয়, যাতে পরবর্তী সেশনে
> ঠিক এখান থেকেই কাজ শুরু করা যায়।
> **সর্বশেষ হালনাগাদ:** 2026-10-31

---

## মডিউল ৩৪–৪০ — ডেপ্লয়মেন্ট প্রস্তুতি ৭টি (2026-10-31, সর্বশেষ)

ব্যবহারকারীর নির্দেশ: "২০ থেকে বাকি সকল মডিউল ... ডিপ্লয়মেন্ট ৭টি"। বাইরের
সেবা/হোস্টিং নির্ভর ৭টি মডিউল .env-gated ড্রাইভার হিসেবে বাস্তবায়িত — কনফিগ না
থাকলে কখনো ভুয়া সফলতা দেখানো হয় না (skipped/unconfigured ফেরত দেয়)।

| মডিউল | কাজ | ফাইল | যাচাই |
|---|---|---|---|
| ৩৪ PostgreSQL | প্রোডাকশন ডাটাবেস সনাক্তকরণ (SQLite বনাম PostgreSQL) — হেলথ কার্ডে ডেপ্লয়মেন্ট অবস্থা | `src/lib/env.ts` (`isProductionDatabase()`) | env-যাচাই সত্য |
| ৩৫ HTTPS/ডোমেইন | `APP_URL` https কিনা তা যাচাই (`isHttpsEnabled()`) | `src/lib/env.ts` | env-যাচাই সত্য |
| ৩৬ S3 স্টোরেজ | আগেই বাস্তবায়িত (`storage-s3.ts`); `.env.example`-এ `S3_FORCE_PATH_STYLE` নথিবদ্ধ | `src/lib/storage-s3.ts`, `.env.example` | `_mock-storage-s3.ts` 5/5 |
| ৩৭ bKash/Nagad | আগেই বাস্তবায়িত (`payment-gateway.ts`); `.env.example`-এ Verify URL/Key নথিবদ্ধ | `src/lib/payment-gateway.ts`, `.env.example` | `_mock-payment-gateway.ts` |
| ৩৮ AI Provider | আগেই বাস্তবায়িত; `.env.example`-এ `AI_BASE_URL` নথিবদ্ধ | `src/lib/ai-provider.ts`, `.env.example` | `_mock-ai-provider.ts` |
| ৩৯ SMS Gateway | আগেই বাস্তবায়িত; `.env.example`-এ `SMS_API_URL`/`SMS_METHOD` নথিবদ্ধ | `src/lib/sms.ts`, `.env.example` | `_mock-email-sms.ts` |
| **৪০ Email/WhatsApp** | **নতুন:** WhatsApp Cloud API ড্রাইভার (নির্ভরতা-মুক্ত, global `fetch`); নোটিফিকেশনে চতুর্থ চ্যানেল `WHATSAPP`; Email/SMS-এর পাশাপাশি env-gated | `src/lib/whatsapp.ts` (নতুন), `src/lib/env.ts`, `src/lib/notifications.ts`, `.env.example` | `scripts/_mock-email-sms.ts` → **17/17 PASS** |
| ডেপ্লয়মেন্ট কার্ড | `/health`-এ "ডেপ্লয়মেন্ট প্রস্তুতি" কার্ড — ৭টি শর্ত (PostgreSQL, ডোমেইন, S3, পেমেন্ট, AI, SMS, Email/WhatsApp) প্রস্তুত কিনা তা সত্যিকারভাবে দেখায়; Database/ডোমেইন বাধ্যতামূলক (critical) | `src/lib/health.ts` (`DeploymentReadiness`), `src/app/(app)/health/page.tsx` | বিল্ডে রুট/টাইপ ঠিক |
| i18n | নতুন কী `records.whatsapp`, `records.deploymentReadiness`, `records.deploymentHint`, `records.deployReady/NotReady`, `records.deployPostgres/Domain/S3/Payment/Ai/Sms/EmailWhatsapp` — তিন ভাষায় | `src/lib/i18n/locales/records.ts` | typecheck ০ ত্রুটি |

**যাচাই:** `npm run typecheck` → ০ ত্রুটি; `npm run build` → সফল (৯১ রুট);
`npx tsx scripts/_mock-email-sms.ts` → **17/17 PASS** (SMTP 4, SMS 6, WhatsApp 7 সহ
নম্বর normalize `+880 1700-000000` → `8801700000000`, Bearer টোকেন, URL
`/v21.0/{phoneNumberId}/messages`; কনফিগ ছাড়া ৩ চ্যানেলই `skipped` — ভুয়া সফলতা নেই)।

---

## মডিউল ৩৩ — System Health ও Logs (2026-10-31)

| কাজ | ফাইল | যাচাই |
|---|---|---|
| **F-HLT-02 ঘাটতি পূরণ:** `/health`-এ Backup Status কার্ড (সর্বশেষ ব্যাকআপ, সফল/ব্যর্থ সংখ্যা, মোট আকার) — বিদ্যমান `backupSummary()` ব্যবহার করে; ব্যর্থ ব্যাকআপ থাকলে সতর্কবার্তা, একটিও সফল ব্যাকআপ না থাকলে ডেটা-সুরক্ষা সতর্কবার্তা | `src/lib/health.ts` (`HealthOverview.backup`, warnings), `src/app/(app)/health/page.tsx` (কার্ড + `/backup` লিংক) | স্মোক টেস্ট: ব্যর্থ ব্যাকআপ তৈরি করে সতর্কবার্তা দেখা গেছে |
| **API Status সম্পূর্ণ:** সংযুক্ত সেবা তালিকায় Payment gateway (`isPaymentGatewayConfigured()`) যোগ — Email/SMS/AI/CloudStorage-এর সঙ্গে | `src/lib/health.ts` (services) | bn/en/ar তিন লোকেলেই লেবেল অনূদিত |
| **F-HLT-03 ঘাটতি পূরণ:** অডিট লগে `beforeData`/`afterData` বিস্তারিত — আগে/পরে কী বদলেছে তা এখন `<details>`-এ দেখা যায় (এর আগে কোনোভাবে দেখা যেত না) | `src/lib/health.ts` (`AuditLogRow`), `src/app/(app)/health/audit/page.tsx` | স্মোক টেস্টে before/after দৃশ্যমান |
| **F-HLT-04 ঘাটতি পূরণ:** সিস্টেম লগে `SystemEvent.meta` বিস্তারিত (ত্রুটির digest/URL প্রভৃতি) এখন `<details>`-এ দেখা যায় | `src/app/(app)/health/logs/page.tsx` | স্মোক টেস্টে meta দৃশ্যমান |
| i18n: নতুন কী `records.paymentGateway`, `records.lastBackup`, `records.completedBackups`, `records.failedBackups`, `details` (core-এ আগেই ছিল) — তিন ভাষায় | `src/lib/i18n/locales/records.ts` | ৩ লোকেলেই রেন্ডার করা লেবেল যাচাই |
| আগেই বিদ্যমান (যাচাইকৃত): `/health` (DB/Storage/Scheduler/সেবা/সতর্কবার্তা), `/health/logs` (স্তর ও উৎস ফিল্টার + পেজিনেশন), `/health/audit` (এনটিটি ফিল্টার + পেজিনেশন), RBAC `health.view`/`audit.view`, পোর্টাল রোল রিডাইরেক্ট | `src/lib/health.ts`, তিনটি পেজ | — |

**যাচাই:** `npm run typecheck` → ০ ত্রুটি; `npm run build` → সফল (৯১ রুট); `node scripts/_smoke-health.mjs` → **17/17 PASS** (লগইন ছাড়া ৩ পেজ ৩০৭; ব্যাকআপ ও পেমেন্ট লেবেল; ব্যর্থ-ব্যাকআপ সতর্কবার্তা; meta ও before/after দৃশ্যমান; bn/en/ar; টেস্ট-ডেটা পরিষ্কার — Database অক্ষত)।

---

## মডিউল ২৯–৩২ সম্পন্ন (2026-10-31, পরবর্তী সেশন-খণ্ড)

**মডিউল ২৯ — Signup, Login ও Account Security**

| কাজ | ফাইল | যাচাই |
|---|---|---|
| অ্যাকাউন্ট নিরাপত্তা পেজ — নিজের সক্রিয় Session তালিকা ও বাতিল (একটি/সব অন্যগুলো), চলতি Session চিহ্নিত, ডিভাইস শনাক্তকরণ | `src/lib/auth/session.ts` (`SessionRow`, `listMySessions`, `revokeOwnSession`, `revokeOtherSessions`), `src/lib/actions/auth.ts` (`revokeSessionAction`, `revokeOtherSessionsAction`), `src/components/account/security-sessions.tsx` (নতুন), `src/app/(app)/account/security/page.tsx` (নতুন), `src/components/layout/app-shell.tsx` (profile মেনুতে লিংক) | typecheck ০ ত্রুটি |
| অভিভাবক স্ব-নিবন্ধন — নতুন ব্যবহারকারী কখনোই Admin হন না; সর্বদা `GUARDIAN` ভূমিকা ও `isActive: false` (প্রশাসকের অনুমোদনের অপেক্ষায়); ফোন দিয়ে পরিচিত অভিভাবক রেকর্ডে স্বয়ংক্রিয় লিংক; Audit (`GUARDIAN_SIGNUP`) ও প্রশাসনকে In-App নোটিফিকেশন | `src/lib/actions/auth.ts` (`guardianSignupAction`), `src/components/auth/signup-form.tsx` (নতুন), `src/app/(auth)/signup/page.tsx` (নতুন), `src/components/auth/login-form.tsx` (লিংক), i18n `auth.ts` (bn/en/ar) | typecheck ০ ত্রুটি |
| আগেই সম্পন্ন (যাচাইকৃত) | Login/Logout, bcrypt পাসওয়ার্ড, Forgot/Reset Password (SHA-256 টোকেন হ্যাশ), Session Expiry, User Activation/Deactivation, Role/Permission, Login Rate Limiting (Lockout), নিরাপদ Seed (`SEED_ADMIN_PASSWORD`, কোডে default পাসওয়ার্ড নেই) | — |

**মডিউল ৩০ — Notifications**

| কাজ | ফাইল | যাচাই |
|---|---|---|
| `FEE_REMINDER` Scheduled Job বাস্তবায়ন — মেয়াদোত্তীর্ণ (`dueDate ≤ এখন`) ও `UNPAID/PARTIAL` ফির জন্য শিক্ষার্থীর `canAccessPortal` অভিভাবকদের একটিমাত্র সারসংক্ষেপ In-App নোটিফিকেশন; ২০ ঘণ্টার Spam-দমন (ডুপ্লিকেট প্রতিরোধ) | `src/lib/scheduler.ts` (`runFeeReminder`) | typecheck ০ ত্রুটি |
| আগেই বিদ্যমান (যাচাইকৃত) ট্রিগার: ভর্তি আবেদন/অনুমোদন, হাজিরা, ছুটি অনুমোদন, ফলাফল প্রকাশ, নতুন নোটিশ, পেমেন্ট নিশ্চিতকরণ, ব্যাকআপ ব্যর্থতা (F-BKP-04), Excel Export ফেল/সফল — সবই In-App | `admissions.ts`, `attendance.ts`, `exams.ts`, `notifications.ts`, `payments.ts`, `backup.ts`, `excel.ts`, `complaints.ts` | — |

**মডিউল ৩১ — ছবি/PDF/ফাইলের নিরাপদ Storage (যাচাইকৃত)**

- Upload Endpoint-এ Authentication + Authorization (`hasAnyPermission(UPLOAD_PERMISSIONS)`), File Type Validation (`validateFile`), Size Limit (`env.uploadLimits`), খালি ফাইল প্রতিরোধ, Folder whitelist, `isPublic: false`, Audit Log।
- `safeName` দিয়ে path-traversal প্রতিরোধ; `storageKey`-এ random hex; SHA-256 checksum।
- `/api/files/[fileId]` — non-public ফাইলে লগইন ছাড়া 401, সফট-ডিলিটকৃত 404, storage-এ না থাকলে 410।
- Production-এ S3-সামঞ্জস্যপূর্ণ ড্রাইভার env-gated (`STORAGE_DRIVER=s3` + `S3_*`); না থাকলে সৎভাবে জানায়, ভুয়া সফলতা নয়।

**মডিউল ৩২ — Dynamic UI/Experience (যাচাই + ঘাটতি পূরণ)**

- আগেই বিদ্যমান: Gradient (avatar/chart), Modern Sidebar/Header, Responsive Cards, Charts, Smooth transition/animation, Toast, Modal (Confirmation), EmptyState, Error Boundary (`error.tsx`/`global-error.tsx`), Dark/Light/System Theme (`ThemeToggle`), Mobile drawer, RTL (root layout-এ `dir`), অভিন্ন Design System (Card/Button/Form/Badge/Modal/Table)।
- **নতুন (ঘাটতি পূরণ):** `src/app/(app)/loading.tsx` ও `src/app/(portal)/loading.tsx` — বিদ্যমান `.skeleton` CSS (আগে অব্যবহৃত ছিল) ব্যবহার করে Loading Skeleton।

**যাচাই:** `npm run typecheck` → ০ ত্রুটি (exit 0); `npm run build` → সফল, ৯১ রুট (exit 0) — নতুন `/account/security` (5.33 kB) ও `/signup` (3.98 kB) রুটসহ।

---

## বাহ্যিক নির্ভরশীল ফিচারগুলো .env-gated ড্রাইভার হিসেবে বাস্তবায়িত (2026-10-31)

ডোমেইন/IP/কিছু বাহ্যিক Credentials না থাকলেও App সম্পূর্ণ চলে; পরে শুধু `.env`-এ
মান বসালেই ফিচারগুলো সক্রিয় হয় — কোনোটা না থাকলে "ভুয়া সফলতা" দেখানো হয় না
(`SKIPPED`/`UNCONFIGURED`/সৎ ত্রুটি বার্তা)। নতুন npm প্যাকেজ ছাড়াই বাস্তবায়িত।

| ID | কাজ | ফাইল | যাচাই |
|---|---|---|---|
| F-DEP-05 | S3-সামঞ্জস্যপূর্ণ Object Storage ড্রাইভার — হাতে-লেখা AWS SigV4 (node:crypto + fetch); path-style ও virtual-host; `putObject`/`getObject`/`objectExists`/`deleteObject` | `src/lib/storage-s3.ts` (নতুন), `src/lib/storage.ts`, `src/app/api/files/[fileId]/route.ts` | `npx tsx scripts/_mock-storage-s3.ts` → 5/5 PASS |
| F-NTF-02/03 | Email (SMTP), SMS ও WhatsApp ড্রাইভার — প্রত্যেকের জন্য আলাদা `SendResult`; সব `env`-নির্ভর; কনফিগ না থাকলে `skipped` | `src/lib/mailer.ts` (নতুন), `src/lib/sms.ts` (নতুন), `src/lib/whatsapp.ts` (নতুন), `src/lib/notifications.ts` | `npx tsx scripts/_mock-email-sms.ts` → 17/17 PASS |
| F-AI-06 | OpenAI-সামঞ্জস্যপূর্ণ AI Provider — grounded system prompt; `ai.ts`-এর বিদ্যমান offline উত্তরই ভিত্তি, কনফিগ/সোর্স না থাকলে নেটওয়ার্কে না গিয়ে লোকাল brain ব্যবহৃত | `src/lib/ai-provider.ts` (নতুন), `src/lib/ai.ts`, `src/lib/actions/ai.ts` | `npx tsx scripts/_mock-ai-provider.ts` → 15/15 PASS |
| F-FEE-12 | পেমেন্ট গেটওয়ে যাচাই — provider-নিরপেক্ষ HTTP verification contract; সফল হলে বিদ্যমান `verifyPaymentAction` পুনরায় ব্যবহার (ফি বণ্টন/লেডজার/অডিট একই নিয়মে) | `src/lib/payment-gateway.ts` (নতুন), `src/lib/actions/payment-gateway.ts` (নতুন), `src/components/payments/payment-verify-actions.tsx`, `src/app/(app)/payments/[id]/page.tsx`, `src/app/(app)/payments/pending/page.tsx`, i18n `modules.ts` | `npx tsx scripts/_mock-payment-gateway.ts` → 17/17 PASS |

**কনফিগ (`.env`-এ বসালেই সক্রিয়):**
- S3: `STORAGE_DRIVER=s3`, `S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_FORCE_PATH_STYLE`
- Email: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_SECURE`, `SMTP_FROM`
- SMS: `SMS_API_URL`, `SMS_API_KEY`, `SMS_SENDER_ID`, `SMS_METHOD`
- AI: `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`
- Payment: `PAYMENT_PROVIDER`, `PAYMENT_VERIFY_URL`, `PAYMENT_VERIFY_API_KEY`

**যাচাই:** `npm run typecheck` → ০ ত্রুটি; `npm run build` → সফল (৮৭ রুট); `npm start` → Ready, `/login` 200, `/payments/pending` 307 (সেশন ছাড়া প্রত্যাশিত)।

---

## যাচাইকের ধাপ ২ (2026-10-31) — পুনরায় কোড লেখা হয়নি, শুধু যাচাই ও একটিমাত্র কনফিগ-ফিক্স

| কাজ | বিস্তারিত | ফল |
|---|---|---|
| Typecheck | `npm run typecheck` | ০ ত্রুটি (exit 0) |
| Production Build | `npm run build` (`.next` পরিষ্কার করে) | সফল Compiled (exit 0), সব রুট তৈরি |
| Runtime | `npm start` (port 3200) | Ready in ~0.8s; `/login` → 200, `/` → 307, `/health/logs` → 307, `/api/students/export` → 401 (guard ঠিক) |
| E2E Smoke | `node scripts/_smoke-students.mjs` (`SMOKE_BASE=http://localhost:3200`) | **17/17 PASS** — লগইন + DB + CRUD + Audit + পরিষ্কার |
| কনফিগ-ফিক্স | `next.config.ts`-এ `outputFileTracingRoot: path.resolve(__dirname)` যোগ | হোম-ফোল্ডারের অতিরিক্ত lockfile-এর কারণে Next ভুল workspace root ধরছিল; এখন প্রোডাকশন output tracing সঠিক প্রজেক্ট root থেকে হয় (build warning দূর হয়েছে) |

> এই ধাপে কোনো বিদ্যমান ফিচার/কোড পুনরায় লেখা বা পরিবর্তন করা হয়নি — শুধু চলমানতা যাচাই ও উপরের একটিমাত্র কনফিগ-সংশোধন।

---

## ডোমেইন ছাড়াই এখন চালু + পরে ডোমেইন যোগ করলেই স্বয়ংক্রিয় HTTPS-নিরাপদ (2026-10-31)

**সমস্যা:** প্রোডাকশনে Session Cookie সবসময় `Secure` ছিল (`env.isProduction`)। ডোমেইন/HTTPS
না থাকলে IP দিয়ে `http://`-তে খুললে ব্রাউজার `Secure` Cookie সংরক্ষণ করে না — ফলে লগইন
করার পরও সেশন থাকে না, আবার লগইন পেজে ফিরে যায়।

**সমাধান (ডোমেইন-সচেতন Cookie):**
- `src/lib/env.ts` — নতুন `cookieSecure`: `COOKIE_SECURE` দেওয়া থাকলে সেটিই মানা হয়; নাহলে `APP_URL` https হলে `true`, http হলে `false`; কিছুই না থাকলে প্রোডাকশনে `true`।
- `src/lib/auth/session.ts` — `secure: env.cookieSecure` (আগে `env.isProduction`)।
- `.env` ও `.env.example` — `COOKIE_SECURE` যোগ ও `APP_URL`-এ IP/ডোমেইন নির্দেশনা।

**এখন কীভাবে চালাবেন:** ডোমেইন না থাকলে শুধু `APP_URL`-এ আপনার সার্ভারের IP দিন
(যেমন `http://192.168.0.10:3000`) → লগইন `http`-এই কাজ করবে। পরে ডোমেইন কিনে
`APP_URL="https://your-domain"` করলে Cookie নিজে থেকেই `Secure` হয়ে যাবে, আর কিছু বদলাতে হবে না।

**যাচাই:** typecheck ০ ত্রুটি; build সফল; `npm start`-এ —
`APP_URL=http` → লগইন `303`, Cookie-তে `Secure` নেই, `/students` `200`;
`APP_URL=https` → লগইন `303`, Cookie-তে `Secure` আছে (`HAS_SECURE: true`)।

---

## এই সেশনে সম্পন্ন কাজ

| ID | কাজ | ফাইল | অবস্থা |
|---|---|---|---|
| F-STU-10 | তালিকা প্রিন্ট/PDF ও অনুমতিসাপেক্ষ Export — শিক্ষার্থী তালিকা CSV রপ্তানি API; `student.export` Permission guard, তালিকা পেজের বর্তমান ফিল্টার প্রেরণ, UTF-8 BOM (Excel-এ বাংলা ঠিক), Audit Log (`STUDENT_EXPORT`) | `src/app/api/students/export/route.ts` (নতুন), `src/app/(app)/students/page.tsx`, `src/lib/i18n/locales/records.ts`, `scripts/_smoke-student-export.mjs` | Tested (12/12 PASS) |
| F-STU-11 | শিক্ষার্থী CRUD বাস্তব (E2E) পরীক্ষা | `scripts/_smoke-students.mjs` | Tested (17/17 PASS) |
| F-GAL-04 | Thumbnail ও Optimized Image — আপলোডের সময় ব্রাউজার Canvas দিয়ে ছবির ছোট সংস্করণ (WebP, সর্বোচ্চ ৪৮০px) তৈরি হয় ও আলাদা FileAsset হিসেবে সংরক্ষিত হয়; তালিকা/গ্যালারিতে সেটিই দেখানো হয় | `src/lib/image-thumbnail.ts`, `src/components/gallery/gallery-item-manager.tsx`, `src/components/gallery/album-manager.tsx`, `src/lib/gallery.ts`, `src/lib/actions/gallery.ts`, `src/lib/constants.ts`, `prisma/schema.prisma` | Implemented |
| F-BKP-02 | File Backup — ডেটাবেস কপির পাশাপাশি আপলোড করা ফাইল ফোল্ডারও ব্যাকআপ হয়; প্রতি ফাইলের SHA-256 manifest হিসাব করে অখণ্ডতা যাচাই; পুনরুদ্ধারে ফাইল ফোল্ডারও ফিরে আসে; মোছার সময় ফাইল ফোল্ডারও যায় | `src/lib/backup.ts`, `src/lib/actions/backup.ts`, `src/components/system/backup-manager.tsx`, `src/app/(app)/backup/page.tsx`, `src/lib/i18n/locales/records.ts`, `prisma/schema.prisma` | Implemented |
| F-EMP-11 | কর্মচারী-ভিত্তিক শ্রেণি/বিষয় বরাদ্দ UI — কর্মচারীর প্রোফাইল পেজে "পরীক্ষা-বিষয় বরাদ্দ (পরীক্ষক)" কার্ড; কোন পরীক্ষার কোন শ্রেণি/বিষয়ে তিনি পরীক্ষক, তার তালিকা | `src/lib/exams.ts`, `src/app/(app)/employees/[id]/page.tsx`, `src/lib/i18n/locales/modules.ts` | Implemented |
| F-ATT-09 | Face Recognition হাজিরা — বাইরের API/ML ছাড়াই নির্ভরতা-মুক্ত (ক্যামেরার গাইড-বৃত্ত → ২৪×২৪ ধূসর → হিস্টোগ্রাম-সমানকরণ → z-score → Int8 কোয়ান্টাইজ → Base64 ৫৭৬-বাইট টেমপ্লেট; মিল = কোসাইন সাদৃশ্য)। দুই মোড: কিয়স্ক (লাইভ স্ক্যান → হাজিরা) ও মুখ নিবন্ধন (+Remove)। গোপনীয়তা: শুধু টেমপ্লেট সংরক্ষণ, সম্মতি ছাড়া নিবন্ধন বন্ধ | `src/lib/face.ts`, `src/lib/face-descriptor.ts`, `src/lib/actions/face.ts`, `src/components/attendance/face-camera.tsx`, `src/components/attendance/face-enroll-manager.tsx`, `src/app/(app)/attendance/face/page.tsx`, `src/config/navigation.ts`, `src/components/layout/icon-map.tsx`, `src/lib/i18n/locales/nav.ts`, `src/lib/i18n/locales/modules.ts`, `scripts/_smoke-face.mjs` | Tested (14/14 PASS) |
| F-CHT-04 | Chat রিয়েল-টাইম (SSE) — WebSocket-এর বদলে হোস্টিং-নিরপেক্ষ Server-Sent Events; প্রক্রিয়া-ভিত্তিক EventEmitter দিয়ে তাৎক্ষণিক push + প্রতি ৩ সেকেন্ডে DB ফলব্যাক; ক্লায়েন্টে বাড়তি বিরতিতে পুনঃসংযোগ ও ৩০ সেকেন্ডের নিরাপত্তা-Polling | `src/lib/chat-events.ts` (নতুন), `src/app/api/chat/[id]/stream/route.ts` (নতুন), `src/lib/actions/chat.ts`, `src/components/portal/portal-forms.tsx` (ChatLive), `scripts/_smoke-chat-stream.mjs` (নতুন) | Tested (8/8 PASS) |
| F-DEP-06 | Error Monitoring — বাইরের সার্ভিস (Sentry ইত্যাদি) ছাড়াই নিজস্ব ত্রুটি-পর্যবেক্ষণ; App Router-এর `error.tsx` (route-level) ও `global-error.tsx` (root-level, inline-CSS) থেকে `reportClientErrorAction` কল হয় → `SystemEvent`-এ (source: "client") লেখা হয় → `/health/logs`-এ `ERROR` ছাঁকনিতে দৃশ্যমান; শুধু লগইন করা ব্যবহারকারী থেকে (spam প্রতিরোধ), স্ট্যাক/বার্তা নির্দিষ্ট দৈর্ঘ্যে কাটা | `src/lib/actions/diagnostics.ts` (নতুন), `src/app/error.tsx` (নতুন), `src/app/global-error.tsx` (নতুন), `src/lib/i18n/locales/core.ts`, `scripts/_smoke-error-monitoring.mjs` (নতুন) | Tested (8/8 PASS) |
| F-FEE-02..11, 13, 14 | ফি ও পেমেন্ট (Module ১২, ১৩) — সম্পূর্ণ E2E স্মোক টেস্ট: ফি-এর ধরন → কাঠামো → ছাড় → মাসিক ফি (দ্বিগুণ-রোধ) → নগদ পেমেন্ট (VERIFIED + বণ্টন + লেজার + রসিদ) → মোবাইল পেমেন্ট (PENDING) → হাতে যাচাই → বাতিল (বণ্টন ফেরত + লেজার REVERSED + সংশোধনের ইতিহাস) → তালিকা → Audit Log। ক্লায়েন্ট-dispatcher ফর্মের জন্য build manifest থেকে action-id বের করে wire-protocol POST | `scripts/_smoke-fees-payments.mjs` (নতুন) | Tested (32/32 PASS) |

**F-GAL-04 সংশ্লিষ্ট:**
- `GalleryItem.thumbnailFileId` ও `Album.coverThumbFileId` (nullable) যোগ — বিদ্যমান ডেটা অক্ষত।
- `STORAGE_FOLDERS.galleryThumb = "gallery/thumbs"`; `resolveThumbnailFileId` যাচাই।

**F-BKP-02 সংশ্লিষ্ট:**
- `BackupRecord`-এ `includeFiles`, `fileCount`, `filesSizeBytes`, `filesPath`, `filesChecksum` (nullable/default) যোগ — বিদ্যমান ডেটা অক্ষত।
- `/backup` পেজে "আপলোড করা ফাইলসহ ব্যাকআপ" চেকবক্স ও ফাইল-সংখ্যা কলাম।
- ডেটাবেস সিঙ্ক: `npx prisma db push`; ব্যাকআপ: `prisma/dev.db.bak-bkp02`।

**F-EMP-11 সংশ্লিষ্ট:**
- `listEmployeeExamDuties()` — `ExamSubject`-এ যেখানে `examinerEmployeeId` = এই কর্মচারী, সেই তালিকা (পরীক্ষার নাম, শ্রেণি, বিষয়, পূর্ণমান, পাস নম্বর, তারিখ)।
- `/employees/[id]`-এ নতুন কার্ড (খালি হলে পরিষ্কার EmptyState)।

**F-STU-10 সংশ্লিষ্ট:**
- `/api/students/export` — GET; 401 (লগইন নেই), 403 (`student.export` নেই); `listStudents()` ২০০ করে পেজিং, সর্বোচ্চ ৫০০০ সারি।
- CSV কলাম: কোড, নাম, শ্রেণি, শাখা, রোল, বিভাগ, অভিভাবক ফোন, আবাসিক অবস্থা, অবস্থা — সবই বর্তমান ভাষায়।
- `records.exportCsv` i18n key bn/en/ar-এ যোগ; তালিকা পেজে ফিল্টারসহ Export বাটন।

**F-ATT-09 সংশ্লিষ্ট:**
- `src/lib/face.ts` — সার্ভার ডেটা স্তর: `listFaceRoster`, `listFaceEnrollStudents`, `getFaceEnrollment`, `upsertFaceEnrollment`, `removeFaceEnrollment`, `recordFaceMatch`, `faceStats`।
- `src/lib/face-descriptor.ts` — ক্লায়েন্ট ইঞ্জিন: `FACE_GRID=24`/`FACE_DIM=576`, `guideBoxFor`, `encodeDescriptor`/`decodeDescriptor`, `cosineSimilarity`, `averageDescriptors`, `extractFaceSample`, `nativeFaceDetector` (Shape Detection API ঐচ্ছিক)।
- `src/lib/actions/face.ts` — ৩টি Server Action (`saveFaceEnrollmentAction`, `removeFaceEnrollmentAction`, `markAttendanceByFaceAction`); সবই `PERMISSIONS.ATTENDANCE_MARK` guard, consent যাচাই, upsert + Audit Log।
- `/attendance/face` — কিয়স্ক মোড (ডিফল্ট) + এনরোলমেন্ট মোড ট্যাব; ফিল্টার (বিভাগ/শ্রেণি/শাখা/তারিখ/অনুসন্ধান) ও পেজিং।
- সাইডবারে `attendanceFace` মেনু; bn/en/ar-এ ৩৭টি i18n key।

**F-CHT-04 সংশ্লিষ্ট:**
- `src/lib/chat-events.ts` — প্রক্রিয়া-ভিত্তিক EventEmitter singleton (`globalThis`-এ ধরে রাখা, HMR-নিরাপদ); `publishChatEvent`/`subscribeChatEvents`।
- `/api/chat/[id]/stream` — SSE রুট (`nodejs` runtime, force-dynamic); অংশগ্রহণকারী যাচাই; `ready`/`message`/`status` ইভেন্ট + ২০ সে. হার্টবিট; প্রতি ৩ সে. DB `lastMessageAt` ফলব্যাক।
- `sendChatMessageAction` — বার্তা সংরক্ষণের পর `publishChatEvent(...)` কল করে তাৎক্ষণিক push।
- `ChatLive` (portal-forms.tsx) — SSE + বাড়তি বিরতিতে পুনঃসংযোগ + ৩০ সে. নিরাপত্তা-Polling (SSE ব্যর্থ হলেও চ্যাট আগের মতো চলে)।

**F-DEP-06 সংশ্লিষ্ট:**
- `src/lib/actions/diagnostics.ts` — `reportClientErrorAction`; লগইন না থাকলে কিছু লেখে না (খোলা স্প্যাম আটকায়); `digest`/`url`/`stack`/`userAgent`/`userId` `SystemEvent`-এ (`source: "client"`)।
- `src/app/error.tsx` — route-level Error Boundary; থিম/Translation সহ সম্মানজনক স্ক্রিন, `reset()` দিয়ে পুনঃচেষ্টা, ড্যাশবোর্ডে ফেরার লিংক।
- `src/app/global-error.tsx` — root-level (Chroot) সীমানা; Provider/CSS-নিরপেক্ষ inline শৈলী; ত্রিভাষিক বার্তা; `error.digest`।
- `core.ts`-এ `errorCode` (bn/en/ar) যোগ; `/health/logs`-এ `ERROR` + `client` ছাঁকনিতে রিপোর্ট দেখা যায়।

**যাচাই:**
- `npm run typecheck` → ০ ত্রুটি (exit 0)
- `npm run build` → সফল, ৮৮ রুট (exit 0) — `/api/students/export`, `/attendance/face` (11.8 kB) ও `/api/chat/[id]/stream` রুটসহ
- `node scripts/_smoke-student-export.mjs` → **12/12 PASS** (লগইন ছাড়া 401; লগইন সহ 200; text/csv; attachment; UTF-8 BOM `EF BB BF`; ৯ কলাম; ফিল্টার; Audit Log লেখা ও পরিষ্কার)
- `node scripts/_smoke-face.mjs` (build server, `localhost:3100`) → **14/14 PASS** (লগইন ছাড়া `307 /login`; কিয়স্ক পেজ `200` + "কিয়স্ক মোড" UI; এনরোলমেন্ট ট্যাব ও "মুখ নিবন্ধন" UI; গোপনীয়তা বার্তা; সাইডবার লিংক; ৫৭৬-বাইট টেমপ্লেট upsert → তালিকায় "নিবন্ধিত"; টেস্ট-ডেটা পরিষ্কার)
- `node scripts/_smoke-chat-stream.mjs` (build server, `localhost:3100`) → **8/8 PASS** (লগইন ছাড়া `401`; অংশগ্রহণ না থাকলে `403`; অংশগ্রহণকারীর `200` + `text/event-stream`; `event: ready`; DB-তে নতুন বার্তায় `event: message`; টেস্ট-ডেটা পরিষ্কার)
- `node scripts/_smoke-error-monitoring.mjs` (build server, `localhost:3100`) → **8/8 PASS** (লগইন ছাড়া `/health/logs` → `307 /login`; লগইন `303`; `ERROR+client` ফিল্টার `200` ও রিপোর্ট করা ত্রুটি তালিকায় দৃশ্যমান; build chunk-এ `reportClientErrorAction` wiring নিশ্চিত (১৪৩ chunk স্ক্যান); `error.tsx`/`global-error.tsx` উপস্থিত; টেস্ট-ডেটা পরিষ্কার)
- `node scripts/_smoke-fees-payments.mjs` (dev server, `localhost:3100`) → **32/32 PASS** (লগইন `303`; ৮টি ফি/পেমেন্ট রুট `200`; ফি-এর ধরন → কাঠামো (poysha) → ছাড় (PERCENT=৫০) → মাসিক ফি generate (amount=150000, discount=75000, payable/due=75000, UNPAID) ও দ্বিতীয়বার skipped; নগদ পেমেন্ট VERIFIED + allocation + LedgerEntry (DQC-L-, APPROVED) + Receipt snapshot; মোবাইল BKASH PENDING (ledger নেই) → manifest-derived action-id দিয়ে হাতে যাচাই VERIFIED + ledger; উভয় বণ্টনের পর ফি PAID (due=0); বাতিল → REVERSED + allocations=0 + ledger REVERSED + LedgerRevision; ফি পুনঃহিসাব PARTIAL; তালিকা রেন্ডার; Audit Log=16; টেস্ট-ডেটা সম্পূর্ণ পরিষ্কার)
- `npx tsx scripts/_smoke-backup-files.ts` (NODE_OPTIONS=--conditions=react-server) → **SMOKE PASS** (ফাইলসহ ব্যাকআপ, manifest যাচাই, কপি যাচাই, মুছে ফেলা — সব সফল)।
- F-EMP-11 কুয়েরি → **EMP11 PASS** (সাময়িক Exam + ExamSubject বানিয়ে যাচাই, শেষে সব মুছে ফেলা; ডেটাবেসে কোনো জঞ্জাল নেই)।

---

## বর্তমানে অসম্পূর্ণ / যাচাই বাকি

| ID | কাজ | মন্তব্য |
|---|---|---|
| — | এই মুহূর্তে অসম্পূর্ণ নেই | F-SET-07/08/09 ✅, F-STU-10 ✅, F-STU-11 ✅ (17/17), F-ATT-09 ✅ (14/14), F-CHT-04 ✅ (8/8), F-DEP-06 ✅ (8/8), F-FEE-01..11/13/14 ✅ (32/32), **মডিউল ৩৪–৪০ (ডেপ্লয়মেন্ট ৭টি + WhatsApp) ✅ (17/17)** |

**এই সেশনে যাচাইকৃত (Implemented):** F-SET-07 (সেটিংস Audit, `SETTINGS_UPDATE`), F-SET-08 (Developer Profile), F-SET-09 (AI Knowledge), F-STU-11 (`scripts/_smoke-students.mjs`, 17/17 PASS), F-STU-10 (`/api/students/export`), F-ATT-09 (Face Recognition হাজিরা — `scripts/_smoke-face.mjs`, 14/14 PASS), F-CHT-04 (Chat SSE রিয়েল-টাইম — `scripts/_smoke-chat-stream.mjs`, 8/8 PASS), F-DEP-06 (Error Monitoring — `scripts/_smoke-error-monitoring.mjs`, 8/8 PASS), F-FEE-02..11/13/14 (ফি ও পেমেন্ট — `scripts/_smoke-fees-payments.mjs`, 32/32 PASS)।

**ইতিমধ্যেই সম্পন্ন (রেজিস্টারে পুরোনো তথ্য ছিল):** F-RPT-05 (User Activity Report), F-ADM-08 (Admission Report), F-BKP-01..06, F-EMP-10 (নথি আপলোড UI), F-EMP-11, F-EMP-12 (ID card / নিয়োগপত্র)।

**আগে "Blocked" ছিল, এখন শুধু Credentials বসালেই সক্রিয় (.env-gated, বাস্তবায়িত):** F-FEE-12 (Payment gateway — `PAYMENT_VERIFY_URL`/`PAYMENT_VERIFY_API_KEY`), F-AI-06 (AI Provider — `AI_BASE_URL`/`AI_API_KEY`), F-NTF-02/03 (SMTP/SMS), **মডিউল ৪০ WhatsApp (`WHATSAPP_PHONE_NUMBER_ID`/`WHATSAPP_ACCESS_TOKEN`)**, F-DEP-05 (S3)। কনফিগ না থাকলে নিজস্ব লোকাল/pending আচরণেই App স্বাভাবিক চলে।

**এখনো সত্যিকারভাবে Blocked (শুধু হোস্টিং/ডোমেইন লাগবে):** F-DEP-03 (PostgreSQL — লোকালে SQLite চলে; `/health`-এর "ডেপ্লয়মেন্ট প্রস্তুতি" কার্ডে স্পষ্ট দেখানো হয়), F-DEP-04-এর HTTPS/ডোমেইন (ডোমেইন ছাড়া IP+`APP_URL` দিয়েই চলে; কার্ডে "ডোমেইন ও HTTPS: প্রস্তুত নয়" দেখায়)।

---

## পরবর্তী কাজ (অগ্রাধিকার ক্রম)

রেজিস্টার অনুযায়ী **নিবন্ধিত সব ফিচার বাস্তবায়িত ও যাচাইকৃত**; বাকি শুধু বাইরের
নির্ভরশীলতা (Blocked):

1. **Credential/হোস্টিং পেলেই সক্রিয় (কোড আগেই প্রস্তুত, `.env`-gated):** F-FEE-12 (Payment Merchant API), F-AI-06 (AI_API_KEY), F-NTF-02/03 (SMS/SMTP), মডিউল ৪০ WhatsApp (Cloud API), F-DEP-05 (S3)। **শুধু হোস্টিং পেলেই:** F-DEP-03 (PostgreSQL), F-DEP-04 (HTTPS/ডোমেইন)। এই ৭টির সত্যিকার অবস্থা এখন `/health`-এর "ডেপ্লয়মেন্ট প্রস্তুতি" কার্ডে দেখা যায়। (F-DEP-06 Error Monitoring সম্পন্ন — বাইরের সার্ভিস ছাড়াই কাজ করে।)

> পরবর্তী সেশন: উপরের Blocked আইটেমগুলোর জন্য আসল Credentials/হোস্টিং পাওয়া গেলে
> সেগুলো সম্পন্ন করা যাবে; অন্যথায় নতুন কোনো ফিচার-অনুরোধ এলে সেটি বাস্তবায়ন।
> নোট: `FEATURE_REGISTER.md`-এ কিছু আইটেম পুরোনো তথ্য অনুযায়ী "Not Started"
> দেখালেও প্রকৃত ফাইল/HTTP পরীক্ষায় সেগুলো (Health, AI, Search, Excel,
> Backup, Reports, F-SET-07/08/09, F-STU-10/11, F-ATT-09, F-CHT-04, F-DEP-06, F-FEE-02..11/13/14) ইতিমধ্যেই
> বাস্তবায়িত ও যাচাইকৃত।
