
var modal = document.getElementById("myModal");
var idColor = 0;
var idIcon = 0;

function openModal() {
console.log("open modal");
  modal.style.display = "block";
  loadIcons();
  loadColors();
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function loadIcons() {
  //window.api.getAllIcons(); //calls ipcRenderer.invoke('icon:getAll')
  window.api.getAllIcons().then(data => { //method returns data -> which is the defined promise
    console.log("Icons:", data);
    displayIcons(data);
  });
}

function loadColors() {
  window.api.getAllColors().then(data => {
    console.log("Colors: " , data);
    displayColors(data);
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

    iconItem.addEventListener('click', () => {
        container.querySelectorAll('.icon-item.selected').forEach(icon => {
          icon.classList.remove('selected');
        });
        
        idIcon = icon.id;
        iconItem.classList.add('selected');
        console.log("icon id - ", idIcon);
      }
    )
  });
}

function displayColors(data) {
  const container = document.querySelector('.colors-grid');
  container.innerHTML = '';

  data.forEach(color => {
    const colorItem = document.createElement('div');
    colorItem.classList.add('color-item');
    colorItem.style.backgroundColor = color.hex_value;

    container.appendChild(colorItem);

    colorItem.addEventListener('click', () => {
        container.querySelectorAll('.color-item.selected').forEach(colorItem => {
          colorItem.classList.remove('selected');
      });

      idColor = color.id;
      colorItem.classList.add('selected');
      console.log("color id - ", idColor);
      }
    )
  });
}

async function createDeck() {
    const deckName = document.getElementById('deck-name').value;
    const selectedIdIcon = idIcon;
    const selectedIdColor = idColor;

    try {
      const result = await window.api.createDeck(deckName, selectedIdIcon, selectedIdColor);
      if (result.success) {
          alert("Deck created, id: " + result.id);
      } else {
          alert("Something went wrong: " + result.error);
      }
    } catch (e) {
      alert("Unexpected error: " + e.message);
    }
}


