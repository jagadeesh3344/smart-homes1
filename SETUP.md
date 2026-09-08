# 🏛️ AETHERIA SMART HOME & AUTOMATION ECOSYSTEM
## Complete Setup Guide & Major Project Viva Presentation Manual

> **For Student & Faculty Review**: This document contains step-by-step setup instructions, network configuration for **ANY Wi-Fi / 4G / 5G**, **Gmail Live Invoice Email setup**, and a **Viva Demonstration Script** for college project presentation.

---

## 📑 Table of Contents
1. [Project Architecture Overview](#1-project-architecture-overview)
2. [Prerequisites (What you need installed)](#2-prerequisites)
3. [One-Click Installation](#3-one-click-installation)
4. [How to Run on ANY Wi-Fi / Network (Crucial Requirement)](#4-how-to-run-on-any-wi-fi--network)
   - [Method A: Worldwide Public Access (ANY 4G / 5G / College Wi-Fi)](#method-a-worldwide-public-access-any-network--recommended-for-lecturer)
   - [Method B: Local Machine & Same Wi-Fi Access](#method-b-local--same-wi-fi-access)
5. [Gmail Live Invoice Email Setup](#5-gmail-live-invoice-email-setup)
6. [Step-by-Step Lecturer Demo Walkthrough](#6-step-by-step-lecturer-demo-walkthrough)
7. [Viva Examination Q&A Cheat Sheet](#7-viva-examination-qa-cheat-sheet)
8. [Sharing via ZIP File (Best Practices)](#8-sharing-via-zip-file)

---

## 1. Project Architecture Overview

Aetheria is an enterprise-grade, 3-tier distributed smart automation ecosystem:

```
┌─────────────────────────────────────────────────────────────┐
│                 CLIENT LAYER (FRONTENDS)                    │
│                                                             │
│   🛍️ Storefront Web App          ⚙️ Admin Console App       │
│   (Port 3000 / React 19 + Vite)  (Port 3001 / React 19)     │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               │ REST API Requests            │ Real-time Server-Sent
               │ & Razorpay Gateway           │ Events (SSE) Stream
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 UNIFIED BACKEND SERVER                      │
│                  (Port 5000 / Node.js + Express)            │
│                                                             │
│  • Products & Inventory Engine    • Real-time SSE Broadcaster│
│  • Orders & Invoicing Service     • Razorpay Verification    │
│  • Nodemailer Live SMTP Dispatch  • Atomic JSON DB Engine    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Prerequisites

You only need **Node.js** installed on your computer.

1. Download **Node.js** (LTS Version 18 or 20+):
   👉 [https://nodejs.org](https://nodejs.org)
2. Run the installer and click **Next -> Next -> Finish**.
3. To verify installation, open Command Prompt (`cmd`) and type:
   ```bash
   node -v
   npm -v
   ```
   If version numbers appear (e.g. `v20.x.x`), you are ready!

---

## 3. One-Click Installation

If you just unzipped the project folder on a new computer:

1. Open the project folder (`d:\Firebase` or wherever you extracted it).
2. **Double-click on `install-dependencies.bat`**.
3. It will automatically download and install dependencies for all 3 sub-projects:
   - Unified Backend Server
   - Storefront Client App
   - Admin Management Console
4. Once completed, you will see `SUCCESS: ALL DEPENDENCIES INSTALLED AND READY!`.

*(Manual Terminal Alternative)*:
```bash
cd smarthomes-backend && npm install
cd ../aetheria-smart-home && npm install
cd ../smarthomes-admin && npm install
```

---

## 4. How to Run on ANY Wi-Fi / Network

> [!IMPORTANT]
> ### 🏆 METHOD A IS THE #1 RECOMMENDED OPTION FOR YOUR LECTURER!
> **Why?** College Wi-Fi networks often have strict internal firewalls that block devices from talking to each other directly on local IPs (like `192.168.x.x`). 
> **Method A solves this completely!** It generates secure worldwide HTTPS links that work across **ANY network**:
> - Your laptop can be on Home Wi-Fi, College Wi-Fi, or Mobile Hotspot.
> - The lecturer can be on their own personal phone with Airtel/Jio 4G/5G or completely different Wi-Fi.
> - Everything connects seamlessly through encrypted public internet tunnels with zero configuration!

---

### 🌟 Method A: Worldwide Public Access (ANY Network — THE BEST OPTION)

Use this when presenting to your lecturer or examiners:

1. **Double-click on `start-with-public-internet.bat`**.
2. Four command windows will automatically launch:
   - Window 1: **SmartHomes Backend** (API & Database on Port 5000)
   - Window 2: **SmartHome Storefront** (Customer Web App on Port 3000)
   - Window 3: **SmartHomes Admin Console** (Manager Dashboard on Port 3001)
   - Window 4: **Worldwide Public Tunnels** (Global Internet Access)
3. In the **Worldwide Public Tunnels** window, you will see 3 generated HTTPS links:
   ```text
   🛍️  Public SmartHome Store: https://clean-water-42.loca.lt
   ⚙️  Public Admin Console:    https://bright-sky-88.loca.lt
   🔌  Public Backend API:      https://fast-code-99.loca.lt
   ```
4. **Copy the `Public SmartHome Store` link** and send it to your lecturer on WhatsApp, or open it on your own mobile phone on 4G/5G mobile data.
5. **How to bypass the first-time screen**:
   - The first time anyone opens a `loca.lt` tunnel link on their phone or browser, a friendly Localtunnel security page appears.
   - Simply click the big blue button: **"Click to Continue"** (or enter the tunnel IP shown in the console if asked).
   - **BAM! The full luxury Aetheria SmartHome store loads instantly!**
6. Any order placed from the lecturer's phone will pop up live in your Admin Console on your laptop in real-time!

---

### Method B: Local & Same Wi-Fi Access
Use this when presenting directly from your laptop or when both your laptop and mobile phone are connected to the same Wi-Fi (or Mobile Hotspot):

1. **Double-click on `start-all.bat`**.
2. Open your browser:
   - **Customer Storefront**: [http://localhost:3000](http://localhost:3000)
   - **Admin Management Console**: [http://localhost:3001](http://localhost:3001)
   - **Backend API Server**: [http://localhost:5000](http://localhost:5000)
3. **To open on a mobile phone**:
   - In the **SmartHomes Backend** console window, look for:
     `📱 Network Access: http://192.168.x.x:5000`
   - Open your phone's browser and visit: `http://192.168.x.x:3000`
   *(Both devices must be on the same Wi-Fi or laptop mobile hotspot)*.

---

## 5. Gmail Live Invoice Email Setup

When a customer completes a checkout or sends a consultation enquiry, the backend automatically generates a **luxury architectural tax invoice (HTML)** and sends it directly to the customer's Gmail inbox!

### How to configure Gmail in 2 Minutes:

Because Google blocks raw account passwords for security, you must generate a free **16-character Google App Password**:

#### Step 1: Turn on 2-Step Verification
1. Open [myaccount.google.com/security](https://myaccount.google.com/security).
2. Under "How you sign in to Google", ensure **2-Step Verification** is **ON**.

#### Step 2: Generate an App Password
1. In the search bar at the top of Google Account settings, search for **App passwords** (or go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
2. Under "App name", type **SmartHomes Project** and click **Create**.
3. Google will show you a yellow box with a **16-character password** (e.g. `abcd efgh ijkl mnop`).
4. **Copy this 16-character code**.

#### Step 3: Paste into `.env`
1. Open the file: `smarthomes-backend/.env` using Notepad or VS Code.
2. Update lines 7 and 8:
   ```env
   # Gmail SMTP Email Configuration for Live Customer Invoices
   GMAIL_USER=your-actual-email@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   SMTP_FROM=your-actual-email@gmail.com
   SUPPORT_PHONE=+91 98765 43210
   ```
3. Save the file (`Ctrl + S`).
4. Restart the backend server (`start-all.bat` or `start-with-public-internet.bat`).

#### 🎉 Test it:
Place an order on the storefront using your personal email address. Within 3 seconds, check your inbox for a **"Order Confirmation & Invoice #ATH-XXXXXX - Aetheria Smart Home"** email!

> 💡 **Examiner Fail-Safe Feature**: If you do NOT enter a Gmail password, the system **never crashes or fails**. It automatically switches to a built-in test preview mode (Ethereal Mailer) and logs a clickable invoice preview URL in the backend terminal console.

---

## 6. Step-by-Step Lecturer Demo Walkthrough

Follow this 5-minute script to demonstrate the project to your faculty/examiner:

### Step 1: Show Real-Time Architecture (Dual Screens)
- Open **Storefront** (`http://localhost:3000` or public mobile URL) on the left side of your screen.
- Open **Admin Console** (`http://localhost:3001`) on the right side of your screen.

### Step 2: Live Purchase & Gateway Simulation
1. On the Storefront, select any product (e.g., *Bang & Olufsen Luxury Speakers* or *Lutron Architectural Keypad*).
2. Click **"Buy Now"** or **"Reserve Bespoke Piece"**.
3. Enter your Name, Email, Phone, and Address.
4. Click **"Proceed to Secure Checkout"**.
5. The simulated Razorpay Payment Gateway modal activates, verifies the cryptographic signature, and marks the transaction as **Paid**!

### Step 3: Instant Live Synchronization (The "WOW" Moment)
1. Notice that on the **Admin Console** on the right, without refreshing the browser:
   - A real-time notification badge appears instantly: `[Admin Live Alert] New order received: Order #ATH-XXXXXX`.
   - The order appears in **Orders & Fulfilment** immediately via Server-Sent Events (SSE).
   - In **Payments & Gateway Transactions**, the revenue counter updates dynamically.
   - The product inventory decrements atomically by the purchased quantity.

### Step 4: Official Tax Invoice
1. On the Storefront confirmation screen, click **"View & Print Official Invoice (HTML)"**.
2. A formal GST-compliant invoice opens with order number, product breakdown, 18% GST calculation, customer details, and print button.

---

## 7. Viva Examination Q&A Cheat Sheet

| Question by Examiner | Perfect Answer |
| :--- | :--- |
| **Q1: What is the tech stack used?** | *Frontend*: React 19, Vite, Tailwind CSS, Lucide Icons.<br/>*Backend*: Node.js, Express, TypeScript, Server-Sent Events (SSE).<br/>*Database*: Synchronized Atomic JSON Storage with Firebase Firestore bridge.<br/>*Payment*: Razorpay REST API & HMAC-SHA256 signature verification.<br/>*Email*: Nodemailer SMTP with automated HTML invoice templating. |
| **Q2: Why use Server-Sent Events (SSE) instead of WebSockets?** | SSE operates over standard HTTP/HTTPS, uses automatic browser reconnection, is lightweight, and is directional (server-to-client). For an e-commerce & admin notification pipeline, SSE uses far less memory and overhead than bidirectional WebSockets and passes effortlessly through college Wi-Fi firewalls. |
| **Q3: How does the system handle race conditions in inventory?** | The backend processes stock decrements atomically in memory during `createOrder()` before committing to disk via an atomic swap file (`db.json.tmp` -> `db.json`), ensuring zero data corruption or negative inventory. |
| **Q4: How does it work on ANY network or 4G/5G?** | The application incorporates dynamic host resolution (`window.location.hostname`) paired with reverse-proxy tunneling via `localtunnel`, allowing clients from any external network, carrier, or NAT to access the local server through encrypted HTTPS tunnels. |

---

## 8. Sharing via ZIP File

When sharing this project with your friend's brother via a ZIP folder:

1. **How to make the ZIP small (< 5 MB)**:
   - Delete the `node_modules` folders inside `smarthomes-backend`, `aetheria-smart-home`, and `smarthomes-admin` before zipping.
   - The recipient simply extracts the zip and double-clicks **`install-dependencies.bat`**. It will download everything cleanly!
2. **If sharing on a USB drive with dependencies included**:
   - You can leave `node_modules` intact; they can directly double-click `start-all.bat` without even needing an internet connection to install packages.

---

### 📞 Support & Contacts
- **Storefront URL**: `http://localhost:3000`
- **Admin Panel URL**: `http://localhost:3001`
- **Backend API URL**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

*All services and endpoints verified 100% operational.*
