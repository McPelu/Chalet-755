// ================================
// Berekening totaalprijs – Kosten tab
// ================================

document.getElementById("calculate-btn").addEventListener("click", function() {
    // Startdatum en aantal weken / personen
    const startDate = new Date(document.getElementById("start-date").value);
    const numWeeks = parseInt(document.getElementById("num-weeks").value) || 0;
    const numPersons = parseInt(document.getElementById("num-persons").value) || 0;

    if (!startDate || numWeeks <= 0 || numPersons <= 0) {
        alert("Vul alle velden correct in!");
        return;
    }

    // Extra opties (veilig omzetten naar getal)
    const beddingCost = parseFloat(document.getElementById("bedding").value) || 0;
    const towelsCost = parseFloat(document.getElementById("towels").value) || 0;
    const kitchenCost = parseFloat(document.getElementById("kitchen").value) || 0;
    const carChecked = document.getElementById("car").checked;

    // Seizoenen met prijzen
    const seasonPrices = [
        { name: "Voorjaar", start: "2026-02-14", end: "2026-03-01", price: 450 },
        { name: "Meivakantie", start: "2025-04-26", end: "2025-05-04", price: 400 },
        { name: "Hemelvaart", start: "2025-05-28", end: "2025-06-01", price: 400 },
        { name: "Zomervakantie", start: "2025-07-05", end: "2025-08-31", price: 650 },
        { name: "Herfstvakantie", start: "2025-10-11", end: "2025-10-26", price: 450 },
        { name: "Kerstvakantie", start: "2025-12-20", end: "2026-01-04", price: 450 },
        { name: "Standaard", price: 400 }
    ];

    // Functie om seizoen te bepalen
    function getSeason(date) {
        for (let season of seasonPrices) {
            if (!season.start) continue;
            const start = new Date(season.start);
            const end = new Date(season.end || season.start);
            if (date >= start && date <= end) return season;
        }
        return seasonPrices.find(s => s.name === "Standaard");
    }

    const startSeason = getSeason(startDate);
    let finalCost = numWeeks * startSeason.price;

    // Bereken extra kosten
    const additionalCosts = [
        { item: "Toeristenbelasting", price: 5.95 * numWeeks * numPersons }, // per persoon per week
        { item: "Park Reserveringskosten", price: 9.95 },
        { item: "Eindschoonmaak", price: 30 },
        { item: "Borg", price: 100 },
        { item: "Beddengoed", price: beddingCost  },
        { item: "Handdoeken", price: towelsCost  },
        { item: "Keukentextiel", price: kitchenCost  }
    ];

    // Auto op het park kosten per dag
    if (carChecked) {
        const totalDays = numWeeks * 7;
        additionalCosts.push({ item: "Auto op het park", price: 6 * totalDays });
    }

    // Totaalprijs berekenen
    additionalCosts.forEach(cost => {
        finalCost += cost.price;
    });

    // Output overzicht
    let summary = `<strong>${startSeason.name}</strong> prijs per week: €${startSeason.price.toFixed(2)}<br>`;
    additionalCosts.forEach(cost => {
        summary += `${cost.item}: €${cost.price.toFixed(2)}<br>`;
    });

    document.getElementById("total-cost").innerHTML = `Totaalbedrag: €${finalCost.toFixed(2)}`;
    document.getElementById("cost-details").innerHTML = summary;
});
