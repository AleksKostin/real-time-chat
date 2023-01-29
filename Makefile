start:
	npx start-server & make -C frontend start

install:
	npm ci

lint:
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .