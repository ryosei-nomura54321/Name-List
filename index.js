if ('serviceWorker' in navigator) {
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("sw.js");
  });
}

const defaultSave = () => {
  defaultHTML = document.getElementById("main_wrap");
}

const clearInput = () => {
  const inputName = document.getElementById("input_name");
  inputName.value = "";
}

const addButton = document.getElementById("add_button");

addButton.addEventListener('click', () => {
  const inputName = document.getElementById("input_name").value;
  if (inputName == '') {
    console.log('文字を入力してください');
  } else {
    const inputName = document.getElementById("input_name").value;
    const nameListElem = document.getElementById("namelists");

    const ulLiElem = document.createElement("li");
    const newName = document.createTextNode(inputName);
  
    ulLiElem.appendChild(newName);
    nameListElem.appendChild(ulLiElem)
    clearInput();
  }

});

const shuffle = ([...array]) => {
  for (let i = array.length -1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const clearList = () => {
  const nameListElem = document.getElementById("main_wrap");
  main_wrap.innerHTML = '';
}

const sortButton = document.getElementById("sort_button");

sortButton.addEventListener('click', () => {
  const nameListElem = document.getElementById("namelists");
  const listedName = nameListElem.getElementsByTagName("li");
  const nameArray = []
  for (let i = 0; i < listedName.length; i++) {
    nameArray.push(listedName[i].textContent);
  }
  const shuffledLists = shuffle(nameArray);
  //配列の長さ分のliをつくる→一つずつそこにいれる
  const result = document.getElementById("result");
  for (const a of shuffledLists) {
    const olLiElem = document.createElement("li");
    olLiElem.textContent = a;
    result.appendChild(olLiElem);
  }
  clearList();
});


const backButton = document.getElementById("back_button");

backButton.addEventListener('click', () => {
  location.reload();
});