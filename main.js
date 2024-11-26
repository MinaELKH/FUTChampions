
let erreurForm = document.getElementById("pargErreur");
let FormAddPlayer = document.getElementById("modalFormAddPlayer");
let modalSelectPlayer= document.getElementById("modalSelectPlayer");
let ulPlayers = document.getElementById("ulPlayers");
/******************************************* */
let  players  = []  
let id=1 ; 
/*************************** */
/*    local storage          */
/*************************** */


if(localStorage.getItem("players") && JSON.parse(localStorage.getItem("players").length)>0)
    {
        players = JSON.parse(localStorage.getItem("players")) ; 
        id= localStorage.getItem("id") ;
        players.forEach(player => {
            console.log("hhh");
            addPlayerToList(player);    
        });
    } 
else {
   
}

document.getElementById("btnOpenAddForm").addEventListener("click", function () {
    FormAddPlayer.classList.remove("hidden");
  });
document.getElementById("closeFormAdd").addEventListener("click", function () {
    FormAddPlayer.classList.add("hidden");
 // erreurForm1.classList.add("hidden");
 // erreurForm1.innerHTML = "";
});
document.getElementById("closeSelectPlayer").addEventListener("click", function () {
    modalSelectPlayer.classList.add("hidden");
});

//ajout player
document.getElementById("btnAddplayer").addEventListener("click", AddPlayer);
function AddPlayer(event){
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const note = document.getElementById("note").value.trim();
    const photo = document.getElementById("photo").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const flag = document.getElementById("flag").value.trim();
    const club = document.getElementById("club").value.trim();
    const rating = document.getElementById("rating").value.trim();
    const pace = document.getElementById("pace").value.trim();
    const shooting = document.getElementById("shooting").value.trim();
    const passing = document.getElementById("passing").value.trim();
    const dribbling = document.getElementById("dribbling").value.trim();
    const defending = document.getElementById("defending").value.trim();
    const physical = document.getElementById("physical").value.trim();
    const position = document.getElementById("position").value.trim();

   
    if (!name || !note || !photo || !nationality || !flag || !club || !rating || !pace ||  !shooting || !passing || !dribbling || !defending || !physical) {
        alert("Veuillez remplir tous les champs obligatoires !");
        return;
    }
    if (!isValidURL(photo) || !isValidURL(nationality) || !isValidURL(flag) || !isValidURL(club)) {
        alert("Veuillez entrer des URL valides pour Nationality, Flag et Club !");
        return;
    }
    if (isNaN(rating) || isNaN(pace) || isNaN(shooting) || isNaN(passing) || isNaN(dribbling) || isNaN(defending) || isNaN(physical)) {
        alert("Les statistiques doivent être des nombres !");
        return;
    }

    console.log("Formulaire validé avec succès !");

    id++;
    let player = {};
    player.id = id; 
    player.name = name; 
    player.note = note;  
    player.photo = photo ; 
    player.position=position ; 
    player.nationality = nationality;
    player.flag = flag;  
    player.club = club;
    player.rating = rating;
    player.pace = pace;
    player.shooting = shooting;
    player.passing = passing;
    player.dribbling = dribbling;
    player.defending = defending;
    player.physical = physical;
    player.isActif = false ; 
    players.push(player);
    localStorage.setItem("players" ,JSON.stringify(players) ) ; 
    localStorage.setItem("id" ,id) ;
    addPlayerToList(player);
    
}

function addPlayerToList(player){
    let li = document.createElement("li") ;
    li.innerHTML = playerCodeHtml(player) 
    ulPlayers.appendChild(li); 
}
function playerCodeHtml(player){
    codeHtml=` <div class="ST_G"> 
        <div class="badge_gold" >
         <div class="note">
                            <h4>${player.note}</h4>
                            <h5>${player.position}</h5>
                          </div>
            <div class="photo">
                <img src=${player.photo} class="" alt="joueur">
            </div>
            <h4 class="nom">${player.name} </h4>
            <div class="statistique">
               
                    <div>
                        <h5>PAC</h5> 
                        <h4>${player.pace} </h4>
                    </div>
                    <div >
                        <h5>SHO</h5> 
                        <h4>${player.shooting}</h4>
                    </div>
                    <div >
                        <h5>PAS</h5> 
                        <h4>${player.passing}</h4>
                    </div>
                    <div >
                        <h5>DRI</h5> 
                        <h4>${player.dribbling}</h4>
                    </div>
                    <div >
                        <h5>DEF</h5> 
                        <h4>${player.defending}</h4>
                    </div>
                    <div >
                        <h5>PHY</h5> 
                        <h4>${player.physical}</h4>
                    </div>
                
            </div>
            <div class="flag">
                <img src="${player.nationality}" alt="nationalite">
                <img src="${player.flag}"  alt="flag">
                <img src="${player.nationality}"  alt="logoJr">
            </div>
        </div>
        </div>   ` ; 
        return codeHtml ; 

}
function isValidURL(string) {
    try{
        new URL(string) ;
        return true
    }
    catch(err){
        console.log(err); 
        return false ; 
    }
}    
function getPlayer(id){
    index = players.findIndex(p=>p.id == id ); 
    let player = players[index];
    return player ; 
}
//add player to stadium
let selectPlayer = document.getElementById("selectplayer")

const All_icon = document.querySelectorAll('.iconAddPlayerStd');
 let divParent =""
All_icon.forEach((AddPlayerStd, index) => {
    AddPlayerStd.addEventListener("click", function () {
        modalSelectPlayer.classList.remove("hidden");     
        divParent= All_icon[index].parentNode; 
        console.log("divparent");
        console.log(divParent.parentNode);
        let x = divParent.parentNode;
        let pos = x.getAttribute("id") ;

        console.log("position  : ");
        console.log(pos);
        selectPlayer.innerHTML=`` ;

        players.forEach(p => {
            if(p.position == pos){
            let option = document.createElement("option") ;
            option.value = p.id ; 
            option.textContent= p.name ;
            selectPlayer.appendChild(option) ;  }         
            });
        });
});
selectPlayer.addEventListener("change" , function(){
    let player = getPlayer(this.value);
    divParent.innerHTML=`` ;  
    divParent.innerHTML = playerCodeHtml(player) ;

})







 players=  [
   
    {
      "name": "Cristiano Ronaldo",
      "photo": "https://cdn.sofifa.net/players/020/801/25_120.png",
      "position": "LST",
      "nationality": "Portugal",
      "flag": "https://cdn.sofifa.net/flags/pt.png",
      "club": "Al Nassr",
      "logo": "https://cdn.sofifa.net/meta/team/2506/120.png",
      "rating": 91,
      "pace": 84,
      "shooting": 94,
      "passing": 82,
      "dribbling": 87,
      "defending": 34,
      "physical": 77
    },
    {
      "name": "Kevin De Bruyne",
      "photo": "https://cdn.sofifa.net/players/192/985/25_120.png",
      "position": "LCM",
      "nationality": "Belgium",
      "flag": "https://cdn.sofifa.net/flags/be.png",
      "club": "Manchester City",
      "logo": "https://cdn.sofifa.net/players/239/085/25_120.png",
      "rating": 91,
      "pace": 74,
      "shooting": 86,
      "passing": 93,
      "dribbling": 88,
      "defending": 64,
      "physical": 78
    },
    {
      "name": "Kylian Mbappé",
      "photo": "https://cdn.sofifa.net/players/231/747/25_120.png",
      "position": "LST",
      "nationality": "France",
      "flag": "https://cdn.sofifa.net/flags/fr.png",
      "club": "Real Madrid",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": 92,
      "pace": 97,
      "shooting": 89,
      "passing": 80,
      "dribbling": 92,
      "defending": 39,
      "physical": 77
    },
    {
      "name": "Virgil van Dijk",
      "photo": "https://cdn.sofifa.net/players/203/376/25_120.png",
      "position": "LCB",
      "nationality": "Netherlands",
      "flag": "https://cdn.sofifa.net/flags/nl.png",
      "club": "Liverpool",
      "logo": "https://cdn.sofifa.net/meta/team/8/120.png",
      "rating": 90,
      "pace": 75,
      "shooting": 60,
      "passing": 70,
      "dribbling": 72,
      "defending": 92,
      "physical": 86
    },
    {
      "name": "Antonio Rudiger",
      "photo": "https://cdn.sofifa.net/players/205/452/25_120.png",
      "position": "RCB",
      "nationality": "Germany",
      "flag": "https://cdn.sofifa.net/flags/de.png",
      "club": "Real Madrid",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": 88,
      "pace": 82,
      "shooting": 55,
      "passing": 73,
      "dribbling": 70,
      "defending": 86,
      "physical": 86
    },
    {
      "name": "Neymar Jr",
      "photo": "https://cdn.sofifa.net/players/190/871/25_120.png",
      "position": "LW",
      "nationality": "Brazil",
      "flag": "https://cdn.sofifa.net/flags/br.png",
      "club": "Al-Hilal",
      "logo": "https://cdn.sofifa.net/meta/team/7011/120.png",
      "rating": 90,
      "pace": 91,
      "shooting": 83,
      "passing": 86,
      "dribbling": 94,
      "defending": 37,
      "physical": 61
    },
    {
      "name": "Mohamed Salah",
      "photo": "https://cdn.sofifa.net/players/192/985/25_120.png",
      "position": "RW",
      "nationality": "Egypt",
      "flag": "https://cdn.sofifa.net/flags/eg.png",
      "club": "Liverpool",
      "logo": "https://cdn.sofifa.net/meta/team/8/120.png",
      "rating": 89,
      "pace": 93,
      "shooting": 87,
      "passing": 81,
      "dribbling": 90,
      "defending": 45,
      "physical": 75
    },
    {
      "name": "Joshua Kimmich",
      "photo": "https://cdn.sofifa.net/players/212/622/25_120.png",
      "position": "RCM",
      "nationality": "Germany",
      "flag": "https://cdn.sofifa.net/flags/de.png",
      "club": "Bayern Munich",
      "logo": "https://cdn.sofifa.net/meta/team/503/120.png",
      "rating": 89,
      "pace": 70,
      "shooting": 75,
      "passing": 88,
      "dribbling": 84,
      "defending": 84,
      "physical": 81
    },
    {
      "name": "Jan Oblak",
      "photo": "https://cdn.sofifa.net/players/200/389/25_120.png",
      "position": "GK",
      "nationality": "Slovenia",
      "flag": "https://cdn.sofifa.net/flags/si.png",
      "club": "Atletico Madrid",
      "logo": "https://cdn.sofifa.net/meta/team/7980/120.png",
      "rating": 91,
      "diving": 89,
      "handling": 90,
      "kicking": 78,
      "reflexes": 92,
      "speed": 50,
      "positioning": 88
    },
    {
      "name": "Luka Modrić",
      "photo": "https://cdn.sofifa.net/players/177/003/25_120.png",
      "position": "RCM",
      "nationality": "Croatia",
      "flag": "https://cdn.sofifa.net/flags/hr.png",
      "club": "Real Madrid",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": 88,
      "pace": 74,
      "shooting": 78,
      "passing": 89,
      "dribbling": 90,
      "defending": 72,
      "physical": 65
    },
    {
      "name": "Vinicius Junior",
      "photo": "https://cdn.sofifa.net/players/238/794/25_120.png",
      "position": "LW",
      "nationality": "Brazil",
      "flag": "https://cdn.sofifa.net/flags/br.png",
      "club": "Real Madrid",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": 89,
      "pace": 91,
      "shooting": 88,
      "passing": 85,
      "dribbling": 94,
      "defending": 39,
      "physical": 61
    },
    {
      "name": "Brahim Diáz",
      "photo": "https://cdn.sofifa.net/players/231/410/25_120.png",
      "position": "LW",
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Real Madrid",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": 82,
      "pace": 85,
      "shooting": 74,
      "passing": 78,
      "dribbling": 85,
      "defending": 31,
      "physical": 56
    },
    {
      "name": "Karim Benzema",
      "photo": "https://cdn.sofifa.net/players/165/153/25_120.png",
      "position": "RST",
      "nationality": "France",
      "flag": "https://cdn.sofifa.net/flags/fr.png",
      "club": "Al-Ittihad",
      "logo" :"https://cdn.sofifa.net/meta/team/476/120.png",
      "rating": 90,
      "pace": 77,
      "shooting": 90,
      "passing": 83,
      "dribbling": 88,
      "defending": 40,
      "physical": 78
    },
    {
      "name": "Erling Haaland",
      "photo": "https://cdn.sofifa.net/players/239/085/25_120.png",
      "position": "RST",
      "nationality": "Norway",
      "flag": "https://cdn.sofifa.net/flags/no.png",
      "club": "Manchester City",
      "logo": "https://cdn.sofifa.net/players/239/085/25_120.png",
      "rating": 91,
      "pace": 89,
      "shooting": 94,
      "passing": 65,
      "dribbling": 80,
      "defending": 45,
      "physical": 88
    },
    {
      "name": "N'Golo Kanté",
      "photo": "https://cdn.sofifa.net/players/215/914/25_120.png",
      "position": "CDM",
      "nationality": "France",
      "flag": "https://cdn.sofifa.net/flags/fr.png",
      "club": "Al-Ittihad",
      "logo": "https://cdn.sofifa.net/meta/team/476/120.png",
      "rating": 87,
      "pace": 77,
      "shooting": 66,
      "passing": 75,
      "dribbling": 82,
      "defending": 88,
      "physical": 82
    },
    {
      "name": "Alphonso Davies",
      "photo": "https://cdn.sofifa.net/players/234/396/25_120.png",
      "position": "LB",
      "nationality": "Canada",
      "flag": "https://cdn.sofifa.net/flags/ca.png",
      "club": "Bayern Munich",
      "logo": "https://cdn.sofifa.net/meta/team/503/120.png",
      "rating": 84,
      "pace": 96,
      "shooting": 68,
      "passing": 77,
      "dribbling": 82,
      "defending": 76,
      "physical": 77
    },
    {
      "name": "Yassine Bounou",
      "photo": "https://cdn.sofifa.net/players/209/981/25_120.png",
      "position": "GK",
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Al-Hilal",
      "logo": "https://cdn.sofifa.net/meta/team/7011/120.png",
      "rating": 84,
      "diving": 81,
      "handling": 82,
      "kicking": 77,
      "reflexes": 86,
      "speed": 38,
      "positioning": 83
    },
    {
      "name": "Bruno Fernandes",
      "photo": "https://cdn.sofifa.net/players/212/198/25_120.png",
      "position": "LCM",
      "nationality": "Portugal",
      "flag": "https://cdn.sofifa.net/flags/pt.png",
      "club": "Manchester United",
      "logo": "https://cdn.sofifa.net/meta/team/14/120.png",
      "rating": 88,
      "pace": 75,
      "shooting": 85,
      "passing": 89,
      "dribbling": 84,
      "defending": 69,
      "physical": 77
    },
    {
      "name": "Jadon Sancho",
      "photo": "https://cdn.sofifa.net/players/233/049/25_120.png",
      "position": "LW",
      "nationality": "England",
      "flag": "https://cdn.sofifa.net/flags/gb-eng.png",
      "club": "Manchester United",
      "logo": "https://cdn.sofifa.net/meta/team/14/120.png",
      "rating": 84,
      "pace": 85,
      "shooting": 74,
      "passing": 78,
      "dribbling": 88,
      "defending": 34,
      "physical": 63
    },
    {
      "name": "Trent Alexander-Arnold",
      "photo": "https://cdn.sofifa.net/players/231/281/25_120.png",
      "position": "RB",
      "nationality": "England",
      "flag": "https://cdn.sofifa.net/flags/gb-eng.png",
      "club": "Liverpool",
      "rating": 87,
      "pace": 76,
      "shooting": 66,
      "passing": 89,
      "dribbling": 80,
      "defending": 79,
      "physical": 71
    },
    {
      "name": "Achraf Hakimi",
      "photo": "https://cdn.sofifa.net/players/235/212/25_120.png",
      "position": "RB",
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Paris Saint-Germain",
      "logo": "https://cdn.sofifa.net/meta/team/591/120.png",
      "rating": 84,
      "pace": 91,
      "shooting": 76,
      "passing": 80,
      "dribbling": 80,
      "defending": 75,
      "physical": 78
    },
    {
      "name": "Youssef En-Nesyri",
      "photo": "https://cdn.sofifa.net/players/235/410/25_120.png",
      "position": "RST",
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Fenerbahçe",
      "logo": "https://cdn.sofifa.net/meta/team/88/120.png",
      "rating": 83,
      "pace": 82,
      "shooting": 82,
      "passing": 63,
      "dribbling": 77,
      "defending": 36,
      "physical": 80
    },
    {
      "name": "Noussair Mazraoui",
      "photo": "https://cdn.sofifa.net/players/236/401/25_120.png",
      "position": "LB",
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Manchester United",
      "logo": "https://cdn.sofifa.net/meta/team/14/120.png",
      "rating": 81,
      "pace": 78,
      "shooting": 66,
      "passing": 77,
      "dribbling": 83,
      "defending": 77,
      "physical": 71
    },
    {
      "name": "Ismael Saibari",
      "photo": "https://cdn.sofifa.net/players/259/480/25_120.png",
      "position": "LCM",
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "PSV",
      "logo": "https://cdn.sofifa.net/meta/team/682/120.png",
      "rating": 83,
      "pace": 89,
      "shooting": 78,
      "passing": 80,
      "dribbling": 86,
      "defending": 55,
      "physical": 84
    },
    {
      "name": "Gianluigi Donnarumma",
      "photo": "https://cdn.sofifa.net/players/230/621/25_120.png",
      "position": "GK",
      "nationality": "Italy",
      "flag": "https://cdn.sofifa.net/flags/it.png",
      "club": "Paris Saint-Germain",
      "logo": "https://cdn.sofifa.net/meta/team/591/120.png",
      "rating": 89,
      "diving": 88,
      "handling": 84,
      "kicking": 75,
      "reflexes": 90,
      "speed": 50,
      "positioning": 85
    }
  ]