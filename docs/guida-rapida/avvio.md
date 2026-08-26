---
title: Avvio
sidebar_position: 1
description: Far partire il sito. Serve Docker, e non serve nient'altro.
---

# Avvio

Questo progetto gira **esclusivamente in container**. Sulla tua macchina non
viene installato nessun toolchain: né Node, né npm, né dipendenze. Tutto vive
dentro l'immagine.

## Requisito unico

Docker con Compose v2. Per verificare:

```bash
docker compose version
```

Se il comando risponde con un numero di versione sei a posto. Se non risponde,
installa [Docker](https://docs.docker.com/get-started/get-docker/): su Windows e
macOS è Docker Desktop, su Linux il pacchetto `docker-compose-plugin` accanto al
motore.

## Far partire il sito

```bash
docker compose up dev
```

Il sito è su <http://localhost:3000>. Modifichi un file `.md` con il tuo editor
e la pagina si ricarica da sola: la cartella del progetto è montata dentro il
container.

La prima esecuzione richiede qualche minuto, il tempo di costruire l'immagine e
installare le dipendenze al suo interno. Dalla seconda in poi parte in pochi
secondi.

Per fermare: `Ctrl+C`, oppure da un altro terminale:

```bash
docker compose down
```

## Comandi che userai davvero

| Comando | Cosa fa |
| --- | --- |
| `docker compose up dev` | Server di sviluppo con ricarica automatica |
| `docker compose run --rm dev npm run build` | Genera il sito statico dentro `build/` |
| `docker compose --profile prod up site --build` | Serve il sito costruito con nginx su :8080 |
| `docker compose run --rm dev npm run clear` | Svuota la cache di Docusaurus |
| `docker compose run --rm dev sh` | Apre una shell dentro il container |

:::info Perché compaiono comandi `npm`
Perché vengono eseguiti **dentro** il container, non sulla tua macchina.
`docker compose run --rm dev <comando>` crea un container usa-e-getta, ci lancia
il comando e lo elimina appena finisce. Sull'host non resta niente.
:::

C'è anche un `Makefile` con le stesse operazioni in versione corta: `make dev`,
`make build`, `make site`, `make shell`, `make clean`. Avvolge esattamente i
comandi qui sopra, non aggiunge requisiti.

## Quando qualcosa non va

:::warning La build fallisce con "Docs markdown link couldn't be resolved"
Un link interno punta a un file che non esiste. Il progetto è configurato con
`onBrokenLinks: 'throw'` apposta: meglio accorgersene ora che in produzione.
Correggi il percorso oppure abbassa l'impostazione a `'warn'` in
`docusaurus.config.js`.
:::

:::warning Modifico un file e non cambia niente
Ferma il container, svuota la cache e riavvia:

```bash
docker compose run --rm dev npm run clear && docker compose up dev
```

Succede quando cambi la configurazione o sposti file mentre il server è in
esecuzione.
:::

:::warning La ricarica automatica non parte
Su alcuni sistemi il container non riceve gli eventi del filesystem dell'host.
Il servizio `dev` avvia già il server con `--poll 1000`, che controlla i file a
intervalli regolari invece di aspettare gli eventi. Se il progetto è grande e la
CPU sale troppo, alza quel valore in `docker-compose.yml`.
:::

:::warning Ho aggiunto una dipendenza e il container non la trova
Le dipendenze stanno in un livello dell'immagine, non nella cartella montata.
Installa il pacchetto passando dal container, così `package-lock.json` resta
allineato:

```bash
docker compose run --rm dev npm install nome-del-pacchetto
```

Poi ricostruisci l'immagine una volta sola:

```bash
docker compose up dev --build
```
:::
