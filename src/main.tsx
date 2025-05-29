import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

Sentry.init({
  dsn: "https://a9991295dc535be5e456ecc72b192df4@o4509400652972032.ingest.de.sentry.io/4509400663720016",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.replayIntegration(),
  ],

  // Performance Monitoring
  tracesSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  profilesSampleRate: 0.1, // This sets the sample rate for profiling at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  // This is the maximum number of transactions that will be sent to Sentry per session.

  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);
