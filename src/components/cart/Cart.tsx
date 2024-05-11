import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addQty, minusQty, removeProduct } from '../../redux/slice';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.user.cart);

    return (
        <Container>
            <Typography variant="h1" gutterBottom>Cart</Typography>
            {cart?.length ? (
                <Grid container spacing={2}>
                    {cart?.map((product: any, index: number) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.thumbnail}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body1">Category: {product.category}</Typography>
                                    <Typography variant="body1">Price: ${product.price}</Typography>
                                    <Typography variant="body1">Quantity: {product.qty}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => dispatch(addQty(product))} variant="contained">+</Button>
                                    <Button onClick={() => dispatch(removeProduct(product))} variant="contained">Remove</Button>
                                    <Button onClick={() => dispatch(minusQty(product))} variant="contained">-</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1">No items in the cart</Typography>
            )}
            <Typography variant="h6" gutterBottom>Total: ${cart.reduce((total, product) => total + (product.price * product.qty), 0)}</Typography>
            <Link to="/products">Continue Shopping</Link>
        </Container>
    );
}

export default Cart;
