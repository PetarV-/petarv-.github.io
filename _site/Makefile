default: all

all:
	mkdir -p _sass css images typefaces
	rsync -dar --delete ../scss/ _sass/
	(echo --- && echo --- && echo) | cat - _sass/style.scss > css/style.scss
	rm _sass/style.scss
	rsync -dar --delete ../typefaces/ typefaces/
	rsync -dar --delete ../images/ images/
	jekyll build --incremental
