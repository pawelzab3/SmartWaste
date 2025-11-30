# Dokumentacja Projektu – SmartWaste

## 0. Opis systemu i dlaczego aplikacja jest sieciowa

**Nazwa systemu:** SmartWaste  
**Cel:** System webowy wspierający zarządzanie gospodarką odpadami.

**Dlaczego aplikacja jest sieciowa:**

1. Dane są przechowywane w centralnej **bazie MySQL**.
2. Architektura klient–serwer: frontend → backend → MySQL.
3. Skalowalność – aktualizacje po stronie serwera bez instalacji u użytkowników.

---

## a) Modele procesu i cykl życia

### Rozważane modele:
- **Waterfall**
- **V-Model**
- **Iteracyjny/przyrostowy**
- **Scrum/Kanban**
- **Prototypowanie**

### Wybrany model:
**Iteracyjno–przyrostowy z elementami Scruma.**

### RTM – Requirement Traceability Matrix

| ID | Wymaganie | UC | Komponenty | Testy |
|----|-----------|----|------------|-------|
| R1 | Logowanie użytkownika | UC1 | AuthController, UserService | Unit, System |
| R2 | Zarządzanie pojemnikami | UC2 | ContainerController | Unit, Integracja |
| R3 | Obsługa zgłoszeń | UC3 | IssueController | Unit, System |

---

## b) UML i modelowanie

### Aktorzy:
- Administrator  
- Operator  
- Użytkownik

### Przypadki użycia:
- UC1: Logowanie  
- UC2: Zarządzanie pojemnikami  
- UC3: Zgłaszanie problemu  
- UC4: Obsługa zgłoszeń  
- UC5: Raporty

### Diagram klas (opisowy):
- **User**(id, email, passwordHash, role)  
- **Container**(id, location, type, capacity)  
- **Issue**(id, description, status, createdAt, containerId, userId)

Relacje:
- User 1..* Issue  
- Container 1..* Issue  

### Diagram sekwencji – tworzenie zgłoszenia:
1. Frontend → Backend: POST /issues  
2. Backend → DB: INSERT  
3. DB → Backend: OK  
4. Backend → Frontend: 201  

### Diagram stanów (Issue):
Nowe → W trakcie → Zamknięte  
lub Nowe → Odrzucone

---

## c) Architektura i wzorce

### Architektura:
- Frontend (TS/HTML/CSS)
- Backend (Node.js/TS)
- MySQL

### Wzorce projektowe:
- MVC  
- Repository  
- DTO  

---

## d) Testowanie

### Poziomy testów:
- **Unit** – logika serwisów  
- **Integracyjne** – backend ↔ MySQL  
- **Systemowe** – pełny przepływ  
- **Akceptacyjne** – zgodność z wymaganiami

### QA:
- Linting (ESLint)
- Code review
- Testy w CI

---

## e) Git, konfiguracja i wydania

### SCM:
- GitHub repo: `pawelzab3/SmartWaste`
- Gałęzie: main + feature branches

### Konfiguracja:
- `.env`: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

### Build:
- Frontend: `npm run build`
- Backend: `npm run build`

### CI/CD:
- GitHub Actions: instalacja, lint, testy, build  
