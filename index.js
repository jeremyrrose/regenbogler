const docString = `
The first positional argument to the constructor must be an array.
Optional arguments (in order, with defaults):
sort [true] : Use default sorts to populate this.sorted based on original array.
message ["] : Add a default message for .print method.
vals [[96,160,192,255]] : Provide RGB values between 0 and 255 for building the array of colors.
specialChars [["?:","||","$"]] : Characters to include as keys in this.colors regardless of presence in original array.
`

class Regenbogler {

    constructor(arr, sort=true, message="", vals=[96,160,192,255], specialChars=["?:","||","$"]) {

        if (!Array.isArray(arr) || typeof sort != 'boolean' || !Array.isArray(vals) || !Array.isArray(specialChars)) {
            console.log(docString)
            throw "Invalid arguments provided to constructor."
        }

        const rgbs = [ ]
        for (let val1 of vals) {
            for (let val2 of vals) {
                for (let val3 of vals) {
                    if (val1 && val2 || val1 && val3 || val2 && val3){
                        rgbs.push([val1,val2,val3])
                    }
                }
            }
        }

        this.arr = arr
        this.orig = [...arr]
        this.sorted = sort? arr.every(x => parseInt(x)) ? [...arr].sort((a,b)=>a-b) : [...arr].sort() : arr
        this.colors = {
        }
        specialChars.forEach(item => this.colors[item] = [vals[vals.length-1], vals[vals.length-1], vals[vals.length-1]])
        arr.forEach((item, i) => {
            this.colors[item] = this.colors[item] ? this.colors[item] : rgbs[i < rgbs.length ? rgbs.length - 1 - i : i % rgbs.length]
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
            str += ((r,g,b)=>`\x1b[38;2;${r};${g};${b}m`)(...this.colors[item])
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