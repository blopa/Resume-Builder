import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: '75px 50px',
        margin: '0px 25px',
        width: '500px',
        boxShadow: '20px 20px 20px black',
        display: 'flex',
        justifyContent: 'center',
    },
}));

const CarouselSlide = ({ content }) => {
    const { title } = content;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <h1>{title}</h1>
        </Card>
    );
};

export default CarouselSlide;
