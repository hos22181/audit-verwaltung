document.addEventListener("DOMContentLoaded", function () {
  // Warte, bis das DOM vollständig geladen ist

  // Pfad zur CSV-Datei
  const csvFilePath = "MOCK_DATA.csv";

  // Initial lade die ersten 20 Datensätze
  loadCSVData(csvFilePath, 20);
});

function loadCSVData(csvFilePath, numRecords) {
  // Lese die CSV-Datei mit XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open("GET", csvFilePath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Die CSV-Daten sind geladen
      const csvData = xhr.responseText;
      // Konvertiere die CSV-Daten in ein zweidimensionales Array
      const dataArray = CSVToArray(csvData, ",");
      // Füge die Daten in die Tabelle ein
      insertDataIntoTable(dataArray, numRecords);
    }
  };
  xhr.send();
}

function CSVToArray(strData, strDelimiter) {
  const arrData = [];
  const lines = strData.split("\n");

  lines.forEach(function (line) {
    const cells = line.split(strDelimiter);
    arrData.push(cells);
  });

  return arrData;
}

function insertDataIntoTable(dataArray, numRecords) {
  const table = document.getElementById("dataTable");
  const tableBody = table.getElementsByTagName("tbody")[0];

  // Bestehende Zeilen löschen, um Überschneidungen zu vermeiden
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Iteriere durch das dataArray und füge die ersten numRecords Zeilen in die Tabelle ein
  for (let i = 0; i < numRecords && i < dataArray.length; i++) {
    const tr = document.createElement("tr");

    // Datenzellen hinzufügen
    dataArray[i].forEach(function (cell) {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });

    // Edit, Delete, und Details Buttons hinzufügen
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    const editButton = createButton("Edit Audit", "editButton");
    const deleteButton = createButton("Delete Audit", "deleteButton");
    const detailsButton = createButton("Details anzeigen", "detailsButton");

    // Füge Buttons zum Container hinzu
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(detailsButton);

    // Füge den Button-Container zur Zelle in der Zeile hinzu
    const tdButtons = document.createElement("td");
    tdButtons.appendChild(buttonContainer);
    tr.appendChild(tdButtons);

    // Füge die Reihe zur Tabelle hinzu
    tableBody.appendChild(tr);
  }
}


function createButton(text, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  return button;
}

function loadMoreData() {
  // Hier kannst du die Anzahl der zusätzlich zu ladenden Datensätze anpassen
  const additionalRecords = 10;
  // Rufe die Funktion zum Laden weiterer Datensätze auf
  loadCSVData("MOCK_DATA.csv", additionalRecords);
}
