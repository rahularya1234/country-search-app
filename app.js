const appRoot = document.getElementById('app-root');



//Heading

const appHeader = document.createElement('h1');
appHeader.textContent = 'Countries Search';
appHeader.classList.add('heading');
appRoot.appendChild(appHeader);

// Form 

const form = document.createElement('form');
appRoot.append(form);

//paragraph 

const searchTypeDescription = document.createElement('p');
searchTypeDescription.textContent = 'Please choose the type of search:';
searchTypeDescription.classList.add('p');
form.append(searchTypeDescription);

//region rselect

const byRegionRadio = document.createElement('input');
byRegionRadio.type = 'radio';
byRegionRadio.name = 'searchType';
byRegionRadio.value = 'ByRegion';
const byRegionLabel = document.createElement('label');
byRegionLabel.textContent = 'By Region';
byRegionLabel.prepend(byRegionRadio);

// Language select

const byLanguageRadio = document.createElement('input');
byLanguageRadio.type = 'radio';
byLanguageRadio.name = 'searchType';
byLanguageRadio.value = 'ByLanguage';
const byLanguageLabel = document.createElement('label');
byLanguageLabel.textContent = 'By Language';
byLanguageLabel.prepend(byLanguageRadio);

form.append(byRegionLabel, byLanguageLabel);

//choose

const searchQueryDescription = document.createElement('p');
searchQueryDescription.textContent = 'Please choose search query:';
searchQueryDescription.classList.add('search')
form.append(searchQueryDescription);

//select option

const searchQueryDropdown = document.createElement('select');
const defaultOption = document.createElement('option');
defaultOption.textContent = 'Select value';
searchQueryDropdown.append(defaultOption);
form.append(searchQueryDropdown);


searchQueryDropdown.disabled = true;

byRegionRadio.addEventListener('change', function () {
    searchQueryDropdown.disabled = false;
    populateDropdown('regions');
});

byLanguageRadio.addEventListener('change', function () {
    searchQueryDropdown.disabled = false;
    populateDropdown('languages');
});

function populateDropdown(type) {
    searchQueryDropdown.innerHTML = '';
    searchQueryDropdown.append(defaultOption);

    let list = [];
    if (type === 'regions') {
        list = externalService.getRegionsList();
    } else if (type === 'languages') {
        list = externalService.getLanguagesList();
    }

    list.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        searchQueryDropdown.append(option);
    });
}

// data table

const table = document.createElement('table');
appRoot.append(table);

const thead = document.createElement('thead');
table.append(thead);
const headerRow = document.createElement('tr');
thead.append(headerRow);
const headers = ['Country Name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag'];
headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.append(th);
});



const tbody = document.createElement('tbody');
table.append(tbody);


function populateTable(data) {
    tbody.innerHTML = '';

    // Populate table with new rows
    data.forEach(item => {
        const row = document.createElement('tr');
        tbody.append(row);

        const countryCell = document.createElement('td');
        countryCell.textContent = item.name;
        row.append(countryCell);

        const capitalCell = document.createElement('td');
        capitalCell.textContent = item.capital;
        row.append(capitalCell);

        const regionCell = document.createElement('td');
        regionCell.textContent = item.region;
        row.append(regionCell);

        const languagesCell = document.createElement('td');
        const languages = Object.values(item.languages).join(', ');
        languagesCell.textContent = languages;
        row.append(languagesCell);

        const areaCell = document.createElement('td');
        areaCell.textContent = item.area;
        row.append(areaCell);

        const flagCell = document.createElement('td');
        const flagImg = document.createElement('img');
        flagImg.src = item.flagURL;
        flagImg.style.width = '50px';
        flagCell.append(flagImg);
        row.append(flagCell);
    });
}

searchQueryDropdown.addEventListener('change', function () {
    if (this.value !== 'Select value') {
        let data = [];
        if (byRegionRadio.checked) {
            data = externalService.getCountryListByRegion(this.value);
        } else if (byLanguageRadio.checked) {
            data = externalService.getCountryListByLanguage(this.value);
        }
        populateTable(data);
    }
});
