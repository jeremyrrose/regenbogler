const Regenbogler = require('./index.js')
const {timeout, wave, numsArr, alphaArr, sentenceArr} = require('./config.js')
const message =  
"\033[2J\nQ U I C K  S O R T:" +
"\n\n\n"

let splits = 0
let comparisons = 0


const quick = async (arr, bow) => {

    if (arr.length < 2) {
        return arr
    }

    // for output
    splits++
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print(arr, false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string(arr))
    }
    // end output
    
    const pivot = arr.pop()
    const left = []
    const right = []

    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print([...left, "||", pivot, "||", ...right, "?:", ...arr], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string([...left, "||", pivot, "||", ...right, "?:", ...arr]))
    }
    // end output
    
    while (arr.length) {
        comparisons++
        if (arr[0] < pivot) {
            left.push(arr.shift())
        } else {
            right.push(arr.shift())
        }

        // for output
        await new Promise(resolve => setTimeout(resolve, timeout))
        if (!wave) {
            console.log(bow.print([...left, "||", pivot, "||", ...right, "?:", ...arr], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))   
        } else {
            console.log(bow.string([...left, "||", pivot, "||", ...right, "?:", ...arr]))
        } 
        // end output
    }

    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print([...left, "||", pivot, "||", ...right], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string([...left, "||", pivot, "||", ...right]))
    }
    // end output

    const result = [await quick(left, bow), await quick(right, bow)]

    // for output
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print([...result[0],"||",pivot,"||",...result[1]], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    } else {
        console.log(bow.string([...result[0],"||",pivot,"||",...result[1]]))
    }
    // end output

    return [...result[0], pivot, ...result[1]]

}

const bow = new Regenbogler(alphaArr.sort(()=>Math.random() - .5), true, message)
quick(bow.arr, bow)