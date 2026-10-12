# 🏺 SHILP SETU (शिल्प सेतु)
### AI-Powered Marketplace for Local Artisans
**Smart India Hackathon 2026 Submission — Problem Statement SIH26090**

> *"Empowering traditional, rural, and local artisans with Multimodal Generative AI — bridging the digital divide through voice, vision, and vernacular language."*

---

## 🌟 Project Overview

**Shilp Setu** is an AI-driven, responsive web marketplace designed for Indian artisans. It solves the real-world barriers of digital literacy, cataloging, and market linkage:

1. **Snap & Speak**: Artisan uploads a photo and speaks naturally in Hindi, Hinglish, or English.
2. **Gemini 2.0 Multimodal AI**: Automatically drafts a rich product title, cultural description, craft category, raw materials, tags, and fair reference price.
3. **Interactive Voice Editing**: Artisans can say commands like *"Price 850 ki jagah 950 kar do"* or *"Tag me Festive add kar do"* to adjust details hands-free.
4. **Direct Marketplace**: One-click publish saves verified listings directly to Supabase Database & Storage for public discovery.

---

## 🚀 Beginner Setup Guide (Step-by-Step)

Follow these simple steps to run Shilp Setu on your computer:

### 1. Installing Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### 2. Creating a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **"New Project"**.
3. Choose an organization, enter a project name (e.g. `shilp-setu`), choose a database password, and select your nearest region (e.g. `South Asia (Mumbai)`).
4. Click **"Create new project"** and wait about 1–2 minutes for it to provision.

### 3. Running Migration SQL
1. In your Supabase Dashboard, click on the **SQL Editor** icon on the left sidebar.
2. Click **"New Query"**.
3. Open the file [`supabase/migrations/001_initial_schema.sql`](supabase/migrations/001_initial_schema.sql) in your editor, copy all of its content, and paste it into the Supabase SQL Editor.
4. Click **"Run"** (or press `Ctrl+Enter`).
5. This creates the four required tables (`artisans`, `categories`, `products`, `product_images`), sets up Row Level Security (RLS) policies, and creates the `product-images` storage bucket.

### 4. Running Seed SQL
1. In the Supabase **SQL Editor**, click **"New Query"**.
2. Open the file [`supabase/seed.sql`](supabase/seed.sql), copy its content, and paste it into the SQL Editor.
3. Click **"Run"**.
4. This seeds:
   - The 8 core craft categories (*Handicrafts, Home Decor, Textiles, Pottery, Woodcraft, Jewelry, Paintings, Traditional Art*).
   - The verified demo artisan profile (**Rameshwar Prajapati**, Master Craftsman from Kot Jewar, Jaipur).
   - Initial verified catalog products.

### 5. Creating / Verifying the `product-images` Bucket
The migration script automatically creates the bucket. To verify in your Supabase Dashboard:
1. Click **Storage** on the left menu.
2. Confirm you see the bucket named: `product-images`.
3. Ensure its **Public** toggle is set to `ON` so customers can view product photos.

### 6. Getting Your Supabase URL
1. In Supabase, click **Project Settings** (gear icon at the bottom left).
2. Click **API** under Configuration.
3. Copy the **Project URL** (e.g. `https://your-project-id.supabase.co`).

### 7. Getting Your Supabase Public & Service Role Keys
In that same **Project Settings -> API** page:
- Copy the **`anon` `public` key** (starts with `eyJ...`). This is safe for the browser.
- Scroll down to the **`service_role` secret key** and copy it. *(Keep this private — it is only used on the server!)*

### 8. Getting Your Google Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** and then **"Create API key"**.
4. Copy your Gemini API key.

### 9. Configuring Your `.env` File
Create a `.env` file in the root of your project by copying `.env.example`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
# 1. Supabase Public Credentials (safe for browser)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# 2. Supabase Privileged Key (SERVER-SIDE ONLY - never use VITE_ prefix)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# 3. Google Gemini API Key (SERVER-SIDE ONLY - never use VITE_ prefix)
GEMINI_API_KEY=your-gemini-api-key

# 4. Demo Artisan ID (matches seed.sql)
DEMO_ARTISAN_ID=00000000-0000-0000-0000-000000000001
```

### 10. Running the Development Server
Start the unified local development environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

### 11. Testing the Complete Seller Flow
1. Open the website and click **"Seller Dashboard"** or **"Start Selling"** in the top navigation.
2. Click **"+ Add New Product"** (`/seller/add-product`).
3. **Photo**: Upload a craft photo (or click one of the quick sample presets like *"Jaipur Blue Pottery"*).
4. **Voice Input**: Speak naturally or click one of the sample voice scripts (e.g. *"Ye handmade blue pottery vase hai Jaipur se..."*).
5. Click **"Generate Listing with AI"**.
6. On the **AI Result page** (`/seller/ai-result`):
   - Notice the AI-generated Title, Category, Description, Tags, and Price.
   - You can manually edit any field.
   - **Voice Modification Assistant**: Click the mic or tap the demo chip: `⚡ "Price 850 ki jagah 950 kar do"`. The price updates instantly!
7. Click **"Save & View Buyer Preview"** (`/seller/preview`).
8. Click **"Publish Product"**.
9. The product is saved to Supabase and immediately appears on your **Seller Dashboard** and the public **Marketplace** (`/explore`)!
10. Press **F5 (Refresh)** on any page — all data remains saved and persistent.

---

### 12. Deploying to Vercel (Production)
The repository includes [`vercel.json`](vercel.json) pre-configured for SPA routing and serverless `/api/*` endpoints.

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Shilp Setu complete database and Gemini integration"
   git push origin main
   ```
2. In [Vercel](https://vercel.com), click **"Add New Project"** and import your repository.
3. In the **Environment Variables** section, add the same 5 variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
   - `DEMO_ARTISAN_ID`
4. Click **Deploy**. Vercel will build the frontend and deploy the serverless API functions automatically!

---

## 🔒 Security Summary

- `GEMINI_API_KEY` is **never exposed** to the client-side browser bundle.
- `SUPABASE_SERVICE_ROLE_KEY` is **never exposed** to the client-side browser bundle.
- There is **no `VITE_GEMINI_API_KEY`**.
- Local `.env` file is excluded from Git via `.gitignore`.
- Database access is protected with Row Level Security (RLS).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Lucide React
- **Backend / Serverless**: Node.js Vercel Functions (`/api/*`), `@google/genai` (v2.22.0)
- **Database & Storage**: Supabase PostgreSQL with RLS, Supabase Storage
- **AI Models**: Google Gemini 2.5 Flash Multimodal
