---
title: "Designing Payment Systems for Failure"
slug: "payment-systems-for-failure"
date: "2025-01-22"
category: "fintech"
categoryLabel: "Fintech"
readingTime: "11 min read"
excerpt: "Idempotency keys, reconciliation loops, and surviving third-party gateway timeouts in high-volume QRIS transaction flows."
featured: false
tags: ["Fintech", "Payments", "Idempotency", "Reliability"]
---

In payment engineering, failure is not an edge case; it is the default state of the network. Third-party acquiring banks timeout, QRIS provider webhooks drop, and users frantically double-tap "Pay" on unstable cellular connections.

When handling real money, distributed transactions cannot afford the luxury of two-phase commits across external vendor APIs. Here are the core patterns we rely on to guarantee financial correctness and zero double-debits.

---

## 1. Cryptographic Idempotency Keys

Every state mutation begins with a client-supplied or gateway-generated idempotency key:

$$\text{Key} = \text{SHA256}(\text{TenantID} + \text{OrderID} + \text{AttemptNumber})$$

Before charging any ledger, the worker acquires a transactional lock with a unique constraint:

```sql
INSERT INTO payment_requests (
    idempotency_key, 
    order_id, 
    amount_cents, 
    status, 
    created_at
) VALUES (
    $1, $2, $3, 'PENDING', NOW()
)
ON CONFLICT (idempotency_key) DO NOTHING
RETURNING id;
```

If the insert returns null, the request is a duplicate. We immediately return the status of the ongoing or completed transaction rather than dispatching a duplicate payment call to the acquirer.

---

## 2. The Asynchronous Reconciliation Loop

Never trust a single synchronous HTTP response from an upstream payment gateway. A network timeout on your outgoing request does not mean the customer's card was not charged.

We treat all outgoing charges as `UNKNOWN` until verified:

```
[Payment Initiated] ──(Acquirer Gateway)──> [Network Timeout / Socket Drop]
         │
         ▼
[Mark Status: PENDING_VERIFICATION]
         │
         ▼
[Reconciliation Worker Cron (Every 30s)]
  ├─ Query Acquirer Gateway Status API
  ├─ Verify Signature & Settlement Reference
  └─ If Settled: Credit Ledger
     If Expired: Reverse Hold & Notify User
```

This asynchronous reconciliation worker ensures that even if our servers crash mid-transaction, ledger integrity is restored within seconds of system recovery.
