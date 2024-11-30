let erreurForm = document.getElementById("pargErreur");
let FormPlayer = document.getElementById("modalFormPlayer");
let modalSelectPlayer = document.getElementById("modalSelectPlayer");
let ulPlayers = document.getElementById("ulPlayers");
let formulaire = document.getElementById("formulaire") ;
let id_input = document.getElementById("id_input"); //, input type hidden utliisable lors de modification
let name_p = document.getElementById("name_input");
//let rating = document.getElementById("rating");
let photo = document.getElementById("photo");
let nationality = document.getElementById("nationality");
let club = document.getElementById("club");

// static plyer
let pace = document.getElementById("pace");
let shooting = document.getElementById("shooting");
let passing = document.getElementById("passing");
let dribbling = document.getElementById("dribbling");
let defending = document.getElementById("defending");
let physical = document.getElementById("physical");
// static goal

let diving = document.getElementById("diving");
let handling = document.getElementById("handling");
let kicking = document.getElementById("kicking");
let reflexes = document.getElementById("reflexes");
let speed = document.getElementById("speed");
let positioning = document.getElementById("positioning");

let position = document.getElementById("position");
let divPosition = document.getElementById("divPosition");
let statistique_GK = document.getElementById("statistique_GK");
let statistique_player = document.getElementById("statistique_player");

/******************************************* */
let players = [];
let id = 1;
let playersReserve = [];
let playerStad = [];
/*************************** */
/*    local storage          */
/*************************** */
/******  local storage liste de joueurs */
if (
  localStorage.getItem("players") &&
  JSON.parse(localStorage.getItem("players").length) > 0
) {
  players = JSON.parse(localStorage.getItem("players"));
  id = JSON.parse(localStorage.getItem("id"))
  players.forEach((player) => {
    addPlayerToList(player);
  });
} else {
 data_players.forEach(p=>{ //on ajout des donnees de joueurs fictif avce isactif = false car il sont ajout a la liste de reserve
     p.isActif = false; 
     players.push(p); 

})
  localStorage.setItem("players", JSON.stringify(players)); //stock players fictitives dans local storage
}
/******  local storage joueur sur terrain */

if ( localStorage.getItem("playerStad") && JSON.parse(localStorage.getItem("playerStad").length) > 0) {
  playerStad = JSON.parse(localStorage.getItem("playerStad"));
      afficheStade(playerStad ) ; 

}

function afficheStade(playerStad ) {
playerStad.forEach((pl) => {
  document.getElementById(pl.positionInStade).innerHTML = playerCodeHtml(pl);
});
   showBarre();
   formulaire.reset(); 
}

Affiche(players);
/************************************* */

document.getElementById("btnOpenForm").addEventListener("click", function () {
  FormPlayer.classList.remove("hidden");
});
document.getElementById("closeForm").addEventListener("click", function () {
  FormPlayer.classList.add("hidden");
  pargErreur.classList.add("hidden");
  pargErreur.innerHTML = "";
  document.querySelectorAll(".inputformulaire").forEach(input => {
      input.classList.remove("ring-2", "ring-red-700");
    })
});




document
  .getElementById("closeShowPlayer")
  .addEventListener("click", function () {
    document.getElementById("modalShowPlayer").classList.add("hidden");
    // erreurForm1.classList.add("hidden");
    // erreurForm1.innerHTML = "";
  });
document
  .getElementById("closeSelectPlayer")
  .addEventListener("click", function () {
    modalSelectPlayer.classList.add("hidden");
  });

document.getElementById("position").addEventListener("change", function () {

  if (this.value == "GK") {

    statistique_GK.classList.remove("hidden");
    statistique_player.classList.add("hidden");
  } else {
    statistique_GK.classList.add("hidden");
    statistique_player.classList.remove("hidden");
  }
});


/************************************************** */
/************************************************** */
/************************************************** */
/************************************************** */

//ajout player  ajouplayer


/**  validation  */
function validation(){
  let valid = true ; 
  alert(valid);
 const validText = /^[A-Za-z\s'-]+$/;

 if (!validText.test(name_p.value)) {
   name_p.classList.add("ring-2", "ring-red-700", "p-2");
   valid = false ; 
 } 
 if (position.value === "") {
   position.classList.add("ring-2", "ring-red-700", "p-2");
   valid = false ; 
 } 

 if (club.value === "") {
   club.classList.add("ring-2", "ring-red-700", "p-2");
   valid = false ; 
 } 
 if (nationality.value === "") {
   nationality.classList.add("ring-2", "ring-red-700", "p-2");
   valid = false ; 
 } 

   if (position.value == "GK") {
   let staticGK = [diving, handling, kicking, reflexes, speed, positioning];
     staticGK.forEach((input) => {
      const value = parseInt(input.value); 
      if (isNaN(value) || value < 0 || value > 100 || input.value.trim() === "") {
        input.classList.add("ring-2", "ring-red-700", "p-2");
        valid = false;
      } else {
        input.classList.remove("ring-2", "ring-red-700", "p-2");
      }
   });
   }else {
   const staticplayer = [pace,shooting,passing, dribbling, defending, physical];
   staticplayer.forEach((input) => {
    const value = parseInt(input.value); 
    if (isNaN(value) || value < 0 || value > 100 || input.value.trim() === "") {
      input.classList.add("ring-2", "ring-red-700", "p-2");
      valid = false;
    } else {
      input.classList.remove("ring-2", "ring-red-700", "p-2");
    }
   });
   
  
  /** si l un des input pas valid affiche message  */
    if(!valid) { 
      pargErreur.classList.remove("hidden") ; 
     pargErreur.innerHTML = "Veuillez verifier votre formulaire" ;
    }
    else {
      pargErreur.classList.add("hidden") ; 
    }
    }
  
    return valid ; 
}


/**  validation changement de champs ne reste pas rouge  */
initformulaire()
function initformulaire(){
document.querySelectorAll(".inputformulaire").forEach(field => {
  field.addEventListener("input", () => {
    field.classList.remove("ring-2", "ring-red-700");
  });
  field.addEventListener("change", () => {
    field.classList.remove("ring-2", "ring-red-700");
  });
});

}

document.getElementById("submitplayer").addEventListener("click", AddPlayer);

function AddPlayer(event) {
 event.preventDefault();
 let newplayer = {};
let valid = validation() ; 

alert(valid);
// cree objet player 
if (valid) {
 console.log("Formulaire validé avec succès !");
 let selectedOption = nationality.options[nationality.selectedIndex];
 let selectedOptionClub = club.options[club.selectedIndex];
 newplayer.name = name_p.value.trim();
 newplayer.photo = photo.value.trim();
 newplayer.position = position.value.trim();
 newplayer.flag = nationality.value.trim();
 newplayer.nationality = selectedOption.textContent.trim();
 newplayer.club = selectedOptionClub.textContent.trim();
 newplayer.logo = club.value.trim();


 if (position.value === "GK") { // gardien
     newplayer.rating = parseInt(( parseFloat(diving.value) +parseFloat(handling.value) +parseFloat(kicking.value) +parseFloat(reflexes.value) + parseFloat(speed.value) +parseFloat(positioning.value)) / 6);
     newplayer.diving = diving.value.trim();
     newplayer.handling = handling.value.trim();
     newplayer.kicking = kicking.value.trim();
     newplayer.reflexes = reflexes.value.trim();
     newplayer.speed = speed.value.trim();
     newplayer.positioning = positioning.value.trim();
 } else { // joueur
     newplayer.rating = parseInt(( parseFloat(pace.value) +  parseFloat(shooting.value) + parseFloat(passing.value) + parseFloat(dribbling.value) + parseFloat(defending.value) +parseFloat(physical.value)) / 6);
     newplayer.pace = pace.value.trim();
     newplayer.shooting = shooting.value.trim();
     newplayer.passing = passing.value.trim();
     newplayer.dribbling = dribbling.value.trim();
     newplayer.defending = defending.value.trim();
     newplayer.physical = physical.value.trim();
 }
}


/******************* */
/*     ajout ou  edit */
/******************* */
 if (id_input.value.trim() == "-1" && valid) {  // ajout new player
   // si l id  est vide don ajout 
   id++;
   newplayer.id = id; // Incrémente l'ID puis ajoute
   newplayer.isActif = false;
   players.push(newplayer);
   localStorage.setItem("id", id);
   addPlayerToList(newplayer);
   Affiche(players);
   localStorage.setItem("players", JSON.stringify(players));
    FormPlayer.classList.add("hidden") ;
    formulaire.reset();
 } else if( valid) {  // Si l id_input  different de -1  alors edit

   console.log("id input : " + id_input.value);
   
   let playerMod = getPlayer(id_input.value);

      
      newplayer.id = id_input.value ; 
    

   if(playerMod.isActif==true){  // supprimer le joueur existant et ajout new player
      
    newplayer.isActif = true; 
    newplayer.position =playerMod.position ; 
    newplayer.positionInStade = playerMod.positionInStade ; 
    index = playerStad.findIndex(p=>p.id ==  id_input.value) ;
       playerStad.splice(index, 1, newplayer);
       afficheStade(playerStad ) ; 
   }else if(playerMod.isActif==false){
     
        newplayer.isActif = false; 
        index1 = players.findIndex(p => p.id == id_input.value);
        console.table(players ) ;
        console.log("je suis not actif" + index1  +" id : "+ id_input.value ) ;

        players.splice(index1, 1, newplayer);
        Affiche(players) ; 
   }
   
   localStorage.setItem("players", JSON.stringify(players));
   localStorage.setItem("playerStad" , JSON.stringify(playerStad));
   localStorage.setItem("id" , JSON.stringify(id))
   FormPlayer.classList.add("hidden") ;
   document.getElementById("formulaire").reset();

 }
}
/************************************************** */
/************************************************** */
/************************************************** */
/************************************************** */

function addPlayerToList(player) {
  let li = document.createElement("li");
  li.innerHTML = playerCodeHtml(player);
  ulPlayers.appendChild(li);
}



function Affiche(players) {
  ulPlayers.innerHTML = ``;
  players.forEach((player) => {
    addPlayerToList(player);
  });
  formulaire.reset(); 
  showBarre();
}




function playerCodeHtml(player) {
  //console.log(player);
  if (player.position == "GK") {
    static = `<div class="statistique"> 
        <div>
            <h5>DIV</h5> 
            <h4>${player.diving}</h4>
        </div>
        <div>
            <h5>HAN</h5> 
            <h4>${player.handling}</h4>
        </div>
        <div>
            <h5>KIC</h5> 
            <h4>${player.kicking}</h4>
        </div>
        <div>
            <h5>REF</h5> 
            <h4>${player.reflexes}</h4>
        </div>
        <div>
            <h5>SPD</h5> 
            <h4>${player.speed}</h4>
        </div>
        <div>
            <h5>POS</h5> 
            <h4>${player.positioning}</h4>
        </div>
    </div>
    `;
  } else {
    static = `<div class="statistique">
           
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

       </div>`;
  }

  codeHtml = `  
 <div id="${player.id}" class="badge_gold"  >
<div class="barre  hidden absolute right-0 top-5 bg-white flex flex-col  text-center "> 
  <span onclick="deletedPlayer(${player.id} , this)" class=" text-red-800 material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-l font-semibold border border-b-red-800"> close </span> 
  <span onclick="showformEdit(${player.id})" name_form="btnEdit" class=" text-red-800  material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-xl font-semibold border border-b-red-800">edit</span>
  <span onclick="goPlayerOutStad(${player.id} , this)" name_form="btnEdit" class=" text-red-800 material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-xl font-semibold  border border-b-red-800">move_item</span>
<span onclick="ChangePosition(${player.id} , this)" name_form="btnEdit" class="  text-red-800 material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-xl font-semibold ">
swap_horiz
</span>
  </div>
     <div class="Score">
                        <h4>${player.rating}</h4>
                        <h5>${player.position}</h5>
    </div> 
      <div class="flag">
                    
                        <img  class ="nation" src="${player.flag}"  alt="flag">
                        <img class ="logoClub" src="${player.logo}" alt="nationalite">
    </div> 
        <div class="photo" onclick="afficheOnePlayer(${player.id} , this)">
            <img src=${player.photo} class="" alt="joueur">
        </div>
        <h4 class="nom">${player.name} </h4>
        ${static}
      
    </div>
      `;

  return codeHtml;
}

function afficheOnePlayer(idplayer, el) {
  document.getElementById("modalShowPlayer").classList.remove("hidden");
  let player = getPlayer(idplayer);
  console.log("---pfficheOnePlayer---");
  console.log(player);
  document.getElementById("div_1_ShowbadgetPlayer").innerHTML =
    playerCodeHtml(player);
  document.getElementById("div_2_ShowbadgetPlayer").innerHTML = `            `;
}
showBarre() ; 
function showBarre(){
const badges = document.querySelectorAll(".badge_gold");

badges.forEach((badge) => {

  badge.addEventListener("mouseenter", function () {
    this.querySelector(".barre").classList.remove("hidden"); 
  });


  badge.addEventListener("mouseleave", function () {
    this.querySelector(".barre").classList.add("hidden"); 
  });
});}

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function getPlayer(id) {
  alert("id get : " +  id );
  let player = players.find((p) => p.id == id);
 // console.table(players.find((p) => p.id == id)) ;  
  if (!player) {
    player = playerStad.find((p) => p.id == id);
  }
  if (!player) {
    alert("Pas de joueur trouvé");
  }

  return player;
}

//select  player to stadium
let selectPlayer = document.getElementById("selectplayer"); // select list contient le nom d players

let All_icon = document.querySelectorAll(".iconAddPlayerStd"); // Récupérer les icônes "+"
let divParent = ""; // Badge
// remplir le select html avec les joueurs adequat avec position
function ShowSelectPlayerToStad(event) {
  modalSelectPlayer.classList.remove("hidden");
  divParent = event.target.parentNode;
  let x = divParent.parentNode;
  let positionINstad = x.getAttribute("id");
  selectPlayer.innerHTML = ``;
  let option = document.createElement("option");
  option.value = "";
  option.textContent = "Choisir joueur";
  selectPlayer.appendChild(option);

  if (positionINstad == "RST" || positionINstad == "LST") {
    players.forEach((p) => {
      if (p.position == "ST") {
        let option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        selectPlayer.appendChild(option);
      }
    });
  } else if (positionINstad == "LCM" || positionINstad == "RCM") {
    players.forEach((p) => {
      if (p.position == "CM") {
        let option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        selectPlayer.appendChild(option);
      }
    });
  } else if (positionINstad == "LCB" || positionINstad == "RCB") {
    players.forEach((p) => {
      if (p.position == "CB") {
        let option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        selectPlayer.appendChild(option);
      }
    });
  } else if (
    positionINstad == "LM" ||
    positionINstad == "RM" ||
    positionINstad == "LB" ||
    positionINstad == "RB" ||
    positionINstad == "GK"
  ) {
    players.forEach((p) => {
      if (p.position == positionINstad) {
        let option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        selectPlayer.appendChild(option);
      }
    });
  }
}

All_icon.forEach((AddPlayerStd) => {
  AddPlayerStd.addEventListener("click", ShowSelectPlayerToStad);
});

/********** ajout player to stadium : et supprime le de reserve  addplayertostad   **/
selectPlayer.addEventListener("change", function () {
  idvalue = this.value;
  let player = getPlayer(idvalue);

  // vu que la position de joueur peut etre differente de sa position sur le terrain ; on ajout une nouvelle attribut pour designe sa position sur le terrain
  p = divParent.parentNode;
  console.log(p.getAttribute("id"));
  player.positionInStade = p.getAttribute("id");
  player.isActif = true;
  playerStad.push(player);
  console.log("-------player in stad-------");
  console.log(player);

  //supprimer le joueur de la list de reserve :
  index = players.findIndex((p) => p.id == idvalue); // si le joueur exist au reserve on le supprime du reserve
  if (index > -1) {
    players.splice(index, 1);
    localStorage.setItem("players", JSON.stringify(players));
    Affiche(players);
    console.log("-------supp reserve player-------");
  }

  // ajout de badge gold de joueur dans le stade
  divParent.parentNode.innerHTML = playerCodeHtml(player);
  showBarre() ; 
  localStorage.setItem("playerStad", JSON.stringify(playerStad));
});
/**********  Supprimer le joueur de la liste et de stade ************ */
function deletedPlayer(idplayer, el) {

  let player  = getPlayer(idplayer) ;                                           /************** */
  if(player.isActif){  
   /* si le joueur est sur stade, on va supprim node parent */  
   divPositi = el.parentNode.parentNode.parentNode;   
   badgeGold = el.parentNode.parentNode;
   badgeGold.remove();
   codehtml = `<div class="badge_black">
     <span onclick="ShowSelectPlayerToStad(event)" class=" iconAddPlayerStd absolute self-center   cursor-pointer material-symbols-outlined text-4xl text-green-600">
         health_and_safety
     </span>
      </div>`;
    
    divPositi.innerHTML = codehtml;
    playerStad = playerStad.filter((p) => p.id != idplayer);
    pla = playerStad.filter((p) => p.id != 1000004)
    localStorage.setItem("playerStad", JSON.stringify(playerStad)); 
  }
  else{
    console.log("not actif" +  idplayer  + "voila id")
    players = players.filter((p) => p.id != idplayer);
    Affiche(players); 
  localStorage.setItem("players", JSON.stringify(players));
  }
  showBarre() ; 
}

function showformEdit(idplayer) {
  console.log(idplayer);
  document.getElementById("modalFormPlayer").classList.remove("hidden");
  let player = getPlayer(idplayer);
  console.table(players);
  //remplir les inputs de formulaire a partir de player
  name_p.value = player.name;
  id_input.value = player.id;
  //rating.value = player.rating;
  photo.value = player.photo;
  position.value = player.position;
  nationality.value = player.nationality;
  club.value = player.club;
  pace.value = player.pace;
  shooting.value = player.shooting;
  passing.value = player.passing;
  dribbling.value = player.dribbling;
  defending.value = player.defending;
  physical.value = player.physical;
   console.log(player) ; 
  if(player.isActif==true){
    alert("position actif")
    divPosition.classList.add("hidden"); 
  } else {
    alert("position in actif  : " + player.isActif)
    divPosition.classList.remove("hidden") ;
  }
}
/********   mettre le joueur hors terrain *********  */
function goPlayerOutStad(idplayer, el) {

  divPositi = el.parentNode.parentNode.parentNode;
  badgeGold = el.parentNode.parentNode;
  badgeGold.remove();
  pl = getPlayer(idplayer);
  pl.isActif = false;
  players.push(pl);

  codehtml = `<div class="badge_black">
    <span onclick="ShowSelectPlayerToStad(event)" class=" iconAddPlayerStd absolute self-center   cursor-pointer material-symbols-outlined text-4xl text-green-600">
        health_and_safety
    </span>
     </div>`;
  divPositi.innerHTML = codehtml;
  index = playerStad.findIndex((p) => (p.id = idplayer));
  playerStad.splice(index, 1);
  localStorage.setItem("playerStad", JSON.stringify(playerStad));
  localStorage.setItem("players", JSON.stringify(players));
  Affiche(players);
}

/********* change position de joueur *** */

function ChangePosition(idplayer, el) {
  goPlayerOutStad(idplayer, el);
  // meme code que ajout player au staduim
  idvalue = idplayer;
  let player = getPlayer(idvalue);
  // vu que la position de joueur peut etre differente de sa position sur le terrain ; on ajout une nouvelle attribut pour designe sa position sur le terrain
  p = divParent.parentNode;
  console.log(p.getAttribute("id"));
  player.positionInStade = p.getAttribute("id");
  player.isActif = true;
  playerStad.push(player);
  console.log("-------player in stad-------");
  console.log(player);

  //supprimer le joueur de la list de reserve :
  index = players.findIndex((p) => p.id == idvalue); // si le joueur exist au reserve on le supprime du reserve
  if (index > -1) {
    players.splice(index, 1);
    localStorage.setItem("players", JSON.stringify(players));
    Affiche(players);
    console.log("-------supp reserve player-------");
  }

  // ajout de badge gold de joueur dans le stade
  divParent.parentNode.innerHTML = playerCodeHtml(player);

  localStorage.setItem("playerStad", JSON.stringify(playerStad));
}
