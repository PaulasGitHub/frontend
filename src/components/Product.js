import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Product() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const [products, setProducts] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Button");
    }

   useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then(res => res.json())
            .then((result) => {
                setProducts(result);
            }
            )
    }, [])

    return (
        <Container>
            <Paper elevation={2} style={paperStyle}>
                <Button variant="contained" color="primary" onClick={(handleClick)}>
                    Without MwSt
                </Button>
            </Paper>

            <Paper elevation={3} style={paperStyle}>
                {products.map(product => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={product.itemId}>
                        Id: {product.itemId} <br />
                        Name: {product.name} <br />
                        Description: {product.description} <br />
                        Colour: {product.colour} <br />
                        Material: {product.material} <br />
                        Weight: {product.weight} <br />
                        Price without MwSt: {product.priceWithoutVat} € <br />
                    </Paper>
                ))
                }
            </Paper>
        </Container>
    );
}
