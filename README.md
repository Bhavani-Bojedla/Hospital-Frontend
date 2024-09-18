# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Health Tracking App - Frontend Documentation

## Overview

This is a React-based Health Tracking Application designed to help users monitor their health metrics. The app is styled using Tailwind CSS and uses Axios for API requests. The following document outlines the structure and functionality of the frontend pages.

## Table of Contents

- [Installation and Setup](#installation-and-setup)
- [Technologies Used](#Technologies)
- [Pages](#pages)
  - [SignIn Page](#Signin-page)
  - [SignUp Page](#Signup-page)
  - [Home Page](#Home-page)
  - [Add Record Page](#Add-record-page)
  - [Health Metrics Dashboard](#health-metrics-dashboard)


## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   gh repo clone Bhavani-Bojedla/Hospital-Frontend

   ```

2. **Install Dependencies:**

   ```bash
   npm install

   ```

3. **Start the Development Server:**

   ```bash
   npm start
   ```

## Technologies

- **React**: Used for building the user interface.
- **Tailwind CSS**: Provides utility-first styling and responsive design.
- **Axios**: For making HTTP requests to the backend API.
- **Redux**: Manages global state across the application.
- **React Router**: Handles navigation and routing within the app.

## Pages

### Signin-page

- **Path:** `/signin`
- **Description:** Allows users to log in to their account. Includes form validation and error handling.

### Signup-page

- **Path:** `/signup`
- **Description:** Allows new users to register an account. Includes password validation and error handling.

### Home-page

- **Path:** `/`
- **Description:** Provides a welcome message and introduction to the application. Includes navigation links to other pages.

### Add-record-page

- **Path:** `/add-record`
- **Description:** Form for entering health metrics such as body temperature, blood pressure, and heart rate. Supports form validation and data submission.

### Health-metrics-dashboard

- **Path:** `/dashboard`
- **Description:** Displays a list of health records with options to view details or delete records. Includes search and filter functionality for records.

## Search and Filtering

- **Search Functionality:** Allows users to search for records based on the date or filter by health metrics (e.g., heart rate above a certain threshold). The search updates automatically as users type.

## Error Handling

- **Toast Notifications:** Used for user feedback on errors or successful actions, such as "failed to fetch records" or "record deleted successfully."

## Styling

- **Tailwind CSS:** Utilized for styling components with a responsive design approach. Utility classes handle different screen sizes and layout adjustments.

## Contact

- **Email:** bhavanibojadla8@gmail.com
- **GitHub:** [Bhavani-Bojedla](https://github.com/Bhavani-Bojedla/Hospital-Frontend)

## Contributing

If you'd like to contribute to this project, please follow the guidelines outlined in the [CONTRIBUTING](CONTRIBUTING.md) file.
