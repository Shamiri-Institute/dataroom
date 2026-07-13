// Compatibility re-export.
//
// Upstream moved `sendUpgradeOneMonthCheckinEmailTask` to
// `./send-upgrade-checkin-email` and deleted this file, but
// `ee/stripe/webhooks/checkout-session-completed.ts` (upstream) still imports
// the task from this path. Keep this module as a re-export shim so that
// import resolves.
//
// The dataroom-trial email tasks that previously lived here were moved by
// upstream to `ee/features/billing/dataroom-trial/lib/trigger/send-scheduled-email`
// (not included in the public repo).
export { sendUpgradeOneMonthCheckinEmailTask } from "./send-upgrade-checkin-email";
