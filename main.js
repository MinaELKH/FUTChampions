
  
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
        players = data_players; // taches contient des valeur aletoire juste pour avoir des donnees a manipluer
        localStorage.setItem("players", JSON.stringify(players)); //stock taches fictitives dans local storage
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

const name_p = document.getElementById("name").value.trim();
const rating = document.getElementById("rating").value.trim();
const photo = document.getElementById("photo").value.trim();
const nationality = document.getElementById("nationality").value.trim();
const flag = document.getElementById("flag").value.trim();
const club = document.getElementById("club").value.trim();
const pace = document.getElementById("pace").value.trim();
const shooting = document.getElementById("shooting").value.trim();
const passing = document.getElementById("passing").value.trim();
const dribbling = document.getElementById("dribbling").value.trim();
const defending = document.getElementById("defending").value.trim();
const physical = document.getElementById("physical").value.trim();
const position = document.getElementById("position").value.trim();
const statistique_GK = document.getElementById("statistique_GK");
const statistique_player = document.getElementById("statistique_player");

document.getElementById("position").addEventListener("change" , function(){
    console.log(this.value);
     if(this.value=="GK"){
        console.log(this.value);
        statistique_GK.classList.remove("hidden");
        statistique_player.classList.add("hidden");
     }
})
//ajout player
document.getElementById("btnAddplayer").addEventListener("click", AddPlayer);
function AddPlayer(event){
    event.preventDefault();


   
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

    id++;
    let player = {};
    player.id = id; 
    player.name = name_p; 
    player.rating = rating;  
    player.photo = photo ; 
    player.position=position ; 
    player.nationality = nationality;
    player.flag = flag;  
    player.club = club;
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
    codeHtml=`  
        <div id="${player.id}" class="badge_gold"  onclick="showEdit(${player.id})">
     <div  class=" absolutflex felx-col justify-center items-center gap-2 text-center h-45 w-20"> 
       <span  onclick="SupprimerTache(this)" class=" material-symbols-outlined   cursor-pointer text-red-500 hover:text-red-400  h-4 w-4 "> X </span> 
       <span   onclick="showformEdit(this)"  name_form="btnEdit" class="  material-symbols-outlined  cursor-pointer  text-yellow-300 h-4 w-4 ">border_color</span>
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

function deletedPlayerStad(){

}


function showEdit(id){
        

}



