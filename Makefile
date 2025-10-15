install:
	npm install
.PHONY: install

build:
	npm run build
.PHONY: build

publish:
	npm publish
.PHONY: publish

lint:
	npm run lint
.PHONY: lint

format:
	npm run format:write
.PHONY: format

format-check:
	npm run format:check
.PHONY: format-check

test: 
	npm test
.PHONY: test
