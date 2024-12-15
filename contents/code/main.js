/*
 * When the desktop is switched, only change the windows displayed on the
 * current monitor.
 *
 * Behind the scenes, the windows on the current and previous desktop trade
 * places if they're not on the current monitor.
 */

function handleDesktopSwitch(previousDesktop) {
    let currentDesktop = workspace.currentDesktop;
    workspace.windowList().forEach(window => {
        // Don't touch "special" windows!
        if (window.desktopWindow || window.dock || !window.normalWindow) {
            console.log("Not a normal window: " + window);
            return;
        }
        // Windows on the active display are OK, let them move as usual
        if (window.output == workspace.activeScreen) {
            console.log("window " + window + " is on active screen, no swap required");
            return;
        }
        // For any windows not on the active display, swap them between current/previous
        // virtual desktops so that they don't actually appear to move when the virtual
        // desktop is switched.
        let currentDesktopIndex = window.desktops.indexOf(currentDesktop);
        let prevDesktopIndex = window.desktops.indexOf(previousDesktop);
        if (currentDesktopIndex >= 0) {
            window.desktops[currentDesktopIndex] = previousDesktop;
        } else if (prevDesktopIndex >= 0) {
            window.desktops[prevDesktopIndex] = currentDesktop;
        }
    });
}

workspace.currentDesktopChanged.connect(handleDesktopSwitch);
