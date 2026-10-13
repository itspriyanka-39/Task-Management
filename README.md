# Task Manager

A responsive Task Manager application built with React. It helps users organize daily tasks, track their progress, and manage task details.

## Features

- Add tasks with a required title and optional description.
- Edit existing tasks.
- Mark tasks as completed or active.
- Delete tasks.
- Search tasks by title (case-insensitive).
- Filter tasks by All, Active, and Completed.
- View total, active, and completed task counts.
- Persist tasks using browser localStorage.
- Responsive interface for desktop and mobile screens.
- Validation to prevent empty task titles.

## Tech Stack

- React
- JavaScript
- CSS
- Lucide React icons
- Browser localStorage

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- Git installed.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/itspriyanka-39/Task-Management.git
   ```

2. Navigate to the project folder:

   ```bash
   cd task-manager
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the local URL displayed in your terminal.

## Component Structure

- `App.jsx` — Manages task state, search, filters, task operations, and localStorage persistence.
- `components/form.jsx` — Handles task creation, validation, and editing.
- `components/list.jsx` — Displays tasks and provides completion, editing, and deletion actions.
- `components/filter.jsx` — Handles task search and status filters.
- `App.css` and `index.css` — Define the application's layout and styling.

## Implementation Decision

I used React's `useState` hook to manage the task list and UI state. Each task has a unique ID, allowing me to update or delete the correct task without affecting others. I used `localStorage` to persist tasks across page reloads without requiring a backend database.

## Known Limitations

- Tasks are stored in the current browser's localStorage and are not synchronized across devices.
- Clearing browser storage can remove saved tasks.
- The application does not use user accounts or a backend database.
- Data persistence depends on browser storage being available.

## Approximate Time Spent

Approximately 10 hours, including development, styling, testing, and documentation.
