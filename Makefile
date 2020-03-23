# Date : 11/03/20
# Source author : Cyrille Grandval
# Edited by Arthur Djikpo

DC=docker-compose
D=docker
T=dentiio/front
HAS_DOCKER:=$(shell command -v $(DC) 2> /dev/null)

ifdef HAS_DOCKER
	ifdef NODE_ENV
		EXECROOT=$(DC) exec -e NODE_ENV=$(NODE_ENV) node
		EXEC=$(DC) exec -e NODE_ENV=$(NODE_ENV) node
	else
		EXECROOT=$(DC) exec node
		EXEC=$(DC) exec node
	endif
else
	EXECROOT=
	EXEC=
endif

.DEFAULT_GOAL := help

.PHONY: help ## Generate list of targets with descriptions
help:
		@grep '##' Makefile \
		| grep -v 'grep\|sed' \
		| sed 's/^\.PHONY: \(.*\) ##[\s|\S]*\(.*\)/\1:\2/' \
		| sed 's/\(^##\)//' \
		| sed 's/\(##\)/\t/' \
		| expand -t14

##
## Project setup & day to day shortcuts
##---------------------------------------------------------------------------

.PHONY: start ## Start the project (Build & run)
start:
	$(D) build -t $(T) .
	$(D) run -p 3000:3000 -d $(T)

.PHONY: stop ## stop the project
stop:
	$(D) stop $(T)