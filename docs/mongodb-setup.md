# Fix "Database unavailable" / MongoDB connection

You see this when the backend cannot connect to MongoDB Atlas.

## 1. Whitelist your IP in Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and sign in.
2. Select your **Project** → **Network Access** (left sidebar).
3. Click **Add IP Address**.
4. For local development you can choose **Allow Access from Anywhere** (`0.0.0.0/0`).  
   For production, add only your server’s IP.
5. Click **Confirm**. Wait 1–2 minutes for it to apply.

## 2. Check your connection string

In `backend/.env` you must have a valid `MONGO_URI`, for example:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/yourdb?retryWrites=true&w=majority
```

- Replace **USERNAME** and **PASSWORD** with your Atlas database user.
- Replace **cluster0.xxxxx.mongodb.net** with your cluster host (from Atlas → Database → Connect).
- Replace **yourdb** with your database name (e.g. `chakki`).
- If your password contains special characters (`@`, `#`, `%`, etc.), [URL-encode](https://www.w3schools.com/tags/ref_urlencode.asp) them in the string (e.g. `@` → `%40`).

## 3. Restart the backend

After changing Atlas or `.env`:

```bash
cd backend
npm run dev
```

You should see in the terminal:

- **MongoDB Connected: cluster0.xxxxx.mongodb.net**  
  → DB is OK; login and products should work.

If you still see:

- **MongoDB connection failed: ...** or **Server continuing without database**  
  → Fix the step above (IP whitelist or `MONGO_URI`), then restart again.
