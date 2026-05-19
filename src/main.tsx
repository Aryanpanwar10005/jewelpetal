import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import posthog from "posthog-js";
import { validateEnv } from "./lib/env";
import App from "./App.tsx";
import "./index.css";

// --- INFRASTRUCTURE (Inactive without keys) ---

// Production Safety Check: Validate environment variables before boot
validateEnv();

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // 100% in dev, 5% in prod
    tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.05,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    session_recording: {
      maskAllInputs: true,
    },
  });
}

createRoot(document.getElementById("root")!).render(<App />);
