---
title: Versionare la documentazione
sidebar_position: 4
description: Come congelare una release della documentazione e mantenere più versioni.
---

# Versionare la documentazione

Il versionamento serve quando documenti un prodotto che ha rilasci: chi usa la
versione 1.0 deve continuare a leggere le istruzioni della 1.0 anche mentre tu
scrivi quelle della 2.0.

## Situazione attuale

Il progetto parte con **una sola versione**, etichettata `1.0`, che corrisponde
alla cartella `docs/`. Il menu a tendina delle versioni è già presente nella
barra in alto.

Finché c'è una versione sola vale la regola comoda: **scrivi in `docs/`, vedi il
risultato**. Nessuna copia, nessuna cartella in più.

## Congelare una release

Quando la 1.0 è chiusa e vuoi iniziare a scrivere la 2.0:

```bash
docker compose run --rm dev npm run docusaurus docs:version 1.0
```

Il comando copia lo stato attuale di `docs/` dentro `versioned_docs/version-1.0/`
e crea `versions.json`. Da quel momento:

- `docs/` diventa la versione **in lavorazione** (quella che stai scrivendo);
- `versioned_docs/version-1.0/` è la **fotografia** della 1.0, che resta ferma.

Subito dopo, in `docusaurus.config.js`, aggiorna il blocco `versions` della
sezione `docs`:

```js
lastVersion: '1.0',
versions: {
  current: {
    label: '2.0 (in lavorazione)',
    path: 'next',
  },
},
```

Così `/docs/...` mostra la 1.0 stabile e `/docs/next/...` la versione in corso.

## Correggere una versione già congelata

Un errore nella 1.0 si corregge modificando direttamente il file dentro
`versioned_docs/version-1.0/`. Non è una cartella generata da rigenerare: è
contenuto a tutti gli effetti, va nel repository e si modifica come il resto.

## Se il versionamento non ti serve

È il caso della maggior parte dei progetti interni: documenti una cosa sola,
sempre nel suo stato attuale. Per togliere il meccanismo:

1. cancella `versioned_docs/`, `versioned_sidebars/` e `versions.json`, se
   esistono;
2. rimuovi la voce `docsVersionDropdown` dalla `navbar` in
   `docusaurus.config.js`;
3. rimuovi il blocco `versions` dalla sezione `docs`.

:::note Il costo nascosto delle versioni
Ogni versione congelata è una copia completa della documentazione. Con tre
versioni attive, una correzione di sostanza va valutata (e spesso riportata) tre
volte. Attiva il versionamento quando qualcuno userebbe davvero la versione
vecchia, non per abitudine.
:::
