---
title: Markdown di base
sidebar_position: 1
description: Testo, elenchi, link, tabelle e blocchi di codice.
---

# Markdown di base

Questa pagina è insieme un promemoria e una prova: quello che vedi renderizzato
qui sotto è esattamente quello che ottieni scrivendo il codice mostrato.

## Testo

```markdown
Testo normale, **grassetto**, *corsivo*, `codice inline`, ~~barrato~~.

> Una citazione, utile per riportare un estratto di norma o di verbale.
```

Testo normale, **grassetto**, *corsivo*, `codice inline`, ~~barrato~~.

> Una citazione, utile per riportare un estratto di norma o di verbale.

## Elenchi

```markdown
- primo punto
- secondo punto
  - sottopunto (due spazi di rientro)

1. primo passo
2. secondo passo

- [ ] attività da fare
- [x] attività completata
```

- primo punto
- secondo punto
  - sottopunto (due spazi di rientro)

1. primo passo
2. secondo passo

- [ ] attività da fare
- [x] attività completata

## Link

```markdown
[Un altro documento](../guida/installazione.md)
[Un sito esterno](https://docusaurus.io)
<https://esempio.org>
```

Per i documenti interni usa sempre il **percorso relativo al file**, con
l'estensione `.md`: il link resta valido anche fuori dal sito.

## Tabelle

```markdown
| Servizio | Porta | Note |
| --- | ---: | :---: |
| HTTPS | 443 | obbligatorio |
| SSH | 22 | solo da rete interna |
```

| Servizio | Porta | Note |
| --- | ---: | :---: |
| HTTPS | 443 | obbligatorio |
| SSH | 22 | solo da rete interna |

I due punti nella riga dei trattini allineano la colonna: `---:` a destra,
`:---:` al centro.

## Codice

Tre backtick, con il nome del linguaggio subito dopo:

````markdown
```bash
nmap -sV -p 1-1024 192.0.2.10
```
````

```bash
nmap -sV -p 1-1024 192.0.2.10
```

### Titolo e righe evidenziate

````markdown
```yaml title="docker-compose.yml" {2-3}
services:
  dev:
    ports: ['3000:3000']
```
````

```yaml title="docker-compose.yml" {2-3}
services:
  dev:
    ports: ['3000:3000']
```

:::note Portabilità
`title=` e le righe evidenziate `{2-3}` sono estensioni di Docusaurus. Altri
lettori Markdown le mostrano come testo accanto al nome del linguaggio: il
blocco resta leggibile, non si rompe niente.
:::

## Separatore e note a piè di pagina

```markdown
---

Il riferimento normativo è nell'allegato[^1].

[^1]: Direttiva (UE) 2022/2555, articolo 21.
```

---

Il riferimento normativo è nell'allegato[^1].

[^1]: Direttiva (UE) 2022/2555, articolo 21.
