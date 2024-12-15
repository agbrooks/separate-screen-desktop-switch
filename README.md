# separate-screen-desktop-switch

This is a [KWin script](https://develop.kde.org/docs/extend/plasma/kwin/) for the KDE Plasma 6 desktop that emulates having a different set of virtual desktops on each display (kind of like MacOS does).

## Installation

1. Run `make` to produce a `.kwinscript` archive.
2. In your KDE settings, go to `"Window Management" => "KWin Scripts"` and `Install from File`.

## Caveats

This is kind of a hack. Behind the scenes, it's actually telling all windows on inactive monitors and the previous/current virtual desktop to trade places when the virtual desktop changes. This has two unfortunate consequences:

1. You may notice momentary flickering as windows are exchanged between desktops.
2. It can't truly address the fact that KWin has only one set of desktops across all displays, although it generally appears to. This means that the virtual desktop pager widget can show windows "drifting" between workspaces as you switch on each monitor.

# Dev notes

## KWin script API docs

* KWin scripting API described [here](https://develop.kde.org/docs/plasma/kwin/api/)

## Script logs/output

* First, ensure that your session was started with env variable `QT_LOGGING_RULES="kwin_*.debug=true"`

* You can follow KWin script logs with `journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting` (or `make follow-logs`)

## Keeping the feedback loop tight

To update/reinstall the plugin, enable it, and tell KWin to reconfigure itself, `make iterate`.

Note that this Makefile target assumes that the DBus object for this script under org.kde.KWin lives at `/Scripting/Script0`. This is true for me, as this is the only KWin script that I use, but it may not be true for you. This could be improved, but seeing as I am not aware of any other developers of this plugin, it doesn't seem worthwhile to do so.
