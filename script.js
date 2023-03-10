function search() {
    // Get search input
    const searchInput = document.getElementById("search-input").value;
  
    // Show loader
    document.getElementById("loader").style.display = "block";
  
    // Fetch data from iTunes API
    fetch(`https://itunes.apple.com/search?term=${searchInput}&entity=song`)
      .then((response) => response.json())
      .then((data) => {
        // Hide loader
        document.getElementById("loader").style.display = "none";
  
        // Clear previous results
        document.getElementById("results").innerHTML = "";
  
        // Check if there are any results
        if (data.resultCount === 0) {
          document.getElementById("results").innerHTML = "No results found.";
        } else {
          // Create a table element
          const table = document.createElement("table");
  
          // Add table headings
          table.innerHTML = `
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Preview</th>
            </tr>
          `;
  
          // Add data rows
          data.results.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${result.trackName}</td>
              <td>${result.artistName}</td>
              <td><audio controls src="${result.previewUrl}"></audio></td>

            `;
            table.appendChild(row);
          });
  
          // Add table to results div
          document.getElementById("results").appendChild(table);
        }
      });
  }
  
