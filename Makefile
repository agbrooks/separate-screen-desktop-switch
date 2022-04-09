NAME=separate-screen-desktop-switch
VERSION=1.0
PLUGIN="$(NAME)-$(VERSION).kwinscript"

.PHONY: all clean

all: $(PLUGIN)

clean:
	rm -f $(PLUGIN)

$(PLUGIN): contents/code/main.js metadata.desktop
	zip -r $@ $^


