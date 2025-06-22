# User Management Dashboard

This is a **User Management Dashboard** built with [Next.js](https://nextjs.org). The app allows administrators to manage users by performing CRUD operations (Create, Read, Update, Delete). It includes features like sorting, searching, and visual feedback for user actions.

---

## Features

- **List Users**: Displays user data (name, email, role) in a styled table.
- **Add User**: Allows adding new users via a form.
- **Edit User**: Enables editing user details via a modal with pre-filled data.
- **Delete User**: Removes users from the list with visual feedback.
- **Search and Filter**: Filters users by name, email, or role.
- **Sort Users**: Sorts users by name, email, or role in ascending or descending order.
- **Visual Feedback**: Provides loading indicators and snackbar notifications for user actions.

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Improvements for Future Complexity

As the app grows in complexity, here are some improvements I would implement:

- **State Management**:  
  For a small app like this, React Context is sufficient and keeps things simple. If the app grows significantly or requires more advanced state logic, Redux or Zustand could be introduced for global state management.
- **Backend Integration**:  
  Replace the mocked backend with a real database and API endpoints. Add authentication and authorization.
- **Pagination**:  
  Add pagination to handle large datasets efficiently.
- **Advanced Search**:  
  Implement advanced search filters (e.g., by date, role, or custom fields).
- **Accessibility**:  
  Ensure the app meets WCAG standards for accessibility.
- **UI Enhancements**:  
  Use a design system like Material UI or Chakra UI for consistent and scalable styling.

---

## Testing

Testing is currently out of scope for this project, but as the app grows, I would implement:

- **Unit Tests**:  
  Test individual components and utility functions using Jest and React Testing Library.
- **Integration Tests**:  
  Test interactions between components (e.g., adding a user and verifying it appears in the table).
- **Initial Load State**:  
  We would specifically test the initial load state to ensure the app renders the correct UI when user data is present or absent.
- **End-to-End Tests**:  
  Use Cypress or Playwright to simulate user workflows (e.g., adding, editing, and deleting users).
- **Mocking API Calls**:  
  Mock API calls using libraries like `msw` to simulate backend responses during tests.
- **Continuous Integration**:  
  Set up CI pipelines (e.g., GitHub Actions) to run tests automatically on every pull request.

---

## Security: Protecting User Data

- The `users.json` file is stored in the `data/` directory, which is **not** publicly accessible in production.
- All user data access is performed via API routes, which run on the server and are not exposed to the client.
- In a production environment, you should:
  - Never move `users.json` or any sensitive data into the `public/` directory.
  - Use a real database for persistent and secure storage.
  - Implement authentication and authorization in your API routes to ensure only permitted users can access or modify user data.
- Regularly audit your deployment and server configuration to ensure no sensitive files are exposed.

## Deployment

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com). Follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

