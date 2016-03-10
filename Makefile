.PHONY: all
all: build

.PHONY: install build test codestyle travis
install:
	@./scripts/install.bash
build:
	@./scripts/build.bash
test:
	@./scripts/test.bash
codestyle:
	@./scripts/codestyle.bash
travis:
	make test
