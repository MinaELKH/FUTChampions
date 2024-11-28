let erreurForm = document.getElementById("pargErreur");
let FormPlayer = document.getElementById("modalFormPlayer");
let modalSelectPlayer = document.getElementById("modalSelectPlayer");
let ulPlayers = document.getElementById("ulPlayers");

let id_input = document.getElementById("id_input"); //, input type hidden utliisable lors de modification
let name_p = document.getElementById("name_input");
let rating = document.getElementById("rating");
let photo = document.getElementById("photo");
let nationality = document.getElementById("nationality");
let flag = document.getElementById("flag");
let club = document.getElementById("club");
let pace = document.getElementById("pace");
let shooting = document.getElementById("shooting");
let passing = document.getElementById("passing");
let dribbling = document.getElementById("dribbling");
let defending = document.getElementById("defending");
let physical = document.getElementById("physical");
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
  id = localStorage.getItem("id");
 // playersReserve = players.slice(1,8) ; 
  players.forEach((player) => {
    addPlayerToList(player);
  });
} else {
  players = data_players;
  localStorage.setItem("players", JSON.stringify(players)); //stock players fictitives dans local storage
}
/******  local storage joueur sur terrain */

if (localStorage.getItem("playerStad") && JSON.parse(localStorage.getItem("playerStad").length) > 0) {
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
document.getElementById("closeShowPlayer").addEventListener("click", function () {
  document.getElementById('modalShowPlayer').classList.add("hidden");
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
  }
});
//ajout player
document.getElementById("submitplayer").addEventListener("click", AddPlayer);

function AddPlayer(event) {
  event.preventDefault();
  name_p = name_p.value.trim();
  rating = rating.value.trim();
  photo = photo.value.trim();
  nationality = nationality.value.trim();
  flag = flag.value.trim();
  club = club.value.trim();
  pace = pace.value.trim();
  shooting = shooting.value.trim();
  passing = passing.value.trim();
  dribbling = dribbling.value.trim();
  defending = defending.value.trim();
  physical = physical.value.trim();
  position = position.value.trim();

  if (
    !name_p ||
    !rating ||
    !photo ||
    !nationality ||
    !flag ||
    !club ||
    !rating ||
    !pace ||
    !shooting ||
    !passing ||
    !dribbling ||
    !defending ||
    !physical
  ) {
    alert("Veuillez remplir tous les champs obligatoires !");
    return;
  }
  if (
    !isValidURL(photo) ||
    !isValidURL(nationality) ||
    !isValidURL(flag) ||
    !isValidURL(club)
  ) {
    alert("Veuillez entrer des URL valides pour Nationality, Flag et Club !");
    return;
  }
  if (
    isNaN(rating) ||
    isNaN(pace) ||
    isNaN(shooting) ||
    isNaN(passing) ||
    isNaN(dribbling) ||
    isNaN(defending) ||
    isNaN(physical)
  ) {
    alert("Les statistiques doivent être des nombres !");
    return;
  }

  console.log("Formulaire validé avec succès !");

  let newplayer = {};

  newplayer.name = name_p;
  newplayer.rating = rating;
  newplayer.photo = photo;
  newplayer.position = position;
  newplayer.nationality = nationality;
  newplayer.flag = flag;
  newplayer.club = club;
  newplayer.pace = pace;
  newplayer.shooting = shooting;
  newplayer.passing = passing;
  newplayer.dribbling = dribbling;
  newplayer.defending = defending;
  newplayer.physical = physical;
  newplayer.isActif = false;
  console.log(id_input);
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
<div class="barre absolute right-0 top-5 bg-white flex flex-col  text-center "> 
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

function afficheOnePlayer(idplayer , el){
  
            document.getElementById('modalShowPlayer').classList.remove('hidden');  
            let player = getPlayer(idplayer);
            document.getElementById("div_1_ShowbadgetPlayer").innerHTML=playerCodeHtml(player) ;
            document.getElementById("div_2_ShowbadgetPlayer").innerHTML=`
            
            
            
            ` ;
}


document.querySelector('.badge_gold').addEventListener('mouseenter', function() {
  this.querySelector('.barre').classList.remove('hidden'); // Afficher la barre
});

// Lorsque l'on sort de l'élément 'badge_gold'
document.querySelector('.badge_gold').addEventListener('mouseleave', function() {
  this.querySelector('.barre').classList.add('hidden'); // Masquer la barre
});


  

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
  index = players.findIndex((p) => p.id == id);
  let player = players[index];
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

        if( positionINstad=="RST" || positionINstad=="LST"){
          players.forEach((p) => {
            if (p.position == "ST" ) {
              let option = document.createElement("option");
              option.value = p.id;
              option.textContent = p.name;
              selectPlayer.appendChild(option);
            }
          });
        } else if( positionINstad=="LCM" || positionINstad=="RCM"){
          players.forEach((p) => {
            if (p.position == "CM" ) {
              let option = document.createElement("option");
              option.value = p.id;
              option.textContent = p.name;
              selectPlayer.appendChild(option);
            }
          });
         } else if( positionINstad=="LCB" || positionINstad=="RCB"){
          players.forEach((p) => {
            if (p.position == "CB" ) {
              let option = document.createElement("option");
              option.value = p.id;
              option.textContent = p.name;
              selectPlayer.appendChild(option);
            }
          });
         }
         else if(  positionINstad=="LM" ||  positionINstad=="RM" || positionINstad=="LB" || positionINstad=="RB" || positionINstad=="GK"   ){
          players.forEach((p) => {
            if (p.position == positionINstad ) {
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
   idvalue = this.value
  let player = getPlayer(idvalue);
  playerStad.push(player);
  p =  divParent.parentNode
  console.log("--------------")
  console.log(player);
  // vu que la position de joueur peut etre differente de sa position sur le terrain ; on ajout une nouvelle attribut pour designe sa position sur le terrain
  console.log(p.getAttribute("id"));
  player.positionInStade = p.getAttribute("id") ;

  //supprimer le joueur de la list de reserve : 
  index  =  players.findIndex(p=>( p.id == idvalue )) // si le joueur exist au reserve on le supprime du reserve
  if(index>-1){
    players.splice(index , 1) ; 
    Affiche(players);
  }
  
  
 // ajout de badge gold de joueur dans le stade 
  divParent.parentNode.innerHTML = playerCodeHtml(player);


  localStorage.setItem("playerStad" , JSON.stringify(playerStad) );
});



/**********  Supprimer le joueur de la liste et de stade ************ */
function deletedPlayer(idplayer , el) {
  // let player  = getPlayer(id) ;
  players = players.filter((p) => p.id != idplayer);
  playerStad = playerStad.filter((p) => p.id != idplayer);
  Affiche(players);
  goPlayerOutStad(idplayer, el)
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
  rating.value = player.rating;
  photo.value = player.photo;
  position.value = player.position;
  nationality.value = player.nationality;
  flag.value = player.flag;
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
  badgetGold = el.parentNode.parentNode;
  console.log(badgetGold);
  badgetGold.remove();
  codehtml = `<div class="badge_black">
    <span onclick="ShowSelectPlayerToStad(event)" class=" iconAddPlayerStd absolute self-center   cursor-pointer material-symbols-outlined text-4xl text-green-600">
        health_and_safety
    </span>
     </div>`;
  divPositi.innerHTML = codehtml;
  console.log("last");
  console.log(divPositi);
  index = playerStad.findIndex(p=>(p.id = idplayer))
  playerStad.splice(index , 1) ;
  localStorage.setItem("playerStad" , JSON.stringify(playerStad) );

}

/********* change position de joueur *** */

function ChangePosition(idplayer , el){
        goPlayerOutStad(idplayer, el);

      return true 
}