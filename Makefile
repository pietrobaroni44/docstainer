# Scorciatoie per i comandi Docker piu' lunghi.
# Tutto passa dai container: sulla macchina serve solo Docker.
# `make` senza argomenti mostra l'elenco.

SHELL := /bin/sh
COMPOSE := docker compose
# Esegue un comando dentro il container di sviluppo, senza lasciarlo acceso.
RUN := $(COMPOSE) run --rm dev

.DEFAULT_GOAL := aiuto
.PHONY: aiuto dev build site shell clean rebuild down

aiuto: ## Mostra questo elenco
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

dev: ## Server di sviluppo su http://localhost:3000 (ricarica automatica)
	$(COMPOSE) up dev

build: ## Genera il sito statico in build/
	$(RUN) npm run build

site: ## Sito costruito e servito da nginx su http://localhost:8080
	$(COMPOSE) --profile prod up site --build

shell: ## Apre una shell dentro il container di sviluppo
	$(RUN) sh

clean: ## Svuota la cache di Docusaurus e la cartella build/
	$(RUN) npm run clear
	rm -rf build

rebuild: ## Ricostruisce l'immagine (dopo aver cambiato le dipendenze)
	$(COMPOSE) build dev

down: ## Ferma e rimuove i container
	$(COMPOSE) --profile prod down
