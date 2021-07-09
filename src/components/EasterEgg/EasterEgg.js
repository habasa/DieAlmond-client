import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import almond from './img/almond.gif'
import devil from './img/devil.png'

const EasterEgg = () => {

    let Frame = styled.div`
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    `
    
    const jumpUp = keyframes `
        0% {
        top: 50%;
        }

        25% {
            top: 45%;
        }

        50% {
            top: 40%;
        }

        75% {
            top: 45%;
        }

        100% {
            top: 50%;
        }
    `

    const block = keyframes `
        0% {
            left: 100%;
        }
        
        100% {
            left: -0%;
        }
    `

    // Dummy data
    const life = 33;

    let Almond = styled.div`
        width:50px;
        height:70px;
        background-image:url(${almond});
        background-size:50px 70px;
        position:fixed;
        top:50%;
        left:${life - 3}%;
        animation: ${jumpUp} 0.5s infinite linear;
    `

    const Devil = styled.div`
        width: 35px;
        height: 35px;
        position: fixed;
        top: 54%;
        background-image: url(${devil});
        background-size: 35px 35px;
        animation: ${block} 4s infinite linear;
    `

    const jump = () => {
        Almond = styled.div`
            width:500px;
            height:700px;
            background-image:url(${almond});
            background-size:50px 70px;
            position:fixed;
            top:50%;
            left:${life - 3}%;
            animation: ${jumpUp} 0.5s infinite linear;
        `
        console.log('쩜프')
    }

    document.addEventListener("keydown", () => {
        jump()
    });

    const [start, setStart] = useState(false);

    const toggleModal = () => {
        setStart(!start)
    }

    return (
        <div>
            {start === false ? 
                    <Frame onClick={toggleModal}>
                        <Almond />
                        <Devil />
                    </Frame> 
                : null}
        </div>
    )
}

export default EasterEgg