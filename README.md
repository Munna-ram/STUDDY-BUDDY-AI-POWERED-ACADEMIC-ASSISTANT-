# StudyBuddy — Version 3

Includes:
- Student sign-up/sign-in with Supabase Auth
- Per-user cloud database for study plans and tasks
- Row Level Security (RLS) policies
- AI study assistant through a server-side Vercel function
- Dashboard, progress tracker, and quiz

## Important architecture note
GitHub stores the source code. Deploy this project to **Vercel** to run `/api/ask`; GitHub Pages cannot run this serverless API. Do not put Gemini API keys or Supabase service-role keys in `index.html`.

## 1. Create Supabase project
1. Create a project at https://supabase.com.
2. Open SQL Editor and run all of `schema.sql`.
3. Open Project Settings → API (or API Keys).
4. Copy the Project URL and the publishable/anon key.
5. In `index.html`, replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY`.
   The browser key is intended to be public; Row Level Security protects the rows. Never use a service-role key in the browser.

## 2. Configure AI
1. Create a Gemini API key from Google AI Studio: https://aistudio.google.com/apikey
2. Import this GitHub repository into Vercel: https://vercel.com/new
3. In Vercel Project Settings → Environment Variables, add:
   - Name: `GEMINI_API_KEY`
   - Value: your Gemini API key
4. Redeploy after adding the environment variable.

The AI provider's availability, limits, and pricing depend on its current terms and account.

## 3. Deploy
1. Push these files to your GitHub repository (keep `index.html` at the repository root).
2. Import the repository into Vercel and deploy. Vercel serves `index.html` and the `/api/ask` function.
3. Open the deployed URL and create an account.
4. If email confirmation is enabled, confirm your email. Configure Supabase Auth URL settings with your deployed site URL if required.

## 4. Test
- Sign up and sign in.
- Add a study plan and a task; refresh and check that data remains.
- Mark a task complete and check dashboard progress.
- Ask a question in the AI assistant after setting `GEMINI_API_KEY`.

## Troubleshooting
- "Setup needed": Supabase URL/key in `index.html` have not been replaced.
- Database error: run `schema.sql` in the correct Supabase project.
- Sign-in/confirmation issue: check Supabase Auth provider and URL configuration.
- AI not configured: add `GEMINI_API_KEY` in Vercel and redeploy.
- Never commit secret keys to GitHub. If a secret was committed, revoke/rotate it immediately.
