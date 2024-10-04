# Lavanda del Lago Ecommerce

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Version](https://img.shields.io/badge/version-4.0.0-yellow.svg)

Lavanda del Lago is an eCommerce platform built using **Next.js** with a focus on performance, user experience, and simplicity. The project utilizes **Tailwind CSS** and **Shadcn UI** for a custom, responsive UI. It also incorporates **Clerk** for user management and **Sanity** as the CMS, making it a robust solution for modern web commerce.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

Lavanda del Lago is an eCommerce platform leveraging Next.js as the core framework. It uses modern tools like **Shadcn UI** for CRO-optimized UI design, **Tailwind CSS** for styling, and **Sanity** as the content management system (CMS). **Clerk** handles user authentication and management. The platform is designed with SEO and performance optimization in mind, offering a streamlined development process and easy maintenance.

## Features

- 🤑 **Optimized UI for Conversion Rate Optimization (CRO)** using **Shadcn UI**.
- ⚙️ **Sanity CMS Integration** for easy content management.
- 👨‍💻 **Simple and Clean Architecture**, making it easy for developers to work on.
- 🌐 **SEO and Performance Enhancements** built into the project structure.

## Installation

Follow the standard steps to set up a Next.js project:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/lavanda-del-lago.git
   cd lavanda-del-lago
   ```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

## Usage

The usage of the project follows a typical Next.js application. Once installed, start the development server and navigate to <http://localhost:3000> to begin working on the application.

## Configuration

No special configuration is required beyond the standard Next.js setup. Ensure environment variables for services like Clerk and Sanity are correctly configured in a .env.local file:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
CLERK_API_KEY=your_clerk_api_key
```

## Dependencies

This project uses the following key dependencies:

- Next.js: Main framework
- Shadcn UI: UI components library
- Tailwind CSS: Styling
- Full Calendar: Calendar features
- Clerk: User management and authentication
- Sanity: CMS for content management
- SWR: Data fetching library

To install all dependencies, run npm install or yarn install as outlined in the installation section.

## License

his project is licensed under a Free License. Feel free to use, modify, and distribute the code.

## TODOS

- [x] new README.md
- [x] newsletter with Sanity
- [x] Add more pages to the Footer (Ask Jorge)
- [x] Add SEO
- [x] Add Error and 404 Page Sanity
- [x] Assets Sanitition
- [x] Data Sanitition
- [x] Fix categories list Home Page (not Snapping)
- [x] SEO Sanity
- [x] DevTools Error Fix
- [x] Clerk and Sanity User Muation
- [x] Refactor Product Page (Ask Jorge)
- [x] Profile Page
- [x] Policy Pages Indentation
- [x] Fix file download
- [x] Carousel in Product Image Dialog
- [x] Security API
- [x] Reseller Page
- [x] Add Search Functionality Orama
- [x] Add Reseller Form Sanity Structure
- [x] List View Sanity Structure [Info](https://www.sanity.io/docs/structure-builder-introduction)
- [x] Create Page "Para hacer todo solo hace falta una flor" (Change the name)
- [x] Create Page "Propiedad"
- [x] Change Events Language
- [x] Create Page "Nuestros Remedios"
- [x] Create Page "Certificaciones"
- [x] Favicon and OpenGraph
- [x] Blog Style fix
- [x] Add Sanity Plugins
- [x] Cron Job for Orama Index Deploy [Free Cron Job](https://cron-job.org/en/)
- [x] Resend Configuration
- [x] User Checkout Configuration
- [ ] Reseller Profile Improvement (Checkout - Search)
- [ ] Performance Improvements (ISR, Dynamic Imports, Hooks)
- [ ] Redsys Configuration
- [ ] Paypal Configuration
- [ ] VPS Configuration and Github Actions
- [ ] Check Unused Dependencies and Components
- [ ] Performance Review (Queries)

## TODOS After Deploy

- [ ] Hidration Error (Navbar)
- [ ] Sanity Handoff
- [ ] SEO Improvement (Jld)
- [ ] Analytics Improvement (PartyTown)

## Reactemail Template TODOs

- [x] React Email Template for Completed Purchase (for User & Admins)
- [x] React Email Template for Reseller Form
- [x] React Email Template for User Auth
- [x] React Email Template for Newsletter
