NAME=separate-screen-desktop-switch
VERSION=1.1
PLUGIN="$(NAME)-$(VERSION).kwinscript"

.PHONY: all clean iterate follow-logs

all: $(PLUGIN)

clean:
	rm -f $(PLUGIN)

$(PLUGIN): contents/code/main.js metadata.desktop metadata.json
	zip -r $@ $^

iterate: $(PLUGIN)
	qdbus org.kde.KWin /Scripting/Script0 stop || true
	kpackagetool6 --type=KWin/Script -i . || kpackagetool6 --type=KWin/Script -u .
	kwriteconfig6 --file kwinrc --group Plugins --key "$(NAME)Enabled" true
	qdbus org.kde.KWin /KWin reconfigure

follow-logs:
	journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting
