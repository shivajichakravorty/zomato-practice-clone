# Zomato API Testing Guide

## Fixed Issues

✅ JWT token payload inconsistency (auth.controller.js) - Now uses `userId` consistently
✅ server.js path imports - Fixed relative paths

## API Endpoints

### 1. Food Partner Registration

**Endpoint:** `POST /api/auth/foodpartner/register`  
**Body:**

```json
{
  "name": "Your Restaurant Name",
  "email": "partner@example.com",
  "password": "password123"
}
```

**Response:** Returns partner object and sets JWT token in cookies

---

### 2. Food Partner Login

**Endpoint:** `POST /api/auth/foodpartner/login`  
**Body:**

```json
{
  "email": "partner@example.com",
  "password": "password123"
}
```

**Response:** Returns partner object and sets JWT token in cookie
**Important:** Save this cookie for authenticated requests

---

### 3. Create Food Item (AUTHENTICATED)

**Endpoint:** `POST /api/food/`  
**Headers:**

- `Content-Type: multipart/form-data`
- **Cookie:** `token=YOUR_JWT_TOKEN` (from login response)

**Body:** (form-data)

- `name`: Biryani
- `description`: Delicious biryani
- `video`: (file upload)

**Response:** Returns created food item object

---

## Testing Steps in Postman

### Step 1: Register Food Partner

1. Create new POST request to `http://localhost:3000/api/auth/foodpartner/register`
2. Go to **Body** → Select **raw** → **JSON**
3. Paste registration data above
4. Send request
5. Copy the JWT token from response headers or use cookie auto-handling

### Step 2: Login Food Partner

1. Create POST request to `http://localhost:3000/api/auth/foodpartner/login`
2. Send login credentials
3. **Enable "Automatically follow redirects"** if needed
4. Save the returned JWT token

### Step 3: Create Food Item

1. Create POST request to `http://localhost:3000/api/food/`
2. Go to **Headers**, add cookie: `token=PASTE_JWT_TOKEN_HERE`
3. Go to **Body** → Select **form-data**
4. Add fields: name, description, video (file)
5. Send request

---

## Troubleshooting

**Error: "Cannot POST /api/auth/api/food"**  
→ Make sure you're calling `/api/food/` not `/api/auth/api/food`

**Error: "Unauthorized access"**  
→ Ensure JWT token is passed in cookies with key `token`

**Error: "Food partner not found"**  
→ Make sure you're logged in first and have valid JWT

---

## Fixed Bugs

1. **JWT Token Mismatch**: Changed `partnerId` to `userId` in auth.controller.js
2. **Server Path Issue**: Fixed relative paths in server.js
