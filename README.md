# Personal Dashboard
Personal Dashboard is a full‑stack web application that helps you manage your `portfolio`, `personal projects`, and `professional journey`, all linked directly to your portfolio in one place. It includes a `React frontend` and an `Express backend` with `MongoDB`, designed to be customizable and extendable for your own use.


## 🚀 Features
- 🖥️ Modern and responsive UI built with **React**
- 📡 API backend with **Express** and **MongoDB**
- 📊 Todo list to track your tasks and projects
- 📁 Project management for personal and professional work
- 🕒 Timeline to showcase your professional journey
- 🔐 Authentication support for secure access


## 🧰 Tech Stack

| Layer        | Tech                        |
|--------------|-----------------------------|
| Frontend     | React js                    |
| UI & style   | Tailwind CSS                |
| Backend      | express js                  |    


## 🛠️ Installation & Usage

Follow these steps to get your Personal Dashboard running locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ourouimed/Personal_Dashboard.git
cd Personal_Dashboard
```


### 2️⃣ MongoDB Configuration
You can use MongoDB Atlas (cloud) or a local MongoDB instance.

#### Method I – MongoDB Atlas (Recommended)
- Create a free account on MongoDB Atlas [Get started](https://www.mongodb.com/cloud/atlas/register)
- Create a new cluster and database.
- Add a database user with username and password.
- Allow your IP address in Network Access.
- Copy your MongoDB connection URI. (ex : `mongodb+srv://<your_useranme>:<your_password>@cluster0.eorsqbb.mongodb.net/<DataBaseName>?appName=Cluster0`)

#### Method II – Local MongoDB
- Install MongoDB locally: [MongoDB Community edition](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.2.5-signed.msi)
.
- Open mongodb compass 
- Create a new connection at `localhost:27017`
- Create a database named `personal_dashboard`.
- Copy your MongoDB connection URI. (ex : `mongodb://localhost:27017/personal_dashboard`)

- Tip to Create an account in app create a file in 
### 3️⃣ Cloudinary Configuration

Cloudinary is used to store and manage images for your portfolio and projects.

#### Steps to Configure:
1. Create a free account on [Cloudinary](https://cloudinary.com/).
2. Go to your **Dashboard** and copy your `Cloud name`, `API Key`, and `API Secret`.


### 4️⃣ Backend Environment Configuration
Before running the backend, make sure your `package.json` in the **backend** folder includes the following line:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",  // <-- Add this line to enable ES6 import/export
  "scripts": {
    "dev": "nodemon server.js"
  },
  ...
}
```

The backend requires several environment variables to run properly. Make sure you create a `.env` file in your `backend` folder with the following variables:

```bash
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret_key>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
ALLOW_CORS_URL=http://localhost:5173
```

**Explanation of each variable:**

- `PORT` – The port your backend server will run on (default: 5000).  
- `MONGO_URI` – Your MongoDB connection string (Atlas or local).  
- `JWT_SECRET` – Secret key for JSON Web Token authentication.  (your can write any string in your choice)
- `CLOUDINARY_CLOUD_NAME` – Your Cloudinary cloud name.  
- `CLOUDINARY_API_KEY` – Your Cloudinary API key.  
- `CLOUDINARY_API_SECRET` – Your Cloudinary API secret.  
- `ALLOW_CORS_URL` - Allowed fronted origin (replace with your frontend url in production)

Once your `.env` file is ready, start the backend:

```bash
cd backend
npm install
npm run dev
```
- Open your browser at: http://localhost:5000


#### 🔹 Create User

To quickly create user in your database with a hashed password:

1. create a new file in backend folder `ex : create-user.js`
2. Copy and paste the following script and update `EMAIL` and `password` as desired :
```bash
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const EMAIL = "test@example.com";
const PASSWORD = "123456789";

connectDB() 


const createTestUser = async ()=>{
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: EMAIL });
    if (existingUser) {
      console.log("User already exists!");
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    // Create the user
    const user = await User.create({ email: EMAIL, password: hashedPassword });
    console.log("Test user created:", {
        id : user._id,
        email : user.email, 
        hashedPass : user.password ,
        password : PASSWORD
    });
    process.exit();
  } catch (error) {
    console.error("Error creating user:", error);
    process.exit(1);
  }
}

createTestUser();
```
3. Run the script :
```bash
cd backend # if you havn't do it before
node create-user.js
```

4. Optional: After the user is created, you can delete the file. 


### 5️⃣ Frontend Setup & Start Server

The frontend uses **Vite** for development. You need to configure the backend API URL so the frontend can communicate with your Express server.

#### 1. Create a `.env` file in the `client` folder:
```
VITE_API_URL=http://localhost:5000`
```

#### 2. Install frontend dependencies:

```bash
cd client
npm install
```

#### 3. Start the development server:
```bash
npm run dev
```

- Open your browser at: http://localhost:5173

## 📂 Project Structure
```bash
📁 backend/                             # Express Js
├── 📁 config                           # Config files
│   ├── 🟨 cloud.js                     # Cloudinary config
│   └── 🟨 db.js                        # Mongodb config
├── 📁 controllers                      # Handle API logic for each feature
│   ├── 🟨 authController.js
│   ├── 🟨 projectsController.js
│   ├── 🟨 tasksController.js
│   └── 🟨 timelineController.js
├── 📁 lib                              # Utility functions
│   └── 🟨 upload-image.js
├── 📁 middlewares                      # Custom Express middlewares
│   ├── 🟨 corsOption.js
│   └── 🟨 verifyJwt.js
├── 📁 models                           # Mongoose models for database collections
│   ├── 🟨 Projects.js
│   ├── 🟨 Tasks.js
│   ├── 🟨 Timeline.js
│   └── 🟨 User.js
├── 📁 routes                           # API routes for backend
│   ├── 🟨 Auth.js
│   ├── 🟨 Projects.js
│   ├── 🟨 Tasks.js
│   └── 🟨 Timeline.js
├── 🗒️ package-lock.json
├── 🗒️ package.json
└── 🟨 server.js                        # Main server entry point
📁 client/                              # React (vite)
├── 📁 components                       # React UI components
│   ├── 📁 cards                        # Reusable cards
│   │   ├── 📄 ProjectItem.jsx
│   │   ├── 📄 StatItem.jsx
│   │   ├── 📄 TaskItem.jsx
│   │   └── 📄 TimeLineItem.jsx
│   ├── 📁 popus-forms                  # Pop-up forms for CRUD operations
│   │   ├── 📄 AddProjectPopup.jsx
│   │   ├── 📄 AddTimelinePopup.jsx
│   │   ├── 📄 DeleteProjectPopup.jsx
│   │   ├── 📄 DeleteTimeLinePopup.jsx
│   │   ├── 📄 UpdateProjectPopup.jsx
│   │   └── 📄 UpdateTimeLinePopup.jsx
│   └── 📄 Popup.jsx                    # Popup index component
├── 📁 lib                              # Utility functions
│   ├── 🟨 axiosService.js              # Helper utilities for frontend
│   ├── 🟨 links.js
│   └── 🟨 styles.js
├── 📁 pages                            # React pages (routes)
│   ├── 📄 DashboardLayout.jsx          # Dashboard reusable layout
│   ├── 📄 Error404.jsx
│   ├── 📄 Home.jsx
│   ├── 📄 Login.jsx
│   ├── 📄 Projects.jsx
│   ├── 📄 Timeline.jsx
│   └── 📄 Todos.jsx
├── 📁 providers                        # Providers
│   ├── 📄 ReduxProvider.jsx            # Redux/toolkit provider
│   └── 📄 RouterProvider.jsx           # React router dom provider
├── 📁 src                              # Main frontend source
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── 📁 store                            # Redux store and feature slices
│   ├── 📁 features                     # Redux slice (Auth , tasks , projects ...)
│   └── 🟨 store.js                     # Redux store main file
├── 🟨 eslint.config.js
├── 🌐 index.html
├── 🗒️ package-lock.json
├── 🗒️ package.json
├── 📝 README.md                       # React (vite) documentition
└── 🟨 vite.config.js                  # Redux store and feature slices
📝 README.md                           # Project documentition
```

## 📷 Demo and Screenshots
Here are the screenshots showcasing the admin  interface:
![Login page](/assets/images/preview1.png)
![Home page](/assets/images/preview2.png)
![To do list](/assets/images/preview3.png)
![Projects page](/assets/images/preview4.png)
![TimeLine page](/assets/images/preview5.png)
![new timeline popup](/assets/images/preview6.png)
![new project popup](/assets/images/preview7.png)



## 🤝 Contributing
Contributions are welcome!  
Fork the repository, create a feature branch, and submit a pull request.

## 🚀 Demo
You can check out the live demo of the project at: [Demo URL](https://ourouimedashboard.vercel.app)