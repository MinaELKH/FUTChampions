let erreurForm = document.getElementById("pargErreur");
let FormPlayer = document.getElementById("modalFormPlayer");
let modalSelectPlayer = document.getElementById("modalSelectPlayer");
let modalChoixPlayer = document.getElementById("modalChoixPlayer");
let ulPlayers = document.getElementById("ulPlayers");
let ulChoixPlayers = document.getElementById("ulChoixPlayers");
let formulaire = document.getElementById("formulaire");
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
/*------------------------------------- */
/*           Event listener */
/*------------------------------------- */

document.getElementById("btnOpenForm").addEventListener("click", function () {
  FormPlayer.classList.remove("hidden");
});
document.getElementById("closeForm").addEventListener("click", function () {
  FormPlayer.classList.add("hidden");
  pargErreur.classList.add("hidden");
  pargErreur.innerHTML = "";
  document.querySelectorAll(".inputformulaire").forEach((input) => {
    input.classList.remove("ring-2", "ring-red-700");
  });
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
document
  .getElementById("closeChoixPlayer")
  .addEventListener("click", function () {
    modalChoixPlayer.classList.add("hidden");
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

let All_iconAddPlayerStd = document.querySelectorAll(".iconAddPlayerStd"); // Récupérer les icônes "+"
All_iconAddPlayerStd.forEach((AddPlayerStd) => {
  AddPlayerStd.addEventListener("click", ShowModalChoixPlayer);
});
/*------------------------------------- */
/*    Variable global                   */
/*------------------------------------- */
let players = [];
let playersReserve = [];
let playerStad = [];
let id = 1;
/*------------------------------------- */
/*    local storage                     */
/*------------------------------------- */

/* Local_S liste de joueurs */
if (
  localStorage.getItem("players") &&
  JSON.parse(localStorage.getItem("players").length) > 0
) {
  players = JSON.parse(localStorage.getItem("players"));
  id = JSON.parse(localStorage.getItem("id"));
  players.forEach((player) => {
    addPlayerToList(player);
  });
} else {
  data_players.forEach((p) => {
    //on ajout des donnees de joueurs fictif avce isactif = false car il sont ajout a la liste de reserve
    p.isActif = false;
    p.positionInStade="";
    players.push(p);
  });
  localStorage.setItem("players", JSON.stringify(players)); //stock players fictitives dans local storage
}
Affiche(players);
showBarre();

/* Local_S liste de joueurs  sur terrain */

if (
  localStorage.getItem("playerStad") &&
  JSON.parse(localStorage.getItem("playerStad").length) > 0
) {
  playerStad = JSON.parse(localStorage.getItem("playerStad"));
  afficheStade(playerStad);
}

function afficheStade(playerStad) {
  playerStad.forEach((pl) => {
    console.log(pl.id)
    document.getElementById(pl.positionInStade).innerHTML = playerCodeHtml(pl);
  });
  showBarre();
  formulaire.reset();
}

/*------------------------------------------------------------------------------------ */
/*                               Fonctions  principal                                  */
/*------------------------------------------------------------------------------------- */

/**  validation  */
function validation() {
  let valid = true;

  const validText = /^[A-Za-z\s'-]+$/;

  if (!validText.test(name_p.value)) {
    name_p.classList.add("ring-2", "ring-red-700", "p-2");
    valid = false;
  }
  if (position.value === "") {
    position.classList.add("ring-2", "ring-red-700", "p-2");
    valid = false;
  }

  if (club.value === "") {
    club.classList.add("ring-2", "ring-red-700", "p-2");
    valid = false;
  }
  if (nationality.value === "") {
    nationality.classList.add("ring-2", "ring-red-700", "p-2");
    valid = false;
  }

  if (position.value == "GK") {
    let staticGK = [diving, handling, kicking, reflexes, speed, positioning];
    staticGK.forEach((input) => {
      const value = parseInt(input.value);
      if (
        isNaN(value) ||
        value < 0 ||
        value > 100 ||
        input.value.trim() === ""
      ) {
        input.classList.add("ring-2", "ring-red-700", "p-2");
        valid = false;
      } else {
        input.classList.remove("ring-2", "ring-red-700", "p-2");
      }
    });
  } else {
    const staticplayer = [
      pace,
      shooting,
      passing,
      dribbling,
      defending,
      physical,
    ];
    staticplayer.forEach((input) => {
      const value = parseInt(input.value);
      if (
        isNaN(value) ||
        value < 0 ||
        value > 100 ||
        input.value.trim() === ""
      ) {
        input.classList.add("ring-2", "ring-red-700", "p-2");
        valid = false;
      } else {
        input.classList.remove("ring-2", "ring-red-700", "p-2");
      }
    });

    /** si l un des input pas valid affiche message  */
    if (!valid) {
      pargErreur.classList.remove("hidden");
      pargErreur.innerHTML = "Veuillez verifier votre formulaire";
    } else {
      pargErreur.classList.add("hidden");
    }
  }

  return valid;
}

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**  validation  : changement du style  de champs ne reste pas rouge   */
eventValidationformulaire();
function eventValidationformulaire() {
  document.querySelectorAll(".inputformulaire").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("ring-2", "ring-red-700");
    });
    field.addEventListener("change", () => {
      field.classList.remove("ring-2", "ring-red-700");
    });
  });
}

/*--------------------------------------    */
/*  Ajout du joueur a la liste des joueurs  */
/*-------------------------------------    */


document.getElementById("submitplayer").addEventListener("click", AddPlayer);

function AddPlayer(event) {
  event.preventDefault();
  let newplayer = {};
  let valid = validation();


 // on cree  objet player 
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
/* Dans ce bloc de code, on traite s il gardien ou joueur */

    if (position.value === "GK") {
      // gardien
      newplayer.rating = parseInt(
        (parseFloat(diving.value) +
          parseFloat(handling.value) +
          parseFloat(kicking.value) +
          parseFloat(reflexes.value) +
          parseFloat(speed.value) +
          parseFloat(positioning.value)) /
        6
      );
      newplayer.diving = diving.value.trim();
      newplayer.handling = handling.value.trim();
      newplayer.kicking = kicking.value.trim();
      newplayer.reflexes = reflexes.value.trim();
      newplayer.speed = speed.value.trim();
      newplayer.positioning = positioning.value.trim();
    } else {
      // joueur
      newplayer.rating = parseInt(
        (parseFloat(pace.value) +
          parseFloat(shooting.value) +
          parseFloat(passing.value) +
          parseFloat(dribbling.value) +
          parseFloat(defending.value) +
          parseFloat(physical.value)) /
        6
      );
      newplayer.pace = pace.value.trim();
      newplayer.shooting = shooting.value.trim();
      newplayer.passing = passing.value.trim();
      newplayer.dribbling = dribbling.value.trim();
      newplayer.defending = defending.value.trim();
      newplayer.physical = physical.value.trim();
    }
  }
/* Dans ce bloc de code, on traite si c'est un nouvel ajout ou une édition d un joueur existant*/
// cas 1 => ajout 
  if (id_input.value.trim() == "-1" && valid) {
    id++;
    newplayer.id = id; 
    newplayer.isActif = false;
    players.push(newplayer);
    localStorage.setItem("id", id);
    addPlayerToList(newplayer);
    Affiche(players);
    localStorage.setItem("players", JSON.stringify(players));
    FormPlayer.classList.add("hidden");
    formulaire.reset();
// cas 2 => edition  :  dans l edition il y a deux cas : soit joueur en reserve soit sur le terrain 
  } else if (valid) {  // Si l id_input  different de -1  alors edit
   
    let playerMod = getPlayer(id_input.value);
    newplayer.id = id_input.value;
    // cas 1 : joueur sur terrain avec isatif ==true
    if (playerMod.isActif == true) {
      // supprimer le joueur existant et ajout new player
      newplayer.isActif = true;
      newplayer.position = playerMod.position;
      newplayer.positionInStade = playerMod.positionInStade;
      index = playerStad.findIndex((p) => p.id == id_input.value);
      playerStad.splice(index, 1, newplayer);
      afficheStade(playerStad);
    // cas 2 : joueur en reserve 
    } else if (playerMod.isActif == false) {
      newplayer.isActif = false;
      index1 = players.findIndex((p) => p.id == id_input.value);
      players.splice(index1, 1, newplayer);
      Affiche(players);
    }

    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("playerStad", JSON.stringify(playerStad));
    localStorage.setItem("id", JSON.stringify(id));
    FormPlayer.classList.add("hidden");
    document.getElementById("formulaire").reset();
  }
}


//ajout de nouveau joueur comme target <li> 
function addPlayerToList(player) {
  let li = document.createElement("li");
  li.innerHTML = playerCodeHtml(player);
  ulPlayers.appendChild(li);
}


// ajout d un joueur a la modale de choix  , 
//il y a un event on click sur le joueur , 
//s il l user click sur le badge on passe au fonction positionner 

function addPlayerModalChoixPlayer(player  , positionARemplir) {
  let li = document.createElement("li");
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
 <div id="${player.id}" class="badge_gold" onclick="positionnerPlayer(${player.id}, '${positionARemplir}', event)" >
    <div class="barre  hidden  "> 
  

  </div>
 
 
 <div class="Score">
                        <h4>${player.rating}</h4>
                        <h5>${player.position}</h5>
    </div> 
      <div class="flag">
                    
                        <img  class ="nation" src="${player.flag}"  alt="flag">
                        <img class ="logoClub" src="${player.logo}" alt="nationalite">
    </div> 
        <div class="photo">
            <img src=${player.photo} class="" alt="joueur">
        </div>
        <h4 class="nom">${player.name} </h4>
        ${static}
      
    </div>
      `;
  li.innerHTML = codeHtml;
  ulChoixPlayers.appendChild(li);
}


let divParent = ""; // Badge
//l affiche  de joueur sur la modale , les joueurs sont affiche selon leur position adequat
// chaque buuton(icon +) contient une valeur de position event.target.value 
//il nous permet de savoir la position a remplir 
function ShowModalChoixPlayer(event ) {
  modalChoixPlayer.classList.remove("hidden");
  const positionINstad = event.target.value; 
  ulChoixPlayers.innerHTML = "";
  if (positionINstad == "RST" || positionINstad == "LST") {
    players.forEach((p) => {
      if (p.position == "ST") {
        addPlayerModalChoixPlayer(p , positionINstad);
      }
    });
  } else if (positionINstad == "LCM" || positionINstad == "RCM") {
    players.forEach((p) => {
      if (p.position == "CM") {
        addPlayerModalChoixPlayer(p , positionINstad);
      }
    });
  } else if (positionINstad == "LCB" || positionINstad == "RCB") {
    players.forEach((p) => {
      if (p.position == "CB") {
        addPlayerModalChoixPlayer(p , positionINstad);
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
        addPlayerModalChoixPlayer(p , positionINstad);
      }
    });
  }
  // ce return je l ai pas utlise 
  return positionINstad ;
}


/*--------------------------------------    */
/*  ajout player to stadium                */
/*-------------------------------------    */
/*positionner le  player au stade  et supprime le dans la liste de  reserve   **/
// cette fonction est declenche lors de l click sur le badge dans la modale " choisir joueur"
function positionnerPlayer(idvalue , positionARemplir , event) {

  let player = getPlayer(idvalue);
  player.positionInStade = positionARemplir ;   // la valeur de button est la position GK ou STL c est le meme id de div parent 
  player.isActif = true;
  playerStad.push(player);
  localStorage.setItem("playerStad", JSON.stringify(playerStad));

  //supprimer le joueur de la list de reserve :
  index = players.findIndex((p) => p.id == idvalue); // si le joueur exist au reserve on le supprime du reserve
  if (index > -1) {
    players.splice(index, 1);
    localStorage.setItem("players", JSON.stringify(players));
  }
  
  // ajout de badge gold de joueur dans le stade
    document.getElementById(positionARemplir).innerHTML = playerCodeHtml(player);
    modalChoixPlayer.classList.add("hidden") ; 
// mettre a jour l affichage
    Affiche(players);
    afficheStade(playerStad) ; 
}

/*--------------------------------------    */
/*        Supprimer le joueur                */
/*-------------------------------------    */

function deletedPlayer(idplayer, event) {
  let player = getPlayer(idplayer); 

  if (player.isActif) {// si le joueur est sur stade
    // on va supprim node parent 
    divPosition = event.target.parentNode.parentNode.parentNode;
    let positionTerrain = divPosition.getAttribute("id");
    badgeGold = event.target.parentNode.parentNode;
    badgeGold.remove();
    codehtml = `  <div class="badge_black">
                        <button  value="${positionTerrain}" class=" iconAddPlayerStd absolute self-center   cursor-pointer material-symbols-outlined text-4xl text-green-600">
                            health_and_safety
                        </button>
                    </div>`;
    divPosition.innerHTML = codehtml;
    // on ajout event listener a la nouvelle icone
    divPosition.querySelector(".iconAddPlayerStd").addEventListener("click", ShowModalChoixPlayer);
    // on supprime le joueur de la liste des joueurs en stade
    playerStad = playerStad.filter((p) => p.id != idplayer);
    localStorage.setItem("playerStad", JSON.stringify(playerStad));
  }// si le joueur sur le reserve  
  else {
    // on supprime le joueur et on met a jour l affichage 
    players = players.filter((p) => p.id != idplayer);
    Affiche(players);
    localStorage.setItem("players", JSON.stringify(players));
  }
  // mettre a jour les barres pour le stade 
  showBarre();
}


/*--------------------------------------    */
/*     sortie d un joueur hors terrain    */
/*-------------------------------------    */
function goPlayerOutStad(idplayer, event) {
 // preseque meme code de supprimer avec une difference que on sauvgarde l joueur en reserve
 //on supprime le badge puis on ajout le badget noir avec + 
 divPosition = event.target.parentNode.parentNode.parentNode;
  let positionTerrain = divPosition.getAttribute("id");
  badgeGold = event.target.parentNode.parentNode;
  badgeGold.remove();
  codehtml = `  <div class="badge_black">
                      <button  value="${positionTerrain}" class=" iconAddPlayerStd absolute self-center   cursor-pointer material-symbols-outlined text-4xl text-green-600">
                          health_and_safety
                      </button>
                  </div>`;
  divPosition.innerHTML = codehtml;
  divPosition.querySelector(".iconAddPlayerStd").addEventListener("click", ShowModalChoixPlayer);

// on recupere le joueur et on fait des modifications  et on l ajout au reserve
  pl = getPlayer(idplayer);
  pl.isActif = false;
  pl.positionInStade=""
  players.push(pl);

  // on supprime le joueur de stade
  index = playerStad.findIndex((p) => (p.id == idplayer));
  console.log("splice index : "+ index); 
  playerStad.splice(index, 1);
// mettre a jour le local storage 
  localStorage.setItem("playerStad", JSON.stringify(playerStad));
  localStorage.setItem("players", JSON.stringify(players));
// affiche les joueurs en etat de mise a jour 
  Affiche(players);
  showBarre();
}
/*--------------------------------------    */
/*     Remplace un joueur                  */
/*-------------------------------------    */

function replacePlayer( idplayer  , poistion  ) {
  // affichage de modal choisir joueur par defaut on passe par la fonction positionner joueur 
  ShowModalChoixPlayer(event);

   // on recupere l ancien joueur et on l ajout au reserve 
  let oldplayer = getPlayer(idplayer);
  oldplayer .isActif = false;
  oldplayer .positionInStade = "";
  players.push(oldplayer);
 
  //on supprime l ancien joueur du array de joueur sur terrain 
  index = playerStad.findIndex((p) => (p.id == idplayer));
  playerStad.splice(index, 1);
 // mettre a jour les localS
  localStorage.setItem("playerStad", JSON.stringify(playerStad));
  localStorage.setItem("players", JSON.stringify(players));
  // affichage des joueurs sur reserve apres l ajout de l oldplayer 
  Affiche(players);
  
}




/*------------------------------------------------------------------------------------ */
/*                               Fonctions  secondaire                                            */
/*------------------------------------------------------------------------------------- */
function getPlayer(id) {
  let player = players.find((p) => p.id == id);
  if (!player) {
    player = playerStad.find((p) => p.id == id);
  }else{console.log("joueur introuvable id :" + id )}
  return player;
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
  <span onclick="deletedPlayer(${player.id} , event)" class=" text-red-800 material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-l font-semibold border border-b-red-800"> close </span> 
  <span onclick="showformEdit(${player.id})" name_form="btnEdit" class=" text-red-800  material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-xl font-semibold border border-b-red-800">edit</span>
  <span onclick="goPlayerOutStad(${player.id} , event)" name_form="btnEdit" class=" text-red-800 material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-xl font-semibold  border border-b-red-800">move_item</span>
<button  value="${player.positionInStade}" onclick="replacePlayer(${player.id}  , ${player.positionInStade})" name_form="btnEdit" class="  text-red-800 material-symbols-outlined cursor-pointer text-white hover:text-red-400 text-xl font-semibold ">
swap_horiz
</button>
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

function showBarre() {
  const badges = document.querySelectorAll(".badge_gold");

  badges.forEach((badge) => {
    console.log("badge");
    console.log(badge) ;
    badge.addEventListener("mouseenter", function () {

      this.querySelector(".barre").classList.remove("hidden");
    });

    badge.addEventListener("mouseleave", function () {
      this.querySelector(".barre").classList.add("hidden");
 
    });
  });
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
  console.log(player);
  if (player.isActif == true) {

    divPosition.classList.add("hidden");
  } else {

    divPosition.classList.remove("hidden");
  }
}