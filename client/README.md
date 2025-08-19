Client Setup

Install required dependencies:

npm install axios react-router-dom @reduxjs/toolkit react-redux tailwindcss


Go to ShadCN UI and Vite config docs, then follow steps to install TailwindCSS and ShadCN.

⚙️ Configuration

Configure Redux store and create auth slice.

Configure React Router DOM for routing.

📂 Project Structure

Create two main folders inside src:

components/

pages/

🔑 Auth Setup

In components/auth/ → Create Layout.jsx

Contains common left-side banner and Outlet to switch between login/register.

In pages/auth/ → Create:

Login.jsx

Register.jsx

🔑 Admin & Shopping Views

Same procedure as auth:

Create common sidebar + header in components/admin/ and components/shop/.

Each has its own Layout.jsx with Outlet to load child pages.

In pages/admin/ → Add files like Dashboard.jsx, etc.

In pages/shop/ → Add files like Home.jsx, etc.

🚏 Routing

In App.jsx, define routes:

/auth → uses AuthLayout with children (Login, Register)

/admin → uses AdminLayout with children (Dashboard, etc.)

/shop → uses ShopLayout with children (Home, etc.)

🔐 Route Protection

Create a common/CheckAuth.jsx file.

This component validates authentication & roles for all routes.

Attach <CheckAuth> to each route and pass props:

<CheckAuth isAuthenticated={isAuthenticated} user={user}>
  <AdminLayout />
</CheckAuth>