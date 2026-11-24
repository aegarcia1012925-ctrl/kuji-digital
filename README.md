# Kuji Digital — Multi-page website

Responsive digital agency website with an AI customer assistant.

## Pages and files

- `index.html` — homepage, services, and project inquiry form
- `about.html` — studio mission and principles
- `projects.html` — concept portfolio and demo
- `how-it-works.html` — project process and FAQ
- `styles.css` — shared responsive visual system and chat styling
- `script.js` — navigation, inquiry form, and AI chat client
- `functions/api/chat.js` — secure server-side AI chat endpoint
- `functions/api/lead.js` — server-side project inquiry email endpoint

## Hosting requirement

The `functions/api` endpoints require **Cloudflare Pages Functions**. A static-only host such as GitHub Pages cannot run these server-side functions. Connect this repository to Cloudflare Pages and use the repository root as the build output directory (no build command is needed for this plain HTML site).

## Required server-side environment variables

Set these in Cloudflare Pages → Settings → Variables and Secrets. Add secrets only in the hosting dashboard; never commit API keys to GitHub.

- `OPENAI_API_KEY` — secret for the AI Responses API.
- `OPENAI_MODEL` — optional; defaults to `gpt-4.1-mini`.
- `RESEND_API_KEY` — secret used to email project inquiries.
- `LEADS_TO_EMAIL` — destination inbox for Kuji Digital inquiries.
- `LEADS_FROM_EMAIL` — sender address on a domain verified with Resend.

The AI chat works when `OPENAI_API_KEY` is configured. Project inquiries are emailed only after the Resend settings and verified sender are configured. The website does not keep a database of customer inquiries.

## Before launch

1. Have an adult account owner handle any hosting, API-provider account, and billing setup.
2. Add the environment variables above as encrypted secrets where supported.
3. Verify the sender domain with Resend before enabling lead emails.
4. Add a Cloudflare rate-limiting rule for POST requests to `/api/chat` and `/api/lead` to reduce abuse and unexpected API/email costs.
5. Test the chat, inquiry form, mobile layout, and email delivery.
6. Review service descriptions and portfolio concepts so they accurately describe Kuji Digital.

The chatbot is an AI assistant, not a human representative. It must not promise project prices, availability, or results; it should guide visitors to submit an inquiry for a tailored response.
