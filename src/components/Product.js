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

    const withMwSt = () => {
        //   console.log(products);
        const tmp = products.map((product) => {
            return {
                itemId: product.itemId,
                price: product.priceWithoutVat
            }
        });
        fetch("http://localhost:8083/api/mwst", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                prices: tmp,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                setProducts(result);
                //   console.log(result);
            })
    }

    const withoutMwSt = () => {
        fetch("http://localhost:8083/api/products")
            .then(res => res.json())
            .then((result) => {
                setProducts(result);
            }
            )
    }

    const deliveryInfo = () => {
        fetch("http://localhost:8083/api/products/delivery_info",
           
        )
            .then(res => res.json())
            .then((result) => {
                setProducts(result.storageList);
            }
            )
    }

    return (
        <Container>
            <Paper elevation={2} style={paperStyle}>
                <Button variant="contained" color="primary" onClick={(withoutMwSt)}>
                    Without MwSt
                </Button>
                <Button variant="contained" color="secondary" onClick={(withMwSt)}>
                    With MwSt
                </Button> <Button variant="contained" color="default" onClick={(deliveryInfo)}>
                    Delivery Info
                </Button>
            </Paper>

            <Paper elevation={3} style={paperStyle}>
                {products.map(product => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} >
                        Id: {product.itemId} <br />
                        Name: {product.name} <br />
                        Description: {product.description} <br />
                        Colour: {product.colour} <br />
                        Material: {product.material} <br />
                        Weight: {product.weight} <br />
                        Price without MwSt: {product.priceWithoutVat} € <br />
                        Price with MwSt: {product.priceWithVat} € <br />
                        Delivery Time: {product.deliveryTime} <br />
                        Amount: {product.amount} <br />
                        Location: {product.location} <br />
                    </Paper>
                ))
                }
            </Paper>
        </Container>
    );
}
