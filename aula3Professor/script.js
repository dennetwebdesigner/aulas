let body = document.body;
//style == arquivo css, pode manipular aparecencia
body.style.display = "flex";
// move os elementos conteudo/filhos na horizontal
body.style.justifyContent = "center";
// altera alinha dos items/filhos na vertical
body.style.alignItems = "center";

// Chamada do banco de dados
const database = new DataBase();

// elementHTML.classList.add("container");
// elementHTML.classList.remove("container");
// container.setAttribute("id", "caontainer");

let container = document.createElement("div");
container.style.width = "300px";
container.style.height = "340px";
container.style.border = "2px solid black";
container.style.display = "flex";
container.style.flexWrap = "wrap";

let input = document.createElement("input");
input.style.width = "90%";
input.style.height = "10%";
input.style.padding = "10px";

let button = document.createElement("button");
button.textContent = "Add";
button.style.width = "10%";
button.style.cursor = "pointer";

let list = document.createElement("div");
list.style.width = "100%";
list.style.height = "90%";
list.style.overflowY = "auto";

const showItems = (list, input, data) => {
  list.innerHTML = "";
  data.forEach((item, index) => {
    if (item) {
      //   Cria o item da lista e altera css
      let items = document.createElement("div");
      items.style.width = "90%";
      items.style.minHeight = "20px";
      items.style.padding = "10px";
      items.style.margin = "10px auto";
      items.style.border = "1px solid black";
      //   captura valor do input
      items.textContent = item;

      // limpa o input
      input.value = "";

      let buttonRemover = document.createElement("button");
      buttonRemover.classList.add("remove");
      buttonRemover.textContent = "remover";

      // FALTA REMOVER EVENTO

      items.appendChild(buttonRemover);
      //   adiciona ao elemento pai -> list
      list.append(items);

      buttonRemover.addEventListener("click", async () => {
        const tasks = await database.select();
        const removed = await database.destroy(index);

        showItems(list, input, tasks);
      });
    }
  });
};

database.select().then((data) => {
  showItems(list, input, data);
});

button.addEventListener("click", async () => {
  if (input.value == "") {
    alert("digite uma tarefa");
    return;
  }

  const content = await database.insert(input.value);
  console.log(content.id);
  const tasks = await database.select();

  showItems(list, input, tasks);
});

container.append(list, input, button);
body.append(container);
