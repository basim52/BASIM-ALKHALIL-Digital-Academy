# Security Specification: O.D. Academy

## Data Invariants
1. **User Identity**: A user profile MUST match the `auth.uid`. Role and `createdAt` are immutable after creation.
2. **Student Identity**: A student profile MUST belong to a valid user who has the 'student' role.
3. **Relational Integrity**: 
   - A `Grade` MUST reference a valid `studentId`.
   - A `Conversation` MUST reference a valid `studentId` who is the current user.
4. **Temporal Integrity**: All `date`, `createdAt`, and `updatedAt` fields MUST use `request.time` (server timestamp).

## The "Dirty Dozen" Payloads (Red Team Test Cases)

1. **Role Spoofing**: Logged in as student `A`, try to create user profile with `role: 'teacher'`.
2. **Identity Theft**: Logged in as user `A`, try to create/update `/users/B`.
3. **Shadow Field Injection**: Try to add `isAdmin: true` to a user profile.
4. **Immutability Breach**: Try to change `role` or `createdAt` on an existing user profile.
5. **ID Poisoning**: Use a 2KB string as a `studentId`.
6. **Self-Parenting**: Try to set `parentId` to one's own `uid` (circular).
7. **Score Padding**: Try to upload a grade where `score > total`.
8. **Time Travel**: Try to set `date` to a future/past timestamp instead of `serverTimestamp()`.
9. **Resource Exhaustion**: Send a transcript with 1,000,000 characters.
10. **Unverified Account Access**: Attempt a write while `email_verified` is `false`.
11. **PII Leak**: Non-parent/non-teacher reading another student's grade.
12. **State Skipping**: Trying to update `points` without being a teacher.

## Test Runner Logic (Schema)
The `firestore.rules.test.ts` will verify these cases.
