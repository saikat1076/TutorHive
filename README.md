# TutorHive

Welcome to **TutorHive** – an innovative platform designed to connect students with qualified tutors for personalized learning experiences. With an easy-to-use interface, TutorHive makes booking and managing tutoring sessions a breeze. Whether you’re a student looking to enhance your knowledge or a tutor seeking new students, TutorHive brings both together to facilitate seamless learning.

### 🌐 Live Website
[**Visit TutorHive**](https://tutorhive-e3caf.web.app/)

---

## 🚀 Purpose

**TutorHive** is here to make learning accessible and convenient for all. Our platform allows students to search for tutors based on subjects, expertise, and availability. Tutors can easily manage their profiles, offering their services to students who are looking for quality tutoring. We aim to bridge the gap between students and tutors, ensuring a smooth and effective learning process.

---

## ✨ Key Features

- **🔐 User Authentication**: Secure login and registration system for both students and tutors, powered by JWT (JSON Web Tokens).
- **🔍 Search Functionality**: Students can search for tutors by subject, expertise, and availability, ensuring they find the perfect fit for their needs.
- **📅 Session Booking**: Students can easily book tutoring sessions based on the tutor’s availability, making the process quick and hassle-free.
- **👨‍🏫 Profile Management**: Tutors can create and manage detailed profiles, including their qualifications, teaching style, and areas of expertise.
- **⭐ Rating & Reviews**: After every session, students can leave feedback, helping others make informed decisions and fostering a reliable community.

---

## 🔧 Tech Stack

This project uses the following technologies to create a fast, scalable, and secure platform:

- **Frontend**: 
  - **React.js**: JavaScript library for building dynamic and interactive user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for designing custom, responsive user interfaces.
  - **DaisyUI**: Tailwind CSS plugin that provides pre-built UI components to speed up development.

- **Backend**: 
  - **Node.js**: JavaScript runtime for building the server-side of the application.
  - **Express.js**: Web framework for Node.js, simplifying backend development.
  - **MongoDB**: NoSQL database for storing user data, tutor profiles, and session details.
  
- **Security & Authentication**: 
  - **bcryptjs**: A library for hashing passwords securely.
  - **jsonwebtoken (JWT)**: Secure token-based authentication to ensure users can safely log in and manage sessions.

- **Routing**:
  - **React Router DOM**: A routing library that enables navigation between different pages within the React application.

---

## 🛠️ npm Packages Used

This project leverages the following npm packages for seamless functionality:

- **react**: A JavaScript library for building user interfaces.
- **daisyui**: A plugin for Tailwind CSS to enhance UI components.
- **tailwindcss**: A utility-first CSS framework for building custom, responsive designs.
- **bcryptjs**: A password hashing library used for securely storing user passwords.
- **jsonwebtoken**: For implementing secure authentication via JSON Web Tokens (JWT).
- **react-router-dom**: For implementing routing and navigation within the React application.
- **mongodb**: MongoDB's native driver for interacting with the database.

---

## 🏃‍♂️ Local Development Guide

Follow these steps to run the project locally on your machine:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/tutorhive.git
    cd tutorhive
    ```

2. **Install dependencies**:
    Run the following command to install all the required dependencies:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory of the project and add your MongoDB URI and JWT secret key:
    ```
    MONGODB_URI=your-mongodb-uri-here
    JWT_SECRET=your-secret-key-here
    ```

4. **Run the backend server**:
    To start the backend server, run:
    ```bash
    npm run server
    ```

5. **Run the frontend development server**:
    In a separate terminal window, run the following command to start the frontend:
    ```bash
    npm run client
    ```

6. **Open the app in your browser**:
    After starting both the backend and frontend, open your browser and navigate to `http://localhost:3000` to see the live version of the app running locally.

---

## 📌 Relevant Links

- **GitHub Repository**: [TutorHive GitHub](https://github.com/saikat1076/TutorHive)
- **Firebase Console**: [Firebase Console](https://console.firebase.google.com/)

---

Thank you for choosing **TutorHive**! We are committed to providing a seamless and enjoyable experience for both students and tutors. Let’s build a brighter future together through learning! 📚✨
