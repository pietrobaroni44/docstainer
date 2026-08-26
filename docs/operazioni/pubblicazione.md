---
title: Pubblicazione
sidebar_position: 3
description: Generare il sito statico e metterlo online (o tenerlo offline).
---

# Pubblicazione

## Il risultato della build

```bash
docker compose run --rm dev npm run build
```

Il comando gira dentro un container usa-e-getta e produce la cartella `build/`
sull'host: HTML, CSS, JavaScript e immagini, senza niente da eseguire lato
server.

Per controllarla prima di spedirla, servila con nginx come farebbe un server
vero:

```bash
docker compose --profile prod up site --build
```

Il sito è su <http://localhost:8080>.

:::danger Controlla i link prima di pubblicare
La build fallisce se un link interno punta a una pagina inesistente
(`onBrokenLinks: 'throw'`). È una funzione, non un fastidio: significa che un
sito che si costruisce non ha link interni rotti.
:::

## Dove puoi metterla

### L'immagine container del progetto

È la strada più diretta, e non richiede niente sul server a parte un motore
container. Costruisci l'immagine:

```bash
docker build -f docker/Dockerfile --target site -t la-mia-documentazione:1.0 .
```

Provala in locale:

```bash
docker run --rm -p 8080:80 la-mia-documentazione:1.0
```

Poi spediscila al registry che usi e avviala sul server. Dentro c'è solo
`nginx:alpine` più i file statici: poche decine di megabyte, nessun Node, nessun
processo applicativo da sorvegliare.

### Un server web qualsiasi

Se preferisci non usare container in produzione, copia il contenuto di `build/`
nella cartella servita da Apache, nginx o IIS. Se il sito non sta nella radice
del dominio, ricorda di allineare `baseUrl` in `docusaurus.config.js` (per
esempio `/documentazione/`) e ricostruire.

Attenzione a una cosa: Docusaurus genera un file HTML per ogni percorso, quindi
il server deve provare anche la variante con estensione. La riga che serve, in
nginx, è quella che trovi già in `docker/nginx.conf`:

```nginx
try_files $uri $uri/ $uri.html $uri/index.html /404.html;
```

### GitHub Pages

Con `organizzazione`, `repository` e `ramo` compilati in
`docusaurus.config.js`, puoi far costruire e pubblicare il sito a GitHub a ogni
push. Crea `.github/workflows/pubblica.yml`:

```yaml
name: Pubblica la documentazione

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Stessa immagine che usi in locale: la build in CI e quella sulla tua
      # macchina producono lo stesso risultato, per costruzione.
      - name: Costruisci il sito nel container
        run: |
          docker build -f docker/Dockerfile --target builder -t docs-builder .
          docker create --name estrai docs-builder
          docker cp estrai:/app/build ./build
          docker rm estrai

      - uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Ricordati di impostare `baseUrl: '/nome-del-repository/'` se non stai
pubblicando su un dominio dedicato.

### Nessuna pubblicazione

È una scelta legittima, e per molta documentazione interna è quella giusta. La
cartella `build/` si apre anche in locale, e l'immagine nginx si porta su una
chiavetta o su una macchina in rete chiusa. La ricerca continua a funzionare:
l'indice è generato durante la build e vive dentro il sito, non su un servizio
esterno.

:::note Contenuti riservati
Se la documentazione contiene informazioni che non devono uscire, la scelta va
fatta prima di scrivere, non prima di pubblicare: un repository pubblico espone
la cronologia completa, non solo l'ultima versione.
:::
