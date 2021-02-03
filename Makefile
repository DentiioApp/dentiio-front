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
##Project setup & day to day shortcuts commands
##---------------------------------------------------------------------------

.PHONY: run ## Build & run the project
run:
	$(D) build -t $(T) .

.PHONY: start ## Start the project
start:
	$(D) run --rm -ti -p 3000:3000/tcp --name $(N) $(T)

.PHONY: restart ## Restart the project
restart:
	$(D) restart $(N)

.PHONY: exec ## Run bash in the node container
exec:
	$(D) exec -ti $(N) /bin/bash

.PHONY: stop ## Stop the project
stop:
	$(D) stop $(N)

.PHONY: logs ## Fetch the logs on this project
logs:
	$(D) logs --details $(N)

.PHONY: delete ## Remove one or more images on this project
delete: stop
	$(D) rmi -f $(T)
	$(D) rm -f $(N)
