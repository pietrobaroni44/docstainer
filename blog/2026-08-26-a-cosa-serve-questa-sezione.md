---
title: A cosa serve questa sezione
authors: [redazione]
tags: [metodo]
date: 2026-08-26
---

La documentazione risponde alla domanda "come si fa". Questa sezione risponde a
una domanda diversa: "cosa è cambiato, e quando".

<!-- truncate -->

## La divisione dei compiti

Le pagine sotto **Documentazione** descrivono lo stato attuale delle cose. Vanno
riscritte quando la realtà cambia, e non conservano memoria delle versioni
precedenti: chi le legge vuole sapere come funziona oggi.

Gli articoli qui sotto sono invece datati e non si toccano più. Servono a
rispondere a domande del tipo:

- da quando questa procedura è obbligatoria?
- perché a settembre abbiamo cambiato approccio?
- cosa è stato modificato nell'ultimo rilascio?

## Come si scrive un articolo

Un file `.md` dentro `blog/`, con il nome che inizia dalla data:

```text
blog/2026-03-02-nuova-procedura-di-backup.md
```

Il frontmatter minimo:

```yaml
---
title: Nuova procedura di backup
authors: [redazione]
tags: [rilascio]
date: 2026-03-02
---
```

Il commento `<!-- truncate -->` segna dove finisce l'anteprima mostrata
nell'elenco. Mettilo dopo il primo paragrafo: è l'unica parte che la maggior
parte dei lettori vedrà.

Autori e tag si definiscono una volta sola in `blog/authors.yml` e
`blog/tags.yml`, poi si richiamano per nome.

:::tip Se il blog non ti serve
Cancella la cartella `blog/`, imposta `blog: false` nel preset di
`docusaurus.config.js` e togli la voce "Novità" dalla barra di navigazione. Una
sezione vuota è peggio di una sezione assente.
:::
