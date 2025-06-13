
var modal = document.getElementById("myModal");

function openModal() {
console.log("open modal");
  modal.style.display = "block";
  loadIcons();
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function selectIcon() {

}   

function selectColor() {

}

async function loadIcons() {
  //window.api.getAllIcons(); //calls ipcRenderer.invoke('icon:getAll')
  window.api.getAllIcons().then(data => { //method returns data -> which is the defined promise
    console.log("Icons:", data);
    displayIcons(data);
  });
}

function displayIcons(data) {
  const container = document.querySelector('.icons-grid');
  container.innerHTML = ''; // clearing the icons

  data.forEach(icon => {
    const iconItem = document.createElement('div');
    iconItem.classList.add('icon-item');

    const itemI = document.createElement('i');
    const iconClass = `bi bi-${icon.bootstrap_class}`;  //class name because <i class="bi bi-alarm"></i>
    itemI.className = iconClass;
    iconItem.appendChild(itemI);

    container.appendChild(iconItem);
  });
}

