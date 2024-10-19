function csvToJson(csv) {
    if (!csv.trim()) {
        console.error("empty csv");
        return "[]";
    }

    const result = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
    });

    if (result.errors.length > 0) {
        console.error("error:", result.errors);
        return "[]";
    }

    return JSON.stringify(result.data, null, 2);
}

document.getElementById("convert").addEventListener("click", () => {
    const csv = document.getElementById("csv").value;
    const json = csvToJson(csv);
    document.getElementById("json").value = json;
});

document.getElementById("download").addEventListener("click", () => {
    const json = document.getElementById("json").value;
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    a.click();
    URL.revokeObjectURL(url);
});