food-delivery-app-main/
├── backend/        # Express REST API
├── frontend/       # Customer-facing React app
└── admin/          # Admin panel React app

✨ Features
Customer Frontend

Browse food items by category
Add/remove items from cart
User registration and login (JWT-based auth)
Checkout via Stripe
View order history and status

Admin Panel

Add, list, and remove food items (with image upload)
View all orders
Update order status (e.g. Food Processing → Out for Delivery → Delivered)

Backend API

RESTful endpoints for food, users, cart, and orders
JWT authentication middleware
Image upload via Multer
Stripe Checkout integration
MongoDB via Mongoose


🛠️ Tech Stack
LayerTechnologyFrontendReact 19, React Router, Axios, ViteAdminReact 19, ViteBackendNode.js, Express 5, MongoDB, MongooseAuthJSON Web Tokens (JWT), bcryptPaymentsStripe CheckoutUploadsMulter (disk storage)Validationvalidator.js

🚀 Getting Started
Prerequisites

Node.js v18+
MongoDB Atlas account (or local MongoDB)
Stripe account

1. Clone the repository
bashgit clone https://github.com/your-username/food-delivery-app.git
cd food-delivery-app
2. Configure the backend
Create a .env file inside backend/:
envJWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key

⚠️ The config/db.js file contains a hardcoded MongoDB connection string. Move it to your .env as MONGO_URI and update the file accordingly before deploying.

3. Install dependencies & run
Backend
bashcd backend
npm install
npm run server
Runs on http://localhost:4000
Frontend
bashcd frontend
npm install
npm run dev
Runs on http://localhost:5173
Admin Panel
bashcd admin
npm install
npm run dev
Runs on a separate Vite port (typically http://localhost:5174)

🔌 API Reference
Base URL: http://localhost:4000/api
Auth — /api/user
MethodEndpointDescriptionAuthPOST/registerRegister new userNoPOST/loginLogin, returns JWTNo
Food — /api/food
MethodEndpointDescriptionAuthPOST/addAdd food item with imageNoGET/listList all food itemsNoPOST/removeRemove a food item by IDNo
Cart — /api/cart
MethodEndpointDescriptionAuthPOST/addAdd item to cart✅POST/removeRemove item from cart✅POST/getGet current cart✅
Orders — /api/order
MethodEndpointDescriptionAuthPOST/placePlace order & create Stripe session✅POST/verifyVerify Stripe payment resultNoPOST/userOrdersGet orders for logged-in user✅GET/listList all orders (admin)NoPOST/statusUpdate order status (admin)No

Authentication: Pass the JWT token in the token request header.


💳 Stripe Payment Flow

Customer places an order → backend creates a Stripe Checkout session.
Customer is redirected to Stripe's hosted payment page.
On success/failure, Stripe redirects to /verify?success=true/false&orderId=....
The frontend calls /api/order/verify to confirm payment and update order status in the database.


📂 Key Backend Files
backend/
├── server.js                    # App entry point
├── config/db.js                 # MongoDB connection
├── midleware/auth.js            # JWT auth middleware
├── models/
│   ├── userModel.js             # User schema
│   ├── foodModel.js             # Food schema
│   └── orderModel.js            # Order schema
├── controllers/
│   ├── userController.js        # Register/login
│   ├── foodController.js        # Add/list/remove food
│   ├── cartController.js        # Cart management
│   └── orderController.js       # Orders & Stripe
└── routes/
    ├── userRoute.js
    ├── foodRoute.js
    ├── cartRoute.js
    └── orderRoute.js

⚠️ Known Issues / Things to Fix Before Production

Hardcoded MongoDB URI in config/db.js — move to .env.
Admin routes are unprotected — /api/order/list, /api/order/status, and /api/food/add & /api/food/remove have no auth guard.
Frontend URL is hardcoded to http://localhost:5173 in orderController.js — use an environment variable.
Uploaded images are stored locally in backend/uploads/ — consider cloud storage (e.g. Cloudinary, S3) for production.
