const docString = `
The first positional argument to the constructor must be an array.
Optional arguments (in order, with defaults):
sort [true] : Use default sorts to populate this.sorted based on original array.
message ["] : Add a default message for .print method.
specialChars [["?:","||","$","<<"]] : Characters to include as keys in this.colors regardless of presence in original array.
`

class Regenbogler {

    constructor(arr, sort=true, message="", specialChars=["?:","||","$","<<"]) {

        if (!Array.isArray(arr) || typeof sort != 'boolean' || !Array.isArray(specialChars)) {
            console.log(docString)
            throw "Invalid arguments provided to constructor."
        }

        const ansiCodes = 
        [ 46,47,48,49,50,51,76,77,78,79,80,81,190,191,192,193,194,195,208,209,210,211,212,213,196,197,198,199,200,201,202,203,204,205,206,207 ]
        .sort((a,c)=>Math.random() - .5)

        this.arr = arr
        this.orig = [...arr]
        this.sorted = sort? arr.every(x => parseInt(x)) ? [...arr].sort((a,b)=>a-b) : [...arr].sort() : arr
        this.colors = {
        }
        specialChars.forEach(item => this.colors[item] = 255)
        arr.forEach((item, i) => {
            this.colors[item] = this.colors[item] ? this.colors[item] : ansiCodes[i < ansiCodes.length ? ansiCodes.length - 1 - i : i % ansiCodes.length]
        })
        this.message = message
    }

    print(arr, pre=null, post=null, index=null) {
        let str = this.message + (pre ? pre : '')
        str += this.base() + "\n\n"
        str += this.string(arr, index) + "\n\n"
        str += this.target() + "\n\n"
        str += post ? post : ""
        return str
    }

    string(arr, index=null) {
        let str = ""
        arr.forEach((item, i) => {
            // bold and underline
            str += i == index ? "\x1b[1m\x1b[4m" : ""
            str += ( colorCode =>`\x1b[38;5;${colorCode}m`)(this.colors[item])
            str += item       
            // remove bold and underline      
            str += i == index ? "\x1b[22m\x1b[24m " : " "
        })
        // console.log(str)
        return str
    }

    base() {
        return this.string(this.orig)
    }

    target() {
        return this.string(this.sorted)
    }
}

module.exports = Regenbogler;