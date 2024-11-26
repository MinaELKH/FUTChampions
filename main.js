document.getElementById("btnOpenAjoutForm").addEventListener("click", function () {
    formAjout.classList.remove("hidden");
    ajoutMutiple = false;
  });
document.getElementById("closeFormEdit").addEventListener("click", function () {
  formEdit.classList.add("hidden");
  erreurForm1.classList.add("hidden");
  erreurForm1.innerHTML = "";
});





const joueurs = [] 

