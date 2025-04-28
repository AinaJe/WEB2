function preloadImage(url){
    let image = new Image();
    image.src = url;
    return image;
  }
  
  const datorkursi = [
      {
        nosaukums: "HTML",
        apraksts: "HTML, jeb Hiperteksta iezīmēšanas valoda, tika izgudrota Tim Berners-Lee Eiropas Kodolpētījumu Organizācijā (CERN) 1990. gadā kā daļa no Pasaules tīmekļa projekta; sākotnējā versija nebija formāli numurēta, bet ietvēra pamata iezīmes, piemēram, hiperteksta saites, virsrakstus, rindkopas un attēlu ievietošanu, ļaujot veidot vienkāršus, savstarpēji saistītus dokumentus tīmeklī.",
        attels: preloadImage("../images/2.jpg").src
      },
      {
        nosaukums: "CSS",
        apraksts: "CSS, jeb Kaskādes stila lapas, sākotnēji tika ierosinātas 1994. gadā ar mērķi atdalīt dokumentu strukturēšanu (ko veic HTML) no to vizuālā noformējuma; agrīnās idejas un priekšlikumi cirkulēja tīmekļa izstrādātāju aprindās, un pirmais oficiālais standarts, CSS Level 1, tika publicēts 1996. gadā, piedāvājot iespējas kontrolēt tādus elementus kā fonti, krāsas, foni un teksta izkārtojums, tādējādi ievērojami uzlabojot tīmekļa lapu vizuālo noformējumu salīdzinājumā ar HTML vien.",
        attels: preloadImage("../images/3.jpg").src
      },
      {
        nosaukums: "JavaScript",
        apraksts: "JavaScript tika izveidots Brendana Eihs (Brendan Eich) uzņēmumā Netscape Communications 1995. gadā, sākotnēji ar nosaukumu Mocha, vēlāk LiveScript, un visbeidzot pārdēvēts par JavaScript mārketinga nolūkos, lai izmantotu tālaika Java popularitāti; pirmā versija, kas tika iekļauta Netscape Navigator 2.0 pārlūkprogrammā, piedāvāja iespējas tīmekļa lapām pievienot nelielu interaktivitāti, piemēram, formu validāciju, animācijas un reakciju uz lietotāja darbībām, tādējādi padarot tīmekļa pieredzi dinamiskāku.",
        attels: preloadImage("../images/4.jpg").src
      },
      {
        nosaukums: "MySQL",
        apraksts: "MySQL tika izveidots 1995. gadā kā sadarbības projekts starp zviedru uzņēmumu MySQL AB (dibināts no David Axmark, Allan Larsson un Michael 'Monty' Widenius) un somu uzņēmumu TCX DataKonsult AB; sākotnējā versija tika izlaista kā atvērtā koda relāciju datubāzu pārvaldības sistēma, piedāvājot pamata funkcijas datu glabāšanai, vaicājumu izpildei un lietotāju pārvaldībai, ātri iegūstot popularitāti kā uzticams un ātrs risinājums tīmekļa lietotņu datu bāzēm.",
        attels: preloadImage("../images/5.jpg").src
      },
      {
        nosaukums: "PHP",
        apraksts: "PHP sākotnēji radās 1995. gadā, kad Rasmus Lerdorfs (Rasmus Lerdorf) izveidoja vienkāršu skriptu valodu 'Personal Home Page Tools' (PHP Tools) savas personīgās mājaslapas uzturēšanai; agrīnās versijas piedāvāja pamata funkcionalitāti dinamiska satura ģenerēšanai, piemēram, formu apstrādi un datu bāzu savienojumus, un tās ātri ieguva popularitāti tīmekļa izstrādātāju vidū, kuri meklēja vienkāršu veidu, kā veidot dinamiskas tīmekļa lapas bez sarežģītām serveru puses programmēšanas zināšanām.",
        attels: preloadImage("../images/6.jpg").src
      }
    ];
    
  
  
  
  
  let slideNumber = 0;
  let slidesDiv = document.querySelector('.slides');
  let leftbtn = document.querySelector('.slider_left_btn');
  let rightbtn = document.querySelector('.slider_right_btn');
  let time = 400; //Izveido mainīgo laikam
  
  
  function showSlide(number){
        slidesDiv.innerHTML = `
           <div class="slide">
              <img src="${datorkursi[number].attels}" alt="">
              <h2>${datorkursi[number].nosaukums}</h2>
              <p>${datorkursi[number].apraksts}</p>
              <button>Uzzināt vairāk</button>
          </div> `;
  }
  
  
  showSlide(slideNumber);
  
  
  leftbtn.onclick = (event)=>{
      event.preventDefault();
      slidesDiv.classList.remove('fade-in');
      slidesDiv.classList.add('fade-out');
      
      setTimeout(()=>{
        slideNumber--;
        if(slideNumber < 0){
            slideNumber = datorkursi.length -1;
        }
        showSlide(slideNumber);
        slidesDiv.classList.replace('fade-out','fade-in');
    },time);
      
  }
  
  rightbtn.onclick = (event)=>{
      event.preventDefault();
      slidesDiv.classList.remove('fade-in'); // Pazūd kadrs, ja šo aizkomentē
      slidesDiv.classList.add('fade-out');
      //return; // Un izmanto šo, lai neizpilda nākamās darbības
  
    setTimeout(()=>{
      slideNumber++;
      if(slideNumber > datorkursi.length -1){
          slideNumber=0;
      }
      showSlide(slideNumber);
      slidesDiv.classList.replace('fade-out','fade-in');
    },time)
  
  }
  //Automātiskā pāreja
  setInterval(()=>{
      rightbtn.click();
  },12000);