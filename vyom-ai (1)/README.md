# VYOM-AI 🚀
National-scale AI safety platform for food and cosmetics.

## GitHub Pages Deployment
This project is configured for **full deployment on GitHub Pages**.

### Steps:
1. **Push to GitHub**: Upload this folder to a new GitHub repository.
2. **Set API Key**: Go to Repository Settings -> Secrets and variables -> Actions.
   - Add a repository variable: `NEXT_PUBLIC_GEMINI_API_KEY`
   - Value: Your Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
3. **Enable Pages**: Go to Settings -> Pages.
   - Under "Build and deployment", set "Source" to "GitHub Actions".
4. **Deploy**: The build will trigger automatically on push to `main`.

### 🛠️ Troubleshooting 404 Errors
If you open your GitHub Pages link and see a 404:
1. **Wait 2-3 minutes**: The initial deployment can take a few minutes after the code is pushed.
2. **Check the Build**: Go to the **Actions** tab in your repo. If it says "Failed", check the logs.
3. **Correct URL**: Ensure you are visiting `https://<username>.github.io/<repo-name>/`.
4. **Subfolder Setup**: This project is configured to automatically detect your repository name. If it still fails, open `next.config.js` and manually set your repo name in the `repo` variable.

### 📁 Why 17-20 files?
The original project was a "Monorepo" with hundreds of unnecessary configuration files. I have **flattened and optimized** it into a high-performance single-app structure.
- **Backend Included**: The backend AI logic is now integrated directly into the frontend using the Gemini SDK. You don't need a separate server!
- **Fast & Light**: Fewer files mean faster deployment and easier maintenance.
- **Functional**: All core features (Scanning, Analysis, Risk Scoring) are preserved in the `app/` and `components/` folders.

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)
