Record Backend 

##  Task Overview

This Task is a **User and Admin Management Backend** .
It provides:

* User authentication & profile management
* Admin authentication with a separate collection
* Role-based JWT authentication (user/admin)
* Full CRUD for user profiles (create, read, update, delete)
* Admin access to user data

---

## Folder Structure

<img width="259" height="869" alt="image" src="https://github.com/user-attachments/assets/a788c69c-0ae5-44e2-a84c-016cd0345e70" />



---

##  Features

### 1. **User Authentication**

* `POST /api/auth/signup` → Register new user (password hashed using bcrypt).
* `POST /api/auth/login` → Login user and get JWT token.


---

### 2. **User Profile Management**

Endpoints under `/api/user/profile`:

* `POST` → Create profile
* `GET` → Get profile
* `PUT` → Update profile
* `DELETE` → Delete profile

Validations (example: `workExperience` requires title, companyName, location, startDate).


---

### 3. **Admin Authentication**

* `POST /api/admin/signup` → Register admin.
* `POST /api/admin/login` → Login admin and get Admin JWT.


---

### 4. **Admin Privileges**

* `GET /api/admin/users` → Get all users.
* `GET /api/admin/users/:id` → Get specific user by ID.


---

### 5. **Middleware**

* **authMiddleware.ts** → Verifies **User JWT**.
* **adminMiddleware.ts** → Verifies **Admin JWT**.


---

##  Workflow

1. **User Flow**

   * Signup → Login → Get JWT → Use JWT for profile operations.

2. **Admin Flow**

   * Signup → Login → Get Admin JWT → Use Admin JWT to fetch users.


---
