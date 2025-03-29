function displayData() {
  let url = "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio.json";
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then(data => {
    let table = document.getElementById("portfolio-list");
    table.innerHTML = "";
    Object.entries(data).forEach(key => {
      let {assetType, assetname, quantity, purchasePrice, currentPrice } = key[1];
      console.log(assetType, assetname, quantity, purchasePrice, currentPrice);
      let pnlPerct = (((currentPrice - purchasePrice) / purchasePrice) * 100).toFixed(2);
      table.innerHTML += `
      <tr class="border-b-2 border-gray-300 ">
          <td>${assetType}</td>
          <td>${assetname}</td>
          <td>${quantity}</td>
          <th>${purchasePrice}</th>
          <th>${currentPrice}</th>
          <th class="${pnlPerct > 0 ? 'text-green-500' : 'text-red-500'}">${pnlPerct}%</th>
          <th class="flex gap-4">
              <button class="bg-red-500 text-white px-2 py-1 m-2" onclick="deleteBtn('${key[0]}')" >Delete</button>
          </th>
      </tr>
      `;
    });
  });

  updatedataonPie();
  updatedataonLine();
  updatedataonBar();
  updatedataonRadar();
  makeDivsDraggable();
}

function deleteBtn(key) {
  let url = `https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio/${key}.json`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  displayData();
}

displayData();

function filterAssets() {
  let url = "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio.json";
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then(data => {
    let table = document.getElementById("portfolio-list");
    table.innerHTML = "";

    let filterValue = document.getElementById("filter-type").value;
    Object.entries(data).forEach(key => {
      let { assetType,assetname, quantity, purchasePrice, currentPrice } = key[1];
      let pnlPerct = (((currentPrice - purchasePrice) / purchasePrice) * 100).toFixed(2);
      if (filterValue == "all") {
        table.innerHTML += `
        <tr class="border-b-2 border-gray-300 ">
            <td>${assetType}</td>
            <td>${assetname}</td>
            <td>${quantity}</td>
            <th>${purchasePrice}</th>
            <th>${currentPrice}</th>
            <th class="${pnlPerct > 0 ? 'text-green-500' : 'text-red-500'}">${pnlPerct}%</th>
            <th class="flex gap-4">
                <button class="bg-red-500 text-white px-2 py-1 m-2" onclick="deleteBtn('${key[0]}')" >Delete</button>
            </th>
        </tr>
        `;
      }

      if (filterValue == "stock" && assetType == "stock") {
        table.innerHTML += `
        <tr class="border-b-2 border-gray-300 ">
            <td>${assetType}</td>
            <td>${assetname}</td>
            <td>${quantity}</td>
            <th>${purchasePrice}</th>
            <th>${currentPrice}</th>
            <th class="${pnlPerct > 0 ? 'text-green-500' : 'text-red-500'}">${pnlPerct}%</th>
            <th class="flex gap-4">
                <button class="bg-red-500 text-white px-2 py-1 m-2" onclick="deleteBtn('${key[0]}')" >Delete</button>
            </th>
        </tr>
        `;
      }
      if (filterValue == "crypto" && assetType == "crypto") {
        table.innerHTML += `
        <tr class="border-b-2 border-gray-300 ">
            <td>${assetType}</td>
            <td>${assetname}</td>
            <td>${quantity}</td>
            <th>${purchasePrice}</th>
            <th>${currentPrice}</th>
            <th class="${pnlPerct > 0 ? 'text-green-500' : 'text-red-500'}">${pnlPerct}%</th>
            <th class="flex gap-4">
                <button class="bg-red-500 text-white px-2 py-1 m-2" onclick="deleteBtn('${key[0]}')" >Delete</button>
            </th>
        </tr>
        `;
      }

      if (filterValue == "bond" && assetType == "bond") {
        table.innerHTML += `
        <tr class="border-b-2 border-gray-300 ">
            <td>${assetType}</td>
            <td>${assetname}</td>
            <td>${quantity}</td>
            <th>${purchasePrice}</th>
            <th>${currentPrice}</th>
            <th class="${pnlPerct > 0 ? 'text-green-500' : 'text-red-500'}">${pnlPerct}%</th>
            <th class="flex gap
            -4">
                <button class="bg-red-500 text-white px-2 py-1 m-2" onclick="deleteBtn('${key[0]}')" >Delete</button>
            </th>
        </tr>
        `;
      }
    });
  });
}

function addAsset() {
  let assetType = document.getElementById("asset").value;
  let assetname = document.getElementById("asset-name").value;
  let quantity = document.getElementById("quantity").value;
  let purchasePrice = document.getElementById("purchase-price").value;
  let currentPrice = document.getElementById("current-price").value;

  let url = "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio.json";
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({

      
      assetType: assetType,
      assetname:assetname,
      quantity: quantity,
      purchasePrice: purchasePrice,
      currentPrice: currentPrice
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  displayData();
  document.getElementById("asset-name").value = "";
  document.getElementById("asset").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("purchase-price").value = "";
  document.getElementById("current-price").value = "";
  updatedataonPie();
  updatedataonLine();
}

const ctx = document.getElementById('myChart1');
let chartInstance;

function updatedataonPie() {
  let url = "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio.json";
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then(data => {
    let stock = 0;
    let crypto = 0;
    let bonds = 0;
    Object.entries(data).forEach(key => {
      if (key[1].assetType == "stock") {
        stock += parseInt(key[1].quantity);
      }
      if (key[1].assetType == "crypto") {
        crypto += parseInt(key[1].quantity);
      }
      if (key[1].assetType == "bond") {
        bonds += parseInt(key[1].quantity);
      }
    });

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Stock", "Crypto", "Bonds"],
        datasets: [{
          label: 'quantity of Votes',
          data: [stock, crypto, bonds],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
}

const ctx2 = document.getElementById('myChart2');
let chartInstance2;

function updatedataonLine() {
  let url = "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio.json";
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then(data => {
    let stock = 0;
    let crypto = 0;
    let bonds = 0;
    Object.entries(data).forEach(key => {
      if (key[1].assetType == "stock") {
        stock += parseInt(key[1].quantity);
      }
      if (key[1].assetType == "crypto") {
        crypto += parseInt(key[1].quantity);
      }
      if (key[1].assetType == "bond") {
        bonds += parseInt(key[1].quantity);
      }
    });

    if (chartInstance2) {
      chartInstance2.destroy();
    }

    chartInstance2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ["Stock", "Crypto", "Bonds"],
        datasets: [{
          label: 'quantity of Votes',
          data: [stock, crypto, bonds],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
}

const ctx3 = document.getElementById('myChart3');
let chartInstance3;

function updatedataonBar() {
  let url = "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio.json";
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then(data => {
    let labels = [];
    let profitLoss = [];
    Object.entries(data).forEach(key => {
      let { assetType, assetname, purchasePrice, currentPrice } = key[1];
      labels.push(assetType);
      profitLoss.push((currentPrice - purchasePrice).toFixed(2));
    });

    if (chartInstance3) {
      chartInstance3.destroy();
    }

    chartInstance3 = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Profit/Loss',
          data: profitLoss,
          backgroundColor: profitLoss.map(value => value > 0 ? 'green' : 'red'),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
}

const ctx4 = document.getElementById('myChart4');
let chartInstance4;

function updatedataonRadar() {
  let url = "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio.json";
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then(data => {
    let labels = [];
    let quantities = [];
    Object.entries(data).forEach(key => {
      let { assetType, quantity } = key[1];
      labels.push(assetType);
      quantities.push(parseInt(quantity));
    });

    if (chartInstance4) {
      chartInstance4.destroy();
    }

    chartInstance4 = new Chart(ctx4, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Asset Distribution',
          data: quantities,
          borderWidth: 1,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  });
}

function makeDivsDraggable() {
  const draggables = document.querySelectorAll('.draggable');
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });
  });

  const containers = document.querySelectorAll('.grid-container'); 
  containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
      container.appendChild(draggable);
    });
  });




}



const alphaVantageApiKey = "6BQD22E8CHS7ZQVH"; 

        // Asset categories (Add more if needed)
        const assets = [
            { type: "Stock", symbol: "RELIANCE.BSE" },
            { type: "Stock", symbol: "TCS.BSE" },
            { type: "Crypto", symbol: "BTCINR" }, // Bitcoin to INR
            { type: "Crypto", symbol: "ETHINR" }, // Ethereum to INR
            { type: "Bond", symbol: "GOVT.BSE" }  // Example bond (change if needed)
        ];

        async function getAssetValue(asset) {
            try {
                let url = "";
                if (asset.type === "Stock" || asset.type === "Bond") {
                    url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${asset.symbol}&apikey=${alphaVantageApiKey}`;
                } else if (asset.type === "Crypto") {
                    url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${asset.symbol.replace("INR", "")}&to_currency=INR&apikey=${alphaVantageApiKey}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                if (asset.type === "Stock" || asset.type === "Bond") {
                    return data["Global Quote"]?.["05. price"] || "N/A";
                } else if (asset.type === "Crypto") {
                    return data["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"] || "N/A";
                }
            } catch (error) {
                console.error(`Error fetching value for ${asset.symbol}:`, error);
                return "N/A";
            }
        }

        async function updateAssetValues() {
            const assetList = document.getElementById("asset-list");
            assetList.innerHTML = ""; // Clear previous data

            for (let asset of assets) {
                let value = await getAssetValue(asset);
                assetList.innerHTML += `
                    <tr>
                        <td class="p-2 border border-gray-300">${asset.type}</td>
                        <td class="p-2 border border-gray-300">${asset.symbol}</td>
                        <td class="p-2 border border-gray-300 font-bold">${value} ₹</td>
                    </tr>
                `;
            }
        }

        updateAssetValues(); // Fetch values on page load
        setInterval(updateAssetValues, 60000); // Auto-refresh every 60 seconds




