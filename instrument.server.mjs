import * as Sentry from "@sentry/react-router";
//  profiling
import { nodeProfilingIntegration } from "@sentry/profiling-node";
//  profiling
Sentry.init({
    dsn: "https://71799c1468c39d42e78c6795d8d33148@o4509862801047552.ingest.us.sentry.io/4509913380225024",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    //  logs
    // Enable logs to be sent to Sentry
    enableLogs: true,
    //  logs
    //  profiling
    integrations: [nodeProfilingIntegration()],
    //  profiling
    //  performance
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    //  performance
    //  profiling
    profilesSampleRate: 1.0, // profile every transaction
    //  profiling
});