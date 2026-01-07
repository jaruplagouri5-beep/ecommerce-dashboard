## 🔑 KEY FEATURES

- **Server-side rendering (SSR)** using Next.js for improved performance and SEO
- **Complete Product Management (CRUD)**  
  - Create new products  
  - View product list  
  - Update product details  
  - Delete products (Admin only)
- **Role-based Authentication & Authorization**
  - Admin and User roles
  - Protected routes using middleware
- **Interactive Dashboard Analytics**
  - Revenue overview charts
  - Orders and stock trend visualizations
  - Animated counters for key metrics
- **Secure Image Upload**
  - Product image upload using Cloudinary / AWS S3
- **Admin-only Access Control**
  - Add / Edit / Delete products
  - View orders
  - Manage admins
- **User Access Control**
  - Dashboard analytics (read-only)
  - View products only (no edit/delete)
- **Logout Functionality**
  - Secure logout and session cleanup
- **Clean & Scalable Folder Structure**
  - App Router based architecture
  - Reusable components and utilities

---

## 🛠 TECH STACK

- **Frontend :** Next.js (App Router), React, TypeScript
- **Backend :** Next.js API Routes
- **Database :** MongoDB (with Mongoose)
- **Authentication :** Cookie-based authentication
- **Authorization :** Role-based access control (ADMIN / USER)
- **Styling :** Tailwind CSS
- **Animations :** Framer Motion
- **Data Visualization :** Recharts
- **Image Storage :** Cloudinary / AWS S3
- **Notifications :** react-hot-toast

---

## 🔄 WORKFLOW

1. User opens the application  
2. User logs in using email and password  
3. Server validates credentials from the database  
4. On successful login:
   - Authentication token is stored in cookies
   - User role (ADMIN / USER) is identified
5. Middleware checks authentication and role
6. Dashboard page is rendered using **Server-Side Rendering**
7. Based on role:
   - **ADMIN**
     - Full dashboard access
     - Can manage products, orders, and admins
   - **USER**
     - Dashboard analytics access
     - View products in read-only mode
8. Admin actions (Add / Edit / Delete):
   - Requests go to API routes
   - Database is updated
   - UI re-fetches latest data and updates instantly
9. Logout clears cookies and redirects to login page

---

## 👑 DUMMY ADMIN CREDENTIALS (FOR TESTING)

Use the following credentials to log in as **ADMIN**:

- **Email:** igl5@gmail.com 
- **Password:** igl@05
- **Role:** ADMIN  

👉 Normal users will have role `USER` and limited access.

---

## ✅ ROLE SUMMARY

### 👑 ADMIN
- Dashboard analytics
- Add / Edit / Delete products
- View orders
- Manage admins

### 👤 USER
- Dashboard analytics (view-only)
- View products
- ❌ No add/edit/delete
- ❌ No orders
- ❌ No admin access

---

## 📌 NOTE

This project demonstrates a **real-world role-based e-commerce admin dashboard** using Next.js with proper authentication, authorization, and clean UI architecture.  
It is suitable for **academic submission, portfolio projects, and real-world learning**.

## 🚀 Deployment

This project is successfully deployed using **Vercel**, which provides seamless hosting and serverless support for Next.js applications.

### 🔗 Live URL
👉 https://ecommerce-dashboard-w1ap.vercel.app

### 🛠 Deployment Platform
- **Vercel**
- GitHub-integrated CI/CD
- Automatic builds on every push to `main` branch

### ⚙️ Environment Configuration
The following environment variables are securely configured in Vercel:

- `MONGODB_URI` – MongoDB Atlas connection string  
- `CLOUDINARY_CLOUD_NAME` – Cloudinary cloud name  
- `CLOUDINARY_API_KEY` – Cloudinary API key  
- `CLOUDINARY_API_SECRET` – Cloudinary API secret  

> Environment variables are managed securely via the Vercel dashboard and are not exposed in the client.

### ✅ Deployment Status
- Production build: **Successful**
- Backend APIs: **Serverless (Next.js App Router)**
- Authentication & Database: **Fully functional in production**

---

