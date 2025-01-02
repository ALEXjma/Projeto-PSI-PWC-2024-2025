$(document).ready(function () {
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page's file name
    const params = new URLSearchParams(window.location.search);
    const nomePais = params.get("country");

    if (currentPage === "detalhes_paises.html" && nomePais) {
        fetchCountryDetails(nomePais);
    } else if (currentPage === "paises.html") {
        fetchCountries();

        $("#searchButton").on("click", function () {
            const query = $("#search-input").val().trim().toLowerCase();
            if (query) {
                searchCountries(query);
            } else {
                fetchCountries(); // Reset to show all countries if the search box is empty
            }
        });
    } else if (currentPage === "detalhes_paises.html") {
        alert("País não especificado!");
    }
});

function fetchCountries() {
    const api_url = "https://restcountries.com/v3.1/all";

    $.ajax({
        url: api_url,
        method: "GET",
        success: function (data) {
            displayCountries(data);
        },
        error: function (error) {
            console.error("Error fetching countries:", error);
        },
    });
}

function displayCountries(arrayPaises) {
    const listaPaises = $("#countriesList");
    listaPaises.empty(); // Clear any existing content

    arrayPaises.forEach((country) => {
        const paisCard = `
            <div class="col py-3 col-sm-8 col-md-3">
                <div class="card shadow custom-body-secondary-bg">
                    <img src="${country.flags.png}" height="200px" class="card-img-top" alt="${country.name.common}" />
                    <div class="card-body">
                        <div class="col-12">
                            <p class="card-title"><b>${country.name.common}</b></p>
                            <div class="btn-group justify-content-center">
                                <a href="detalhes_paises.html?country=${encodeURIComponent(country.name.common)}" class="btn btn-outline-success">Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        listaPaises.append(paisCard);
    });
}

function searchCountries(query) {
    const api_url = "https://restcountries.com/v3.1/all";

    $.ajax({
        url: api_url,
        method: "GET",
        success: function (data) {
            // Filter countries based on search query
            const filteredCountries = data.filter((country) => country.name.common.toLowerCase().includes(query));

            // Update the display with filtered results
            if (filteredCountries.length > 0) {
                displayCountries(filteredCountries);
            } else {
                $("#countriesList").html("<p>País não encontrado.</p>");
            }
        },
        error: function (error) {
            console.error("Error fetching countries for search:", error);
        },
    });
}

function fetchCountryDetails(nomePais) {
    const api_url = `https://restcountries.com/v3.1/name/${encodeURIComponent(nomePais)}`;

    $.ajax({
        url: api_url,
        method: "GET",
        success: function (data) {
            displayCountryDetails(data[0]);
        },
        error: function (error) {
            console.error("Error fetching country details:", error);
        },
    });
}

function displayCountryDetails(country) {
    $("h2").text(country.name.common);

    const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
    const currencies = country.currencies
        ? Object.values(country.currencies)
              .map((currency) => currency.name)
              .join(", ")
        : "N/A";
    const latlng = country.latlng ? `${country.latlng[0]}, ${country.latlng[1]}` : "N/A";

    const tableBody = `
        <div class="col-md-12 d-flex justify-content-center">
            <table class="table table-borderless">
                <tr>
                    <td>
                        <div class="">
                            <img src="${country.flags.png}" style="width: 400px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)" />
                        </div>
                    </td>
                    <td>
                        <div class="col-md-8">
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Nome</th>
                                        <td>${country.name.common}</td>
                                    </tr>
                                    <tr>
                                        <th>População</th>
                                        <td>${country.population.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Capital</th>
                                        <td>${country.capital ? country.capital.join(", ") : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <th>Idiomas</th>
                                        <td>${languages}</td>
                                    </tr>
                                    <tr>
                                        <th>Moeda</th>
                                        <td>${currencies}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>`;

    $("table tbody").html(tableBody);
}
