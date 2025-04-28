// AJAX = XMlHTTPRequest => Fetch API
fetch('../json/data.json')

.then((atbilde)=>{
    return atbilde.json(); // Parveido atbildi JSON formātā
})

.then((dati) => {
    ieliktTabula(dati); 
  })

.catch((error)=>{
    alert('Kļūda ielādējot datus: ' + error);       // Parāda kļūdas paziņojumu
})

.finally(()=>{
    console.log("Dati ielādēti (vai radās kļūda)."); // Ziņo par pabeigtu pieprasījumu
});

function ieliktTabula(dati) {
    let tableHTML="";
    tableHTML+=`
    <tr>
    <th>HTML tegs</th>
    <th>Apraksts</th>
    <th>Tegu atribūti un to nozīme</th>
    </tr>
    `;

for(rinda of dati.elementi){
    let attrHTML = "";
    if(rinda.atributi){
        for(const atributs in rinda.atributi){
            attrHTML+=`<b>${atributs}</b>: ${rinda.atributi[atributs]}<br>`;
        }
    }

    tableHTML+=`
    <tr>
    <td>${rinda.tegs}</td>
    <td>${rinda.apraksts}</td>
    <td>${attrHTML}</td>
    </tr>
    `;
}


document.querySelector('table').innerHTML = tableHTML; // Atjauno visu tabulas saturu
   

    console.log(dati)

  }