const Regenbogler = require('./index.js')
const message =  
"\033[2J\nin 25 werds or less:" +
"\nwhy is this so slo?" +
"\n\n\n"


const numsArr = [ 1,1,1, 6, 1,1,1,1834, 2, 4, 7, 12, 1, 5, 3, 66, 12, 7, 3 ]
const alphaArr = "abcdefghijklmnopqrstuvwxyz".split('')
const sentenceArr = "the quick brown fox jumps over the lazy dog".split(" ")

const insertion = async (arr) => {

    const bow = new Regenbogler(arr, true, message)

    let ops = 0

    for (let i = 1; i < arr.length; i++) {
        const cur = arr[i]
        // console.log(i)
        let j = i - 1
        while( arr[j] > cur && j >= 0) {
            await new Promise(resolve => setTimeout(resolve, 200))
            console.log(bow.print([...arr, '?:', cur], false, `\n\ntotal steps: ${ops}\nouter ${i+1}; inner ${j+1}`, j))
            // console.log(bow.string([...arr, "?:", cur], j))
            arr[j+1] = arr[j]
            j--
            ops++
        }
        arr[j+1] = cur
        ops++
        console.log(bow.print(arr, false, `\n\ntotal steps: ${ops}\nouter ${i+1}; inner ${j+1}`, j))
    }
    return arr
}

insertion(alphaArr.sort(()=>Math.random() - .5))
// insertion(numsArr)
