# AI Studio Security Specification - Al Khalil Digital Academy

## 1. Data Invariants
- A user's `credits` balance must always be an integer and cannot be negative (unless a temporary overdraft is allowed, but typically >= 0).
- Every `CreditTransaction` MUST correspond to an actual change in the user's `credits`.
- Only the user (owner) or an admin can read their own `UserProfile`.
- `LearningModule` and `Lesson` are read-only for students/parents and writeable only by admins.
- `AIConversation` logs are private to the student and their parent.
- `Grade` records are private to the student and parent.

## 2. The "Dirty Dozen" Payloads

1. **Identity Theft (Credit Stealing):** Attempt to update another user's `credits` field.
2. **Negative Purchase:** Attempt to create a `CreditTransaction` with a negative amount and type 'purchase'.
3. **Price Spoofing:** Creating a transaction for 80 credits but only "paying" for the starter pack (validated via backend in reality, but here rules check size/enums).
4. **Self-Promotion:** A student attempting to update their own `role` to 'admin'.
5. **Orphaned Transaction:** Creating a `CreditTransaction` without updating the `UserProfile.credits` (Checked via `existsAfter` or `getAfter` if atomic).
6. **Double Spending:** Attempting to consume credits twice for the same lesson (requires state check).
7. **Junk Data Injection:** Injected 1MB string into `displayName`.
8. **Malicious Module Creation:** Student trying to create a `LearningModule`.
9. **Private Note Sniffing:** User trying to read `ParentNote` that doesn't belong to their child's `studentId`.
10. **Unauthorized Log Access:** Reading `AIConversation` of another student.
11. **Future Timestamping:** Sending `createdAt` with a timestamp 10 years in the future.
12. **Shadow Field:** Adding `isPro: true` to `UserProfile`.

## 3. The Test Runner (Plan)
We will verify that:
- `create` on `transactions` requires matching `request.auth.uid`.
- `update` on `users` `credits` field is strictly tied to the transaction atomicity (where possible in rules) or whitelisted actions.
- `role` is immutable for the user.
