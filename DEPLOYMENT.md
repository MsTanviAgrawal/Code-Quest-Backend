# CodeQuest Backend - Render Deployment Guide

## Prerequisites
- GitHub account
- Render account (sign up at https://render.com)
- MongoDB Atlas database URL
- Razorpay API credentials

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create New Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `Code-Quest_Backend` repository

### 3. Configure Web Service

**Basic Settings:**
- **Name:** `codequest-backend` (or your preferred name)
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** Leave empty (or specify if backend is in subdirectory)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **Free** tier (or paid tier for better performance)

### 4. Add Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_VERSION` | `18.17.0` | Node.js version |
| `MONGODB_URL` | `your_mongodb_connection_string` | From MongoDB Atlas |
| `JWT_SECRET` | `your_jwt_secret_key` | Strong random string |
| `PORT` | `5000` | Optional (Render auto-assigns) |
| `RAZORPAY_KEY_ID` | `rzp_test_xxxxx` | From Razorpay Dashboard |
| `RAZORPAY_KEY_SECRET` | `your_razorpay_secret` | From Razorpay Dashboard |
| `EMAIL_USER` | `your_email@gmail.com` | For OTP emails (optional) |
| `EMAIL_PASSWORD` | `your_app_password` | Gmail app password (optional) |

### 5. Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Wait for deployment to complete (5-10 minutes)
4. Your backend will be live at: `https://codequest-backend.onrender.com`

### 6. Update Frontend CORS

After deployment, update your frontend to use the new backend URL:

**In your frontend code:**
```javascript
const API_URL = 'https://codequest-backend.onrender.com';
```

**Update backend CORS allowed origins** (in `index.js`):
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://codequest93.netlify.app",
  "https://your-frontend-domain.com"  // Add your frontend URL
];
```

### 7. Test Your Deployment

Test the API endpoint:
```bash
curl https://codequest-backend.onrender.com/
```

Expected response: `"Codequest is running perfect"`

## Important Notes

### Free Tier Limitations
- **Spin down after 15 minutes of inactivity**
- First request after spin down takes 30-60 seconds
- 750 hours/month free (enough for one service)

### Keeping Service Active (Optional)
Use a service like **UptimeRobot** or **cron-job.org** to ping your backend every 10 minutes:
```
https://codequest-backend.onrender.com/
```

### File Uploads
- Render's free tier has **ephemeral storage**
- Uploaded files are deleted on restart
- **Solution:** Use cloud storage (Cloudinary, AWS S3, etc.)

### MongoDB Atlas Setup
Ensure MongoDB Atlas allows connections from anywhere:
1. Go to MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (allow all)

### Logs and Monitoring
- View logs: Render Dashboard → Your Service → Logs
- Monitor health: Render Dashboard → Metrics

## Troubleshooting

### Build Fails
- Check Node version compatibility
- Verify all dependencies in `package.json`
- Check build logs for errors

### Service Won't Start
- Verify environment variables are set correctly
- Check MongoDB connection string
- Review startup logs

### CORS Errors
- Add your frontend domain to `allowedOrigins` in `index.js`
- Redeploy after changes

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has correct permissions

## Updating Your App

After making changes:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically detect changes and redeploy.

## Alternative: Manual Deploy from Dashboard

1. Go to Render Dashboard
2. Select your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

**Need Help?**
- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
