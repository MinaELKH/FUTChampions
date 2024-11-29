let erreurForm = document.getElementById("pargErreur");
let FormPlayer = document.getElementById("modalFormPlayer");
let modalSelectPlayer = document.getElementById("modalSelectPlayer");
let ulPlayers = document.getElementById("ulPlayers");

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
    console.log(player);
    addPlayerToList(player);
  });
} else {
  players = data_players;
  localStorage.setItem("players", JSON.stringify(players)); //stock players fictitives dans local storage
}
/******  local storage joueur sur terrain */

if (
  localStorage.getItem("playerStad") &&
  JSON.parse(localStorage.getItem("playerStad").length) > 0
) {
  playerStad = JSON.parse(localStorage.getItem("playerStad"));
  playerStad.forEach((pl) => {
    document.getElementById(pl.positionInStade).innerHTML = playerCodeHtml(pl);
  });
}

/************************************* */

document.getElementById("btnOpenForm").addEventListener("click", function () {
  FormPlayer.classList.remove("hidden");
});
document.getElementById("closeForm").addEventListener("click", function () {
  FormPlayer.classList.add("hidden");
  // erreurForm1.classList.add("hidden");
  // erreurForm1.innerHTML = "";
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
  console.log(this.value);
  if (this.value == "GK") {
    console.log(this.value);
    statistique_GK.classList.remove("hidden");
    statistique_player.classList.add("hidden");
  } else {
    statistique_GK.classList.add("hidden");
    statistique_player.classList.remove("hidden");
  }
});
//ajout player
document.getElementById("submitplayer").addEventListener("click", AddPlayer);

function AddPlayer(event) {
  event.preventDefault();
  let newplayer = {};
  if (position.value == "GK") {
    let staticGK = [diving, handling, kicking, reflexes, speed, positioning];
      staticGK.forEach((input) => {
      console.log("validddd");
      console.log(input);
      if (isNaN(input.value) || input.value < 0 || input.value > 100) {
        input.classList.add("ring-2", "ring-red-700", "p-2");
      }
    });

    console.log("Formulaire validé avec succès !");
    newplayer.name = name_p.value.trim();
    newplayer.rating = parseInt((
      parseFloat(diving.value) + 
      parseFloat(handling.value) + 
      parseFloat(kicking.value) + 
      parseFloat(reflexes.value) + 
      parseFloat(speed.value) + 
      parseFloat(positioning.value)
    ) / 6);

    newplayer.photo = photo.value.trim();
    newplayer.position = position.value;
    newplayer.flag = nationality.value.trim();
    newplayer.nationality = nationality.textContent.trim();
    newplayer.club = club.value.trim();
    newplayer.diving = diving.value.trim();
    newplayer.handling = handling.value.trim();
    newplayer.kicking = kicking.value.trim();
    newplayer.reflexes = reflexes.value.trim();
    newplayer.speed = speed.value.trim();
    newplayer.positioning = positioning.value.trim();
    newplayer.isActif = false;
    console.log(id_input);
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
      console.log("validddd");
      console.log(input);
      if (isNaN(input.value) || input.value < 0 || input.value > 100) {
        input.classList.add("ring-2", "ring-red-700", "p-2");
      }
    });

    console.log("Formulaire validé avec succès !");
    let selectedOption = nationality.options[nationality.selectedIndex];
   

    newplayer.name = name_p.value.trim();
    newplayer.rating = parseInt((
      parseFloat(pace.value) + 
      parseFloat(shooting.value) + 
      parseFloat(passing.value) + 
      parseFloat(dribbling.value) + 
      parseFloat(defending.value) + 
      parseFloat(physical.value)
    ) / 6);
    newplayer.photo = photo.value.trim();
    newplayer.position = position.value.trim();
    newplayer.flag = nationality.value.trim();
    newplayer.nationality = selectedOption.textContent.trim();
    newplayer.club = club.value.trim();
    newplayer.pace = pace.value.trim();
    newplayer.shooting = shooting.value.trim();
    newplayer.passing = passing.value.trim();
    newplayer.dribbling = dribbling.value.trim();
    newplayer.defending = defending.value.trim();
    newplayer.physical = physical.value.trim();
    newplayer.isActif = false;
    console.log(id_input);
  }

  // gestio entre edit et ajout
  if (id_input.value.trim() == "-1") {
    // Si l'ID est vide
    console.log("id vide :");
    console.log(id_input.value);
    id++;
    newplayer.id = id; // Incrémente l'ID puis ajoute
    players.push(newplayer);
    localStorage.setItem("id", id);
    addPlayerToList(newplayer);
  } else {
    // Si l'ID n'est pas vide
    let index = players.findIndex((p) => p.id == id_input.value);
    players.splice(index, 1, newplayer); // Modifie le joueur existant
    Affiche(players);
    console.log("id pas vide :");
    console.log(id_input.value);
  }

  localStorage.setItem("players", JSON.stringify(players));
}

function Affiche(players) {
  ulPlayers.innerHTML = ``;
  // players = players.slice(1,8) ;
  players.forEach((player) => {
    addPlayerToList(player);
  });
}

function addPlayerToList(player) {
  let li = document.createElement("li");
  li.innerHTML = playerCodeHtml(player);
  ulPlayers.appendChild(li);
}
function playerCodeHtml(player) {
  console.log(player);
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
  let player = players.find((p) => p.id == id);
  console.table(playerStad) ;  
  if (!player) {
    alert(id);
    alert(playerStad); 
    player = playerStad.find((p) => p.id == id && p.isActif == true);
  }
  if (!player) {
    alert("Pas de joueur trouvé");
  }

  return player;
}
/*function getPlayer(id) {
  let index = players.findIndex((p) => p.id == id);
  let index1 = playerStad.findIndex((p) => (p.id == id &&  p.isActif==true));
  let player;
  if (index > -1 ) {
    player = players[index];
  } else if (index1 > -1 ) {
    player = playerStad[index];
  } else {
    alert("pas de getplayer");
  }

  return player;
}*/
/*
function getPlayer(id) {
  index = players.findIndex((p) => p.id == id);
  let player = players[index];
  return player;
}*/
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

// ajout player to stadium : et supprime le de reserve  addplayertostad
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
  // let player  = getPlayer(id) ;
  goPlayerOutStad(idplayer, el);
  players = players.filter((p) => p.id != idplayer);
  playerStad = playerStad.filter((p) => p.id != idplayer);
  Affiche(players);
  localStorage.setItem("players", JSON.stringify(players));
  localStorage.setItem("playerstad", JSON.stringify(playerstad));
}

function showformEdit(idplayer) {
  console.log(idplayer);
  document.getElementById("modalFormPlayer").classList.remove("hidden");
  let player = getPlayer(idplayer);
  console.log(player);
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
}
/********   mettre le joueur hors terrain *********  */
function goPlayerOutStad(idplayer, el) {

  divPositi = el.parentNode.parentNode.parentNode;
  badgeGold = el.parentNode.parentNode;
  console.log(badgeGold);
  console.log("idplayer : ") ; 
  console.log(idplayer) ; 
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
