const text = "Tic-Tac-Toe"
const container = document.querySelector('h2')
let idx = 0

function type() {
    if (idx < text.length) {
        container.innerHTML += text[idx]
        idx++
        // setTimeout isn't sleep fn in python. 
        // JS is single threaded and asynchronous.
        // JS doesn't pause for anything. 
        // So, we pass the function name into the setTimeout so to say that, like after 300ms, call the fn, type()
        setTimeout(type,300)
    }
}
type()


function two_players_clicked() {
    document.querySelector('body').classList.add('fade_out')
    setTimeout(function () {
        window.location.href = '2_players.html'
    },1000)
}

