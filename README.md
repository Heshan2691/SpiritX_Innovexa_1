# SecureConnect

SecureConnect is an authentication system built with **Angular** for the frontend, **.NET** for the backend, and **MongoDB** as the database. It provides secure user registration, login, and protected routes.

## 🚀 Tech Stack
- **Frontend:** Angular, TypeScript
- **Backend:** .NET Core (ASP.NET Web API)
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JWT-based authentication
- **Security:** Bcrypt for password hashing

---

## 📌 Features
- User Registration (Signup API)
- User Login (JWT-based authentication)
- Protected Dashboard (Only accessible after login)
- Logout Functionality

---

## 🔧 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/secureconnect.git
cd secureconnect
```

### 2️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3️⃣ Set Up Backend
#### Install .NET Dependencies
```bash
cd backend
dotnet restore
```
#### Set Up MongoDB Connection
Modify `appsettings.json` in the backend directory:
```json
{
  "ConnectionStrings": {
    "MongoDb": "mongodb+srv://your_username:your_password@cluster.mongodb.net/secureconnect"
  },
  "JwtSettings": {
    "Secret": "your_secret_key"
  }
}
```

### 4️⃣ Start the Backend Server
```bash
cd backend
dotnet run
```

### 5️⃣ Start the Frontend Server
```bash
cd frontend
ng serve
```

The frontend will run at **http://localhost:4200** and the backend at **http://localhost:5000**.

---

## 📂 Project Structure
```
secureconnect/
│── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   │   ├── login.component.ts  # Login Page
│   │   │   │   ├── signup.component.ts  # Signup Page
│── backend/
│   ├── Controllers/
│   │   ├── AuthController.cs  # Authentication Endpoints
│   ├── Models/
│   │   ├── User.cs  # User Model
│   ├── Services/
│   │   ├── AuthService.cs  # Authentication Logic
│   ├── Program.cs  # Entry Point
```

---

## 🔐 Authentication with JWT
- Uses **JWT (JSON Web Token)** for session management.
- Passwords are hashed using **BCrypt**.
- Secure login and signup endpoints.

### Signup API
**Endpoint:** `POST /api/auth/signup`
```json
{
  "username": "testuser",
  "password": "mypassword"
}
```

### Login API
**Endpoint:** `POST /api/auth/login`
```json
{
  "username": "testuser",
  "password": "mypassword"
}
```

---

## 🛠️ Future Improvements
- OAuth-based authentication (Google, GitHub, etc.)
- Email verification
- Role-based authentication
- Dark mode UI

---




# Task1

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
