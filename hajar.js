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
    position = position.value; 

   
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
    newplayer.position = position ; 
    newplayer.isActif = false ; 

    if ((id_input.value==null)){  // ajout nouveau joueur si id est vide 
        id++;
        newplayer.id = id;   // increment l id puis ajouter 
        players.push(newplayer);
        localStorage.setItem("id" ,id) ;
        addPlayerToList(newplayer);

    }else if(id_input.value) { // si modif id est rempli lors de show de formulaire 
         let  index = players.findIndex(p=>(p.id ==id_input.value )) ; 
         players.splice(index , 1 , newplayer);



/********* hajar add player to list players */

ulPlayers.innerHTML=``; 

players.forEach(player => {
    let li = document.createElement("li") ;
    li.innerHTML = `  
        <div id="${player.id}" class="badge_gold"  >
     <div  class=" absolute right-0 top-5 bg-gray-400 flex flex-col  p-[4px] text-center  rounded-full "> 
       <span  onclick="deletedPlayerStad(${player.id})" class="cursor-pointer text-white hover:text-red-400 text-l font-semibold "> X </span> 
       <span   onclick="showformEdit(${player.id})"  name_form="btnEdit" class="cursor-pointer text-white hover:text-red-400 text-xl font-semibold">...</span>
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

          ulPlayers.appendChild(li); 
});



    }

    
    localStorage.setItem("players" ,JSON.stringify(players) ) ; 











    
}