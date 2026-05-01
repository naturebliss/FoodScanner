# VYOM-AI Deployment Guide 🚀

Follow these steps to deploy the national-scale safety platform.

### 1. Requirements
- GitHub Account
- Vercel Account (Frontend)
- Railway Account (API & AI)
- Mapbox Public Token

### 2. Frontend (Vercel)
1. Push this repo to GitHub.
2. In Vercel, Select `New Project` -> Import from GitHub.
3. Configure `Root Directory` as `apps/web`.
4. Add Environment Variables:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: your_token
   - `API_URL`: url_of_railway_api
5. Deploy.

### 3. Backend (Railway)
1. Create a `New Project` from GitHub.
2. Search for the repo and select `apps/api`.
3. Add `PostgreSQL` and `Redis` plugins.
4. Set ENV:
   - `DATABASE_URL`: (Railway auto-injects this)
   - `AI_URL`: url_of_railway_ai
5. Deploy.

### 4. AI Microservice (Railway)
1. Same as above, select `apps/ai`.
2. Set ENV:
   - `GROQ_API_KEY`: (Your Groq API Key)
3. Deploy.

### 5. Final Initialization
1. Visit your Railway API URL.
2. Run database migrations: `npx prisma migrate deploy`.
3. Visit Vercel URL and start scanning!
