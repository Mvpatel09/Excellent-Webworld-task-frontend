import React, { useEffect, useState } from 'react';
import { DataService } from '../../service/service';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addQty, minusQty } from '../../redux/slice';

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.user.cart);

    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0)

    const [selectedCategory, setSelectedCategory] = useState("")
    const [priceSorting, setPriceSorting] = useState(null)
    const [price, setPrice] = useState(0)
    const [loading, setLoading] = useState(true);

    const getProducts = () => {
        setLoading(true);
        DataService.post("get-products", {
            selectedCategory,
            price,
            priceSorting
        })
            .then(({ data }) => {
                setAllProducts(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }

    const getCategories = () => {
        DataService.get("get-all-categories")
            .then(({ data }) => {
                setAllCategories(data.data.allCategories)
                setMaxPrice(data.data?.getMaxPrice?.price)
            })
            .catch(error => console.error("Error fetching categories:", error));
    }

    useEffect(() => {
        getProducts()
    }, [selectedCategory, price, priceSorting])

    useEffect(() => {
        getCategories()
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value as string);
    };

    const handleChangePriceSort = (event: SelectChangeEvent) => {
        setPriceSorting(event.target.value as string);
    };

    return (
        <Container>
            <Typography variant="h1" gutterBottom>Products</Typography>
            <Typography variant="h4" gutterBottom>Filter</Typography>
            <FormControl fullWidth>
                <InputLabel id="category-label">Categories</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    onChange={handleChange}
                >
                    {allCategories?.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="h4" gutterBottom>Sort</Typography>
            <FormControl fullWidth>
                <InputLabel id="sort-label">Sort Price</InputLabel>
                <Select
                    labelId="sort-label"
                    id="sort-select"
                    value={priceSorting}
                    onChange={handleChangePriceSort}
                >
                    <MenuItem value={null}>Select</MenuItem>
                    <MenuItem value={1}>Low to high</MenuItem>
                    <MenuItem value={-1}>High to low</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="h4" gutterBottom>Price</Typography>
            <Slider
                onChange={(_, value) => setPrice(value as number)}
                aria-label="Price range"
                valueLabelDisplay="auto"
                min={1}
                max={maxPrice}
            />
            <Typography variant="body1">Max price: ${maxPrice}</Typography>
            <br />
            <Typography variant="h4" gutterBottom>Cart</Typography>
            <br />
            <Typography variant="body1">Cart count: {cart?.length}</Typography>
            <br />
            <Link to="/cart">Go to cart</Link>
            <br />
            <br />
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {allProducts.map((product, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345, minHeight: 350 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.thumbnail}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">{product.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">Category: {product.category}</Typography>
                                    <Typography variant="body2" color="textSecondary">Price: ${product.price}</Typography>
                                </CardContent>
                                <Button onClick={() => dispatch(addQty(product))} variant="contained">Add to Cart</Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default Products;
