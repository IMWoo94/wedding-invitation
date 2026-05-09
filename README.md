# Wedding Invitation

Mobile-first wedding invitation built with React, TypeScript, Vite, Tailwind CSS, and GitHub Pages.

## Privacy policy

Real phone numbers and account numbers are intentionally not committed by default.

The source uses disabled placeholders for sensitive values. If real values must be shown, insert them only during the intended public-open period, deploy, then remove them again. Remember that committed values remain in Git history unless history is rewritten.

## Development

```bash
npm install
npm run dev
npm run build
```

## RSVP with Slack

The invitation can collect visit plans with only name and guest count.
Submissions are sent to Slack channel `C0B2PFXVAPQ` through a Slack Incoming Webhook-compatible URL.

Set the webhook URL before build, for example in `.env.local`:

```bash
VITE_RSVP_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

For GitHub Pages deployment, add the same value as the repository secret `VITE_RSVP_SLACK_WEBHOOK_URL`.

Note: Vite variables are embedded into the static frontend bundle. For a public invitation, a small private proxy endpoint is safer than exposing a raw Slack webhook URL. If using a direct webhook, rotate it if spam appears.

## Deployment

This project is configured for GitHub Pages under:

```text
https://imwoo94.github.io/wedding-invitation/
```

Vite base path is configured as `/wedding-invitation/`.
