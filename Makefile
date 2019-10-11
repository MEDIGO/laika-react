build:
	yarn build
.PHONY: build

publish: build
	npm publish
.PHONY: publish

test: 
	yarn test
.PHONY: test
