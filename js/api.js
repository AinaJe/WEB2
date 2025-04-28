const latitude = 57.25283; // Talsu platums
const longitude = 22.60290; // Talsu garums

// Pieprasījums 2 dienu prognozei pa stundām
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,windspeed_10m&current=temperature_2m&forecast_days=2&timezone=Europe%2FRiga`)
  .then(response => response.json())
  .then(data => {
    console.log("Stundu dati:", data);

    // Parādīt pašreizējo temperatūru lokālajā laikā
    if (data.current && data.current.time && data.current.temperature_2m) {
      const currentTemperature = data.current.temperature_2m;
      const currentTime = new Date(data.current.time);
      const formattedTime = `${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
      document.getElementById('current-temperature').textContent = `Pašreizējā temperatūra Talsos (${formattedTime}): ${currentTemperature} °C`;
    } else {
      console.error('Pašreizējās temperatūras dati nav pieejami.');
    }

    // Parādīt divu dienu prognozi pa stundām ar krāsojumu
    const hourlyForecastElement = document.getElementById('hourly-forecast');
    if (hourlyForecastElement && data.hourly && data.hourly.time && data.hourly.temperature_2m && data.hourly.precipitation && data.hourly.windspeed_10m) {
      const hourlyTimes = data.hourly.time;
      const hourlyTemperatures = data.hourly.temperature_2m;
      const hourlyPrecipitation = data.hourly.precipitation;
      const hourlyWindspeed = data.hourly.windspeed_10m;

      let tableHTML = '<h3>Nākamo divu dienu prognoze pa stundām:</h3><table><thead><tr><th>Laiks</th><th>Temp.</th><th>Nokrišņi</th><th>Vējš</th></tr></thead><tbody>';
      for (let i = 0; i < hourlyTimes.length; i++) {
        const timeUTC = new Date(hourlyTimes[i]);
        const localOffset = timeUTC.getTimezoneOffset() * 60000;
        const localTime = new Date(timeUTC.getTime() + localOffset);
        const formattedTime = `${String(localTime.getHours()).padStart(2, '0')}:${String(localTime.getMinutes()).padStart(2, '0')}`;
        const hourlyTemp = hourlyTemperatures[i];
        let tempStyle = '';
        if (hourlyTemp < 5) {
          tempStyle = 'style="background-color: lightblue;"';
        }
        tableHTML += `<tr ${tempStyle}><td>${formattedTime}</td><td>${hourlyTemp} °C</td><td>${hourlyPrecipitation[i]} mm</td><td>${hourlyWindspeed[i]} m/s</td></tr>`;
      }
      tableHTML += '</tbody></table>';
      hourlyForecastElement.innerHTML = tableHTML;
    } else {
      console.error('Divu dienu prognozes dati pa stundām nav pieejami vai elements nav atrasts.');
    }
  })
  .catch(error => {
    console.error('Kļūda, ielādējot stundu laika apstākļus:', error);
  });



// Pieprasījums 16 dienu prognozei pa dienām
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&forecast_days=16&timezone=Europe%2FRiga`)
  .then(response => response.json())
  .then(data => {
    console.log("Dienas dati:", data);

    // Parādīt 16 dienu prognozi tabulā ar krāsojumu
    const forecastTableElement = document.getElementById('two-week-forecast-table');
    if (forecastTableElement && data.daily && data.daily.time && data.daily.temperature_2m_max && data.daily.temperature_2m_min) {
      const forecastDays = data.daily.time;
      const maxTemperatures = data.daily.temperature_2m_max;
      const minTemperatures = data.daily.temperature_2m_min;

      let tableHTML = '<h3>Nākamo 16 dienu prognoze:</h3><table><thead><tr><th>Datums</th><th>Min. Temp.</th><th>Max. Temp.</th></tr></thead><tbody>';
      for (let i = 0; i < forecastDays.length; i++) {
        const dateUTC = new Date(forecastDays[i]);
        const localOffset = dateUTC.getTimezoneOffset() * 60000;
        const localDate = new Date(dateUTC.getTime() + localOffset);
        const day = String(localDate.getDate()).padStart(2, '0');
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const year = localDate.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        const minTemp = minTemperatures[i];
        const maxTemp = maxTemperatures[i];
        let minTempStyle = '';
        let maxTempStyle = '';

        if (minTemp < 5) {
          minTempStyle = 'style="background-color: lightblue;"';
        }
        if (maxTemp > 30) {
          maxTempStyle = 'style="background-color: lightcoral;"';
        }

        tableHTML += `<tr><td>${formattedDate}</td><td ${minTempStyle}>${minTemp} °C</td><td ${maxTempStyle}>${maxTemp} °C</td></tr>`;
      }
      tableHTML += '</tbody></table>';
      forecastTableElement.innerHTML = tableHTML;
    } else {
      console.error('16 dienu prognozes dati nav pieejami vai elements nav atrasts.');
    }
  })
  .catch(error => {
    console.error('Kļūda, ielādējot dienas laika apstākļus:', error);
  });



// Attēlu galerija
  const imageContainer = document.getElementById('image-container');
  const apiKey = 'M8gqn8GM5jLL0vbylqOHscaATFv4zrFm1rHsGniPzj0'; // Šeit ievadiet savu API atslēgu

  const apiUrl = `https://api.unsplash.com/photos/random?count=10&client_id=${apiKey}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          data.forEach(photo => {
              const imageItem = document.createElement('div');
              imageItem.classList.add('image-item');
              const img = document.createElement('img');
              img.src = photo.urls.regular;
              img.alt = photo.alt_description;
              imageItem.appendChild(img);
              imageContainer.appendChild(imageItem);
          });
      })
      .catch(error => console.error('Kļūda, ielādējot attēlus:', error));



      // Angļu valodai
      const searchInput = document.getElementById('searchInput');
        const resultDiv = document.getElementById('result');

        function searchWord() {
            const word = searchInput.value.trim();
            if (word) {
                fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Vārds netika atrasts (status: ${response.status})`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        displayResult(data);
                    })
                    .catch(error => {
                        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
                    });
            } else {
                resultDiv.innerHTML = '<p>Lūdzu, ievadiet vārdu.</p>';
            }
        }

        
        function displayResult(data) {
            resultDiv.innerHTML = ''; // Notīrīt iepriekšējos rezultātus
            if (data && data.length > 0) {
                data.forEach(entry => {
                    const wordHeading = document.createElement('h2');
                    wordHeading.textContent = entry.word;
                    resultDiv.appendChild(wordHeading);
        
                    // Grupējam nozīmes pēc vārdšķirām
                    const meaningsByPartOfSpeech = {};
                    entry.meanings.forEach(meaning => {
                        if (!meaningsByPartOfSpeech[meaning.partOfSpeech]) {
                            meaningsByPartOfSpeech[meaning.partOfSpeech] = [];
                        }
                        meaningsByPartOfSpeech[meaning.partOfSpeech].push(meaning);
                    });
        
                    // Attēlojam nozīmes grupās kā akordeonus
                    for (const partOfSpeech in meaningsByPartOfSpeech) {
                        if (meaningsByPartOfSpeech.hasOwnProperty(partOfSpeech)) {
                            const partOfSpeechGroup = document.createElement('div');
                            partOfSpeechGroup.classList.add('partOfSpeechGroup');
        
                            const button = document.createElement('button');
                            button.classList.add('showContentBtn');
                            button.dataset.id = partOfSpeech.replace(/\s+/g, '-'); // Izveido unikālu ID
                            button.textContent = partOfSpeech;
                            partOfSpeechGroup.appendChild(button);
        
                            const contentSection = document.createElement('section');
                            contentSection.id = partOfSpeech.replace(/\s+/g, '-');
                            contentSection.classList.add('inactiveSec');
        
                            meaningsByPartOfSpeech[partOfSpeech].forEach(meaning => {
                                const meaningDiv = document.createElement('div');
                                meaningDiv.classList.add('meaning');
        
                                const definitionsList = document.createElement('ul');
                                meaning.definitions.forEach(definitionObj => {
                                    const listItem = document.createElement('li');
                                    listItem.classList.add('definition');
                                    listItem.textContent = definitionObj.definition;
                                    definitionsList.appendChild(listItem);
        
                                    if (definitionObj.example) {
                                        const example = document.createElement('p');
                                        example.classList.add('example');
                                        example.textContent = `Piemērs: "${definitionObj.example}"`;
                                        listItem.appendChild(example); // Pievienojam piemēru kā li elementa apakšelementu
                                    }
                                });
                                contentSection.appendChild(definitionsList);
        
                                if (meaning.synonyms && meaning.synonyms.length > 0) {
                                    const synonymsParagraph = document.createElement('p');
                                    synonymsParagraph.classList.add('synonyms');
                                    synonymsParagraph.innerHTML = `<strong>Sinonīmi:</strong> ${meaning.synonyms.join(', ')}`;
                                    contentSection.appendChild(synonymsParagraph);
                                }
        
                                if (meaning.antonyms && meaning.antonyms.length > 0) {
                                    const antonymsParagraph = document.createElement('p');
                                    antonymsParagraph.classList.add('antonyms');
                                    antonymsParagraph.innerHTML = `<strong>Antonīmi:</strong> ${meaning.antonyms.join(', ')}`;
                                    contentSection.appendChild(antonymsParagraph);
                                }
                            });
                            partOfSpeechGroup.appendChild(contentSection);
                            resultDiv.appendChild(partOfSpeechGroup);
                        }
                    }
        
                    // Pievienojam akordeona funkcionalitāti pēc datu ielādes
                    const showContentBtns = document.querySelectorAll(".showContentBtn");
                    const sections = document.querySelectorAll("section");
                    const closeDelay = 300;
        
                    for (const button of showContentBtns) {
                        button.onclick = (event) => {
                            const secId = event.target.dataset.id;
                            const targetSection = document.querySelector("#" + secId);
                            const wasActive = targetSection.classList.contains("activeSec");
        
                            for (const sec of sections) {
                                sec.classList.remove("activeSec");
                                sec.classList.add("inactiveSec");
                            }
        
                            if (!wasActive) {
                                setTimeout(() => {
                                    targetSection.classList.remove("inactiveSec");
                                    targetSection.classList.add("activeSec");
                                }, closeDelay);
                            }
                        };
                    }
                });
            } else {
                resultDiv.innerHTML = '<p>Vārds netika atrasts.</p>';
            }
        }