---
title: Diagrammi
sidebar_position: 3
description: Diagrammi Mermaid scritti come testo dentro le pagine Markdown.
---

# Diagrammi

I diagrammi si scrivono come testo dentro un blocco `mermaid`. Vengono
disegnati dal browser: nel repository resta solo il codice, che si legge nei
diff e si corregge in un secondo.

## Flusso

````markdown
```mermaid
flowchart LR
  A[Richiesta] --> B{Autenticata?}
  B -- sì --> C[Servizio]
  B -- no --> D[Rifiuto 401]
  C --> E[(Registro eventi)]
```
````

```mermaid
flowchart LR
  A[Richiesta] --> B{Autenticata?}
  B -- sì --> C[Servizio]
  B -- no --> D[Rifiuto 401]
  C --> E[(Registro eventi)]
```

## Sequenza

```mermaid
sequenceDiagram
  autonumber
  participant U as Utente
  participant P as Portale
  participant I as Identity provider
  U->>P: Apre la pagina protetta
  P->>I: Reindirizza per autenticazione
  I-->>P: Token firmato
  P-->>U: Sessione attiva
```

## Stati

```mermaid
stateDiagram-v2
  [*] --> Bozza
  Bozza --> InRevisione: invio
  InRevisione --> Bozza: modifiche richieste
  InRevisione --> Pubblicato: approvazione
  Pubblicato --> [*]
```

## Gantt

```mermaid
gantt
  title Rilascio della documentazione
  dateFormat YYYY-MM-DD
  section Stesura
  Bozza dei contenuti   :a1, 2026-01-07, 12d
  Revisione interna     :after a1, 6d
  section Pubblicazione
  Build e verifica      :2026-02-01, 3d
```

## Consigli

- **Un diagramma, un'idea.** Se devi aggiungere una legenda per farlo capire,
  sono due diagrammi.
- **Etichette brevi.** Mermaid non manda a capo da solo: nodi con frasi lunghe
  producono riquadri enormi.
- **I colori li mette il tema.** Il progetto è configurato per usare la
  variante chiara o scura in automatico; evita di forzare colori a mano, si
  rompono nel tema opposto.
- **Provalo prima** su <https://mermaid.live> se la sintassi non ti torna: è
  più rapido che ricaricare il sito.

:::note Cosa succede fuori da qui
Un lettore Markdown che non conosce Mermaid mostra il blocco come codice: il
contenuto resta leggibile, semplicemente non disegnato. GitHub, invece, i
diagrammi Mermaid li disegna nativamente.
:::
