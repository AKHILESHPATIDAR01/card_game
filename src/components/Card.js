import React from "react";
import Clubs from '../images/Clubs.png'
import Spades from '../images/Spades.png'
import Heart from '../images/Heart.png'
import Diamond from '../images/Diamond.png'

class Card extends React.Component {
constructor(props){
    super(props);
    this.state = {
        allCard : [],
        numberArray : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
        setOfCard : [Clubs,Spades,Heart,Diamond],
        playingCards : [],
        selectedCards : [],
        msg : false,
    }
}


createCards = ()=>{
    let cardObjs = [];
    for(let i=0; i<=3 ; i++){
        for(let item of this.state.numberArray){
            const obj = { num: item, img: this.state.setOfCard[i] }
            cardObjs.push(obj);
        }
    }
    let suffledCards = cardObjs.sort( ()=>Math.random()-0.5 );
    this.setState({playingCards: suffledCards })
}

componentDidMount(){
 this.createCards();
}

suffleCards = () =>{
    this.createCards();
    this.setState({selectedCards: [], msg: false});
}


selectedCards = ()=>{
    let cardsArray = this.state.playingCards;
    let localSelectedCards = [];
    if(cardsArray.length > 5){
        for(let i=0; i<5; i++){
            const randomIndex = Math.floor(Math.random() * cardsArray.length);
            const item = cardsArray[randomIndex];
            localSelectedCards.push(item);
            for( let i = 0; i < cardsArray.length; i++){                          
                if ( i === randomIndex ) { 
                    cardsArray.splice(i, 1);
                }
            }
        }
        this.setState({playingCards: cardsArray, selectedCards: localSelectedCards });
    }
    else{
        this.setState({msg: true})
    }
}


render() {
	return (
        <div>
            <div className='card_list'>
                {this.state.playingCards.map((item)=>{
                    return(
                        <div className='card_container'>
                            <div className='top'>
                                <div>{item.num}</div>
                                <img src={item.img} alt='img'/>
                            </div>
                            <div className='center'><img src={item.img} alt='img' /></div>
                            <div className='bottom'>
                                <div>{item.num}</div>
                                <img src={item.img} alt='img'/>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="btn_holder">
                <button onClick={this.suffleCards}>Suffle</button>
                <button onClick={this.selectedCards}>Pick 5 Cards</button>
            </div>

            {this.state.msg === true ? <div className='msg'><p>No more possibalities to pick another 5 random cards</p></div> : null }

            <div className='selected_cards_container'>
                {this.state.selectedCards.map((item)=>{
                    return(
                        <div className='card_container'>
                            <div className='top'>
                                <div>{item.num}</div>
                                <img src={item.img} alt='img'/>
                            </div>
                            <div className='center'><img src={item.img} alt='img'/></div>
                            <div className='bottom'>
                                <div>{item.num}</div>
                                <img src={item.img} alt='img'/>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
}

export default Card;
