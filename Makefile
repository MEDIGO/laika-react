install:
	yarn install
.PHONY: install

build:
	yarn build
.PHONY: build

publish:
	npm publish
.PHONY: publish

lint:
	yarn lint
.PHONY: lint

test: 
	yarn test
.PHONY: test
