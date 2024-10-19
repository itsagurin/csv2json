function jsonToCsv(json) {
    if (!json || json.length === 0) {
        console.error("empty json");
        return "";
    }

    const csv = Papa.unparse(json);
    return csv;
}

document.getElementById("convert").addEventListener("click", () => {
    const jsonText = document.getElementById("json").value;

    try {
        const json = JSON.parse(jsonText);
        const csv = jsonToCsv(json);
        document.getElementById("csv").value = csv;
    } catch (error) {
        console.error("Ошибка при парсинге JSON:", error);
        alert("Неверный формат JSON.");
    }
});


document.getElementById("download").addEventListener("click", () => {
    const csv = document.getElementById("csv").value;
    const blob = new Blob([csv], { type: "application/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.csv";
    a.click();
    URL.revokeObjectURL(url);
});