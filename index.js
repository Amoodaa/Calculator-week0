const input = document.querySelector("#screen")
const buttonsDiv = document.querySelector(".buttons")
const regexp = /[1-9.]+[+\-*\/]+[1-9.]+/g;
const keys = ['+', '-', '*', '.', '/'];


const clearBtn = document.querySelector('button#clear');
clearBtn.addEventListener('click', () => clear());

const backspaceBtn = document.querySelector('button#backspace');
backspaceBtn.addEventListener('click', () => backspace());
window.addEventListener('keydown', (e) => {
    if (e.key == 'Backspace') backspace();
});

(function addButtons() {
    let btn;
    let keys = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', '.', 0, '=', '/']
    for (let i = 0; i < keys.length; i++) {
        btn = document.createElement('button');
        btn.textContent = keys[i];
        btn.classList.add('keys');
        if (keys[i] == '=')
            btn.addEventListener('click', () => evaluate());
        else if (keys[i] == '.')
            btn.addEventListener('click', (e) => insertDot());
        else
            btn.addEventListener('click', (e) => insert(e.target.textContent));

        if (keys[i] == '=')
            window.addEventListener('keydown', (e) => {
                if (e.key == '=') evaluate();
            });
        else if (keys[i] == '.')
            window.addEventListener('keydown', (e) => {
                console.log(e.key);
                if (e.key == '.') insertDot();
            });
        else
            window.addEventListener('keydown', (e) => {
                if (e.key == keys[i]) insert(e.key);
            });

        buttonsDiv.appendChild(btn);
    }

})();

function insertchar(c) {
    input.textContent += String(c);
}

function checkForDuplication(c, exp) {

    let x = exp.slice(input.textContent.length - 1);
    if (keys.includes(c))
        for (let index = 0; index < keys.length; index++)
            if (keys[index] == x)
                return true;
    return false;
}

function insertDot() {
    let exp = input.textContent;
    if (exp == "" || !endsWithOperatorOrDot(exp)) insertchar('.');
    let arr = exp.split(/[+\-*\/]+/g);
    if (arr[arr.length - 1].match(/\d+.+\d+/) != null)
        backspace();
}

function insert(c) {
    if (checkForDuplication(c, input.textContent)) {
        backspace();
        input.textContent += c;
    } else
        insertchar(c);
}

function backspace() {
    input.textContent = input.textContent.slice(0, input.textContent.length - 1);
}

function clear() {
    input.textContent = "";
}

function endsWithOperatorOrDot(exp) {
    return exp.charAt(exp.length - 1).match(/[+\-*\/.]+/g) != null;
}

function evaluate() {
    let exp = input.textContent;
    if (endsWithOperatorOrDot(exp))
        backspace();
    if (exp.endsWith('/0')) {
        input.textContent = 'arthmetic error';
    } else
        input.textContent = eval(input.textContent);
}