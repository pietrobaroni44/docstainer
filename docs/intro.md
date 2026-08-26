---
id: intro
title: Introduzione
sidebar_label: Introduzione
sidebar_position: 1
slug: /
description: Cos'è Docstainer, cosa contiene e come riusarlo come stampino.
---

# Docstainer

**Docstainer** è uno stampino (template) di documentazione pronto da copiare.
L'idea è semplice: quando ti serve documentare un progetto, duplichi questa
cartella, cambi quattro valori nella configurazione e inizi a scrivere Markdown.

Tutto il resto (ricerca, indice, tema chiaro/scuro, diagrammi, formule,
build statica, container) è già montato e funzionante.

Il progetto gira **esclusivamente in container**: sulla macchina serve Docker e
nient'altro. Non c'è niente da installare, niente versione di Node da allineare,
e quando smetti di usarlo non resta nulla sparso in giro.

## Cosa c'è dentro

| Elemento | Scelta fatta | Perché |
| --- | --- | --- |
| Generatore | [Docusaurus 3](https://docusaurus.io) | Genera un sito statico, si configura in un file solo |
| Contenuti | file `.md` in Markdown standard | Restano leggibili e riutilizzabili fuori da qui |
| Ricerca | indice locale, nessun servizio esterno | Funziona anche offline e in rete chiusa |
| Diagrammi | [Mermaid](https://mermaid.js.org) | Diagrammi versionabili come testo, non immagini |
| Formule | [KaTeX](https://katex.org) | Notazione matematica in `$...$` |
| Esecuzione | solo Docker | Nessun toolchain da installare sulla macchina |
| Lingua | italiano | Interfaccia e contenuti già in italiano |

## Da dove iniziare

1. [Avvio](guida/installazione.md) - far partire il sito con un comando solo.
2. [Scrivere una pagina](guida/scrivere-una-pagina.md) - la struttura minima di un documento.
3. [Organizzare le sezioni](guida/organizzare-le-sezioni.md) - cartelle, ordine e menu laterale.
4. [Personalizzare lo stampino](operazioni/personalizzazione.md) - cosa cambiare al primo riuso.

:::tip Regola pratica
Se una modifica ti costringe a toccare più di un file di configurazione,
probabilmente c'è un modo più semplice di ottenerla. Questo progetto è pensato
per restare noioso e prevedibile.
:::

## Struttura delle cartelle

```text
docstainer/
├── docs/                  <- la documentazione (è qui che scrivi)
│   ├── intro.md
│   ├── guida/
│   ├── sintassi/
│   └── operazioni/
├── blog/                  <- note di rilascio e aggiornamenti
├── src/
│   ├── css/custom.css     <- colori e stile del sito
│   └── pages/index.js     <- homepage
├── static/                <- immagini e file serviti così come sono
├── docker/                <- Dockerfile e configurazione nginx
├── i18n/it/code.json      <- traduzioni delle poche stringhe non già' italiane
├── docusaurus.config.js   <- unico file da toccare per personalizzare
└── sidebars.js            <- menu laterale (generato dalle cartelle)
```

## Il patto sulla portabilità

I file dentro `docs/` sono Markdown standard, non MDX. Questo significa che
puoi copiarli in un repository, in Obsidian, in un wiki o convertirli con
`pandoc` senza che nulla si rompa: niente componenti React incorporati, niente
`import`, niente sintassi che esiste solo qui dentro.

Le uniche estensioni che usiamo sono comprese o ignorate senza danni dagli
altri strumenti: il frontmatter YAML in cima al file, le
[ammonizioni](sintassi/ammonizioni.md) `:::nota`, i blocchi
[Mermaid](sintassi/diagrammi.md) e le [formule](sintassi/formule.md) in `$...$`.
