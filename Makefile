.PHONY: all
all: build

.PHONY: install build test codestyle coverage travis
install:
	@./scripts/install.bash
build:
	@./scripts/build.bash
test:
	@./scripts/test.bash
codestyle:
	@./scripts/codestyle.bash
coverage:
	@./scripts/coverage.bash
travis:
	make coverage
