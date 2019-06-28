import Rating from 'react-rating';
import React from 'react';
import {Star,StarBorder} from '@material-ui/icons';
export default (props) =>{
    return (
        <Rating fractions={2} onChange={props.onChange} emptySymbol={<StarBorder/>} fullSymbol={<Star/>}/>
    );
}