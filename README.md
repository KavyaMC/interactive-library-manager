# Personal Library Manager

## Overview

Personal Library Manager is a small JavaScript frontend application for managing a personal collection of books.

It allows users to add books, mark them as Read or Unread, edit titles, delete books, search the library, and filter books by reading status.

You can view it at: [Live interactive library](https://kavyamc.github.io/interactive-library-manager)

## Technology

- HTML5
- ARIA
- JavaScript
- Bootstrap 5.3

## Purpose

The purpose of this project is to practice building an interactive frontend application while learning to recognize and reuse common application patterns.

Instead of focusing only on individual JavaScript features, the project focuses on how user actions, event handlers, helper functions, and DOM updates work together.

## Accessibility

The application uses semantic HTML and Bootstrap components to provide a clear and keyboard-friendly interface.

Library statistics use `aria-live` regions so changes to the total, read, and unread book counts can be announced by screen readers.

## Features

- Add books to the library
- Mark books as Read or Unread
- Edit book titles directly in the page
- Delete books
- Search books instantly by title
- Filter books by All, Read, or Unread
- Display live library statistics
- Dynamically create and update book elements
- Use event delegation for book interactions

## Concepts Learnt

- DOM selection and traversal
- Dynamic DOM creation
- Form events
- Input events
- Event delegation
- Event handling
- `contentEditable`
- Keyboard events
- Blur and focus events
- Live searching
- Filtering DOM collections
- Updating multiple UI elements
- Reusing helper functions
- Separating application logic from event-listener setup
- Initializing an application with `DOMContentLoaded`

## Conclusion

This project demonstrates how a small frontend application can be built from simple, reusable functions.

The main goal is not just to build a Library Manager, but to understand patterns that can be reused in other interactive web applications.
