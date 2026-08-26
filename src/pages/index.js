import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

// ---------------------------------------------------------------------------
// Testi della homepage. Per personalizzare il sito di solito basta modificare
// questo blocco: il resto del file è solo impaginazione.
// ---------------------------------------------------------------------------
const copertina = {
  azionePrimaria: {testo: 'Inizia da qui', percorso: '/docs'},
  azioneSecondaria: {testo: 'Come si scrive una pagina', percorso: '/docs/guida-rapida/scrivere-una-pagina'},
};

const caratteristiche = [
  {
    titolo: 'Markdown e basta',
    testo:
      'Le pagine sono file .md in Markdown standard. Si leggono in qualsiasi ' +
      'editor, si versionano nei diff, si portano altrove senza conversioni.',
  },
  {
    titolo: 'Ricerca che funziona offline',
    testo:
      "L'indice viene costruito durante la build e vive dentro il sito. " +
      'Nessun servizio esterno, nessuna chiave, nessuna rete richiesta.',
  },
  {
    titolo: 'Diagrammi e formule',
    testo:
      'Mermaid per gli schemi e KaTeX per la notazione matematica, scritti ' +
      'come testo dentro le pagine. Niente immagini da rigenerare a mano.',
  },
  {
    titolo: 'Solo Docker, niente altro',
    testo:
      'Un comando e il sito è in piedi. Nessun toolchain sulla macchina: ' +
      'niente Node, niente npm, niente versioni da allineare.',
  },
  {
    titolo: 'Un solo file da toccare',
    testo:
      'Titolo, dominio, repository e colori si cambiano in cima a ' +
      "docusaurus.config.js. Il resto è già configurato.",
  },
  {
    titolo: 'Interfaccia in italiano',
    testo:
      'Menu, ricerca, navigazione e messaggi sono in italiano, con tema chiaro ' +
      'e scuro che segue le preferenze del sistema.',
  },
];

function Copertina() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.copertina}>
      <div className="container">
        <Heading as="h1" className={styles.titolo}>
          {siteConfig.title}
        </Heading>
        <p className={styles.slogan}>{siteConfig.tagline}</p>
        <div className={styles.azioni}>
          <Link
            className="button button--primary button--lg"
            to={copertina.azionePrimaria.percorso}>
            {copertina.azionePrimaria.testo}
          </Link>
          <Link
            className="button button--secondary button--lg"
            to={copertina.azioneSecondaria.percorso}>
            {copertina.azioneSecondaria.testo}
          </Link>
        </div>
      </div>
    </header>
  );
}

function Caratteristiche() {
  return (
    <section className={styles.caratteristiche}>
      <div className="container">
        <div className="row">
          {caratteristiche.map((c) => (
            <div key={c.titolo} className={clsx('col col--4', styles.colonna)}>
              <div className={styles.scheda}>
                <Heading as="h3" className={styles.schedaTitolo}>
                  {c.titolo}
                </Heading>
                <p className={styles.schedaTesto}>{c.testo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <Copertina />
      <main>
        <Caratteristiche />
      </main>
    </Layout>
  );
}
