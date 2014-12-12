/**
 * Created by zeling on 14/12/13.
 */
var Stack = (function () {
    function Stack() {
        this.st = [];
    }
    Stack.prototype.peek = function () {
        return this.st[0];
    };
    Stack.prototype.pop = function () {
        return this.st.shift();
    };
    Stack.prototype.push = function (item) {
        return this.st.unshift(item);
    };
    return Stack;
})();
var BF = (function () {
    function BF(code) {
        this.stack = new Stack();
        this.code = code;
        this.machine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //this.machine = [0];
        this.pointer = 10;
        this.ket = {};
        this.brac = {};
        for (var i = this.code.length - 1; i >= 0; i--) {
            if (this.code[i] === ']') {
                this.stack.push(i);
            }
            if (this.code[i] === '[') {
                this.ket[i] = this.stack.pop();
            }
        }
        for (var i = 0; i < this.code.length; i++) {
            if (this.code[i] === '[') {
                this.stack.push(i);
            }
            if (this.code[i] === ']') {
                this.brac[i] = this.stack.pop();
            }
        }
    }
    BF.prototype.run = function () {
        var s = "";
        var p = 0;
        while (p < this.code.length) {
            switch (this.code[p]) {
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
                    if (this.machine[this.pointer] === 0) {
                        p = this.ket[p] + 1;
                    }
                    else {
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
    };
    return BF;
})();
var helloBrainFuck = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++" + ".<<+++++++++++++++.>.+++.------.--------.>+.>.";
var bf = new BF(helloBrainFuck);
bf.run();
