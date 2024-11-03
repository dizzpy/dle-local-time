chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle_conversion") {
        chrome.storage.sync.get("enabled", ({ enabled }) => {
            const newEnabledState = !enabled; 
            chrome.storage.sync.set({ enabled: newEnabledState }, () => {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.reload(tabs[0].id);
                });
            });
        });
    }
});
