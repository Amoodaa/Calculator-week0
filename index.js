const input = document.querySelector(".screen")
const buttonsDiv = document.querySelector(".buttons")
const regexp = /[1-9.]+[+\-*\/]+[1-9.]+/g;
const keys = ['+', '-', '*', '.', '/']

function addButtons() {
    let btn;
    let keys = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', '.', 0, '=', '/']
    for (let i = 0; i < keys.length; i++) {
        btn = document.createElement('button');
        btn.textContent = keys[i];
        btn.classList.add('keys');
        if (keys[i] == '=') {
            btn.addEventListener('click', () => evaluate());
        } else
            btn.addEventListener('click', (e) => insert(e.target.textContent));
        buttonsDiv.appendChild(btn);
    }

}
addButtons();

function insert(c) {
    let x = input.textContent.slice(input.textContent.length - 1);
    let isFound = false;
    if (keys.includes(c))
        for (let index = 0; index < keys.length; index++) {
            if (keys[index] == x) {
                isFound = true;
                input.textContent = input.textContent.slice(0, input.textContent.length - 1) + c;
            }
        }
    isFound ? null : insertchar(c);
}

function evaluate() {
    input.textContent = eval(input.textContent);
}

function insertchar(c) {
    input.textContent += String(c);
}

const clearBtn = document.querySelector('button#clear')
clearBtn.addEventListener('click', () => clear());

function clear() {
    input.textContent = "";
}