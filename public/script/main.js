playersInGame = []
let next = 0
let dica 
let index 
let numIndex

function newIndex() {
    index = Math.ceil(Math.random() * 10)
}

function start() {
    document.querySelector('.play').style.display = 'none'
    document.querySelector('.addPlayer').style.display = 'block'
    newIndex()
}

function addPlayer() {
    const inPlayer = document.querySelector('#inPlayer')
    const inPlayer2 = document.querySelector('#inPlayer2')
    
    const player = inPlayer.value
    const player2 = inPlayer2.value
    
    if (!player || !player2) {
        if (!player) {
            inPlayer.style.border = '1px solid #f00'
            inPlayer.focus()
        } else {
            inPlayer2.style.border = '1px solid #f00'
            inPlayer2.focus()
        }
    
        return
    }
    
    if (player.length > 10 || player2.length > 10) {
        alert('Use nomes com até 10 caracteres.')
        return
    }
    
    playersInGame.unshift({ player1: player, acertos: 0 }, { player2: player2, acertos: 0 })
    document.querySelector('.addPlayer').style.display = 'none'
    document.querySelector('.game').style.display = 'flex'
    UI()
}

function UI() {
    tablePlayer()
    nextPlayer()
}

function nextPlayer() {
    const outPlayerNow = document.querySelector('#outPlayerNow')
    
    if (numIndex == undefined) {
        dica = ``
    } else {
        dica = numIndex < index ? '>' : '<'
    }
    
    if(next % 2 == 0) {
        outPlayerNow.value = `${playersInGame[next].player1}, chute um número. ${dica}`
        next++
    } else {
        outPlayerNow.value = `${playersInGame[next].player2}, chute um número. ${dica}`
        next--
    }
}

function tablePlayer() {
    let tableP1 = `
        <table>
            <tr>
                <th>Nome:</th>
                <td>${playersInGame[0].player1}</td>
            </tr>
            <tr>
                <th>Acertos:</th>
                <td>${playersInGame[0].acertos}</td>
            </tr>
        </table>
    `
    let tableP2 = `
        <table>
            <tr>
                <th>Nome:</th>
                <td>${playersInGame[1].player2}</td>
            </tr>
            <tr>
                <th>Acertos:</th>
                <td>${playersInGame[1].acertos}</td>
            </tr>
        </table>
    `
    let html = `<h3>Players</h3>\n\n${tableP1}\n\n${tableP2}`
    
    outPlayers.innerHTML = html
}

function playing() {
    let btNum = document.querySelector('#btNum')
    let btJ = document.querySelector('#btJ')
    numIndex = Number(btNum.value)
    
    if(!numIndex) {
        btJ.style.background = '#f00'
        setTimeout(function() {
            btJ.style.background = 'radial-gradient(circle, #098923, #07b514)'
        }, 900);
        return
    }
    
    switch (numIndex) {
        case index:
            newIndex()
            if (next == 0) {
                playersInGame[1].acertos++
            } else {
                playersInGame[0].acertos++
            }
            
            break;
    }
    
    UI()
}