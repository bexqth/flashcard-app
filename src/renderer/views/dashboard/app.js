var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function openModal() {
    console.log("open modal");
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}