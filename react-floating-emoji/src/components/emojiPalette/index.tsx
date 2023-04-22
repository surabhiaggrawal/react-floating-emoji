import { useState } from "react";
import {SButton, SDiv, SImg, SFlyingEmoji} from "./styled";
import { delay, AllEmojis} from "./constants";
import { getRandomInteger } from "../../utils/randomGenerator";


const EmojiPalette = () => {

    let [flyingEmoji,setFlyingEmoji] = useState([]);
    let [count,setCount] = useState(0);

    const flyingEffectAnimation = [  
        { transform: `translateY(0%)` },
        { transform: `translateY(-${window.innerHeight+650}%)` }
    ];

    const onClickHandler = (event: React.SyntheticEvent) =>{

    setCount((prevCount)=> (prevCount+1)%100);

    // @ts-ignore
    const currentEl: HTMLImageElement = Array.from(event.currentTarget.children)[0];


    let newEl = <SImg className='particle' style={{position:'relative',left: getRandomInteger(10,document.body.clientWidth-100)+'px'}} id={`${count}`} src={currentEl.src} alt={currentEl.alt} key={`${count}`}/>;
    
    let timer = setTimeout(()=>{
      
        const currentEl = document.getElementById(`${count}`);
        let animation = currentEl.animate(flyingEffectAnimation,{
            // timing options
            duration: 1000,
            delay,
            easing: 'ease'
        });
        
        animation.onfinish = function () {
            animation.cancel();
            currentEl.remove()   
        }

        clearTimeout(timer);
    },0)
  
    setFlyingEmoji((prevState)=> [...prevState,newEl]);    
    }


    return <SDiv>
        {AllEmojis.map(item => {
            return <SButton key={item.name} onClick={onClickHandler}><SImg data-emoji={item.name} src={item.icon} alt={item.name}/></SButton>;
        })}

        <SFlyingEmoji >
            {<div>{flyingEmoji.map((el) => el)}</div>}
        </SFlyingEmoji>
     
    </SDiv>

}

export default EmojiPalette;