document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggleSwitch");

    chrome.storage.sync.get("enabled", ({ enabled }) => {
        toggleSwitch.checked = !!enabled;
    });

    toggleSwitch.addEventListener("change", () => {
        const isEnabled = toggleSwitch.checked;
        chrome.storage.sync.set({ enabled: isEnabled }, () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});
