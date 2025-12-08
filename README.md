# security-incident-tracker

A small web app where employees can submit security incidents (phishing, malware, unauthorized access), and analysts/admins triage them: set severity, assign owners, change status, and add timeline notes. Includes auth, RBAC, audit log, and CSV export.

Website / App Navigation: The user will start on the Sign Up page where an account can be created with a username and password. The user will then be directed to a Login page where they can enter in the credentials that were just created or already created (if the user exists in the database already). After passing through the pages, the user will finally get to the Incident Dashboard where there is a display of already existing incidents (most are tests and demos). The user can created incidences through a form and access them by by clicking on the title of the incident to access its details. 

Figma Prototype (last updated 12/2/2025): https://www.figma.com/design/ARDElJEKhckSjjJtW9W3Rq/UI-Prototype?m=auto&t=mpCiWDYjz7Xz3YBa-1 

Contributing:
Prettier and ESLint plugins/extensions

If using VSCode, install by heading over to the extensions tab of the IDE and search up Prettier and ESLint to install them.
