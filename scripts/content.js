function formatDate(date) {
    return date.toLocaleString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Colombo",
    });
}

function convertTimestamps() {
    const timestampRegex = /\b(\w+),\s(\d{1,2})\s(\w+)\s(\d{4}),\s(\d{1,2}:\d{2})\s(AM|PM)\b/gi;
    const elements = document.body.querySelectorAll("*:not(script):not(style)");

    elements.forEach((el) => {
        if (timestampRegex.test(el.textContent)) {
            el.innerHTML = el.innerHTML.replace(timestampRegex, (match, day, date, month, year, time, meridian) => {
                const ukTimeString = `${day}, ${date} ${month} ${year}, ${time} ${meridian}`;
                const ukTime = new Date(`${ukTimeString} GMT`);
                const localTime = formatDate(ukTime);
                return `<span class="converted-time">${localTime}</span>`;
            });
        }
    });
}

function removeConversion() {
    document.querySelectorAll(".converted-time").forEach((span) => {
        span.outerHTML = span.innerText;
    });
}

chrome.storage.sync.get("enabled", ({ enabled }) => {
    if (enabled) {
        convertTimestamps();
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && "enabled" in changes) {
        const isEnabled = changes.enabled.newValue;
        if (isEnabled) {
            convertTimestamps();
        } else {
            removeConversion();
        }
    }
});
