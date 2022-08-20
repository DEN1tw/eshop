# Eshop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Linting

Run `npm run lint` to lint the source files or `npm run lint:fix` to fix linting errors.

## Dependencies

Should be provided API from https://github.com/recruit-case/Frontend-Starter.

## Core component library

As a components library used Taiga UI https://taiga-ui.dev/

## NOT implemented
- Admin functionality (like `As an administrator, I should be able to add, edit and remove products`)
- Responsive design
- Test
- JSDoc/TSDoc
- Caching
- Saving state in storages (localStorage/sessionStorage)
- Error handling

## Implementation restrictions
- CartService can save products with quantities equal to 0
- Not possible to add new products to the cart
- HomeComponent's query$ can be much improved (as an instance of a separate class)

## Problems with API server
- [Described in ApiService's getUsers() method](src/app/core/services/api.service.ts)