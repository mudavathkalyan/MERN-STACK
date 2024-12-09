import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, CardDeck, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { listMyProducts } from './../../actions/supplierProduct';
import { addToCart } from './../../actions/cartActions';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import './ConsumerStyles.css';
import Meta from '../../components/Helmet/Meta';

const ConsumerScreen = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [qty, setQty] = useState(1);

    const supplierProductList = useSelector((state) => state.supplierProdictListMy);
    const { loading, products: supplierProducts, error } = supplierProductList;

    useEffect(() => {
        dispatch(listMyProducts());
    }, [dispatch]);

    const handlePreview = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const addToCartHandler = () => {
        dispatch(addToCart(selectedProduct._id, qty));
        closeModal();
    };

    return (
        <div className="consumerProductScreen">
            <Meta title="Agri vision | Consumer" />
            <Container className="consumerContainer">
                <h1 className="title">CONSUMER</h1>
                <h4 className="consumer-title">
                    No need to visit the field to get grains! Just order here and get all kinds of grains delivered to your doorstep.
                </h4>
                <br />
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Row className="row-one justify">
                        <CardDeck>
                            {supplierProducts && supplierProducts.length > 0 ? (
                                supplierProducts.map((product) => (
                                    <Card
                                        key={product._id}
                                        style={{
                                            width: '22rem',
                                            margin: '15px',
                                        }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={product.image}
                                            alt={product.name}
                                            className="product-image"
                                            style={{borderRadius:'10px'
                                            }}
                                        />
                                        <Card.Body className="card-body">
                                            <Card.Title className="card-titile">Product Name:{product.cropSelection}</Card.Title>
                                            <Card.Text style={{ textAlign: 'center' }}>
                                                <strong>Address:</strong> {product.address}
                                            </Card.Text>
                                            <Card.Text style={{ textAlign: 'center' }}>
                                                <strong>Price:</strong> $
                                                {product.price ? product.price.toFixed(2) : 'N/A'}
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                className="btn-explore btn-md"
                                                onClick={() => handlePreview(product)}
                                            >
                                                Preview
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <Alert variant="warning" className="col-md-12 text-center">
                                    No products available!
                                </Alert>
                            )}
                        </CardDeck>
                    </Row>
                )}
            </Container>

            {/* Modal */}
            <Modal show={showModal} onHide={closeModal} centered>
                {selectedProduct && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProduct.cropSelection}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="modal-product-image"
                                style={{ width: '100%', marginBottom: '15px' }}
                            />
                            <p><strong>Address:</strong> {selectedProduct.address}</p>
                            <p><strong>Price:</strong> ${selectedProduct.price ? selectedProduct.price.toFixed(2) : 'N/A'}</p>
                            <p><strong>Description:</strong> {selectedProduct.description || 'No description available.'}</p>

                            <Form.Group controlId="quantity" className="mt-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                >
                                    {[...Array(selectedProduct.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={addToCartHandler}>
                                Add to cart
                            </Button>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default ConsumerScreen;
