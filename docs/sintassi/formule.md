---
title: Formule matematiche
sidebar_position: 4
description: Notazione LaTeX inline e a blocchi con KaTeX.
---

# Formule matematiche

Le formule si scrivono in notazione LaTeX e vengono composte da
[KaTeX](https://katex.org) durante la build: nessuna immagine, nessuna
richiesta di rete.

## In linea

Un solo simbolo di dollaro attorno alla formula:

```markdown
La complessità dell'attacco cresce come $2^{n}$ con la lunghezza della chiave.
```

La complessità dell'attacco cresce come $2^{n}$ con la lunghezza della chiave.

## A blocco

Due simboli di dollaro, su righe separate:

```markdown
$$
R = \sum_{i=1}^{n} P_i \cdot I_i
$$
```

$$
R = \sum_{i=1}^{n} P_i \cdot I_i
$$

Dove $P_i$ è la probabilità dell'evento $i$ e $I_i$ il suo impatto.

## Qualche esempio utile

Entropia di una sorgente discreta:

$$
H(X) = -\sum_{i=1}^{n} p(x_i) \log_2 p(x_i)
$$

Probabilità di collisione (paradosso del compleanno) su uno spazio di $N$
valori dopo $k$ estrazioni:

$$
p(k, N) \approx 1 - e^{-\frac{k^2}{2N}}
$$

Matrice di rischio come prodotto di due vettori:

$$
\begin{pmatrix} 1 & 2 & 3 \end{pmatrix}
\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} = 14
$$

## Attenzione al simbolo di dollaro

Se scrivi di prezzi o di prompt di shell, il dollaro isolato può essere
interpretato come apertura di formula. Basta farlo precedere da una barra
rovesciata:

```markdown
Il costo della licenza è \$1200 all'anno.
```

Il costo della licenza è \$1200 all'anno.

Dentro i blocchi di codice il problema non si pone: `$PATH` resta `$PATH`.

:::note Portabilità
La sintassi `$...$` è la convenzione LaTeX più diffusa: la capiscono Obsidian,
Jupyter, Pandoc e GitHub. È l'estensione meno rischiosa che puoi usare in un
Markdown destinato a essere riletto altrove.
:::
