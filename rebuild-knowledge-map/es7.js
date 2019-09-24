class Dragon {
    constructor(element){
        this.elem = element
    }
    breath = () =>{
        return `I am breathing ${this.elem}`
    }
}

let little = new Dragon('test1')
console.log(little.breath)