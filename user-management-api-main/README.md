# User Management API

## Context
[Course: Testiranje programskih rješenja](https://www.efos.unios.hr/kolegiji/testiranje-programskih-rjesenja/)

This is a simple REST API for user management designed to help students understand unit and API testing. Made for the University graduate study - Business Informatics, course Testing software solutions (Testiranje programskih rješenja)

## Opis
Ovo je jednostavan REST API za upravljanje korisnicima. Omogućuje dodavanje, dohvaćanje i validaciju korisnika. Koristi Node.js i Express, a testiranje je implementirano pomoću Jest i Supertest.

## Tehnologije
- Node.js
- Express
- Jest (unit testiranje)
- Supertest (API testiranje)

## Instalacija

Instalirajte potrebne pakete (trebate biti u rootu projekta):
   ```sh
   npm install
   ```

## Pokretanje servera

Pokrenite backend server s naredbom:
```sh
node backend/app.js
```
Server će biti dostupan na `http://localhost:3000`.

## Pokretanje testova

Pokrenite sve testove s naredbom:
```sh
npx jest
```
Pokrenite unit testove s naredbom:
```sh
npx jest tests/unit.test.js
```
Pokrenite api testove s naredbom:
```sh
npx jest tests/api.test.js
```

## API Endpointi

### 1. Dodavanje korisnika
- **POST /users**
- **Opis:** Dodaje novog korisnika s validacijom.
- **Body parametri:**
  ```json
  {
    "firstName": "Ivan",
    "lastName": "Horvat",
    "username": "ivan123",
    "email": "ivan@example.com",
    "password": "Pass@1234"
  }
  ```
- **Odgovor (uspješan):**
  ```json
  {
    "id": 1,
    "firstName": "Ivan",
    "lastName": "Horvat",
    "username": "ivan123",
    "email": "ivan@example.com"
  }
  ```
- **Odgovor (greška - neispravan unos):**
  ```json
  {
    "error": "First name and last name must be between 3 and 50 characters."
  }
  ```

### 2. Dohvaćanje svih korisnika
- **GET /users**
- **Opis:** Vraća popis svih korisnika.
- **Odgovor (ako postoje korisnici):**
  ```json
  [
    {
      "id": 1,
      "firstName": "Ivan",
      "lastName": "Horvat",
      "username": "ivan123",
      "email": "ivan@example.com"
    }
  ]
  ```
- **Odgovor (ako nema korisnika):**
  ```json
  {
    "message": "No users available"
  }
  ```

### 3. Dohvaćanje korisnika po ID-u
- **GET /users/:id**
- **Opis:** Vraća podatke o korisniku s određenim ID-jem.
- **Odgovor (ako korisnik postoji):**
  ```json
  {
    "id": 1,
    "firstName": "Ivan",
    "lastName": "Horvat",
    "username": "ivan123",
    "email": "ivan@example.com"
  }
  ```
- **Odgovor (ako korisnik ne postoji):**
  ```json
  {
    "error": "User not found"
  }
  ```

### 4. Brisanje korisnika
- **DELETE /users/:id**
- **Opis:** Briše korisnika s određenim ID-jem.
- **Odgovor (uspješno brisanje):**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```
- **Odgovor (ako korisnik ne postoji):**
  ```json
  {
    "error": "User not found"
  }
  ```

 ## Autor
EFOS - Testiranje programskih riješenja - 2025. 