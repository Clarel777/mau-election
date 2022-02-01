**Avoiding Common Attacks:**

The following two considerations were taken, among others, when building the project:
- SWC-100 (Function Default Visibility, related to CWE-710: Improper Adherence to Coding Standards): All the functions of the project had their visibility clearly stated. One example is the function registerCandidate. If its visbility was not specified, it would have been marked as public.
- SWC-105 (Unprotected Ether Withdrawal, related to CWE-284: Improper Access Control): The project has implement control so that fees are deducted only by authorized parties or according to the specs of the smart contract system. For example, if a user has voted once, the smart contract will not allow that user to vote a second time. If a user, other than the commissioner tries to close the election, that will not be allowed either.
