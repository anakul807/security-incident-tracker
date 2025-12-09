# Incident Management System - Class Diagram

## Classes

### User

**Attributes:**
- `userID: String`
- `name: String`
- `password: String`
- `role: String`

**Methods:**
- `login()`
- `logout()`
- `comment()`

---

### Analyst

**Inherits from:** User

**Methods:**
- `reportIncident()`
- `assignIncident()`

---

### Incident

**Attributes:**
- `incidentID: String`
- `title: String`
- `description: String`
- `status: String`
- `category: String`
- `severity: String`
- `dateCreated: Date`
- `lastUpdated: Date`
- `reportedBy: User`
- `assignedTo: User`

**Methods:**
- `updateStatus()`
- `assignToUser()`
- `addComment()`

---

## Relationships

1. **Analyst** inherits from **User** (Inheritance relationship)
   - Cardinality: 1:1

2. **Analyst** manages **Incident** (Association relationship)
   - Cardinality: 1 Analyst to N Incidents
   - An Analyst can manage multiple Incidents

---

## Notes

- The User class serves as the base class with common authentication and commenting functionality
- Analyst extends User with incident-specific capabilities
- Incidents track both the reporting user and assigned user
- The system supports multiple incidents per analyst