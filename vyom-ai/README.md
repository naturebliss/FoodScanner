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

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)
