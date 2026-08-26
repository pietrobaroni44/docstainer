---
title: Ammonizioni
sidebar_position: 2
description: I riquadri colorati per note, avvisi e pericoli.
---

# Ammonizioni

Le ammonizioni sono i riquadri colorati che spezzano il testo per segnalare
qualcosa. Si aprono e si chiudono con tre due punti.

```markdown
:::note
Un'informazione di contorno, utile ma non urgente.
:::
```

:::note
Un'informazione di contorno, utile ma non urgente.
:::

```markdown
:::tip
Un consiglio pratico, una scorciatoia.
:::
```

:::tip
Un consiglio pratico, una scorciatoia.
:::

```markdown
:::info
Un dettaglio di contesto: versioni, riferimenti, presupposti.
:::
```

:::info
Un dettaglio di contesto: versioni, riferimenti, presupposti.
:::

```markdown
:::warning
Qualcosa che, se ignorato, causa un problema.
:::
```

:::warning
Qualcosa che, se ignorato, causa un problema.
:::

```markdown
:::danger
Operazione distruttiva o rischiosa. Da leggere prima, non dopo.
:::
```

:::danger
Operazione distruttiva o rischiosa. Da leggere prima, non dopo.
:::

## Titolo personalizzato

Il titolo si scrive sulla stessa riga dell'apertura:

```markdown
:::warning Verifica il backup prima di procedere
Il ripristino sovrascrive la configurazione corrente senza chiedere conferma.
:::
```

:::warning Verifica il backup prima di procedere
Il ripristino sovrascrive la configurazione corrente senza chiedere conferma.
:::

## Riquadro richiudibile

```markdown
:::info[Dettagli dell'errore]
Contenuto lungo che non tutti devono leggere.
:::
```

Per un blocco davvero richiudibile conviene invece l'HTML standard, che
funziona anche fuori da questo sito:

````markdown
<details>
<summary>Output completo del comando</summary>

```text
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 9.6
443/tcp  open  https   nginx 1.27
```

</details>
````

<details>
<summary>Output completo del comando</summary>

```text
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 9.6
443/tcp  open  https   nginx 1.27
```

</details>

## Usarle con misura

Tre riquadri di fila non evidenziano più niente: diventano lo sfondo. Se una
pagina ne ha più di due o tre, quasi sempre significa che quel contenuto è
importante abbastanza da stare nel testo principale.
