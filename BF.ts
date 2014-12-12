/**
 * Created by zeling on 14/12/13.
 */
class Stack{
    st: number[];
    constructor() {
        this.st = [];
    }
    peek(){
        return this.st[0];
    }
    pop(){
        return this.st.shift();
    }
    push(item:number){
        return this.st.unshift(item);
    }
}

class BF{
    code: string;
    machine: number[];
    pointer: number;
    stack: Stack;
    ket: Object;
    brac: Object;

    constructor(code:string){
        this.stack = new Stack();
        this.code = code;
        this.machine = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //this.machine = [0];
        this.pointer = 10;
        this.ket = {};
        this.brac = {};

        for (var i = this.code.length - 1; i >= 0; i--) {
            if (this.code[i] === ']') {
                this.stack.push(i);
            }
            if (this.code[i] === '['){
                this.ket[i] = this.stack.pop();
            }
        }


        for (var i = 0; i < this.code.length; i++){
            if (this.code[i] === '['){
                this.stack.push(i);
            }
            if (this.code[i] === ']'){
                this.brac[i] = this.stack.pop();
            }
        }
    }

    public run(){
        var s:string = "";
        var p:number= 0;
        while(p < this.code.length){
            switch (this.code[p]){
                case '+':
                    this.machine[this.pointer]++;
                    p++;
                    break;
                case '-':
                    this.machine[this.pointer]--;
                    p++;
                    break;
                case '>':
                    this.pointer++;
                    p++;
                    break;
                case '<':
                    this.pointer--;
                    p++;
                    break;
                case '.':
                    s += String.fromCharCode(this.machine[this.pointer]);
                    p++;
                    break;
                case '[':
                    //console.log(this.machine[this.pointer]);
                    if(this.machine[this.pointer] === 0){
                        p = this.ket[p] + 1;
                    } else {
                        p++;
                    }
                    break;
                case ']':
                    p = this.brac[p];
                    break;
                default:
                    p++;
                    break;
            }
        }
        console.log(s);
    }

}

var helloBrainFuck:string = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++" +
    ".<<+++++++++++++++.>.+++.------.--------.>+.>.";
var bf : BF = new BF(helloBrainFuck);
bf.run();