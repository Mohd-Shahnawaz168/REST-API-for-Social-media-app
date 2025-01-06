# REST-API-for-Social-media-app

Develop a robust social media backend REST-API that empowers user to post, comment, like send friend request, and reset password using OTP for enhanced Security

Here’s the updated description including MongoDB as the database for data storage:

### Backend Developer | REST-API for Social Platform

### 1 User Interactions (Post, Comment, Like):

Developed a robust RESTful API enabling users to create, read, and manage posts. Users can also comment on posts and like them, enhancing user interaction and content engagement on the platform. All data is efficiently stored and managed using MongoDB for quick retrieval and scalability.

### 2 Friend Request System:

Implemented a feature where users can send, accept, and reject friend requests, allowing for social networking functionality and personalized user connections. The system includes real-time status updates and notifications. All user relationships are stored and managed in MongoDB to ensure high availability and data consistency.

### 3 Password Reset with OTP:

Designed and integrated a secure password reset mechanism using OTP (One-Time Password) for enhanced security. The OTP is sent via email to verify the user's identity before resetting the password, reducing the risk of unauthorized access. Data related to OTP tokens is temporarily stored in MongoDB for verification.

### 4 Role-Based Access Control:

Implemented RBAC (Role-Based Access Control) to ensure that only authenticated users can perform certain actions (e.g., liking a post, commenting, or sending friend requests), improving security and data integrity. MongoDB stores user roles and permissions to enforce access restrictions across the platform.

### 5 Scalable and Modular API Design:

Built a scalable and modular RESTful API architecture using Node.js, Express.js, and MongoDB, ensuring clean code management and easy scalability as the platform grows. MongoDB’s flexible schema allows for quick adjustments to data models as new features are added.

### 6 Security Features:

Applied best practices in security, including JWT authentication for session management, password hashing using bcryptjs, and OTP validation to ensure secure user interactions and data protection. Sensitive data like user passwords is securely stored in MongoDB after hashing.

### 7 API Documentation with Swagger:

All API endpoints are well-documented, including request/response structures, HTTP methods, and error codes, making it easier for frontend developers and third parties to integrate with the backend.

### Technologies:

Node.js, Express.js, MongoDB, JWT Authentication, bcryptjs, OTP-based Authentication, RESTful API design, Role-Based Access Control (RBAC).
