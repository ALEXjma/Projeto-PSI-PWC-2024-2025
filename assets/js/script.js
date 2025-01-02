$(document).ready(function () {
    fetchCountries();
});

function fetchCountries() {
    var api_url = "https://restcountries.com/v3.1/all";

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
    var listaPaises = $("#countriesList");
    listaPaises.empty();

    arrayPaises.forEach((country) => {
        var languages = country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A";
        var currencies = country.currencies
            ? Object.values(country.currencies)
                  .map((currency) => currency.name)
                  .join(", ")
            : "N/A";
        var latlng = country.latlng
            ? `${country.latlng[0]}, ${country.latlng[1]}`
            : "N/A";
        var paisCard = 
                `<div class="col py-3 col-sm-8 col-md-3">
                    <div class="card shadow custom-body-secondary-bg">
                        <img src="${country.flags.png}" class="card-img-top" alt="${country.name}" />
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text"><b>População:</b> ${country.population}</p>
                            <p class="card-text"><b>Capital:</b> ${country.capital}</p>
                            <p class="card-text"><b>Idiomas:</b> ${languages}</p>
                            <p class="card-text"><b>Moeda:</b> ${currencies}</p>
                            <p class="card-text"><b>Localização Geaográfica:</b> ${latlng}</p>
                            <div class="btn-group">
                                <a href="detalhes_paises.html" class="btn btn-outline-dark">Ver</a>
                            </div>
                        </div>
                    </div>
                </div>`;

        listaPaises.append(paisCard);
    });
}
