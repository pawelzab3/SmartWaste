# Dokumentacja Projektu – SmartWaste

## 0. Opis systemu i dlaczego aplikacja jest sieciowa

**SmartWaste** to prosta aplikacja webowa umożliwiająca użytkownikom:

- logowanie do systemu,
- dodawanie zgłoszeń (tylko: *temat* i *opis*),
- przeglądanie wszystkich zgłoszeń zapisanych w bazie.

W systemie **wszyscy użytkownicy mają takie same uprawnienia**.

### Dlaczego aplikacja jest sieciowa?

1. **Centralna baza danych MySQL**  
   Wszystkie zgłoszenia oraz dane użytkowników są przechowywane w jednej bazie danych dostępnej przez sieć, dlatego system działa w architekturze klient–serwer.

2. **Frontend + Backend komunikujące się przez API**  
   - Frontend działa w przeglądarce (Angular).  
   - Backend udostępnia API (Node.js/TS).  
   - Zapytania odbywają się przez HTTP.

3. **Łatwe aktualizacje i dostępność**  
   Użytkownicy nie instalują aplikacji — uruchamiają ją przez przeglądarkę.

---

## a) Modele procesu i cykl życia

### Rozważane modele:

- Waterfall  
- V-Model  
- Iteracyjny / przyrostowy  
- Scrum/Kanban  
- Prototypowanie  

### Wybrany model: iteracyjno–przyrostowy

Podział prac:

1. Iteracja 1 — logowanie + struktura projektu  
2. Iteracja 2 — moduł zgłoszeń (formularz + zapis do bazy)  
3. Iteracja 3 — lista zgłoszeń  
4. Iteracja 4 — poprawki, UI, testy  

---

## RTM – Macierz Śledzenia Wymagań

| ID | Wymaganie | Przypadek użycia | Komponenty | Testy |
|----|-----------|------------------|------------|--------|
| R1 | Logowanie użytkownika | UC1 | AuthController | Unit, System |
| R2 | Dodawanie zgłoszenia (temat + opis) | UC2 | IssueController, MySQL | Unit, Integracja, System |
| R3 | Przeglądanie zgłoszeń | UC3 | IssueController | System |

---

## b) Modelowanie i UML

### Aktor:

- **Użytkownik** — jedyny aktor w systemie, posiada pełny dostęp.

### Przypadki użycia:

- **UC1 – Logowanie**  
- **UC2 – Dodawanie zgłoszenia (tylko temat + opis)**  
- **UC3 – Przeglądanie listy zgłoszeń**

### Diagram klas (tekstowo)

**User**  
- id  
- email  
- passwordHash  

**Issue**  
- id  
- title (temat)  
- description (opis)  
- createdAt  
- userId  

Relacja: User 1..* Issue  

### Diagram sekwencji — dodanie zgłoszenia

1. Użytkownik wypełnia formularz (temat + opis).  
2. Frontend → Backend: POST /issues  
3. Backend → MySQL: INSERT  
4. MySQL → Backend: OK  
5. Backend → Frontend: 201  
6. Frontend odświeża listę zgłoszeń  

### Diagram stanów — Issue

- **Nowe**  
- **Zamknięte** (opcjonalnie)  

---

## c) Architektura i wzorce projektowe

### Architektura warstwowa

- **Frontend (Angular)** – interfejs użytkownika  
- **Backend (Node.js/TS)** – logika + API  
- **MySQL** – przechowywanie użytkowników i zgłoszeń  

### Wzorce:

- MVC (backend: Controller + Model)  
- Repository pattern  
- DTO  

---

## d) Testowanie

### Testy jednostkowe
- walidacja zgłoszeń  
- logika logowania  

### Testy integracyjne
- zapis zgłoszeń do MySQL  
- odczyt zgłoszeń  

### Testy systemowe
- logowanie → dodanie zgłoszenia → pojawienie się na liście  

### Testy akceptacyjne
- UC1–UC3

### Zapewnienie jakości
- opisy commitów  
- ESLint + Prettier  

---

## e) Konfiguracja, SCM (Git) i wydania

### Model pracy z Git

Repozytorium:  
`https://github.com/pawelzab3/SmartWaste`

- Repozytorium posiada **jedną gałąź**:
  ***main***

- Praca odbywa się poprzez commity z opisami zmian, np.:  
- „Dodano formularz zgłoszeń”  
- „Zaimplementowano logowanie”  

### Konfiguracja (.env – lokalnie)

    ***DB_HOST=***
    ***DB_USER=***
    ***DB_PASSWORD=***
    ***DB_NAME=***

### Build:

- **Frontend (Angular):**
  ***ng serve -o***

- **Backend:**
  ***npm run start***

### CI/CD
Brak rozbudowanego CI/CD — możliwe do dodania później.

---

## Podsumowanie

SmartWaste to prosta aplikacja webowa pozwalająca użytkownikom:

- zalogować się,
- dodać zgłoszenie (temat + opis),
- przeglądać listę zgłoszeń.

System opiera się na architekturze klient–serwer i centralnej bazie MySQL.  
Dokumentacja opisuje pełny proces projektowy, UML, testowanie, architekturę oraz pracę z Git.