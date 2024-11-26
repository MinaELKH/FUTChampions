
let erreurForm = document.getElementById("pargErreur");
let formAjout = document.getElementById("modalFormAjout");
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
    formAjout.classList.remove("hidden");
  });
document.getElementById("closeFormAdd").addEventListener("click", function () {
    formAjout.classList.add("hidden");
 // erreurForm1.classList.add("hidden");
 // erreurForm1.innerHTML = "";
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