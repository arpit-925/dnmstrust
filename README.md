# Dhirendra Nath Mishra Seva Trust – Official Website

A complete, responsive, minimal, and user-friendly website for **Dhirendra Nath Mishra Seva Trust** built with **React (Vite) + Tailwind CSS + Lucide Icons + Supabase**.

---

## 🌟 Key Features

1. **Design & Aesthetic:**
   - Dominant Pure White (`#FFFFFF`) background with subtle off-white (`#F8F9FA`) section alternation.
   - Professional Indian charitable trust typography & color scheme (Saffron `#E89535`, Subtle Green `#39845A`, Dark Navy `#172B4D`).
   - Clean, lightweight, and accessible layout without excessive gradients or animations.

2. **Complete Structure & Pages:**
   - **Header:** Sticky navigation bar with trust emblem, mobile hamburger menu, and "Join Us" button.
   - **Hero Section:** "Serving Humanity, Building a Better Tomorrow" with balanced social service imagery and key metrics.
   - **About Us (`/about`):** Commitments to healthcare, family welfare, education, environment, animal care, and community development.
   - **Our Services (`/services`):** Comprehensive breakdown of ongoing and community programmes.
   - **Health Card Programme (`/health-card`):**
     - 10%–50% subsidies on eligible medical checkups and treatments.
     - Medical assistance up to ₹20 lakh (subject to eligibility and participating provider agreements).
     - Clear regulatory disclaimers explaining it is a welfare initiative, not commercial insurance.
   - **Membership Benefits (`/membership`):** One membership card, multiple welfare benefits (healthcare, marriage assistance, vehicle purchase subsidies, social welfare).
   - **Marriage & Family Welfare:** Supporting economically weaker families and community wedding events.
   - **Our Future Vision (`/future-vision`):** 6 expansion categories (Social Welfare, Animal Welfare, Healthcare, Education, Agriculture & Environment, Cultural & Spiritual Activities).
   - **Our Mission & Vision Statements.**
   - **Photo Gallery (`/gallery`):**
     - Filter photos by Album and Category.
     - Interactive Lightbox with event date and captions.
     - "Load More" pagination.
   - **Public Review & Feedback Section (`/reviews`):**
     - "Share Your Experience" submission form with star rating, service selection, and anti-spam protection.
     - Displays approved reviews with submission dates and overall average rating.
     - Strict admin moderation policy (feedback is verified before appearing publicly).
   - **Contact Us (`/contact`):** Configurable phone, email, address, WhatsApp button, and interactive contact form.
   - **Privacy Policy (`/privacy`) & Terms & Conditions (`/terms`).
   - **Footer:** Trust logo, quick links, key focus areas, contact information, legal links, and discrete Admin login.

3. **Admin Dashboard (`/admin`):**
   - Secure login portal.
   - Real-time statistics: Total Photos, Albums, Total Reviews, Approved Reviews, Pending Reviews.
   - **Gallery Management (`/admin/gallery`):** Multi-file upload, title, description, category, event date, draft/published toggle, caption editing, preview modal, and deletion.
   - **Album Management (`/admin/albums`):** Create, edit, and organize albums.
   - **Review Moderation (`/admin/reviews`):** Filter by status, rating, and service category; edit inappropriate review wording; approve or reject submissions.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🗄️ Backend & Database Setup (Supabase)

The website works out-of-the-box in **Demo Mode** using persistent browser storage (`localStorage`). To connect your live Supabase backend:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard and run the SQL script provided in [`supabase-setup.sql`](./supabase-setup.sql).
3. Create a public storage bucket named `gallery`.
4. Copy your project URL and Anon Public Key.
5. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
6. Create an administrator user in **Supabase Dashboard > Authentication > Users**.
7. Restart the Vite dev server.

---

## ⚙️ Configuration

All website contact details, social links, categories, and trust identifiers are centralized in [`src/lib/constants.js`](./src/lib/constants.js). Update these values to customize the information across the entire website.
