showKeyCodes = (e) => {
  //Container where the key code information will be displayed
  const insert = document.getElementById("insert");

  // For clearing the content
  insert.innerHTML = "";

  //Object, will store key-related info.
  const keyCodes = {
    "e.key": e.key === " " ? "Space" : e.key,
    "e.keyCode": e.keyCode,
    "e.code": e.code,
  };

  //for loop which iterates over each key in keyCodes object
  for (let key in keyCodes) {
    const div = document.createElement("div");
    div.className = "key";
    const small = document.createElement("small");

    const keyText = document.createTextNode(key);
    const valueText = document.createTextNode(keyCodes[key]);

    small.appendChild(keyText);
    div.appendChild(valueText);
    div.appendChild(small);

    insert.appendChild(div);
  }
};

window.addEventListener("keydown", showKeyCodes);
