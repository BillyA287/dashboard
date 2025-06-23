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
- **Search and Sort Added Users**: Users added to the table can be searched through or sorted by column.
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

---

## Data Persistence

Currently, the app uses a local JSON file (`users.json`) stored in the `data/` directory to manage user data. This approach works well for development and small-scale applications but has limitations in production environments:

1. **Ephemeral File Systems**:  
   Platforms like Vercel and Render use ephemeral file systems, meaning any changes made to the `users.json` file during runtime are lost when the server restarts or redeploys.

2. **No Multi-User Support**:  
   The JSON file is local to the server and does not support concurrent updates or multi-user environments.

### Future Improvements for Persistent Data

To ensure data persists across page refreshes and deployments, the following approaches can be implemented:

1. **Database Integration**:  
   - Use a cloud-hosted database (e.g., PostgreSQL, MongoDB, or MySQL) to store user data.
   - API routes (`/api/users`) will handle CRUD operations by interacting with the database.
   - This ensures data persistence across app restarts and supports multi-user environments.

2. **Hosted JSON API**:  
   - Use a hosted JSON API service (e.g., Firebase, Supabase, or JSONBin) to store user data.
   - The app will fetch and update user data dynamically via API calls.

3. **Fallback to Local JSON File**:  
   - For simpler deployments, user data can continue to be stored in a JSON file (`users.json`) in the server's file system. However, this approach is less scalable and suitable for small-scale apps.

---

## Deployment

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com). Follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.