//Using bytecode
const opSTOP = 0;
const opSUM = 1;
const opSUB = 2;
const opMUL = 3;
const opDIV = 4;
const opPUSH = 5; //cargan una const en la pila
const opLOAD = 6;
const opSAVE = 7;
const opOUT = 8; // console.log(valor de la pila);


var pgm = []; //program bytecode
var acc = 0; //acumulator
var ip = 0; //ip es el puntero de instrucción
var stack = []; //la pila de ejecución
var vars = []; //array de variables


var sueldo = 0;
var meses = 1;
var total = 2;


function execOP() {
    let op = pgm[ip++];
    let nvar = 0;
    let cte = 0; // constante
    switch (op) {

        case opSTOP:
            return false;

        case opSUM:
            stack.push(stack.pop() + stack.pop());
            break;

        case opSUB:
            stack.push(stack.pop() - stack.pop());
            break;


        case opMUL:
            stack.push(stack.pop() * stack.pop());
            break;


        case opDIV:
            stack.push(stack.pop() / stack.pop());
            break;

        case opLOAD:
            nvar = pgm[ip++];
            stack.push(vars[nvar]);
            break;

        case opSAVE:
            nvar = pgm[ip++];
            vars[nvar] = stack.pop();
            break;

        case opPUSH:
            cte = pgm[ip++];
            stack.push(cte);
            break;


        case opOUT:
            console.log(stack.pop());
            break;

    }
    return true;
}

function disasemble() {
    ip = 0;
    while (ip < pgm.length) {
        let _ip = ip;
        let op = pgm[ip++];

        switch (op) {

            case opSTOP:
                console.log(`${_ip}: STOP`);
                break;

            case opSUM:
                console.log(`${_ip}: SUM`);
                break;

            case opSUB:
                console.log(`${_ip}: SUB`);
                break;


            case opMUL:
                console.log(`${_ip}: MUL`);
                break;


            case opDIV:
                console.log(`${_ip}: DIV`);
                break;

            case opLOAD:
                nvar = pgm[ip++];
                console.log(`${_ip}: LOAD ${nvar}`);
                break;

            case opSAVE:
                nvar = pgm[ip++];
                console.log(`${_ip}: SAVE ${nvar}`);
                break;

            case opPUSH:
                cte = pgm[ip++];
                console.log(`${_ip}: PUSH ${cte}`);
                break;

            case opOUT:
                console.log(`${_ip}: OUT`);
                break;
        }
    }
}

function gen(ip, op, ...args) {
    switch (op) {
        case opSTOP:
            pgm[ip++] = opSTOP;
            break;

        case opSUM:
        case opSUB:
        case opMUL:
        case opDIV:
            pgm[ip++] = op;
            break;

        case opLOAD:
        case opSAVE:
            pgm[ip++] = op;
            pgm[ip++] = args[0];
            break;

        case opPUSH:
            pgm[ip++] = op;
            pgm[ip++] = args[0];
            break;


        case opOUT:
            pgm[ip++] = opOUT;
            break;
    }
    return ip;
}


function loadPGM() {
    ip = 0;
    pgm = [];
    ip = gen(ip, opPUSH, 2);
    ip = gen(ip, opSAVE, sueldo);
    ip = gen(ip, opPUSH, 3);
    ip = gen(ip, opSAVE, meses);
    ip = gen(ip, opLOAD, sueldo);
    ip = gen(ip, opLOAD, meses);
    ip = gen(ip, opMUL);
    ip = gen(ip, opSAVE, total);
    ip = gen(ip, opLOAD, total);
    ip = gen(ip, opOUT);
    ip = gen(ip, opSTOP);
}

function execPGM() {
    ip = 0;
    while (execOP()) {
        console.log(`ip ${ip}: stack: ${stack} vars: ${vars}`);
    }
}

loadPGM();
console.log('Bytecode:', pgm);
disasemble();
console.log(`executing....`);
execPGM();
