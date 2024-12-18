Doctor Appointment Booking App
A full-stack MERN application that simplifies doctor appointment booking with features like user and doctor logins, 
appointment scheduling, secure payments, and an admin dashboard for managing users and appointments.

Features
1. User Management: Secure user and doctor login using JWT authentication.
2. Appointment Booking: Book appointments with real-time availability and intuitive date/time selection.
3. Admin Dashboard: Manage users, doctors, and appointments with CRUD operations.
4. Payment Integration: Secure payments using Razorpay.
5. Responsive Design: User-friendly UI designed with Tailwind CSS and React.
6. Notifications: Toast notifications for real-time feedback.
7. Optimized API Calls: Efficient data fetching with Axios and Context API for state management.

Technologies Used
* Frontend: 
React
React Router
Tailwind CSS
Axios
Toastify

* Backend:
Node.js
Express.js
MongoDB
JWT Authentication

* Other Tools:
Razorpay (Payment Gateway)
Render (Backend Deployment)
Git for Version Control

Setup Instructions:

Prerequisites
React
Node.js
MongoDB

Installation

1. Clone the repository:
   git clone url
   cd appName
2. Install dependencies:
   * For the backend:
     cd backend  
     npm install
   * For the frontend:
     cd frontend  
     npm install
3. Configure environment variables:
   PORT=5000  
   MONGO_URI=your_mongodb_connection_string  
   JWT_SECRET=your_jwt_secret  
   RAZORPAY_KEY=your_razorpay_key  
   RAZORPAY_SECRET=your_razorpay_secret
4. Start the application:
   * Backend:
     npm run server  
   * frontend:
     npm run dev  
