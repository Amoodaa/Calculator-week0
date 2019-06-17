const input = document.querySelector(".screen")
const buttonsDiv = document.querySelector(".buttons")
const regexp = /[1-9.]+[+\-*\/]+[1-9.]+/g;

function addButtons() {
    let btn;
    let keys = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', '.', 0, '=', '/']
    for (let i = 0; i < keys.length; i++) {
        btn = document.createElement('button');
        btn.textContent = keys[i];
        btn.classList.add('keys');
        btn.addEventListener('click', (e) => insert(e.target.textContent));
        buttonsDiv.appendChild(btn);
    }
}
addButtons();

function insert(c) {

    insertchar(c);


}


function insertchar(c) {
    input.textContent += String(c);
}

const clearBtn = document.querySelector('button#clear')
clearBtn.addEventListener('click', () => clear());

function clear() {
    input.textContent = "";
}