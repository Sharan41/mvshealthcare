# Deploying MVS Healthcare Website to Render

This guide will help you deploy the MVS Healthcare website to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your GitHub repository connected to Render
3. The repository URL: https://github.com/Sharan41/mvshealthcare.git

## Deployment Steps

### Option 1: Deploy via Render Dashboard (Recommended)

1. **Log in to Render**
   - Go to https://dashboard.render.com
   - Sign in with your GitHub account

2. **Create a New Static Site**
   - Click "New +" button
   - Select "Static Site"

3. **Connect Your Repository**
   - Connect your GitHub account if not already connected
   - Select the repository: `Sharan41/mvshealthcare`
   - Click "Connect"

4. **Configure Build Settings**
   - **Name**: `mvs-healthcare-website` (or any name you prefer)
   - **Branch**: `main`
   - **Root Directory**: `frontend` (IMPORTANT: Set this to `frontend`)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: `Static Site`

5. **Environment Variables** (Optional)
   - Add if needed:
     - `NODE_VERSION`: `18.x`

6. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your site
   - Wait for the build to complete (usually 2-5 minutes)

7. **Access Your Site**
   - Once deployed, Render will provide a URL like: `https://mvs-healthcare-website.onrender.com`
   - Your site will auto-deploy on every push to the `main` branch

### Option 2: Deploy via Render Blueprint (render.yaml)

If you prefer using the `render.yaml` file:

1. **Move render.yaml to Root** (if deploying from root)
   - The current `render.yaml` is in the `frontend` directory
   - You can either:
     - Keep it in `frontend` and set Root Directory in Render dashboard
     - OR move it to root and update paths

2. **Create a Blueprint**
   - In Render dashboard, click "New +"
   - Select "Blueprint"
   - Connect your repository
   - Render will detect `render.yaml` automatically

## Post-Deployment Checklist

- [ ] Verify the site loads correctly
- [ ] Check all images are loading
- [ ] Test navigation links
- [ ] Verify PDF downloads work
- [ ] Test contact form (if using EmailJS)
- [ ] Check mobile responsiveness
- [ ] Verify animations work correctly

## Custom Domain Setup (Optional)

1. In your Render dashboard, go to your static site
2. Click on "Settings"
3. Scroll to "Custom Domains"
4. Add your domain
5. Follow Render's DNS configuration instructions

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure `NODE_VERSION` is set correctly
- Verify all dependencies are in `package.json`

### Assets Not Loading
- Check that `vite.config.js` has correct `base` path
- Verify `public` folder assets are included in build

### Routing Issues
- Ensure `render.yaml` has the rewrite rule for SPA routing
- Check that all routes redirect to `index.html`

## Environment Variables

If you need to add environment variables (e.g., for EmailJS):

1. Go to your site in Render dashboard
2. Click "Environment"
3. Add variables:
   - `VITE_EMAILJS_SERVICE_ID`: Your EmailJS service ID
   - `VITE_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
   - `VITE_EMAILJS_PUBLIC_KEY`: Your EmailJS public key

## Auto-Deploy

Render automatically deploys when you push to the connected branch. To disable:
- Go to Settings → Build & Deploy
- Toggle "Auto-Deploy" off

## Support

For Render-specific issues, check:
- Render Documentation: https://render.com/docs
- Render Status: https://status.render.com

