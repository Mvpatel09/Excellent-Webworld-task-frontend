import React, { useEffect, useState } from 'react';
import { DataService } from '../../service/service';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addQty, minusQty } from '../../redux/slice';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 37,
        label: '37',
    },
    {
        value: 100,
        label: '100',
    },
];

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.user.cart);
    console.log(cart, "maulik31")


    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0)

    const [selectedCategory, setSelectedCategory] = useState("")
    const [price, setPrice] = useState(0)

    console.log(allProducts, "maulik10", maxPrice)

    const getProducts = () => {
        DataService.post("get-products", {
            selectedCategory,
            price
        })
            .then(({ data }) => {
                setAllProducts(data.data)
            })
    }

    const getCategories = () => {
        DataService.get("get-all-categories")
            .then(({ data }) => {
                setAllCategories(data.data.allCategories)
                setMaxPrice(data.data?.getMaxPrice?.price)
            })
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value as string);
    };

    useEffect(() => {
        getProducts()
    }, [selectedCategory, price])

    useEffect(() => {
        getCategories()
    }, [])

    return (<>
        <Container>
            <h1>Products</h1>
            <h1>Filter</h1>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory}
                    label="Categories"
                    onChange={handleChange}
                >
                    {
                        allCategories?.map((e) => {
                            return (
                                <MenuItem value={e}>{e}</MenuItem>
                            )
                        })
                    }

                </Select>
            </FormControl>
            <h1>Price</h1>
            <Slider onChange={(_, value) => {
                setPrice(value as number)
            }} aria-label="Default" valueLabelDisplay="auto" min={1} max={maxPrice} />
            Max price - {maxPrice}
            <h1>Cart count: {cart?.length}</h1>
            <Link to="/cart">Go to cart</Link>
            <Grid container>
                {allProducts?.map((e) => {
                    return (
                        <>
                            <Grid xs={4}>
                                <p>Title: {e.title}</p>

                                <p>Category: {e.category}</p>

                                <p>Price: {e.price}</p>
                                <Button onClick={() => {
                                    console.log(e)
                                    dispatch(addQty(e));
                                }}>Add to cart</Button>
                                {/* <Button onClick={() => {
                                    console.log(e)
                                    dispatch(minusQty(e));
                                }}>-</Button> */}
                            </Grid >
                        </>
                    )
                })}
            </Grid>
        </Container >
    </>)
}

export default Products