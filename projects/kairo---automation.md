# Kairo Automation — summary

- Problem: Teams want no-code workflow automation (APIs, AI, notifications, background jobs) without giving up reliability, observability, or credential security.
- Solution: A visual drag-and-drop automation platform. Build flows visually, connect APIs, plug in AI providers, orchestrate background jobs with execution logs and history.
- Tech: Next.js 15 + React 19 + TypeScript, tRPC, Prisma + PostgreSQL, Inngest (durable execution + realtime), Better Auth + Polar billing, Sentry, Tailwind CSS 4, XYFlow (@xyflow/react), TanStack Query, Vercel AI SDK (OpenAI / Anthropic / Google / Groq), Discord/Slack nodes, Handlebars templating.
- Link: https://github.com/whynotramaa/kairo---automation
- Website: https://kairo-automation.vercel.app

---

> Original README from https://github.com/whynotramaa/kairo---automation below, kept verbatim.

# 🧩 Kairo — Visual Workflow Automation


<p align="center">
  <img src="github-images/1.png" width="900" />
</p>

Kairo is a modern workflow automation platform that lets you design, run, and monitor complex automations without code. Build flows visually, connect APIs, integrate AI, and orchestrate background jobs reliably.

<br />
<br />

<p align="center">
  <img src="public/logos/openai_dark.svg" width="50" />
  <img src="public/logos/claude-ai-icon.svg" width="50" />
  <img src="public/logos/groq.svg" width="50" />
  <img src="public/logos/gemini.svg" width="50" />
  <img src="public/logos/discord.svg" width="50" />
  <img src="public/logos/stripe.svg" width="50" />
  <img src="public/logos/meta.svg" width="50" />
  <img src="public/logos/kimi-icon.svg" width="50" />
</p>

<br />
<br />


## ✨ What Kairo Does

- 🧠 Visual, drag-and-drop workflow builder  
- ⚙️ Unlimited background executions  
- 🤖 Built-in AI providers (OpenAI, Gemini, Groq, Claude)  
- 💬 Discord & Slack messaging nodes  
- 📝 Google Forms automation (triggers)  
- 🌐 HTTP request actions with templating  
- 📜 Execution logs and history  
- 🔐 Encrypted credentials, user-scoped and secure  

WhatsApp and Telegram integrations are coming soon.

---


<p align="center">
  <img src="github-images/2.png" width="400" />
   <img src="github-images/3.png" width="400" />
</p>
<br/>
<br/>
<br/>
## 🏗 Built on a Modern Stack

>

- Next.js + React  
- tRPC, Prisma, PostgreSQL  
- Inngest for durable workflow execution  
- Sentry monitoring  
- Secure credential encryption

---

## 🧩 Example Workflows

<p align="center">
  <img src="github-images/4.png" width="700" />
</p>

- Google Form ➜ AI Analysis ➜ Slack Alert  
- Stripe Event ➜ AI Summary ➜ Discord Notification  
- Manual Trigger ➜ Multiple API Calls ➜ Store Results  
- Webhook ➜ HTTP Request ➜ AI Enhancement ➜ Output

---


## 👩‍💻 Development

### Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run ngrok:dev
npm run inngest:dev
npm run dev:all
```

### Environment Variables

Includes database, encryption, OAuth, billing, and Sentry keys.

---

## 🛣 Roadmap

Planned:

- WhatsApp + Telegram nodes
- Better validation feedback
- UI enhancements
- Upgrade flow improvements

---

## 📄 Summary

Kairo combines the simplicity of no-code tools with the power of a production-grade automation engine. Secure, extensible, and ready for real workloads.



Star the repo and follow along — more coming soon.
