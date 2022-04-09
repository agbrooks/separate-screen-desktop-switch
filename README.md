# separate-screen-desktop-switch

This is a [KWin script](https://develop.kde.org/docs/extend/plasma/kwin/) for the KDE5 desktop that emulates having a different set of virtual desktops on each display (kind of like MacOS does).

## Installation

1. Run `make` to produce a `.kwinscript` archive.
2. In your KDE settings, go to `"Window Management" => "KWin Scripts"` and `Install from File`.

## Caveats

This is kind of a hack. Behind the scenes, it's actually telling all windows on inactive monitors and the previous/current virtual desktop to trade places when the virtual desktop changes. This has two unfortunate consequences:

1. You may notice momentary flickering as windows are exchanged between desktops.
2. It can't truly address the fact that KWin has only one set of desktops across all displays, although it generally appears to. This means that the virtual desktop pager widget can show windows "drifting" between workspaces as you switch on each monitor.
