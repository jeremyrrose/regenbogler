const Regenbogler = require('./index.js')
const {timeout, wave, numsArr, alphaArr, sentenceArr} = require('./config.js')
const message =  
"\033[2J\nM E R G E  S O R T:" +
"\n\n\n"

let splits = 0
let merges = 0
let ops = 0


const mergeSort = async (arr, bow) => {

    splits++
    if (arr.length < 2) {
        return arr
    }

    const center = Math.floor(arr.length / 2)

    const left = arr.slice(0,center)
    const right = arr.slice(center)

    ops++
    await new Promise(resolve => setTimeout(resolve, timeout))
    if (!wave) {
        console.log(bow.print([...left, "||", ...right], false, `\n\ntotal steps: ${ops}\nsplits ${splits}; merges ${merges}`))
    } else {
        console.log(bow.string([...left, "||", ...right]))
    }

    return await merge(await mergeSort(left, bow), await mergeSort(right, bow), bow)

}

const merge = async (left, right, bow) => {
    merges++
    const result = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
        ops++
        await new Promise(resolve => setTimeout(resolve, timeout))
        if (!wave) {
            console.log(bow.print([...result, "<<", ...left, "||", ...right], false, `\n\ntotal steps: ${ops}\nsplits ${splits}; merges ${merges}`))
        } else {
            console.log(bow.string([...result, "<<", ...left, "||", ...right]))
        }
    }
    return [...result, ...left, ...right]
}

const bow = new Regenbogler(alphaArr.sort(()=>Math.random() - .5), true, message)
console.log(mergeSort(bow.orig, bow))