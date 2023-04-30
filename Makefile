parcel:
	npx parcel src/index.html

build:
	npx parcel build src/index.html --public-url ./

clean:
	rm -rf dist