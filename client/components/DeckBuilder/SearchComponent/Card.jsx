import React, { useState } from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import ChooseDialog from '../../Play/ChooseManaDialog/ChooseManaDialog'
import { tapCard } from '../../Play/BattleFieldComponent/TappedFunction/TappedFunction'
import { Draggable } from 'react-beautiful-dnd'
const useStyles = makeStyles(() => ({
    card: {
        margin: 3,
        borderRadius: 10,
        display: 'flex',
        float: 'left',
        clear: 'none',
    },
    cardTapped: {
        margin: 3,
        borderRadius: 10,
        transform: 'rotate(90deg)',
        transition: 'transform 0.2s linear'
    },
    cardWrapper: {
        maxHeight: 40,
        transition: 'max-height 0.15s ease-out;',
        '&:hover': {
            transitionDelay: props => props.hoverDelay,
            maxHeight: 262,
            transition: 'max-height 0.25s ease-in'
        },
        width: 187
    }
    
}))

export default ({ card, card:{imageUrl}, addCard, removeCard, setCurrentDeck, currentDeck, setPlayerOneBattlefield, addToBattlefield, setCurrentHand, currentHand, battlefield, index, ...props }) => {
    const [isTapped, setIsTapped] = useState(false)
    const [open, setOpen] = useState(false)
    const { card: cardClass, cardTapped: cardTapped, deckCard: deckCard, cardWrapper: cardWrapper } = useStyles(props)
    function handleClick(card) {
        if(typeof addCard !== 'undefined') addCard(card, setCurrentDeck)
        if(typeof removeCard !== 'undefined') removeCard(card, setCurrentDeck, currentDeck)
        if(typeof addToBattlefield !== 'undefined') addToBattlefield(setPlayerOneBattlefield, card, setCurrentHand, currentHand)
        if(typeof battlefield !== 'undefined') tapCard(setIsTapped, card, setOpen, isTapped )
    }
    if(typeof removeCard !== 'undefined') {
        return (
            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                 <div className={cardWrapper} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                {isTapped
                ? <img  src={imageUrl} alt="" width='187' height='262' className={cardTapped} onClick={() => handleClick(card)}/>
                : <img  src={imageUrl} alt="" width='187' height='262' className={cardClass} onClick={() => handleClick(card)}/>}
                {open ? <ChooseDialog open={open} setOpen={setOpen} /> : null}
            </div>
                )}
            </Draggable>
        )
    } else {
        return (
            <div >
                {isTapped
                ? <img  src={imageUrl} alt="" width='187' height='262' className={cardTapped} onClick={() => handleClick(card)}/>
                : <img  src={imageUrl} alt="" width='187' height='262' className={cardClass} onClick={() => handleClick(card)}/>}
                {open ? <ChooseDialog open={open} setOpen={setOpen} /> : null}
            </div>
        )
    }
}