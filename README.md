# Dokumentacja Projektu – SmartWaste

## 0. Opis systemu i dlaczego aplikacja jest sieciowa

**Nazwa systemu:** SmartWaste  
**Cel:** Aplikacja webowa umożliwiająca użytkownikom zarządzanie informacjami o pojemnikach na odpady oraz zgłoszeniach problemów.

Wszyscy zalogowani użytkownicy mają **identyczne uprawnienia** i mogą wykonywać operacje dostępne w systemie.

### Dlaczego aplikacja jest sieciowa?

1. **Centralna baza danych (MySQL)**  
   Wszystkie dane przechowywane są w jednej bazie MySQL dostępnej przez sieć.  
   Frontend i backend muszą komunikować się z serwerem bazodanowym – wymaga to architektury klient–serwer.

2. **Backend jako API + frontend w przeglądarce**  
   - Backend (Node.js/TypeScript) udostępnia REST API.  
   - Frontend (Angular) działa w przeglądarce.  
   - Komunikacja odbywa się przez HTTP(S), dlatego aplikacja wymaga połączenia sieciowego.

3. **Łatwe wdrażanie i aktualizacje**  
   Użytkownik uruchamia aplikację w przeglądarce, zawsze widząc najnowszą wersję.

---

## a) Modele procesu i cykl życia

### Omawiane modele:

- **Waterfall (kaskadowy)**  
  Liniowy, mało elastyczny — nieidealny dla projektów uczelnianych.

- **V-Model**  
  Rozszerzenie Waterfall, z przypisaniem testów do etapów projektowych.

- **Iteracyjny / przyrostowy**  
  Projekt rozwijany krokami, każdy fragment dostarczany osobno.

- **Zwinne (Scrum/Kanban)**  
  Krótkie iteracje, backlog, szybkie wprowadzanie zmian.

- **Prototypowanie**  
  Szybkie wersje UI pozwalające zweryfikować pomysły.

### Wybrany proces dla SmartWaste

Wybrano **model iteracyjno–przyrostowy z elementami Scrum**, ponieważ:

- pozwala na rozwijanie aplikacji etapami,
- umożliwia szybkie testowanie każdego przyrostu,
- dobrze sprawdza się w małych projektach.

### Plan iteracji:

1. **Iteracja 1** — logowanie, podstawowy layout  
2. **Iteracja 2** — moduł pojemników (CRUD)  
3. **Iteracja 3** — moduł zgłoszeń  
4. **Iteracja 4** — poprawki, ewentualne statystyki  

---

## RTM – Macierz Śledzenia Wymagań

| ID | Wymaganie | Przypadek użycia | Komponenty | Testy |
|----|-----------|------------------|------------|--------|
| R1 | Logowanie użytkownika | UC1 | AuthController | Unit, System |
| R2 | Zarządzanie pojemnikami (CRUD) | UC2 | ContainerController, MySQL | Unit, Integracja, System |
| R3 | Dodawanie zgłoszeń | UC3 | IssueController, MySQL | Unit, System |
| R4 | Przeglądanie zgłoszeń | UC4 | IssueController | System |

---

## b) Modelowanie i UML

### Aktorzy:

- **Użytkownik** — jedyny aktor; po zalogowaniu może korzystać z wszystkich funkcji.

### Przypadki użycia (Use Cases):

- **UC1 – Logowanie do systemu**  
- **UC2 – Zarządzanie pojemnikami (CRUD)**  
- **UC3 – Dodawanie zgłoszeń**  
- **UC4 – Przeglądanie zgłoszeń**

### Diagram klas (tekstowo):

**User**  
- id  
- email  
- passwordHash  

**Container**  
- id  
- location  
- type  
- capacity  

**Issue**  
- id  
- title  
- description  
- status  
- createdAt  
- containerId  
- userId  

**Relacje:**  
- User 1..* Issue  
- Container 1..* Issue  

### Diagram sekwencji — dodawanie zgłoszenia

1. Użytkownik wysyła formularz w Angularze  
2. Frontend → Backend: `POST /issues`  
3. Backend → MySQL: `INSERT`  
4. MySQL → Backend: potwierdzenie  
5. Backend → Frontend: odpowiedź (`201 Created`)  
6. Angular odświeża listę zgłoszeń  

### Diagram stanów — Issue

- **Nowe**  
- **W trakcie**  
- **Zamknięte**  
- **Odrzucone** (opcjonalnie)

---

## c) Architektura i wzorce projektowe

### Architektura warstwowa:

- **Frontend (Angular)** – prezentacja, obsługa UI  
- **Backend (Node.js/TS)** – logika biznesowa, API  
- **MySQL** – trwałe przechowywanie danych  

### Wzorce:

- **MVC (backend w układzie Controller + Model)**  
- **Repository pattern** – operacje na bazie  
- **DTO** – wymiana danych frontend ↔ backend  

---

## d) Testowanie systemu

### Testy jednostkowe
- logika backendu  
- operacje CRUD  
- walidacje

### Testy integracyjne
- backend ↔ MySQL  
- sprawdzenie poprawności zapisu i odczytu danych

### Testy systemowe
- pełny przepływ danych od Angulara do bazy i z powrotem

### Testy akceptacyjne
- zgodność z przypadkami użycia UC1–UC4

### Zapewnienie jakości:
- komentarze commitów  
- lintowanie kodu (ESLint)  
- Prettier (formatowanie kodu)  

---

## e) Konfiguracja, SCM (Git) i wydania

### System kontroli wersji: Git

Repozytorium znajduje się pod adresem:  
`https://github.com/pawelzab3/SmartWaste`

### Model pracy z repozytorium:

- Repo posiada **jedną gałąź**:

- Cała praca odbywa się poprzez kolejne commity do `main`.
- Każdy commit zawiera **czytelny opis zmian**, np.:
- „Dodano widok zgłoszeń”
- „Poprawiono błąd w formularzu pojemników”
- „Implementacja logowania”

### Konfiguracja projektu (.env lokalnie)

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

### Build:

- **Frontend (Angular):**

- ***ng serve -o***

- **Backend:**

- ***npm run build***


### CI/CD:
Obecnie brak rozbudowanego CI/CD, ale repozytorium można łatwo rozszerzyć o:

- automatyczne budowanie projektu,
- uruchamianie testów,
- deployment.

---

## Podsumowanie

Dokumentacja opisuje pełny proces powstawania systemu SmartWaste wraz z:

- cyklem życia projektu,
- modelowaniem UML,
- architekturą,
- testowaniem,
- zarządzaniem wersjami w Git,
- oraz wyjaśnieniem, dlaczego system jest aplikacją sieciową.

SmartWaste to prosta aplikacja webowa, w której wszyscy użytkownicy po zalogowaniu mają takie same uprawnienia, a dane przechowywane są w centralnej bazie MySQL.