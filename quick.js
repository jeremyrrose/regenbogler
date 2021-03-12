const Regenbogler = require('./index.js')
const message =  
"\033[2J\nin 25 werds or less:" +
"\nwhy is this so slo?" +
"\n\n\n"
const timeout = 100

const numsArr = [ 1,1,1, 6, 1,1,1,1834, 2, 4, 7, 12, 1, 5, 3, 66, 12, 7, 3 ]
const alphaArr = "abcdefghijklmnopqrstuvwxyz".split('')
const sentenceArr = "the quick brown fox jumps over the lazy dog".split(" ")

let splits = 0
let merges = 0
let comparisons = 0


const quick = async (arr, bow) => {

    if (arr.length < 2) {
        return arr
    }
    splits++

    await new Promise(resolve => setTimeout(resolve, timeout))
    console.log(bow.print(arr, false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    
    const pivot = arr.pop()
    const left = []
    const right = []

    await new Promise(resolve => setTimeout(resolve, timeout))
    console.log(bow.print([...left, "||", pivot, "||", ...right, "?:", ...arr], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    
    while (arr.length) {
        comparisons++
        if (arr[0] < pivot) {
            left.push(arr.shift())
        } else {
            right.push(arr.shift())
        }
        await new Promise(resolve => setTimeout(resolve, timeout))
        console.log(bow.print([...left, "||", pivot, "||", ...right, "?:", ...arr], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))    
    }

    await new Promise(resolve => setTimeout(resolve, timeout))
    console.log(bow.print([...left, "||", pivot, "||", ...right], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    
    const result = [await quick(left, bow), pivot, await quick(right, bow)]
    console.log(bow.print([...result[0],"||",pivot,"||",...result[2]], false, `\n\ntotal steps: ${comparisons}\nsplits ${splits}`))
    return [...result[0], pivot, ...result[2]]

}

const bow = new Regenbogler(alphaArr.sort(()=>Math.random() - .5), true, message)
console.log(quick(bow.arr, bow))