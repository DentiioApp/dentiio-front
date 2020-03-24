# Date : 11/03/20
# Source author : Cyrille Grandval
# Edited by Arthur Djikpo

D=docker
T=dentiio/front
N=front

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

.PHONY: run ## Build & run the project
run:
	$(D) build -t $(T) .
	$(D) run -p 3000:3000 -d --name $(N) $(T)

.PHONY: start ## start the project
start:
	$(D) start $(N)

.PHONY: restart ## restart the project
restart:
	$(D) restart $(N)

.PHONY: stop ## stop the project
stop:
	$(D) stop $(N)