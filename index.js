const docString = `
The first positional argument to the constructor must be an array.
Optional arguments (in order, with defaults):
sort [true] : Use default sorts to populate this.sorted based on original array.
message ["] : Add a default message for .print method.
specialChars [["?:","||","$","<<"]] : Characters to include as keys in this.colors regardless of presence in original array.
palette [null] : Provide a color palette using 8-bit ANSI codes. If not provided, defaults to pastel.
`

class Regenbogler {

    constructor(arr, sort=true, message="", specialChars=["?:","||","$","<<"], palette=null) {

        if (!Array.isArray(arr) || typeof sort != 'boolean' || !Array.isArray(specialChars)) {
            console.log(docString)
            throw "Invalid arguments provided to constructor."
        }

        const ansiCodes = (
            palette ||
            [ 32, 38, 41, 43, 45, 50, 74, 79, 81, 85, 110, 113, 116, 134, 141, 152, 156, 169, 171, 174, 177, 192, 194, 208, 210, 212, 214, 216, 218, 219, 220, 222, 224, 226, 229 ]
        ).sort((a,c)=>Math.random() - .5)

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