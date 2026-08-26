# Docstainer

**Stampino di documentazione che gira solo in container.** Prendilo, cambia
quattro valori, scrivi Markdown.

Sulla tua macchina serve **Docker e nient'altro**: niente Node, niente npm,
niente versioni da allineare. Il toolchain vive dentro l'immagine e sparisce
quando fermi il container.

Costruito con [Docusaurus 3](https://docusaurus.io). Interfaccia e contenuti in
italiano.

---

## Requisiti

[Docker](https://docs.docker.com/get-started/get-docker/) con Compose v2
(incluso in Docker Desktop e nei pacchetti `docker-compose-plugin`). Verifica:

```bash
docker compose version
```

Non ti serve altro. Se hai Node installato per altri motivi, questo progetto non
lo usa e non lo tocca.

## Prendilo

**Dalla pagina GitHub**, senza installare niente: **Use this template → Create a
new repository**, oppure **Code → Download ZIP** se vuoi solo i file.

Da riga di comando, se hai `git`:

```bash
git clone --depth 1 https://github.com/pietrobaroni44/docstainer.git la-mia-documentazione
```

```bash
rm -rf la-mia-documentazione/.git
```

Il secondo comando stacca lo stampino dalla sua cronologia: da lì in poi il
progetto è tuo. Se non vuoi nemmeno `git` sulla macchina, usalo dentro un
container:

```bash
docker run --rm -v "$PWD:/git" alpine/git clone --depth 1 https://github.com/pietrobaroni44/docstainer.git la-mia-documentazione
```

## Avvialo

```bash
docker compose up dev
```

Prima esecuzione: qualche minuto per costruire l'immagine e installare le
dipendenze dentro di essa. Le volte successive parte in pochi secondi.

Il sito è su **<http://localhost:3000>** e si ricarica da solo a ogni
salvataggio: modifichi un `.md` con il tuo editor sull'host, la pagina cambia.
Per fermarlo, `Ctrl+C`.

La documentazione completa è dentro il sito stesso: aprilo e leggi **Guida
rapida**.

## Comandi

Tutto passa da `docker compose`. Non c'è un solo comando da eseguire fuori dai
container.

| Comando | Cosa fa |
| --- | --- |
| `docker compose up dev` | Server di sviluppo su <http://localhost:3000> |
| `docker compose run --rm dev npm run build` | Genera il sito statico in `build/` |
| `docker compose --profile prod up site --build` | Sito servito da nginx su <http://localhost:8080> |
| `docker compose run --rm dev npm run clear` | Svuota la cache quando qualcosa si incastra |
| `docker compose run --rm dev sh` | Shell dentro il container, per i comandi occasionali |
| `docker compose up dev --build` | Ricostruisce l'immagine (serve dopo aver cambiato le dipendenze) |
| `docker compose down` | Ferma e rimuove i container |

I comandi `npm` che vedi sono quelli eseguiti **dentro** il container: `docker
compose run --rm dev ...` apre un container usa-e-getta, ci lancia il comando e
lo butta via.

Se preferisci le scorciatoie, c'è un `Makefile` che avvolge esattamente questi
comandi: `make dev`, `make build`, `make site`, `make shell`, `make clean`.
`make` da solo elenca tutto. È zucchero opzionale, non un requisito in più.

## Fallo tuo: cinque minuti

**1. I dati del progetto.** In cima a `docusaurus.config.js` c'è un unico
oggetto `progetto`. È l'unica parte che devi toccare:

```js
const progetto = {
  titolo: 'Documentazione SOC',
  slogan: 'Procedure operative e runbook del centro operativo.',
  descrizione: 'Riferimento interno per gli analisti di primo e secondo livello.',

  url: 'https://esempio.invalid',   // dominio pubblico, senza slash finale
  baseUrl: '/',                     // '/nome-repo/' se pubblichi su GitHub Pages

  organizzazione: 'tuo-utente-github',
  repository: 'nome-del-repository',
  ramo: 'main',                     // null per togliere i link "Modifica questa pagina"

  copyright: 'Il tuo nome / la tua organizzazione',
};
```

> Cambia `organizzazione` e `repository` prima di pubblicare: sono segnaposto, e
> finché restano tali il link GitHub della barra in alto e i link "Modifica
> questa pagina" puntano a un repository che non esiste.

**2. Il nome del pacchetto.** In `package.json`, campo `name`.

**3. I contenuti.** Svuota `docs/` e `blog/` e scrivi i tuoi. Tieni
`docs/intro.md`: il suo `slug: /` fa in modo che `/docs` risponda sempre a
qualcosa.

**4. L'aspetto.** Il colore primario è una variabile in cima a
`src/css/custom.css`. Logo e favicon stanno in `static/img/`: sostituisci
`logo.svg` e `favicon.ico` mantenendo gli stessi nomi.

**5. La homepage.** `src/pages/index.js` è l'unico file React del progetto; i
testi sono in un array in cima. Se una homepage non ti serve, cancellalo
insieme a `index.module.css` e `/` mostrerà direttamente la documentazione.

Le pagine sotto `docs/sintassi/` puoi tenerle: fanno da promemoria per chi
scriverà dopo di te.

## Aggiungere una dipendenza

Anche questo passa dal container, così il `package-lock.json` resta coerente con
l'immagine:

```bash
docker compose run --rm dev npm install nome-del-pacchetto
```

`package.json` e `package-lock.json` vengono aggiornati sull'host perché la
cartella è montata. Poi ricostruisci l'immagine una volta:

```bash
docker compose up dev --build
```

## Cosa c'è dentro

| Elemento | Scelta fatta | Perché |
| --- | --- | --- |
| Esecuzione | solo Docker | Nessun toolchain da installare, nessuna versione di Node da litigare |
| Contenuti | file `.md` in Markdown standard | Restano leggibili e riusabili fuori da qui |
| Ricerca | indice locale, nessun servizio esterno | Funziona offline e in rete chiusa |
| Diagrammi | [Mermaid](https://mermaid.js.org) | Versionabili come testo, non come immagini |
| Formule | [KaTeX](https://katex.org), font serviti in locale | Nessuna richiesta di rete a runtime |
| Blog | attivo | Note di rilascio e cronologia dei cambiamenti |
| Versionamento | configurato, da attivare quando serve | Una sola versione all'avvio: scrivi in `docs/`, vedi il risultato |

## Struttura

```text
.
├── docs/                  la documentazione (è qui che scrivi)
├── blog/                  note di rilascio e aggiornamenti
├── src/
│   ├── css/custom.css     colori e stile del sito
│   └── pages/index.js     homepage
├── static/                immagini e file serviti così come sono
├── docker/
│   ├── Dockerfile         i quattro bersagli: deps, dev, builder, site
│   └── nginx.conf         configurazione del server che serve il sito
├── i18n/it/code.json      traduzioni delle stringhe non già in italiano
├── docker-compose.yml     servizi "dev" e "site"
├── docusaurus.config.js   unico file da toccare per personalizzare
├── sidebars.js            menu laterale (generato dalle cartelle)
└── Makefile               scorciatoie opzionali sui comandi Docker
```

Il menu laterale non si scrive a mano: **è** la struttura di `docs/`. Crei un
file, compare nel menu. L'ordine si controlla con `sidebar_position` nel
frontmatter e con i `_category_.json` delle cartelle.

## Come è fatto il container

Un solo `Dockerfile` con quattro bersagli, ognuno con un compito:

```text
deps     npm ci in un livello a parte, riusabile dalla cache
  ├──>   dev       server di sviluppo con ricarica automatica  (:3000)
  └──>   builder   esegue la build e produce /app/build
           └──>    site      nginx che serve i file statici     (:8080)
```

L'immagine `site` parte da `nginx:alpine` e riceve solo il contenuto di
`build/`: dentro non c'è Node, pesa poche decine di megabyte ed è quella che
puoi spedire su un server.

In sviluppo la cartella del progetto è montata nel container, ma
`node_modules` no: resta quello installato nell'immagine. Così non ti ritrovi
moduli compilati per Linux nella cartella del tuo Mac, o viceversa.

Sull'host vedrai comparire una cartella `node_modules` **vuota**: è solo il
punto di mount del volume, `ls -A node_modules` restituisce zero elementi. È
già in `.gitignore`.

## Due scelte da conoscere

**I file `.md` sono Markdown standard, non MDX** (`markdown.format: 'detect'`
nella configurazione). Niente JSX, niente `import` nelle pagine. Il prezzo è
rinunciare ai componenti React dentro il testo; il guadagno è che un file di
`docs/` si apre in Obsidian, si legge su GitHub e passa a `pandoc` senza
rompersi. Se ti serve MDX per una pagina specifica, chiamala `.mdx` e funziona.

**La ricerca è locale.** L'indice si genera durante la build e vive dentro il
sito: nessuna chiave, nessuna registrazione, nessuna rete. Nel server di
sviluppo la ricerca è disattivata e mostra un avviso: è normale, provala con
`docker compose --profile prod up site --build`.

## Note

- `onBrokenLinks` è impostato su `throw`: la build fallisce se un link interno
  punta a una pagina che non esiste. È voluto.
- Il Dockerfile non usa la direttiva `# syntax=`: una build in meno da scaricare
  e funziona anche in rete chiusa.
- Il progetto non è pensato per essere aggiornato dall'upstream: prendilo,
  modificalo, dimenticati di questo repository.

## Licenza

[MIT](LICENSE). Usalo, modificalo e ridistribuiscilo come vuoi, anche
commercialmente. L'unico obbligo è mantenere l'avviso di copyright.
