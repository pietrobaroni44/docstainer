---
title: Scrivere una pagina
sidebar_position: 2
description: Frontmatter, titoli e la struttura minima di un documento.
---

# Scrivere una pagina

Una pagina è un file `.md` dentro `docs/`. Nient'altro.

## Struttura minima

```markdown
---
title: Configurazione del firewall
sidebar_position: 3
description: Regole di base e verifica.
---

# Configurazione del firewall

Testo introduttivo di una o due righe.

## Prerequisiti

- accesso amministrativo
- indirizzo di gestione raggiungibile
```

La parte tra i due `---` si chiama **frontmatter** ed è YAML. Serve a
Docusaurus, ma tutti gli altri strumenti Markdown la ignorano o la mostrano
come metadato: per questo il file resta portabile.

## Campi del frontmatter che contano

| Campo | A cosa serve |
| --- | --- |
| `title` | Titolo della pagina (usato anche nella scheda del browser) |
| `sidebar_position` | Numero che decide l'ordine nel menu laterale |
| `sidebar_label` | Etichetta breve nel menu, se il titolo è lungo |
| `description` | Riassunto per i motori di ricerca e per l'anteprima |
| `slug` | Forza l'URL della pagina, es. `slug: /riferimenti/api` |
| `tags` | Etichette per raggruppare argomenti |
| `draft` | `true` esclude la pagina dalla build di produzione |

Nessuno di questi campi è obbligatorio: un file `.md` con solo del testo
funziona lo stesso, il titolo viene dedotto dal primo `#`.

## Regole di stile che rendono la vita facile

1. **Un solo `#` per pagina.** I titoli successivi partono da `##`. L'indice a
   destra si costruisce da soli.
2. **Nomi di file in minuscolo con i trattini.** `backup-e-ripristino.md`
   diventa l'URL `.../backup-e-ripristino`, prevedibile e citabile.
3. **Link relativi tra documenti.** Scrivi
   `[installazione](avvio.md)`, non l'URL completo: così il link
   funziona sia sul sito sia aprendo il file in un editor.
4. **Immagini in `static/img/`.** Le richiami come `![alt](/img/schema.png)`.

## Aggiungere un'immagine

```markdown
![Schema della rete di laboratorio](/img/schema-rete.png)
```

Il file va messo in `static/img/schema-rete.png`. Tutto cio che sta in
`static/` viene copiato nel sito così com'è, senza trasformazioni.

:::tip Preferisci un diagramma a uno screenshot
Uno screenshot invecchia e non si può correggere. Un
[diagramma Mermaid](sintassi/diagrammi.md) è testo: si legge nel diff, si
corregge in dieci secondi e non pesa nulla nel repository.
:::

## Bozze

Una pagina ancora acerba non deve bloccare la pubblicazione:

```yaml
---
title: Procedura di ripristino
draft: true
---
```

Con `draft: true` la pagina resta visibile nel server di sviluppo
(`docker compose up dev`) ma sparisce dalla build di produzione.
