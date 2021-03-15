const timeout = parseInt(process.argv[2]) || 200
const wave = process.argv[3] || false

const numsArr = [ 1,1,1, 6, 1,1,1,1834, 2, 4, 7, 12, 1, 5, 3, 66, 12, 7, 3 ]
const alphaArr = "abcdefghijklmnopqrstuvwxyz".split('')
const sentenceArr = "the quick brown fox jumps over the lazy dog".split(" ")

module.exports = {
    timeout,
    wave,
    numsArr,
    alphaArr,
    sentenceArr
}