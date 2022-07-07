$(function(){
    let baseURL = 'http://deckofcardsapi.com/api/deck/'

    async function one(){
        let res = await axios.get(`${baseURL}/new/draw/`);
            let { suit, value } = res.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`) ;
    };

    one();

    async function two(){
        let firstCard = await axios.get(`${baseURL}/new/draw/`);
        let deckId = firstCard.data.deck_id
        let secondCard = await axios.get(`${baseURL}/${deckId}/draw/`);
        [firstCard, secondCard].forEach(card =>{
            let { suit, value } = card.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`) ;
        });
    }

    two();


    async function three(){
        let $btn = $('button')
        let $cardArea = $('#cardArea')
    
        let res = await axios.get(`${baseURL}/new/shuffle/`);
        let deckId = res.data.deck_id;
        $btn.show().on('click', async function(){
            let show = await axios.get(`${baseURL}/${deckId}/draw/`);
                let src = show.data.cards[0].image;
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
                if (show.remaining === 0) $btn.remove();
        })
    }
    three();
})