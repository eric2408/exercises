$(function(){
    let baseURL = 'http://deckofcardsapi.com/api/deck/'

    axios.get(`${baseURL}/new/draw/`)
        .then(data => {
            let { suit, value } = data.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`) 
        });

    let firstCard = null;
    axios.get(`${baseURL}/new/draw/`)
        .then(data => {
            firstCard = data.data.cards[0];
            let deckId = data.data.deck_id
            return axios.get(`${baseURL}/${deckId}/draw/`)
        })
        .then(data => {
            secondCard = data.data.cards[0];
            [firstCard, secondCard].forEach(function(card){
                console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`) 
            })
        })

    let deckId = null;
    let $btn = $('button')
    let $cardArea = $('#cardArea')

    axios.get(`${baseURL}/new/shuffle/`)
        .then(data => {
            deckId = data.data.deck_id;
            $btn.show();
        });

    $btn.on('click', function(){
        axios.get(`${baseURL}/${deckId}/draw/`).then(data => {
            let src = data.data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            $cardArea.append(
                $('<img>', {
                    src: src,
                    css: {
                      transform: `rotate(${angle}deg)`,
                      position: 'absolute'
                    }
                  })
            );
            if (data.remaining === 0) $btn.remove();
        })
    })
    
})