import bb, {
    pie,
    donut
} from "billboard.js";

fetch('https://restcountries.com/v2/all?fields=name,capital,alpha2Code,population,area,flags').then((resp) => {
    resp.json().then((json) => {
        shuffleArray(json)
        let pieData = [];
        let donutData = [];  
        for (const country of json.slice(0, 10)) {
            pieData.push([country.name, country.population]);
            if(!country.area) donutData.push([country.name, 0]);
            else donutData.push([country.name, country.area]);
                
            const tr = document.createElement('tr');
            const countryname = document.createElement('td');
            countryname.textContent = country.name;
            const countrycode = document.createElement('td');
            countrycode.textContent = country.alpha2Code;
            const capital = document.createElement('td');
            capital.textContent = country.capital;
            const population = document.createElement('td');
            population.textContent = country.population;
            const area = document.createElement('td');
            area.textContent = country.area;
            const flag = document.createElement('td');
            const image = document.createElement('img');
            image.setAttribute('src', country.flags.svg);
            image.setAttribute('style', 'max-width: 48px; height: auto;');
            flag.appendChild(image);
            tr.appendChild(countryname);
            tr.appendChild(countrycode);
            tr.appendChild(capital);
            tr.appendChild(population);
            tr.appendChild(area);
            tr.appendChild(flag);
            document.getElementById('table-body').appendChild(tr);
        }
        console.log(donutData)
        bb.generate({
            data: {
                columns: pieData,
                type: pie(), // for ESM specify as: pie()
            },
            bindto: "#chart1"
        });
        var chart = bb.generate({
            data: {
              columns: donutData,
              type: donut(), // for ESM specify as: donut()
            },
            donut: {
              title: "Area chart"
            },
            bindto: "#chart2"
          });
          
          
    })
});



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}