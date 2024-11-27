
  
let erreurForm = document.getElementById("pargErreur");
let FormPlayer = document.getElementById("modalFormPlayer");
let modalSelectPlayer= document.getElementById("modalSelectPlayer");
let ulPlayers = document.getElementById("ulPlayers");

let id_input = document.getElementById("id_input"); //, input type hidden utliisable lors de modification 
let name_p = document.getElementById("name_input")
let rating = document.getElementById("rating")
let photo = document.getElementById("photo")
let nationality = document.getElementById("nationality")
let flag = document.getElementById("flag")
let club = document.getElementById("club")
let pace = document.getElementById("pace")
let shooting = document.getElementById("shooting")
let passing = document.getElementById("passing")
let dribbling = document.getElementById("dribbling")
let defending = document.getElementById("defending")
let physical = document.getElementById("physical")
let position = document.getElementById("position")
let statistique_GK = document.getElementById("statistique_GK");
let statistique_player = document.getElementById("statistique_player");




/******************************************* */
let  players  = []  ;
let id=1 ;


let playerReserve = [] ;
let playerStad = [] ; 
/*************************** */
/*    local storage          */
/*************************** */


if(localStorage.getItem("players") && JSON.parse(localStorage.getItem("players").length)>0)
    {
        players = JSON.parse(localStorage.getItem("players")) ; 
        id= localStorage.getItem("id") ;
        players.forEach(player => {
            addPlayerToList(player);    
        });
    } 
    else {
        players = data_players; 
        localStorage.setItem("players", JSON.stringify(players)); //stock players fictitives dans local storage
      }

document.getElementById("btnOpenForm").addEventListener("click", function () {
    FormPlayer.classList.remove("hidden");
  });
document.getElementById("closeForm").addEventListener("click", function () {
    FormPlayer.classList.add("hidden");
 // erreurForm1.classList.add("hidden");
 // erreurForm1.innerHTML = "";
});
document.getElementById("closeSelectPlayer").addEventListener("click", function () {
    modalSelectPlayer.classList.add("hidden");
});


document.getElementById("position").addEventListener("change" , function(){
    console.log(this.value);
     if(this.value=="GK"){
        console.log(this.value);
        statistique_GK.classList.remove("hidden");
        statistique_player.classList.add("hidden");
     }
})
//ajout player
document.getElementById("submitplayer").addEventListener("click", AddPlayer);

function AddPlayer(event){
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


   
    if (!name_p || !rating || !photo || !nationality || !flag || !club || !rating || !pace ||  !shooting || !passing || !dribbling || !defending || !physical) {
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

    
    let newplayer = {};
   
    newplayer.name = name_p; 
    newplayer.rating = rating;  
    newplayer.photo = photo ; 
    newplayer.position=position ; 
    newplayer.nationality = nationality;
    newplayer.flag = flag;  
    newplayer.club = club;
    newplayer.pace = pace;
    newplayer.shooting = shooting;
    newplayer.passing = passing;
    newplayer.dribbling = dribbling;
    newplayer.defending = defending;
    newplayer.physical = physical;
    newplayer.isActif = false ;
    console.log(id_input);  
    if (id_input.value.trim() == "-1") {  // Si l'ID est vide
        console.log("id vide :");
        console.log(id_input.value);
        id++;
        newplayer.id = id;   // Incrémente l'ID puis ajoute
        players.push(newplayer);
        localStorage.setItem("id", id);
        addPlayerToList(newplayer);
    } else {  // Si l'ID n'est pas vide
        let index = players.findIndex(p => p.id == id_input.value); 
        players.splice(index, 1, newplayer); // Modifie le joueur existant
        addALLPlayersToList(players);
        console.log("id pas vide :");
        console.log(id_input.value);
    }

    
    localStorage.setItem("players" ,JSON.stringify(players) ) ; 











    
}
function addALLPlayersToList(players){
    ulPlayers.innerHTML=``; 
    players.forEach(player => {
        addPlayerToList(player);    
    });
}
function addPlayerToList(player){
    let li = document.createElement("li") ;
    li.innerHTML = playerCodeHtml(player) 
    ulPlayers.appendChild(li); 
}
function playerCodeHtml(player){
    codeHtml=`  
        <div id="${player.id}" class="badge_gold"  >
     <div  class=" absolute right-0 top-5 bg-gray-400 flex flex-col  p-[4px] text-center  rounded-full "> 
       <span  onclick="deletedPlayerStad(${player.id})" class="cursor-pointer text-white hover:text-red-400 text-l font-semibold "> X </span> 
       <span   onclick="showformEdit(${player.id})"  name_form="btnEdit" class="cursor-pointer text-white hover:text-red-400 text-xl font-semibold">...</span>
       <span   onclick="goPlayerOutStad(${player.id} , this)"  name_form="btnEdit" class="cursor-pointer text-white hover:text-red-400 text-xl font-semibold">.</span>
       </div>
         <div class="note">
                            <h4>${player.rating}</h4>
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
          ` ; 
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
let selectPlayer = document.getElementById("selectplayer")  // select list contient le nom d players

/*let All_icon = document.querySelectorAll('.iconAddPlayerStd'); // recupere les icons + qui se trouve dans l badge
let divParent =""   // badge
All_icon.forEach((AddPlayerStd, index) => {
    AddPlayerStd.addEventListener("click", function () {
        modalSelectPlayer.classList.remove("hidden");     
        divParent= All_icon[index].parentNode;  // recupere badge de + cliqué
        //console.log("divparent");
        //console.log(divParent.parentNode);
        let x = divParent.parentNode;
        let pos = x.getAttribute("id") ;

        selectPlayer.innerHTML=`` ;
        let option = document.createElement("option") ;
        option.value =""; 
        option.textContent= "Choisir joueur";
        selectPlayer.appendChild(option) ;

        players.forEach(p => {
            if(p.position == pos){
            let option = document.createElement("option") ;
            option.value = p.id ; 
            option.textContent= p.name ;
            selectPlayer.appendChild(option) ;  }         
            });
        });
});
*/
let All_icon = document.querySelectorAll('.iconAddPlayerStd'); // Récupérer les icônes "+"
let divParent = ""; // Badge

function AddPlayerToStad(event) {
    modalSelectPlayer.classList.remove("hidden");


    divParent = event.target.parentNode;
    let x = divParent.parentNode;
    let pos = x.getAttribute("id");

  
    selectPlayer.innerHTML = ``;
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Choisir joueur";
    selectPlayer.appendChild(option);


    players.forEach(p => {
        if (p.position === pos) {
            let option = document.createElement("option");
            option.value = p.id;
            option.textContent = p.name;
            selectPlayer.appendChild(option);
        }
    });
}

// Ajouter les écouteurs d'événements à chaque icône
All_icon.forEach(AddPlayerStd => {
    AddPlayerStd.addEventListener("click", AddPlayerToStad);
});








selectPlayer.addEventListener("change" , function(){
    let player = getPlayer(this.value);
    divParent.parentNode.innerHTML = playerCodeHtml(player) ;

})

function deletedPlayerStad(idplayer){
    // let player  = getPlayer(id) ;
     players = players.filter(p=>p.id!=idplayer) ; 
     addALLPlayersToList(players);
     localStorage.setItem("players", JSON.stringify(players)) ; 
 }
 
 function showformEdit(idplayer){
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
 

 function goPlayerOutStad(idplayer , el){
    divPositi = el.parentNode.parentNode.parentNode ;
    badgetGold = el.parentNode.parentNode ; 
    console.log(badgetGold);
    badgetGold.remove();
    codehtml = `<div class="badge_black">
    <span onclick="AddPlayerToStad(event)" class=" iconAddPlayerStd absolute self-center   cursor-pointer material-symbols-outlined text-4xl text-green-600">
        health_and_safety
    </span>
     </div>`
     divPositi.innerHTML =codehtml ;
     console.log("last");
     console.log(divPositi);
 }
 




