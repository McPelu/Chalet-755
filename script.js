document.getElementById("calculate-btn").addEventListener("click", function() {
    const startDate = new Date(document.getElementById("start-date").value);
    const numWeeks = parseInt(document.getElementById("num-weeks").value);
    const numPersons = parseInt(document.getElementById("num-persons").value);

    // Extra opties voor setjes
    const beddingCost = parseInt(document.getElementById("bedding").value); // Beddengoed kosten per set
    const towelsCost = parseInt(document.getElementById("towels").value); // Handdoeken kosten per set
    const kitchenCost = parseInt(document.getElementById("kitchen").value); // Keukentextiel kosten per set
    const carChecked = document.getElementById("car").checked; // Auto op het park (checkbox)
    
    if (!startDate || !numWeeks || !numPersons || numWeeks <= 0 || numPersons <= 0) {
        alert("Vul alle velden correct in!");
        return;
    }

    const seasonPrices = [
        { name: "Voorjaar", start: "2026-02-14", end: "2026-03-01", price: 450 },
        { name: "Meivakantie", start: "2025-04-26", end: "2025-05-04", price: 400 },
        { name: "Hemelvaart", start: "2025-05-28", end: "2025-06-01", price: 400 },
        { name: "Zomervakantie", start: "2025-07-05", end: "2025-08-31", price: 650 },
        { name: "Herfstvakantie", start: "2025-10-11", end: "2025-10-26", price: 450 },
        { name: "Kerstvakantie", start: "2025-12-20", end: "2026-01-04", price: 450 },
        { name: "Standaard", price: 400 } // Prijs buiten vakanties
    ];

    // Functie om het seizoen te bepalen op basis van de startdatum
    function getSeason(date) {
        for (let season of seasonPrices) {
            const seasonStart = new Date(season.start);
            const seasonEnd = new Date(season.end || season.start);
            if (date >= seasonStart && date <= seasonEnd) {
                return season;
            }
        }
        return seasonPrices.find(season => season.name === "Standaard"); // Standaardprijs
    }

    const startSeason = getSeason(startDate);
    const totalCost = numWeeks * startSeason.price; // Prijs per week * aantal weken

    // Bereken de extra kosten
    const additionalCosts = [
        { item: "Toeristenbelasting", price: 5.95 * numWeeks * numPersons }, // Per persoon per nacht
        { item: "Park Reserveringskosten", price: 9.95 },
        { item: "Eindschoonmaak", price: 30 },
        { item: "Borg", price: 100 },
        { item: "Beddengoed", price: beddingCost  }, // Kosten beddengoed
        { item: "Handdoeken", price: towelsCost * numPersons }, // Kosten handdoeken
        { item: "Keukentextiel", price: kitchenCost  }, // Kosten keukentextiel
    ];

    // Auto op het park kosten per dag, alleen als de checkbox is aangevinkt
    if (carChecked) {
        const totalDays = numWeeks * 7; // Aantal dagen van het verblijf
        additionalCosts.push({
            item: "Auto op het park",
            price: 6 * totalDays // Kosten auto op het park
        });
    }

    let finalCost = totalCost;
    additionalCosts.forEach(cost => {
        finalCost += cost.price;
    });

    // Update de weergegeven totaalprijs
    let summary = `<strong>${startSeason.name}</strong> prijs per week: €${startSeason.price.toFixed(2)}<br>`;
    additionalCosts.forEach(cost => {
        summary += `${cost.item}: €${cost.price.toFixed(2)}<br>`;
    });

    document.getElementById("total-cost").innerHTML = `Totaalbedrag: €${finalCost.toFixed(2)}`;
    document.getElementById("cost-details").innerHTML = summary;
});
