// import React, { useState, useRef } from 'react';
// import { Table, Image, Button, Overlay, Popover } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import Loader from '../Loader/Loader';
// import Message from '../Message/Message';

// const MyProductsTable = ({ loadingProducts, errorProducts, products }) => {
//     const [show, setShow] = useState(false);
//     const [target, setTarget] = useState(null);
//     const ref = useRef(null);

//     const handleClick = (event) => {
//         setShow(!show);
//         setTarget(event.target);
//     };

//     return (
//         <>
//             <h2 style={{ marginTop: '110px' }}>My Products</h2>
//             {loadingProducts ? (
//                 <Loader />
//             ) : errorProducts ? (
//                 <Message variant="danger">{errorProducts}</Message>
//             ) : (
//                 <Table striped bordered hover responsive className="table-sm">
//                     <thead>
//                         <tr>
//                             <th>NAME</th>
//                             <th>EMAIL/NIC</th>
//                             <th>ADDRESS</th>
//                             <th>IMAGE</th>
//                             <th>CROP</th>
//                             <th>REVIEWED</th>
//                             <th>EDIT</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((product) => (
//                             <tr key={product._id}>
//                                 <td>{product.name}</td>
//                                 <td>{product.email}</td>
//                                 <td>{product.address}</td>
//                                 <td>
//                                     <Image width={70} rounded src={product.image} />
//                                 </td>
//                                 <td>{product.cropSelection}</td>
//                                 <td style={{ textAlign: 'center' }}>
//                                     {product.isReviwed ? (
//                                         <Button
//                                             className="mt-2"
//                                             ref={target}
//                                             onClick={handleClick}
//                                         >
//                                             Check
//                                         </Button>
//                                     ) : (
//                                         <i
//                                             className="fas fa-times"
//                                             style={{ color: 'red', fontSize: '24px' }}
//                                         ></i>
//                                     )}
//                                     <Overlay
//                                         show={show}
//                                         target={target}
//                                         placement="bottom"
//                                         container={ref.current}
//                                         containerPadding={10}
//                                     >
//                                         <Popover id="popover-contained">
//                                             <Popover.Title as="h3">Rating: {product.rating}</Popover.Title>
//                                             {product.reviews.map((review) => (
//                                                 <Popover.Content key={review._id}>
//                                                     <strong>Feedback: {review.comment}</strong>
//                                                 </Popover.Content>
//                                             ))}
//                                         </Popover>
//                                     </Overlay>
//                                 </td>
//                                 <td>
//                                     <LinkContainer to={`/supplierproducts/${product._id}/edit`}>
//                                         <Button variant="light" className="btn btn-sm">
//                                             <i className="fas fa-edit"></i>
//                                         </Button>
//                                     </LinkContainer>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             )}
//         </>
//     );
// };

// export default MyProductsTable;

import React from 'react'

export default function MyProductsTable() {
  return (
    <div>
        hello kalyan
    </div>
  )
}

