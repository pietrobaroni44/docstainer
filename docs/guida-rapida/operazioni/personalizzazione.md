---
title: Personalizzare il template
sidebar_position: 1
description: La lista di cose da cambiare quando riusi Docstainer per un nuovo progetto.
---

# Personalizzare il template

Hai copiato la cartella e vuoi farla diventare la documentazione di un altro
progetto. Sono cinque minuti.

## 1. I dati del progetto

Apri `docusaurus.config.js`. In cima c'è un unico oggetto `progetto`: è l'unica
parte che devi toccare nella maggior parte dei casi.

```js
const progetto = {
  titolo: 'Documentazione SOC',
  slogan: 'Procedure operative e runbook del centro operativo.',
  descrizione: 'Riferimento interno per gli analisti di primo e secondo livello.',

  url: 'https://esempio.invalid',
  baseUrl: '/',

  organizzazione: 'tuo-utente-github',
  repository: 'nome-del-repository',
  ramo: 'main',

  copyright: 'Il tuo nome / la tua organizzazione',
};
```

| Campo | Nota |
| --- | --- |
| `url` | Dominio pubblico, senza slash finale. Se non pubblichi, lascialo com'è |
| `baseUrl` | `/` per un dominio dedicato, `/nome-repo/` per GitHub Pages di progetto |
| `organizzazione`, `repository` | Usati dal link GitHub e dai link "Modifica questa pagina" |
| `ramo` | Metti `null` per togliere i link "Modifica questa pagina" |

## 2. Il nome del pacchetto

In `package.json`, cambia `"name"` con il nome del nuovo progetto. Non ha
effetti sul sito, ma evita confusione fra cartelle.

## 3. Contenuti

I tuoi documenti vanno direttamente in `docs/`, accanto alla cartella
`guida-rapida/`. Quest'ultima contiene la documentazione del template stesso ed
è pensata per essere cancellata in blocco quando non ti serve più:

```bash
rm -rf docs/guida-rapida
```

Occhio a una cosa: la pagina `docs/guida-rapida/intro.md` ha `slug: /` nel
frontmatter, ed è quella che risponde all'indirizzo `/docs`. Se cancelli la
cartella, sposta quel `slug: /` nel frontmatter di una tua pagina, altrimenti
`/docs` non porta da nessuna parte e la build fallisce per via di
`onBrokenLinks: 'throw'`.

Le pagine di `docs/guida-rapida/sintassi/` puoi conservarle a parte: fanno da
promemoria di sintassi per chi scriverà dopo di te.

## 4. Aspetto

`src/css/custom.css` contiene i colori del tema, chiaro e scuro, in un blocco
di variabili commentato. Cambia il colore primario e hai già un sito che non
somiglia agli altri.

Logo e favicon stanno in `static/img/`: sostituisci `logo.svg` e `favicon.ico`
mantenendo gli stessi nomi e non devi toccare la configurazione.

## 5. Homepage

`src/pages/index.js` è l'unico file React del progetto. Contiene la copertina e
i tre riquadri sotto. Il testo è in cima al file, in un array: modifica quello.

Se una homepage non ti serve, cancella `src/pages/index.js` e
`src/pages/index.module.css`: `/` mostrera direttamente la documentazione.

## Lingua dell'interfaccia

Il sito è in italiano perché' `i18n.defaultLocale` vale `it` in
`docusaurus.config.js`: Docusaurus usa le sue traduzioni ufficiali per menu,
navigazione, blog e ammonizioni.

Il file `i18n/it/code.json` contiene solo le eccezioni, cioè' le stringhe del
plugin di ricerca, che non ha una traduzione italiana propria. Se una stringa
dell'interfaccia ti compare in inglese, è li che va aggiunta: trovi la chiave
esatta con

```bash
docker compose run --rm dev npm run write-translations -- --locale it
```

che scrive in `i18n/it/` tutte le stringhe traducibili. Attenzione: il comando
scrive anche quelle già' tradotte dal pacchetto ufficiale, quindi conviene
tenere in `code.json` solo le voci che ti servono davvero e cancellare il resto.

## Cosa togliere se non ti serve

| Non ti serve | Cosa fare |
| --- | --- |
| Il blog | Cancella `blog/`, metti `blog: false` nel preset e togli la voce "Novità" da `navbar` e `footer` |
| Le formule | Togli `remarkMath` / `rehypeKatex` dal preset e la riga `@import` di KaTeX in `src/css/custom.css` |
| I diagrammi | Togli `@docusaurus/theme-mermaid` da `themes` e `mermaid: true` da `markdown` |
| Il versionamento | Vedi [Versionare la documentazione](../versioni.md) |
| Docker | Cancella `docker/`, `docker-compose.yml` e `.dockerignore` |

Dopo ogni rimozione conviene lanciare una build: se hai lasciato un
riferimento pendente, te lo dice subito.

```bash
docker compose run --rm dev npm run build
```
