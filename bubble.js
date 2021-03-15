const Regenbogler = require('./index.js')
const {timeout, wave, numsArr, alphaArr, sentenceArr} = require('./config.js')
const flipCheck = process.argv.includes("optimize")
const message =  
"\033[2J\nB U B B L E  S O R T:" +
"\n\n\n"

const bubbler = async arr => {

    const bow = new Regenbogler(arr, true, message)

    let ops = 0

    for (let i = 0; i < arr.length - 1; i++) {

        let flip = false

        for (let j=0; j < arr.length - 1 - i; j++) {
            
            // for output
            await new Promise(resolve => setTimeout(resolve, timeout))
            if (!wave) { 
                console.log(bow.print(arr, false, `\n\ntotal steps: ${ops}\npass ${i+1}; step ${j+1}`, j))
            } else {
                console.log(bow.string(arr, j))
            }
            // end output

            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                flip = true
            }

            ops++
        }

        if (flipCheck &&!flip) {
            return arr
        }
    }

    return arr
}

bubbler([...alphaArr].sort(() => Math.random() - .5))
// bubbler(sentenceArr)
