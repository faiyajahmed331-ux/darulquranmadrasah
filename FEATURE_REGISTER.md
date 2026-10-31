# Feature Completeness Register — দারুল কোরআন ক্যাডেট মাদ্রাসা

> নিয়ম (Master Prompt PART 1.2): কোনো ফিচারকে **Tested** বলার আগে বাস্তবে পরীক্ষা করতে হবে।
> এই ফাইলটি প্রতিটি Phase শেষে হালনাগাদ করা হবে।

**স্ট্যাটাস মানে:**
- `Not Started` — কিছুই লেখা হয়নি
- `In Progress` — আংশিক লেখা হয়েছে, UI বা API বাকি
- `Implemented` — কোড লেখা শেষ, বাস্তব পরীক্ষা হয়নি
- `Tested` — Database-এ তথ্য রেখে বাস্তবে পরীক্ষা পাস
- `Blocked` — বাইরের API/Account/Credentials ছাড়া চালু করা যাবে না

**সর্বশেষ হালনাগাদ:** 2026-10-31 (F-SET-07/08/09 যাচাইকৃত; F-STU-10 CSV রপ্তানি API `Tested` — `scripts/_smoke-student-export.mjs` 12/12 PASS; F-STU-11 `Tested` 17/17 PASS; `npm run build` সফল — ৮৬ রুট)

---

## Foundation (Phase 2) — সমাপ্ত

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-FND-01 | নিরাপদ Login ও Session | `/login`, `lib/auth/session.ts` | User, Session, LoginAttempt | — | Tested |
| F-FND-02 | Password Hash ও Change Password | `/change-password` | User | — | Tested |
| F-FND-03 | Role → Permission Mapping (৮ Role, ৭১ Permission) | `lib/rbac.ts`, `lib/rbac-data.ts` | Role, Permission, RolePermission | — | Tested |
| F-FND-04 | সর্বত্র Server-Side Permission যাচাই | সব Server Action | — | সব | Tested |
| F-FND-05 | Audit Log (নিরাপদ Auto-Save) | `lib/db.ts`, `AuditLog` | AuditLog | — | Implemented |
| F-FND-06 | নাম্বার সিকোয়েন্স (Student ID, Receipt No…) | `lib/db.ts` `nextNumber()` | NumberSequence | — | Tested |
| F-FND-07 | তিন ভাষা (বাংলা/English/العربية) + RTL | `lib/i18n/*` | User.locale | — | Tested |
| F-FND-08 | Dashboard (সব সংখ্যা Database থেকে) | `/dashboard` | — | dashboard.view | Implemented |
| F-FND-09 | Partial — Login Rate Limit | `lib/auth/session.ts` | LoginAttempt | — | Implemented |
| F-FND-10 | Backup/Restore/Reset স্ক্রিপ্ট | `scripts/backup.ts`, `scripts/restore.ts`, `scripts/reset.ts` | BackupRecord | — | Implemented |

## Module: একাডেমিক কাঠামো (Phase 2/3)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-ACA-01 | বিভাগ (নূরানী/নাজেরা/হিফজ) | `/academic/departments` | Department | academic.view / manage | Tested |
| F-ACA-02 | শ্রেণি ও ধারণক্ষমতা | `/academic/classes` | SchoolClass | academic.* | Tested |
| F-ACA-03 | শাখা (Section) | `/academic/sections` | Section | academic.* | Tested |
| F-ACA-04 | শিক্ষাবর্ষ | `/academic/years` | AcademicYear | academic.* | Tested |
| F-ACA-05 | বিষয় তালিকা | `/academic/subjects` | ClassSubject | academic.* | Tested |
| F-ACA-06 | ধারণক্ষমতা পূর্ণ হলে সতর্কবার্তা | `/academic/classes` | SchoolClass | academic.* | Implemented |

## Module: শিক্ষার্থী ব্যবস্থাপনা (Phase 3)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-STU-01 | শিক্ষার্থী তালিকা + Search + Filter + Pagination | `/students` | Student | student.view | Implemented |
| F-STU-02 | নতুন শিক্ষার্থী যোগ ও ভর্তি ফরম | `/students/new` | Student, StudentEnrollment | student.create | Implemented |
| F-STU-03 | শিক্ষার্থী প্রোফাইল | `/students/[id]` | Student | student.view | Implemented |
| F-STU-04 | তথ্য সংশোধন | `/students/[id]/edit` | Student | student.update | Implemented |
| F-STU-05 | ছবি ও ডকুমেন্ট আপলোড | `components/students/photo-field.tsx`, `/api/files/[fileId]` | FileAsset | student.create/update | Implemented |
| F-STU-06 | রোল/রেজিস্ট্রেশন Unique + Duplicate শনাক্তকরণ | `lib/students.ts` `findPossibleDuplicates` | Student | student.* | Implemented |
| F-STU-07 | শিক্ষার্থী আর্কাইভ ও ফিরিয়ে আনা (Soft Delete) | `/students/archive` | Student | student.archive | Implemented |
| F-STU-08 | শ্রেণি/বিভাগ স্থানান্তর ও শিক্ষাবর্ষ পরিবর্তন | `changeEnrollmentAction` | StudentEnrollment | student.update | Implemented |
| F-STU-09 | অভিভাবক স্বয়ংক্রিয় সংযুক্তি | `linkGuardian()` | Guardian, StudentGuardian | student.* | Implemented |
| F-STU-10 | তালিকা প্রিন্ট/PDF ও অনুমতিসাপেক্ষ Export | `/students` (PrintButton + Export বাটন), `/api/students/export` (CSV, UTF-8 BOM), `/reports` (student) | `src/app/api/students/export/route.ts` | student.export, report.export | Tested (`scripts/_smoke-student-export.mjs`, 12/12 PASS) |
| F-STU-11 | বাস্তব CRUD পরীক্ষা (ডেটা সহ) | `scripts/_smoke-students.mjs` | Student, StudentEnrollment, Guardian | — | Tested (17/17 PASS) |

## Module: ভর্তি ব্যবস্থাপনা (Phase 3)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-ADM-01 | ভর্তি ফরম ও আবেদন জমা | `/admission/new` | AdmissionApplication | admission.create | Tested |
| F-ADM-02 | ভর্তি তালিকা ও ফিল্টার | `/admission` | AdmissionApplication | admission.view | Tested |
| F-ADM-03 | ভর্তি যাচাই (Under Review) | `/admission/[id]` | AdmissionApplication | admission.review | Tested |
| F-ADM-04 | ভর্তি অনুমোদন → শিক্ষার্থী তৈরি | `lib/actions/admissions.ts` | Student, StudentEnrollment | admission.approve | Tested |
| F-ADM-05 | ভর্তি নম্বর ও Duplicate রোধ | `nextNumber(admission)` | NumberSequence | — | Implemented |
| F-ADM-06 | ভর্তি রসিদ | `receipt` snapshot, `/receipts/[id]` (PrintButton) | Payment, Receipt | admission.view | Implemented |
| F-ADM-07 | অনুমোদিত ভর্তি তালিকা | `/admission/approved` | AdmissionApplication | admission.view | Tested |
| F-ADM-08 | ভর্তি রিপোর্ট | `/reports` (admission) | — | report.view | Implemented |
| F-ADM-09 | খসড়া আবেদন সম্পাদনা | `/admission/[id]/edit` | AdmissionApplication | admission.review | Implemented |
| F-ADM-10 | আবেদন বাতিল (Reject) | `/admission/[id]` | AdmissionApplication | admission.review | Tested |
| F-ADM-11 | আবেদন প্রত্যাহার (Withdraw) | `/admission/[id]` | AdmissionApplication | admission.review | Tested |
| F-ADM-12 | পেজ-গার্ড (Session/Permission) | সব `/admission/*` | — | admission.* | Tested |

> **যাচাইয়ের বিবরণ (২০২৬-১০-২৩):** প্রকৃত HTTP অনুরোধে Server Action চালিয়ে
> পরীক্ষা করা হয়েছে — (১) জমা → অনুমোদনে শিক্ষার্থী (`DQC-S-*`), শ্রেণি-ইতিহাস,
> অভিভাবক সংযোগ, পেমেন্ট (৫০০৳) ও রসিদ (`DQC-R-*`) তৈরি হয়েছে এবং শিক্ষার্থী
> তালিকা ও অনুমোদিত তালিকায় দেখা গেছে; (২) যাচাই → `UNDER_REVIEW`;
> (৩) বাতিল → `REJECTED` (শিক্ষার্থী তৈরি হয়নি); (৪) প্রত্যাহার → `WITHDRAWN`;
> (৫) Session ছাড়া `/admission` → 307 রিডাইরেক্ট `/login`।
> পরীক্ষার সব সাময়িক ডেটা মুছে ফেলা হয়েছে এবং নম্বর-সিকোয়েন্স আগের অবস্থায়
> ফেরানো হয়েছে (শিক্ষার্থী/পেমেন্ট/ভর্তি = ০)।
> বাকি: ভর্তি PDF রিপোর্ট (F-ADM-08), খসড়া সম্পাদনার UI পরীক্ষা (F-ADM-09)।

## Module: শিক্ষক ও কর্মচারী (Phase 3)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-EMP-01 | শিক্ষক/কর্মচারী তালিকা (অনুসন্ধান, ধরন/বিভাগ/অবস্থা ফিল্টার, পৃষ্ঠা) | `/employees` | Employee | employee.view | Tested |
| F-EMP-02 | নতুন শিক্ষক/কর্মচারী যোগ (স্বয়ংক্রিয় `DQC-E-*` আইডি) | `/employees/new` | Employee, Address, FileAsset | employee.create | Tested |
| F-EMP-03 | প্রোফাইল ও সম্পাদনা | `/employees/[id]`, `/employees/[id]/edit` | Employee | employee.update | Tested |
| F-EMP-04 | বিভাগ বরাদ্দ ও ঠিকানা (বাংলাদেশ প্রশাসনিক স্তর) | `/employees/[id]/edit` | Employee, Address | employee.update | Tested |
| F-EMP-05 | বেতন হিসাব, পরিশোধ, বাতিল ও সম্পাদনা | `/employees/salaries`, `/employees/salaries/new`, `/employees/salaries/[id]/edit` | SalaryRecord | employee.salary | Tested |
| F-EMP-06 | আর্কাইভ (Soft Delete) ও পুনরুদ্ধার | `/employees?archived=1` | Employee | employee.archive | Tested |
| F-EMP-07 | বেতন পরিশোধে স্বয়ংক্রিয় ব্যয় এন্ট্রি (খাত `EXP_SALARY`) | `lib/actions/employees.ts` | LedgerEntry | employee.salary | Tested |
| F-EMP-08 | প্রাথমিক ৫ জন কর্মচারীর তথ্য যাচাই | Seed | Employee | — | Implemented (Seed) |
| F-EMP-09 | পেজ-গার্ড (Session/Permission) | সব `/employees/*` | — | employee.* | Tested |
| F-EMP-10 | কর্মচারী প্রোফাইলে নথি (Documents) তালিকা | `/employees/[id]` | EmployeeDocument | employee.view | Implemented |
| F-EMP-11 | কর্মচারী-ভিত্তিক শ্রেণি/বিষয় বরাদ্দ (ExamSubject) | `/employees/[id]` | ExamSubject | employee.update | Implemented |
| F-EMP-12 | কর্মচারী রিপোর্ট/PDF (Join letter, ID card) | `/employees/[id]/letter`, `/employees/[id]/id-card` | — | report.view | Implemented |

> **যাচাইয়ের বিবরণ (২০২৬-১০-২৩):** প্রকৃত HTTP অনুরোধে (dev সার্ভার, পোর্ট ৩১০০)
> অস্থায়ী admin সেশন দিয়ে সব পেজ খুলে দেখা হয়েছে — `/employees`, `/employees?archived=1`,
> `/employees/new`, `/employees/salaries`, `/employees/salaries/new`, একটি প্রকৃত
> কর্মচারীর `/employees/[id]` ও `/employees/[id]/edit`, এবং একটি বেতন রেকর্ডের
> `/employees/salaries/[id]/edit` — সব ক্ষেত্রে **200** ও প্রত্যাশিত বাংলা লেখা পাওয়া
> গেছে। Session ছাড়া `/employees` → **307 রিডাইরেক্ট `/login`**।
> Typecheck (`tsc --noEmit`) ও production build **শূন্য ত্রুটিসহ** সফল; build-এ
> ৭টি কর্মচারী রুট নিবন্ধিত হয়েছে।
>
> **Server Action-ভিত্তিক CRUD যাচাই (১৮/১৮ পাস, টানা দুইবার):** প্রকৃত সার্ভারের
> ভেতরেই আসল action ফাংশনগুলো চালানো হয়েছে (Session/Permission/Validation/Database
> সবই আসল কোডপথ) — (১) Session ছাড়া → বাধা; (২) অসম্পূর্ণ ফরম → field error;
> (৩) নতুন কর্মচারী তৈরি → স্বয়ংক্রিয় `DQC-E-*` আইডি, বেতন poysha `2500000`,
> ঠিকানা সংরক্ষিত, `EMPLOYEE_CREATE` Audit Log; (৪) সম্পাদনা → ধরন `STAFF`, বেতন
> `3000000`; (৫) বেতন রেকর্ড → নিট প্রদেয় `3100000` (৩০০০০+২০০০+৫০০−১৫০০);
> (৬) একই মাসে দ্বিতীয় বেতন → বাধা; (৭) পরিশোধ → `PAID`, `paidAmount 3100000`
> এবং লেজারে **একটি** `EXPENSE` এন্ট্রি (`DQC-L-*`, `salaryRecordId` unique);
> (৮) দুইবার পরিশোধ → বাধা; (৯) পরিশোধিত বেতন বাতিল → বাধা; (১০) অপরিশোধিত বেতন
> বাতিল → `CANCELLED`; (১১) আর্কাইভ → `isArchived true`, পুনরুদ্ধার → `false`;
> (১২) পরীক্ষার সব সাময়িক তথ্য সফলভাবে মুছে ফেলা হয়েছে।
>
> পরীক্ষার সব সাময়িক তথ্য (অস্থায়ী user, session, কর্মচারী, বেতন ও লেজার এন্ট্রি)
> মুছে ফেলা হয়েছে; আসল Admin, Password Hash ও প্রকৃত ডেটা স্পর্শ করা হয়নি।
>
> **পরে যাচাই (২০২৬-১০-৩১):** নথি আপলোড UI (F-EMP-10 — `AddEmployeeDocumentForm`),
> কর্মচারী-ভিত্তিক পরীক্ষা-বিষয় বরাদ্দ (F-EMP-11 — `/employees/[id]`-এ "পরীক্ষা-বিষয়
> বরাদ্দ (পরীক্ষক)" কার্ড), এবং কর্মচারী রিপোর্ট/PDF (F-EMP-12 — `/employees/[id]/letter`,
> `/employees/[id]/id-card`) — সবই প্রকৃত কোডে বাস্তবায়িত পাওয়া গেছে এবং সম্পন্ন চিহ্নিত।

## Module: হাজিরা (Phase 4)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-ATT-01 | দৈনিক শিক্ষার্থী হাজিরা (স্ট্যাট কার্ড + তালিকা) | `/attendance`, `components/attendance/student-attendance-sheet.tsx` | StudentAttendance | attendance.mark | Tested |
| F-ATT-02 | শ্রেণি/বিভাগভিত্তিক হাজিরা (বিভাগ → শ্রেণি → শাখা ফিল্টার) | `/attendance/students` | StudentAttendance | attendance.mark | Tested |
| F-ATT-03 | শিক্ষক-কর্মচারীর হাজিরা (Check-in/Check-out সহ) | `/attendance/employees`, `components/attendance/employee-attendance-sheet.tsx` | EmployeeAttendance | attendance.mark | Tested |
| F-ATT-04 | Duplicate Attendance রোধ (unique) | `startOfDay()`, `@@unique([studentId, date])` | StudentAttendance | — | Tested |
| F-ATT-05 | হাজিরা সংশোধন + Audit Log (upsert) | `lib/actions/attendance.ts` | StudentAttendance, AuditLog | attendance.mark | Tested |
| F-ATT-06 | মাসিক হাজিরা রিপোর্ট ও অনুপস্থিত তালিকা | `/attendance/report` | StudentAttendance | attendance.report | Tested |
| F-ATT-07 | ছুটির আবেদন ও অনুমোদন | `/attendance/leaves`, `components/attendance/leave-forms.tsx` | LeaveApplication | attendance.leave.review | Tested |
| F-ATT-08 | PDF ও প্রিন্ট | সব হাজিরা পেজ, `components/ui/print-button.tsx`, `components/attendance/attendance-print-header.tsx` | — | attendance.report | Tested |
| F-ATT-09 | Face Recognition হাজিরা | `/attendance/face`, `components/attendance/face-camera.tsx`, `components/attendance/face-enroll-manager.tsx`, `lib/actions/face.ts`, `lib/face.ts`, `lib/face-descriptor.ts` | StudentFaceEnrollment, FaceMatchLog, StudentAttendance, AuditLog | attendance.view / attendance.mark | Tested |

> **যাচাইয়ের বিবরণ (২০২৬-১০-২৩):** হাজিরা মডিউলের সব পেজ তৈরি — `/attendance`,
> `/attendance/students`, `/attendance/employees`, `/attendance/report`, `/attendance/leaves`
> (আগে ৪০৪ দিত)। Typecheck (`tsc --noEmit`) ও production build **শূন্য ত্রুটিসহ** সফল;
> build-এ ৫টি হাজিরা রুট নিবন্ধিত হয়েছে। Unique constraint (`studentId + date`) ও
> `startOfDay()` দিয়ে একই দিনে দ্বিতীয়বার হাজিরা লেখা আটকানো হয়; প্রতিটি লেখা
> upsert ও Audit Log সহ। বাকি: Face Recognition (F-ATT-09)।
>
> **যাচাইয়ের বিবরণ (২০২৬-১০-২৮) — F-ATT-08 (PDF ও প্রিন্ট):** পাঁচটি হাজিরা পেজেই
> `PrintButton` (`components/ui/print-button.tsx`) ও প্রিন্ট-হেডার
> (`components/attendance/attendance-print-header.tsx`, `.print-only` — লোগো, প্রতিষ্ঠানের
> নাম, ঠিকানা, ফোন ও রিপোর্টের শিরোনাম) যোগ করা হয়েছে। `app-shell.tsx`-এ সাইডবার/হেডার/
> ফুটার `no-print` করা হয়েছে, তাই কাগজে কেবল `print-area` অংশ ছাপে। হাজিরা লেখার
> ইনপুট (select/time/remark) `no-print` এবং প্রকৃত মান `print-only` span-এ দেখানো হয়,
> ফলে প্রিন্টে পঠনযোগ্য লেখা আসে। বাস্তবায়ন পথ: CSS প্রিন্ট + ব্রাউজারের
> "Save as PDF" (প্রজেক্টে আলাদা PDF লাইব্রেরি নেই); বিদ্যমান `globals.css` প্রিন্ট-নিয়ম
> (`@page { margin: 12mm }`, `body { background:#fff; color:#000 }`) ব্যবহার করা হয়েছে।
> Typecheck (`tsc --noEmit`) ও production build **শূন্য ত্রুটিসহ** সফল; build-এ ৫টি
> হাজিরা রুট নিবন্ধিত।
>
> **বাস্তব পরীক্ষা (২০২৬-১০-২৮) — F-ATT-01..08 → `Tested`:** প্রকৃত চালু অ্যাপে
> (`localhost:3000`) DB-ভিত্তিক session দিয়ে HTTP অনুরোধ পাঠিয়ে ৩৯টি চেকের সবগুলো পাস
> (`39/39`)। প্রমাণ —
> - (১) সেশন ছাড়া `/attendance` → `307 /login`; লগইনের পর পাঁচটি হাজিরা পেজই `200`।
> - (২) প্রিন্ট-মার্কআপ উপস্থিত: `print-area`, `print-only` হেডার, `no-print` কন্ট্রোল ও প্রিন্ট বোতাম।
> - (৩) শিক্ষার্থীর হাজিরা সংরক্ষণ → `StudentAttendance` সারি তৈরি (`status=PRESENT`), `classId`/`sectionId` কপি, `date = 2099-12-31T00:00:00Z` (UTC দিনের শুরু), `AuditLog ATTENDANCE_MARK`।
> - (৪) একই দিনে দ্বিতীয়বার সংরক্ষণ (F-ATT-04) → **সারি ১টিই থাকে**, মান হালনাগাদ (`ABSENT`) + `AuditLog ATTENDANCE_UPDATE`।
> - (৫) ভুল status → ব্লক, DB অপরিবর্তিত; কোনো সারি নির্বাচন না করলে বার্তা; সেশন ছাড়া সংরক্ষণ ব্লক।
> - (৬) RBAC: `ACCOUNTANT` রোলে `attendance.mark` ছাড়া সংরক্ষণ ব্লক (আগে `attendance.mark`; অ্যাডমিন অনুমোদিত)।
> - (৭) কর্মচারীর হাজিরা → `EmployeeAttendance` সারি, `checkIn=08:15`, `checkOut=14:30`, `status=PRESENT`।
> - (৮) ছুটির আবেদন → `leaveNo = DQC-LV-*`, `days = 2`, `status = PENDING`; অনুমোদনের পর `APPROVED` এবং ছুটির ২ দিনের জন্য `LEAVE` হাজিরা তৈরি + `AuditLog LEAVE_APPROVE`।
>
> **পুনঃযাচাই (২০২৬-১০-৩০) — হারানো মডিউল পুনর্নির্মাণের পর:** `tsc --noEmit` শূন্য
> ত্রুটি। প্রকৃত চলমান অ্যাপে (`localhost:3000`, `admin` সেশন) ১৭/১৭ চেক পাস —
> লগইন `303 /dashboard`; ছয়টি রুট (`/dashboard`, `/attendance`, `/students`,
> `/employees`, `/report`, `/leaves`) `200`; শিক্ষার্থী হাজিরা সংরক্ষণ →
> `StudentAttendance` সারি + `AuditLog`; একই দিনে পুনঃসংরক্ষণে সারি ১টিই (হালনাগাদ);
> কর্মচারীর হাজিরা `checkIn/checkOut` সহ সংরক্ষিত; ছুটি `DQC-LV-0006` PENDING →
> APPROVED; প্রিন্ট-মার্কআপ (`.print-only`/`.no-print`/`.print-area`) উপস্থিত।
> এছাড়া `admin` অ্যাকাউন্টের পাসওয়ার্ড `.env`-এর `SEED_ADMIN_PASSWORD`-এর সাথে
> মিলিয়ে সেট করা হয়েছে (আগে মিলছিল না, তাই লগইন করা যাচ্ছিল না)।
>
> **এই পরীক্ষায় পাওয়া ও সংশোধিত চারটি i18n ত্রুটি:**
> - `records.invalidValue` — অভিধানে (bn/en/ar) অনুপস্থিত ছিল, ফলে ভুল মানের সময় কাঁচা কী দেখা যেত। `src/lib/i18n/locales/records.ts`-এ তিন ভাষায় যোগ করা হয়েছে।
> - `records.createdSuccessfully` — ভুল namespace; সঠিক কী `createdSuccessfully` (core)। `lib/actions/attendance.ts` ও `components/attendance/leave-forms.tsx`-এ সংশোধিত।
> - `searchMenu`, `toggleSidebar`, `collapseSidebar` — `components/layout/app-shell.tsx`-এ প্রিফিক্স ছাড়া ব্যবহৃত; `nav.*` করে সংশোধিত (প্লেসহোল্ডার ও aria-label-এ কাঁচা কী দেখাচ্ছিল)।
> - `attendance` — `app/(app)/employees/[id]/page.tsx`-এ প্রিফিক্স ছাড়া; `nav.attendance` করে সংশোধিত।
>
> পাশাপাশি `src`-এর সব `t("...")` কী (৪২৪টি) অভিধানের সাথে মিলিয়ে দেখা হয়েছে — এখন সব রিজলভ হয়।
> `tsc --noEmit` শূন্য ত্রুটিসহ সফল।
>
> পরীক্ষার সব অস্থায়ী তথ্য (অস্থায়ী শিক্ষার্থী, session, হাজিরা, ছুটি, কর্মচারী হাজিরা ও Audit Log)
> মুছে ফেলা হয়েছে; আসল Admin ও প্রকৃত ডেটা স্পর্শ করা হয়নি।
>
> **যাচাইয়ের বিবরণ (২০২৬-১০-৩১) — F-ATT-09 (Face Recognition হাজিরা):** কোনো বাইরের
> API/CDN/ML ছাড়াই **নির্ভরতা-মুক্ত** পদ্ধতিতে বাস্তবায়িত — ক্যামেরার গাইড-বৃত্ত কেটে
> ২৪×২৪ ধূসর → হিস্টোগ্রাম-সমানকরণ → z-score → Int8 কোয়ান্টাইজ (স্কেল ৪০) → Base64
> টেমপ্লেট (৫৭৬ বাইট); মিল = কোসাইন সাদৃশ্য (০..১, প্রান্তিক ০.৫)। গোপনীয়তা: কেবল
> টেমপ্লেট সংরক্ষণ, মূল ছবি নয়; সম্মতি (consent) ছাড়া নিবন্ধন বন্ধ। দুই মোড —
> `/attendance/face` (কিয়স্ক, লাইভ স্ক্যান → হাজিরা) ও `?mode=enroll` (মুখ নিবন্ধন,
> টেবিল + Remove)। `faceStats`/`listFaceRoster`/`listFaceEnrollStudents` (সার্ভার ডেটা),
> ৩টি Server Action (`saveFaceEnrollmentAction`, `removeFaceEnrollmentAction`,
> `markAttendanceByFaceAction`) — সবই `attendance.mark` guard, upsert + Audit Log
> (`FACE_ENROLL`/`FACE_UNENROLL`/`ATTENDANCE_MARK`)। সাইডবারে `attendanceFace` মেনু,
> bn/en/ar-এ ৩৭টি i18n key।
> - `npm run typecheck` → **০ ত্রুটি (exit 0)**; `npm run build` → **সফল, ৮৭ রুট**
>   (`/attendance/face` 11.8 kB / First Load 127 kB)।
> - প্রকৃত running server (`localhost:3100`, build-mode, `admin` সেশন) —
>   `node scripts/_smoke-face.mjs` → **14/14 PASS**: লগইন ছাড়া `307 /login`; কিয়স্ক
>   পেজ `200` ("কিয়স্ক মোড" UI); এনরোলমেন্ট ট্যাব ও "মুখ নিবন্ধন" UI; গোপনীয়তা বার্তা;
>   সাইডবারে `/attendance/face` লিংক; ৫৭৬-বাইট টেমপ্লেট upsert → তালিকায় "নিবন্ধিত"
>   ব্যাজ; শেষে টেস্ট-ডেটা পরিষ্কার (ডেটাবেস অক্ষত)।

## Module: ফি ও পেমেন্ট (Phase 5)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-FEE-01 | ফি-এর ধরন তৈরি/সম্পাদনা/নিষ্ক্রিয় | `/fees/types` | FeeType | fee.manage | Tested |
| F-FEE-02 | ফি কাঠামো (বিভাগ/শ্রেণিভিত্তিক) | `/fees/structure` | FeeStructure | fee.manage | Tested |
| F-FEE-03 | মাসিক ফি তৈরি (Bulk Generate) | `/fees/generate` | StudentFee | fee.generate | Tested |
| F-FEE-04 | শিক্ষার্থীর Ledger | `/fees`, `/fees/student/[id]` | StudentFee | fee.view | Tested |
| F-FEE-05 | বৃত্তি ও ছাড় | `/fees/discounts` | Discount | fee.manage | Tested |
| F-FEE-06 | Partial Payment + Allocation | `/payments/new` | Payment, PaymentAllocation | payment.collect | Tested |
| F-FEE-07 | Duplicate Payment রোধ + Database Transaction | — | Payment | payment.collect | Tested |
| F-FEE-08 | পেমেন্ট পদ্ধতি (নগদ/bKash/Nagad/Rocket/ব্যাংক) | — | Payment | payment.collect | Tested |
| F-FEE-09 | Reversal / Adjustment (মুছে ফেলা নয়) | — | Payment, PaymentAllocation | payment.reverse | Tested |
| F-FEE-10 | রসিদ তৈরি (Unique No, লোগো, বকেয়া) | `/receipts` | Receipt | receipt.print | Tested |
| F-FEE-11 | রসিদ প্রিন্ট / PDF / পুনরায় দেখা | — | Receipt | receipt.print | Tested |
| F-FEE-12 | bKash/Nagad স্বয়ংক্রিয় যাচাই | `lib/payment-gateway.ts`, `lib/actions/payment-gateway.ts` | — | payment.verify | Implemented (.env-gated) — `PAYMENT_VERIFY_URL`+`PAYMENT_VERIFY_API_KEY` দিলেই সক্রিয়, নাহলে Manual। যাচাই: `scripts/_mock-payment-gateway.ts` 17/17 |
| F-FEE-13 | বিলিং ক্যালকুলেটর | `/fees` (সেকশন) | — | fee.view | Tested |
| F-FEE-14 | No Double-Counting (Fee Ledger ↔ Income Report) | — | — | — | Tested |

## Module: আয়-ব্যয় ও হিসাবরক্ষণ (Phase 5)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-LED-01 | আয়ের এন্ট্রি | `/ledger/income` | LedgerEntry | ledger.manage | Tested |
| F-LED-02 | ব্যয়ের এন্ট্রি | `/ledger/expense` | LedgerEntry | ledger.manage | Tested |
| F-LED-03 | Account Head (ক্যাটাগরি) | `/ledger/heads` | AccountHead | ledger.manage | Tested |
| F-LED-04 | সংযুক্ত রসিদ (Attachment) | `lib/actions/ledger.ts` (`attachmentFileId`) | FileAsset | ledger.manage | Tested |
| F-LED-05 | অনুমোদন ও সংশোধন ইতিহাস | — | LedgerRevision | ledger.approve | Tested |
| F-LED-06 | দৈনিক/মাসিক/বার্ষিক রিপোর্ট ও তুলনা | `/ledger` | — | ledger.view | Tested |
| F-LED-07 | নগদ ও ব্যাংক ব্যালেন্স | `/ledger` | — | ledger.view | Tested |
| F-LED-08 | বেতন → ব্যয় স্বয়ংক্রিয় সম্পর্ক | — | LedgerEntry | employee.salary | Tested |

> **যাচাইয়ের বিবরণ (২০২৬-১০-৩১) — আয়-ব্যয় ও হিসাবরক্ষণ (Module ১৪):**
> প্রকৃত চলমান অ্যাপে (`localhost:3100`, `admin` সেশন) আসল HTTP অনুরোধে Server Action
> চালিয়ে `node scripts/_smoke-ledger.mjs` → **21/21 PASS**। প্রমাণ —
> - লগইন `303`; চারটি রুট (`/ledger`, `/ledger/income`, `/ledger/expense`, `/ledger/heads`) `200`।
> - হিসাবের খাত তৈরি — আয় (`INCOME`, `DONATION`) ও ব্যয় (`EXPENSE`, `UTILITY`), কোড স্বয়ংক্রিয়ভাবে বড় হাতের রূপে (`normalizeCode`)।
> - খাত নিষ্ক্রিয়/সক্রিয় টগল — `isActive` উল্টে যায়, রেকর্ড মুছে যায় না (ইতিহাস অক্ষত)।
> - হাতে আয়ের এন্ট্রি → `DQC-L-*`, `status=APPROVED`, `sourceType=MANUAL`, poysha (`2500৳ → 250000`)।
> - খসড়া ব্যয়ের এন্ট্রি → `status=DRAFT`; **খসড়া ব্যালান্সে গোনা হয় না** (শুধু APPROVED)।
> - খসড়া অনুমোদন → `APPROVED` + `approvedAt` + `LedgerRevision`; ব্যালান্সে ব্যয় যুক্ত (`80000`)।
> - এন্ট্রি বাতিল → `REVERSED` + `reversedReason` সংরক্ষিত + `LedgerRevision`; এন্ট্রি মুছে যায় না; ব্যালান্স থেকে বাদ।
> - তালিকা পৃষ্ঠায় সার্চে এন্ট্রি দৃশ্যমান; `AuditLog` ৮টি (খাত ও এন্ট্রি)।
> - শেষে সব টেস্ট-ডেটা পরিষ্কার (`residue=0`), বিদ্যমান ডেটা অক্ষত।

## Module: পরীক্ষা ও ফলাফল (Phase 6)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-EXM-01 | পরীক্ষা তৈরি | `/exams/new`, `/exams/[id]/edit` | Exam, ExamSubject | exam.manage | Tested |
| F-EXM-02 | পরীক্ষার তালিকা | `/exams` | Exam | exam.view | Tested |
| F-EXM-03 | নম্বর এন্ট্রি | `/exams/marks` | Mark | exam.marks.enter | Tested |
| F-EXM-04 | নম্বর যাচাই | `/exams/verify` | Mark | exam.marks.verify | Tested |
| F-EXM-05 | Grading Scheme (কনফিগারযোগ্য, Hardcode নয়) | `/exams/grading` | GradingScheme, GradingRule | exam.manage | Tested |
| F-EXM-06 | ফলাফল হিসাব (মেধাক্রম, গ্রেড, পাস/ফেল) | `/results/publish` | Result | exam.manage | Tested |
| F-EXM-07 | ফলাফল প্রকাশ (যাচাইয়ের পরে) | `/results/publish` | Result | exam.result.publish | Tested |
| F-EXM-08 | মার্কশিট (PDF) ও প্রিন্ট | `/results/[id]` | Result | result.view | Tested |
| F-EXM-09 | Anonymised ফলাফল অনুসন্ধান (রোল/রেজি. নম্বর) | `/results`, `/results/merit` | Result | result.view.own | Tested |
| F-EXM-10 | Mark সংশোধন ও Audit | `/exams/marks` (সংশোধন ডায়ালগ) | MarkRevision | exam.manage | Tested |
| F-EXM-11 | পরীক্ষার আবেদন ও প্রবেশপত্র | `/exams/[id]/registrations` | ExamRegistration | exam.manage | Tested |

> **যাচাইয়ের বিবরণ (২০২৬-১০-৩১) — পরীক্ষা ও ফলাফল (Phase 6):** প্রকৃত চলমান অ্যাপে
> (`localhost:3100`, `admin` সেশন) আসল HTTP অনুরোধে Server Action চালিয়ে
> `node scripts/_smoke-exams.mjs` → **28/28 PASS**। প্রমাণ — ৯টি রুট `200`; পরীক্ষা তৈরি
> (`DRAFT`) → বিষয় (পূর্ণমান/পাস নম্বর) → নম্বর এন্ট্রি (`SUBMITTED`, পরীক্ষার অবস্থা
> `ONGOING`) → সংশোধনে `MarkRevision` → যাচাই (`VERIFIED`) → নিবন্ধন (`DQC-ER-*`) →
> ফলাফল তৈরি (শতকরা `90`, গ্রেড `A+`, GPA `5`, মেধাক্রম `1`, পাস) → প্রকাশ
> (`PUBLISHED` + পরীক্ষার অবস্থা `RESULT_PUBLISHED`) → তালিকা ও মেধাতালিকা রেন্ডার →
> মার্কশিট `200` → `AuditLog` ৭টি। শেষে সব টেস্ট-ডেটা পরিষ্কার, বিদ্যমান শিক্ষার্থী অপরিবর্তিত।

## Module: নোটিশ (Phase 7)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-NOT-01 | নোটিশ তৈরি ও সম্পাদনা + Preview | `/notices`, `/notices/new`, `/notices/[id]/edit` | Notice, NoticeRevision | notice.manage | Tested |
| F-NOT-02 | Target (শিক্ষার্থী/শিক্ষক/অভিভাবক/বিভাগ) | `/notices/new` (audience) | Notice | notice.manage | Tested |
| F-NOT-03 | ছবি/PDF সংযুক্তি | `/notices/new` (attachments) | NoticeAttachment | notice.manage | Tested |
| F-NOT-04 | গুরুত্বপূর্ণ নোটিশ Pin ও Archive | `/notices`, `/notices/[id]` | Notice | notice.manage | Tested |
| F-NOT-05 | প্রিন্ট ও ডাউনলোড | `/notices/[id]` | — | notice.view | Tested |

> **যাচাইয়ের বিবরণ (২০২৬-১০-৩১) — নোটিশ (Phase 7):** প্রকৃত চলমান অ্যাপে
> (`localhost:3100`, `admin` সেশন) আসল HTTP অনুরোধে Server Action চালিয়ে
> `node scripts/_smoke-notices.mjs` → **12/12 PASS**। প্রমাণ — `/notices` ও `/notices/new`
> রুট `200`; নোটিশ তৈরি (`DRAFT` + `NoticeRevision` CREATE) → শ্রেণিভিত্তিক টার্গেট
> (`audience=CLASS` + `classId` সংরক্ষিত) → প্রকাশ (`PUBLISHED` + `publishedAt` + In-App
> `Notification` তৈরি) → পিন (`isPinned=true`) → আর্কাইভ (`ARCHIVED`) → বিস্তারিত পৃষ্ঠায়
> শিরোনাম দৃশ্যমান → মুছে ফেলা (রেকর্ড অনুপস্থিত)। শেষে সব টেস্ট-ডেটা পরিষ্কার
> (`residue=0`), বিদ্যমান ডেটা অক্ষত।

## Module: গ্যালারি (Phase 7)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-GAL-01 | অ্যালবাম তৈরি ও ব্যবস্থাপনা | `/gallery`, `/gallery/items` | Album | gallery.manage | Tested |
| F-GAL-02 | ছবি/ভিডিও আপলোড (ধরন ও সাইজ যাচাই) | `/gallery/items` | GalleryItem, FileAsset | gallery.manage | Tested |
| F-GAL-03 | প্রকাশ/Unpublish ও Archive | `/gallery`, `/gallery/items` | GalleryItem | gallery.manage | Tested |
| F-GAL-04 | Thumbnail ও Optimized Image | `lib/image-thumbnail.ts`, `gallery-item-manager.tsx`, `album-manager.tsx` | GalleryItem, Album, FileAsset | — | Tested |
| F-GAL-05 | শিশুর ছবি প্রকাশে অনুমতি নিশ্চিতকরণ | `/gallery/items` (consentConfirmed) | — | gallery.manage | Tested |

> **যাচাইয়ের বিবরণ (২০২৬-১০-৩১) — গ্যালারি (Phase 7):** প্রকৃত চলমান অ্যাপে
> (`localhost:3100`, `admin` সেশন) আসল HTTP অনুরোধে Server Action চালিয়ে
> `node scripts/_smoke-gallery.mjs` → **17/17 PASS**। প্রমাণ — `/gallery` ও
> `/gallery/items` রুট `200`; ফাইল আপলোড (`FileAsset`, `kind` = IMAGE/DOCUMENT) →
> অ্যালবাম তৈরি (`DRAFT`, কভার সংরক্ষিত) → **অ-ছবি কভার-Thumbnail প্রত্যাখ্যাত (null)**
> → ছবি যোগ (`DRAFT`, `consentConfirmed=false`) → **consent ছাড়া প্রকাশ toggle ও
> create — দুই পথেই আটকানো** → consent সহ ছবি প্রকাশ (`isPublished=true`,
> `thumbnailFileId` সংরক্ষিত) → Unpublish টগল → অ্যালবাম প্রকাশ টগল → বিস্তারিত
> পৃষ্ঠা রেন্ডার → আইটেম ও অ্যালবাম মুছে ফেলা (আইটেম ক্যাসকেড)। শেষে সব টেস্ট-ডেটা
> পরিষ্কার (`albums=0, assets=0`)।
> - **সংশোধিত বাগ:** চেকবক্সের `name` ( UI) ও Zod স্কিমা (`isPublishedForm`,
>   `consentConfirmedForm`) মিলছিল না — ফলে প্রকাশ/সম্মতি কখনো সংরক্ষিত হতো না;
>   `album-manager.tsx` ও `gallery-item-manager.tsx`-এ নাম ঠিক করা হয়েছে।

## Module: অভিভাবক পোর্টাল (Phase 7)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-GUA-01 | অভিভাবক Login ও Account তৈরি | `/guardians/accounts` | User, Guardian | guardian.manage | Implemented |
| F-GUA-02 | সন্তানের প্রোফাইল ও শ্রেণি | `/portal/children`, `/portal/children/[id]` | Student | guardian.portal | Implemented |
| F-GUA-03 | হাজিরা ভিউ | `/portal/attendance` | StudentAttendance | guardian.portal | Implemented |
| F-GUA-04 | ফি, পেমেন্ট ইতিহাস ও বকেয়া | `/portal/fees`, `/portal/payments` | StudentFee, Payment | guardian.portal | Implemented |
| F-GUA-05 | পরীক্ষার ফলাফল | `/portal/results` | Result | guardian.portal | Implemented |
| F-GUA-06 | নোটিশ ও অনুমোদিত ডকুমেন্ট | `/portal/notices`, `/portal/notices/[id]` | Notice | guardian.portal | Implemented |
| F-GUA-07 | অন্য সন্তানের তথ্য দেখা বন্ধ (Server-Side) | `lib/rbac.ts` `allowedStudentIdsFor` | StudentGuardian | — | Implemented |

## Module: অভিযোগ ও মতামত (Phase 7)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-CMP-01 | অভিযোগ জমা (Ticket ID সহ) | `/complaints/new` | Complaint, NumberSequence | complaint.create | Implemented |
| F-CMP-02 | অভিযোগ তালিকা ও স্ট্যাটাস | `/complaints`, `/complaints/[id]` | Complaint | complaint.view | Implemented |
| F-CMP-03 | উত্তর ও সমাধান (৫টি স্ট্যাটাস) | `/complaints/[id]` | ComplaintUpdate | complaint.resolve | Implemented |
| F-CMP-04 | ABC ও অননুমোদিত ব্যবহারকারী থেকে গোপন রাখা | `/complaints`, `/complaints/[id]` | Complaint | complaint.view.own | Implemented |

## Module: Live Chat (Phase 7)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-CHT-01 | ব্যবহারকারী ↔ Admin কথোপকথন | `/chat`, `/portal/chat` | ChatConversation, ChatMessage | chat.use | Implemented |
| F-CHT-02 | Message History ও সময় | `/chat`, `api/chat/[conversationId]` | ChatMessage | chat.use | Implemented |
| F-CHT-03 | Unread Count ও Read Receipt | `/chat` (Participant.lastReadAt) | ChatParticipant | chat.use | Implemented |
| F-CHT-04 | Real-time (SSE) | `/api/chat/[id]/stream`, `components/portal/portal-forms.tsx` (ChatLive) | ChatConversation | chat.use (অংশগ্রহণকারী যাচাই) | Tested |
| F-CHT-05 | Spam/Abuse Control | `lib/actions/chat.ts` | — | chat.use | Implemented |

> **যাচাইয়ের বিবরণ (২০২৬-১০-৩১) — F-CHT-04 (Real-time):** WebSocket-এর বদলে
> **Server-Sent Events (SSE)** — হোস্টিং-নিরপেক্ষ, একই HTTP পোর্ট, বাইরের কোনো
> সার্ভিস/Credential লাগে না। `GET /api/chat/[id]/stream` (`runtime = "nodejs"`,
> `dynamic = "force-dynamic"`) কেবল অংশগ্রহণকারীকে `text/event-stream` দেয়; প্রথমে
> `event: ready`, নতুন বার্তায় `event: message`, কথোপকথন বন্ধ/খোলা হলে `event: status`,
> এবং প্রতি ২০ সেকেন্ডে `: ping` হার্টবিট।
> - দুই স্তরের নির্ভরযোগ্যতা: (১) বার্তা পাঠানোর সাথে সাথে `lib/chat-events.ts`-এর
>   প্রক্রিয়া-ভিত্তিক EventEmitter তাৎক্ষণিক push করে (`sendChatMessageAction` থেকে
>   `publishChatEvent`); (২) নিরাপত্তা-জাল — প্রতি ৩ সেকেন্ডে DB-র `lastMessageAt`
>   মিলিয়ে দেখা হয়, তাই একাধিক worker/প্রক্রিয়াতেও বার্তা হারায় না।
> - ক্লায়েন্ট (`ChatLive`): SSE-তে সংযুক্ত; বিচ্ছিন্ন হলে বাড়তে থাকা বিরতিতে
>   (সর্বোচ্চ ৩০ সে.) পুনঃসংযোগ; পাশাপাশি ৩০ সেকেন্ডের ধীর Polling বলবৎ — SSE ব্যর্থ
>   হলেও চ্যাট আগের মতোই চলে (নিরাপদ অবক্ষয়)।
> - `npm run typecheck` → **০ ত্রুটি**; `npm run build` → **সফল, ৮৮ রুট**।
> - প্রকৃত server (`localhost:3100`, build-mode) — `node scripts/_smoke-chat-stream.mjs`
>   → **8/8 PASS**: লগইন ছাড়া `401`; অংশগ্রহণ না থাকলে `403`; অংশগ্রহণকারীর `200` +
>   `text/event-stream`; `event: ready`; DB-তে নতুন বার্তায় `event: message`;
>   টেস্ট-ডেটা পরিষ্কার।

## Module: Smart Search (Phase 8)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-SRC-01 | Global Search (নাম, ID, রোল, রেজি., ফোন, রসিদ, রেফারেন্স) | `/api/search`, `lib/search.ts` | সব | Role অনুযায়ী | Implemented |
| F-SRC-02 | Role অনুযায়ী ফলাফল সীমাবদ্ধ | `lib/search.ts` (`hasPermission`) | — | — | Implemented |
| F-SRC-03 | Document Search ও Filter | `lib/search.ts` (`documents` গ্রুপ) | FileAsset | — | Implemented |

## Module: AI Agent (Phase 8)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-AI-01 | মাদ্রাসার তথ্য, ভর্তি প্রক্রিয়া, ফি ব্যাখ্যা | `/ai` | — | ai.use | Implemented |
| F-AI-02 | Developer Profile থেকে সঠিক তথ্য | `/ai` | DeveloperProfile | ai.use | Implemented |
| F-AI-03 | Knowledge Base (Institution/Contact/Department/FAQ) | `/settings/ai` | AIKnowledgeItem | settings.manage | Implemented |
| F-AI-04 | AI নিরাপত্তা (তথ্য বানানো নয়, Secret প্রকাশ নয়) | `lib/ai.ts` (অনুমোদিত তথ্যভিত্তিক) | — | — | Implemented |
| F-AI-05 | Developer Profile Admin থেকে সম্পাদনা | `/settings/ai` | DeveloperProfile | settings.manage | Implemented |
| F-AI-06 | বাহ্যিক AI Provider ব্যবহার | `lib/ai-provider.ts`, `lib/ai.ts` | — | — | Implemented (.env-gated) — `AI_BASE_URL`+`AI_API_KEY` দিলেই সক্রিয়, নাহলে নিয়মভিত্তিক লোকাল brain। যাচাই: `scripts/_mock-ai-provider.ts` 15/15 |

## Module: রিপোর্ট, PDF ও প্রিন্ট (Phase 9)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-RPT-01 | রিপোর্ট সেন্টার (১৭ ধরনের) | `/reports`, `lib/reports.ts` | — | report.view | Implemented |
| F-RPT-02 | Filter, Date Range ও Pagination | `lib/reports.ts` (`REPORT_DEFINITIONS.filters`) | — | report.view | Implemented |
| F-RPT-03 | বাংলা ফন্ট সমর্থিত PDF | `/reports` (প্রিন্ট → Save-as-PDF) ও CSV/XLS রপ্তানি | — | report.export | Implemented |
| F-RPT-04 | সংবেদনশীল Export-এ Permission যাচাই | `lib/actions/excel.ts` (`REPORT_EXPORT`) | — | report.export | Implemented |
| F-RPT-05 | User Activity Report | `/reports` (`userActivity`) | AuditLog | audit.view | Implemented |

## Module: Excel অটোমেশন (Phase 9)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-XLS-01 | Excel Export Job | `/excel`, `lib/actions/excel.ts` | ExportJob | excel.view | Implemented |
| F-XLS-02 | Scheduled Job | `/excel/schedules` | ScheduledJob, JobRun | excel.manage | Implemented |

## Module: Backup ও Recovery (Phase 9)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-BKP-01 | Database Backup (Timestamp, Status, Location) | `/backup` | BackupRecord | backup.manage | Implemented |
| F-BKP-02 | File Backup | `/backup` | BackupRecord | backup.manage | Implemented |
| F-BKP-03 | Backup Integrity Check | `/backup` | BackupRecord | backup.manage | Implemented |
| F-BKP-04 | ব্যর্থ হলে Error Notification | `lib/backup.ts` | Notification | backup.manage | Implemented |
| F-BKP-05 | Restore (আলাদা অনুমতির পরে) | `/api/backups/[id]`, `/backup` | BackupRecord | backup.manage | Implemented |
| F-BKP-06 | Backup Public Web Directory-তে নয় | `env.backupDir` (`./backups`) | — | — | Implemented |

## Module: ব্যবহারকারী ও অনুমতি (Phase 9)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-USR-01 | User তালিকা | `/users` | User | user.view | Tested |
| F-USR-02 | User তৈরি/সম্পাদনা/Disable | `/users` | User | user.manage | Tested |
| F-USR-03 | Role ও Permission ব্যবস্থাপনা | `/users/roles` | Role, RolePermission | role.manage | Tested |
| F-USR-04 | নিরাপদ Password Reset Workflow | `/users` | User | user.manage | Tested |

## Module: প্রতিষ্ঠান ও সিস্টেম সেটিংস (Phase 9)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-SET-01 | প্রতিষ্ঠানের নাম, ঠিকানা, ফোন, পরিচিতি | `/settings` | Setting | settings.view | Implemented |
| F-SET-02 | লোগো ও Branding | `/settings/branding` | FileAsset, Setting | settings.view | Implemented |
| F-SET-03 | শিক্ষক তালিকা (প্রকাশযোগ্য) | `/settings/people` | Setting | settings.view | Implemented |
| F-SET-04 | ঠিকানা ডেটা (৮ বিভাগ ইত্যাদি) | `/settings/address` | Division…PostalCode | address.view | Implemented |
| F-SET-05 | নতুন এলাকা অনুরোধ ও অনুমোদন | `/settings/address/requests` | AddressRequest | address.manage | Implemented |
| F-SET-06 | রসিদের ডিজাইন | `/settings/receipt` | Setting | settings.view | Implemented |
| F-SET-07 | সেটিংসের Audit Log | `/health/audit` | AuditLog | settings.manage | Implemented |
| F-SET-08 | Developer Profile সম্পাদনা | `/settings/ai` | Setting, DeveloperProfile | settings.manage | Implemented |
| F-SET-09 | AI Agent-এর অনুমোদিত তথ্য | `/settings/ai` | AIKnowledgeItem | settings.manage | Implemented |

## Module: Notification (Phase 7)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-NTF-01 | In-App Notification | `/notifications`, `lib/actions/notifications.ts` | Notification | — | Implemented |
| F-NTF-02 | বাহ্যিক SMS ও WhatsApp | `lib/sms.ts`, `lib/whatsapp.ts` (WhatsApp Cloud API), `lib/notifications.ts` | Notification | — | Implemented (.env-gated) — `SMS_API_URL`+`SMS_API_KEY` দিলে SMS; `WHATSAPP_PHONE_NUMBER_ID`+`WHATSAPP_ACCESS_TOKEN` দিলে WhatsApp; নাহলে `SKIPPED` (ভুয়া সারি নয়)। যাচাই: `scripts/_mock-email-sms.ts` 17/17 |
| F-NTF-03 | Email (SMTP) | `lib/mailer.ts`, `lib/notifications.ts` | Notification | — | Implemented (.env-gated) — `SMTP_*` দিলে Email; খালি থাকলে `SKIPPED`। যাচাই: `scripts/_mock-email-sms.ts` 17/17 |

## Module: System Health (Phase 9)

| ID | Feature | Page / API | Model | Permission | Status |
|---|---|---|---|---|---|
| F-HLT-01 | Application ও Database Status | `/health` | SystemEvent | health.view | Implemented |
| F-HLT-02 | Storage / API / Backup Status | `/health` | SystemEvent, BackupRecord, FileAsset | health.view | Implemented — Storage ব্যবহার, সংযুক্ত সেবা (Email/SMS/WhatsApp/AI/S3/Payment gateway), Backup Status কার্ড (সর্বশেষ/সফল/ব্যর্থ ব্যাকআপ), **ডেপ্লয়মেন্ট প্রস্তুতি কার্ড (মডিউল ৩৪–৪০: PostgreSQL, ডোমেইন/HTTPS, S3, Payment, AI, SMS, Email/WhatsApp)**, ব্যর্থ বা শূন্য ব্যাকআপে সতর্কবার্তা |
| F-HLT-03 | Audit Log ভিউয়ার | `/health/audit` | AuditLog | audit.view | Implemented — এনটিটি ফিল্টার, পেজিনেশন, আগে/পরে (`beforeData`/`afterData`) বিস্তারিত |
| F-HLT-04 | সিস্টেম লগ (Secret ছাড়া) | `/health/logs` | SystemEvent | health.view | Implemented — স্তর ও উৎস ফিল্টার, পেজিনেশন, `meta` বিস্তারিত |

> **যাচাই (২০২৬-১০-৩১):** `npm run typecheck` শূন্য ত্রুটি, `npm run build` সফল (৯১ রুট),
> `node scripts/_smoke-health.mjs` → ১৭/১৭ PASS (লগইন ছাড়া তিন পেজ ৩০৭; ব্যাকআপ ও পেমেন্ট লেবেল bn/en/ar;
> ব্যর্থ-ব্যাকআপ সতর্কবার্তা; SystemEvent `meta` ও AuditLog before/after দৃশ্যমান; টেস্ট-ডেটা পরিষ্কার)।

## Module: Deployment (Phase 10)

| ID | Feature | Status |
|---|---|---|
| F-DEP-01 | Local Dev Server চালানো | Tested |
| F-DEP-02 | Production Build | Tested (২০২৬-১০-৩১: ৯১ রুট, ০ টাইপ-ত্রুটি) |
| F-DEP-03 | Production Database (PostgreSQL) | Partial — `isProductionDatabase()` ডাটাবেস সনাক্ত করে; `/health`-এর ডেপ্লয়মেন্ট কার্ডে "প্রস্তুত/প্রস্তত নয়" দেখায়। লোকালে SQLite চলে; প্রোডাকশনে শুধু `DATABASE_URL` (postgresql://...) বদলালেই সক্রিয় |
| F-DEP-04 | HTTPS ও Domain Configuration | Partial — ডোমেইন-সচেতন Cookie (`APP_URL` http/https অনুযায়ী `Secure`, `COOKIE_SECURE` override) + `isHttpsEnabled()` যাচাই ডেপ্লয়মেন্ট কার্ডে। ডোমেইন ছাড়াও IP-এ `http`-এ চলে; পরে শুধু `APP_URL="https://..."` করলেই স্বয়ংক্রিয় HTTPS-নিরাপদ। TLS সার্টিফিকেট/রিভার্স-প্রক্সি ডোমেইন পাওয়ার পর। |
| F-DEP-05 | File Storage (S3-সদৃশ) | Implemented (.env-gated) — `lib/storage-s3.ts` (হাতে-লেখা SigV4); `STORAGE_DRIVER="s3"` + `S3_*` দিলেই সক্রিয়, নাহলে Local। যাচাই: `scripts/_mock-storage-s3.ts` 5/5 |
| F-DEP-06 | Error Monitoring | Tested (`error.tsx`/`global-error.tsx` → SystemEvent source=client → `/health/logs`; `scripts/_smoke-error-monitoring.mjs` 8/8) |
| F-DEP-07 | WhatsApp Cloud API চ্যানেল (Module ৪০) | Implemented (.env-gated) — `lib/whatsapp.ts`; `WHATSAPP_PHONE_NUMBER_ID`+`WHATSAPP_ACCESS_TOKEN` দিলে সক্রিয়, নাহলে `SKIPPED`। যাচাই: `scripts/_mock-email-sms.ts` 17/17 |

---

## বাইরের API / Account — কোড প্রস্তুত, শুধু Credentials দিলেই সক্রিয় (.env-gated)

| Service | কী লাগবে | কনফিগ না থাকলে |
|---|---|---|
| AI Provider | AI_BASE_URL, AI_API_KEY, AI_MODEL | নিয়মভিত্তিক লোকাল brain (`lib/ai-provider.ts`) |
| SMS | SMS_API_URL, SMS_API_KEY, SMS_SENDER_ID | Notification `SKIPPED` (`lib/sms.ts`) |
| WhatsApp | WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN | Notification `SKIPPED` (`lib/whatsapp.ts`) |
| Email | SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM | Notification `SKIPPED` (`lib/mailer.ts`) |
| Payment Gateway | PAYMENT_VERIFY_URL, PAYMENT_VERIFY_API_KEY | Manual Payment (`lib/payment-gateway.ts`) |
| Cloud Storage | S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY | Local Storage (`lib/storage-s3.ts`) |
| Online Hosting | DATABASE_URL (postgresql://), Domain (https), Server | Local SQLite + IP+http (`lib/env.ts`) |

> `/health`-এর **ডেপ্লয়মেন্ট প্রস্তুতি** কার্ডে এই ৭টির সত্যিকার অবস্থা (প্রস্তুত/প্রস্তুত নয়) দেখা যায়।

## ডেটা হারানোর ঝুঁকি (মনে রাখতে হবে)

1. `prisma/dev.db` একটি ফাইল — Backup ছাড়া হারালে সব ডেটা যাবে।
2. `db:reset`, `prisma db push --force-reset` — অনুমতি ছাড়া চালানো যাবে না।
3. Schema পরিবর্তনে শিক্ষার্থী/হিসাবের ডেটা নষ্ট হতে পারে → migration নিয়ম মেনে করতে হবে।
4. `.env` (`SESSION_SECRET`) ফাঁস হলে সেশন হাইজ্যাক হতে পারে।
