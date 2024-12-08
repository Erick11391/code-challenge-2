document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("item-input");
    const addButton = document.getElementById("add-button");
    const clearButton = document.getElementById("clear-button");
    const shoppingList = document.getElementById("shopping-list");
  
    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
  
    
    function renderList() {
      shoppingList.innerHTML = "";
      items.forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.className = `item ${item.purchased ? "purchased" : ""}`;
        listItem.innerHTML = `
          <span contenteditable="true" data-index="${index}" class="item-name">${item.name}</span>
          <div>
            <button class="mark-button" data-index="${index}">
              ${item.purchased ? "Unmark" : "Mark Purchased"}
            </button>
            <button class="delete-button" data-index="${index}">Delete</button>
          </div>
        `;
        shoppingList.appendChild(listItem);
      });
      updateLocalStorage();
    }
  
    
    function updateLocalStorage() {
      localStorage.setItem("shoppingList", JSON.stringify(items));
    }
  
    
    addButton.addEventListener("click", () => {
      const itemName = input.value.trim();
      if (itemName) {
        items.push({ name: itemName, purchased: false });
        input.value = "";
        renderList();
      }
    });
  

    clearButton.addEventListener("click", () => {
      items = [];
      renderList();
    });
  
  
    shoppingList.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      if (e.target.classList.contains("mark-button")) {
        items[index].purchased = !items[index].purchased;
        renderList();
      } else if (e.target.classList.contains("delete-button")) {
        items.splice(index, 1);
        renderList();
      }
    });
  
    
    shoppingList.addEventListener("input", (e) => {
      if (e.target.classList.contains("item-name")) {
        const index = e.target.getAttribute("data-index");
        items[index].name = e.target.textContent;
        updateLocalStorage();
      }
    });
  
  
    renderList();
  });
  