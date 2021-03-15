const Regenbogler = require('./index.js')
const {timeout, wave, numsArr, alphaArr, sentenceArr} = require('./config.js')
const message =  
"\033[2J\nI N S E R T I O N  S O R T:" +
"\n\n\n"

const insertion = async (arr) => {

    // for output
    const bow = new Regenbogler(arr, true, message)
    let ops = 0

    for (let i = 1; i < arr.length; i++) {
        const cur = arr[i]

        let j = i - 1
        while( arr[j] > cur && j >= 0) {

            // for output
            await new Promise(resolve => setTimeout(resolve, timeout))
            if (!wave) {
                console.log(bow.print([...arr, '?:', cur], false, `\n\ntotal steps: ${ops}\nouter ${i+1}; inner ${j+1}`, j))
            } else {
                console.log(bow.string([...arr, "?:", cur], j))
            }
            // end output

            arr[j+1] = arr[j]
            j--

            // for output
            ops++
        }
        arr[j+1] = cur

        // for output
        ops++
        await new Promise(resolve => setTimeout(resolve, timeout))
        if (!wave) {
            console.log(bow.print([...arr, '?:', cur], false, `\n\ntotal steps: ${ops}\nouter ${i+1}; inner ${j+1}`, j))
        } else {
            console.log(bow.string([...arr, "?:", cur], j))
        }
        // end output
    }
    return arr
}

insertion(alphaArr.sort(()=>Math.random() - .5))
// insertion(numsArr)
