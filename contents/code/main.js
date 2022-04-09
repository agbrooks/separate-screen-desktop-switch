/*
 * When the desktop is switched, only change the windows displayed on the
 * current monitor.
 *
 * Behind the scenes, the windows on the current and previous desktop trade
 * places if they're not on the current monitor.
 */
var previousDesktop = workspace.currentDesktop;

function handleDesktopSwitch() {
    let currentDesktop = workspace.currentDesktop;
    // FIXME: If we built and maintained a desktop=>window map, we could cut down on the number of clients
    // to iterate through.
    workspace.clientList().forEach(window => {
        // Windows on the current screen are OK where they are.
        if (window.screen == workspace.activeScreen) {
            return;
        }
        // "Special" windows shouldn't be swapped.
        if (window.desktopWindow || window.dock || !window.normalWindow) {
            return;
        }
        // Swap any windows from either current / previous desktops to make it
        // appear like we didn't change anything.
        if (window.desktop == currentDesktop) {
            window.desktop = previousDesktop;
        } else if (window.desktop == previousDesktop) {
            window.desktop = currentDesktop;
        }
    });
    previousDesktop = currentDesktop;
}

workspace.currentDesktopChanged.connect(handleDesktopSwitch);
