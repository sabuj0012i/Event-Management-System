Event Management System – Backend


Overview
This repository contains the backend service for the Event Management System. It provides RESTful APIs for user authentication, event creation, event registration, analytics, and admin management. Built with Node.js and Express.js, it ensures a secure, scalable, and efficient event management platform.


Key Features

    RESTful API for frontend integration
    User authentication & authorization with JWT
    Role-based access (Admin, User)
    CRUD operations for events & users
    Secure password hashing with bcrypt.js
    Error handling & input validation
    Analytics endpoints for event insights
    Scalable database structure


Technologies Used


    Runtime: Node.js
    Framework: Laravel 
    Database: MySQL
    Authentication: JWT (JSON Web Tokens)
    Validation: Joi / Express Validator
    Environment Management: dotenv
    Version Control: Git & GitHub


Getting Started
    1. Clone the repository:
        git clone https://github.com/your-username/Event-Management-System.git
        cd Event-Management-System/backend

    2. Install dependencies:
        npm install

    3. Setup environment variables:
        Create a .env file in the backend/ directory:

            PORT=5000
            DB_CONNECTION=mysql
            DB_HOST=127.0.0.1
            DB_PORT=3306
            DB_DATABASE=your_database_name
            DB_USERNAME=your_username
            DB_PASSWORD=
            JWT_SECRET=your_jwt_secret_key


4. Run the server:
   npm run dev

    The server will start at: http://localhost:5000


 API Overview (Sample Endpoints)
    Endpoint	Method	Description
        /api/auth/register	POST	Register a new user
        /api/auth/login	POST	User login
        /api/events	GET	Get all events
        /api/events/:id	GET	Get event details
        /api/events	POST	Create a new event (Admin)
        /api/users	GET	Fetch all users (Admin)


 Security Features
	 Password hashing with bcrypt.js
	 Authentication using JWT
	 Role-based access control
	 Input sanitization & validation
	 CORS protection
	 HTTPS ready (for production)


 Analytics Setup
    Integrated with Google Analytics 
        Tracks:
           Number of events created
           User registrations
           Active users
           Event participation trends


 Contribution
    Contributions are welcome! Please fork the repo and create a PR for review. Follow the contribution guide if available.

Role of Group Members
    Md. Alif Islam  (Project manager, UI designer);
    Md. Rahul       (Testing,Debugging,Writing Readme)
    Md. Rony Islam  (Frontend Developer, and connect with backend)
    Md. Sabuj Hossain (Backend developer)
