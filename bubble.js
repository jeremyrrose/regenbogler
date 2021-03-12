const Regenbogler = require('./index.js')
const message =  
"\033[2J\nB U B B L E  S O R T:" +
"\n\n\n"


const numsArr = [ 1,1,1, 6, 1,1,1,1834, 2, 4, 7, 12, 1, 5, 3, 66, 12, 7, 3 ]
const alphaArr = "abcdefghijklmnopqrstuvwxyz".split('')
const sentenceArr = "the quick brown fox jumps over the lazy dog".split(" ")

const bubbler = async arr => {

    const bow = new Regenbogler(arr, true, message)

    let ops = 0

    for (let i = 0; i < arr.length - 1; i++) {

        let flip = false

        for (let j=0; j < arr.length - 1; j++) {
            
            await new Promise(resolve => setTimeout(resolve, 200))
            console.log(bow.print(arr, false, `\n\ntotal steps: ${ops}\npass ${i+1}; step ${j+1}`, j))
            // console.log(bow.print(arr, false, false, j))
            // console.log(bow.string(arr, j))
            // console.log(bow.string(arr, j), "\n" + bow.base(), "\n" + bow.target())

            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                flip = true
            }

            ops++
        }

        // if (!flip) {
        //     return arr
        // }
    }

    return arr
}

bubbler([...alphaArr].sort(() => Math.random() - .5))
// bubbler(sentenceArr)
