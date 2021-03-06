.PHONY: build start stop remove logs lint mocha test run release redis-cli clear-redis

SHELL := /bin/bash
branch := $(shell git branch | grep \* | cut -d ' ' -f2)

build:
	docker-compose build
	docker-compose run --rm app npm install

start:
	docker-compose up -d

stop:
	docker-compose down

remove:
	docker-compose rm

logs:
	docker-compose logs --tail=0 --follow


logs-tail:
	docker-compose logs --tail=100 --follow

lint:
	docker-compose run --rm app npm run lint

mocha:
	docker-compose run --rm app npm run mocha

test: lint mocha

run:
	docker-compose exec app sh

redis-cli:
	docker-compose exec redis redis-cli

clear-redis:
	docker-compose exec redis redis-cli flushall

## Version management
release:
ifeq ($(branch),master)
	npm run release
	git push origin master
	git push --tags
else
	@echo "You need to be in branch master"
endif

## Prerelease
prerelease:
	npm run release -- --prerelease
	git push origin $(git symbolic-ref --short HEAD)
	git push --tags
