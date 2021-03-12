class Regenbogler {
    constructor(arr, sort=true, message="", vals=[96,160,192,255], specialChars=["?:","||","$"]) {

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