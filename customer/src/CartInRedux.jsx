import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { removeProduct } from './CartSlice';
import { removeSingleItem, addToCart } from './CartSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
// Add the icon to the library
library.add(faTrash);

// Configure Font Awesome to skip adding styles to the <i> element
config.autoAddCss = false;

function CartInRedux() {
    const { carts } = useSelector(store => store.cart);
    // console.log(carts)

    const [closeRazorpay, setcloseRazorpay] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const removeProductFromCart = (id) => {

        dispatch(removeProduct(id))
    }

    const handelIncrement = (e) => {
        dispatch(addToCart(e))

    }

    const handelDecrement = (pid) => {
        dispatch(removeSingleItem(pid))
    }
    const [totalAmount, settotalAmount] = useState('')
    const total = () => {
        let totalPrice = 0
        carts.map((data) => {
            // totalPrice = ((data.price - (data.price * data.discount) / 100) * data.quantity)+totalPrice
            totalPrice = ((data.price * data.quantity) * (1 - data.discount / 100) + totalPrice)
        })

        settotalAmount(totalPrice)
    }

    const [checkoutTotal, setcheckoutTotal] = useState('')
    const toalcheckout = () => {
        let checkoutAmount = 0;
        const ShippingCharge = 100;
        checkoutAmount = (totalAmount * 18 / 100) + ShippingCharge + totalAmount;

        // Use toFixed to round the number to two decimal places
        checkoutAmount = parseFloat(checkoutAmount);

        setcheckoutTotal(checkoutAmount.toFixed(2));
    };

    useEffect(() => {
        total()
        toalcheckout()
    }, [total, toalcheckout])


    const [amount, setAmount] = useState()
    const [orderId, setorderId] = useState()
    const paymentHandel = (price) => {
        console.log(price)
        const productdata = {
            amount: price,
            currency: "INR",
            receipt: "qwsaq1",
            partial_payment: true,
        }
        axios.post('http://localhost:7979/api/product/order', productdata)
            .then(result => {
                console.log(result)
                setorderId(result.data.id);
                setAmount(result.data.amount + '00')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleOpenRazorpay = () => {
        const options = {
            key: 'rzp_test_g0dQI4qx9CSOxy',
            amount: amount,
            currency: 'INR',
            name: 'TpBazaar',
            order_id: orderId,
            handler: function (response) {
                const razorpay_order_id = response.razorpay_order_id
                const razorpay_payment_id = response.razorpay_payment_id
                const razorpay_signature = response.razorpay_signature
                axios.post('http://localhost:7979/api/product/payment-verification', {
                    razorpay_order_id, razorpay_payment_id, razorpay_signature
                })
                    .then(result => {
                        console.log(result)
                        if (result.data === true) {
                            setcloseRazorpay(true)
                            router.push('/Success')
                            rzp.close()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                console.log('Payment successful!', response);
                // Handle success, update order status, etc.
            },

        }
        const rzp = new window.Razorpay(options)
        rzp.open()

        return () => {
            document.head.removeChild(script);
        };
    }

    if (amount && orderId !== null) {
        handleOpenRazorpay()
    }

    // if (amount && orderId !== null) {
    //     console.log(amount)
    //     const script = document.createElement('script');
    //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    //     script.async = true;
    //     document.head.appendChild(script);

    //     script.onload = () => {
    //         // Initialize Razorpay
    //         const options = {
    //             key: 'rzp_test_g0dQI4qx9CSOxy', // Replace with your Razorpay key
    //             amount: amount * 100, // Example: 50000 paise = INR 500
    //             currency: 'INR',
    //             name: 'TP Bazar',
    //             description: 'Product Purchase',
    //             order_id: orderId,
    //             handler: function (response) {
    //                 const razorpay_order_id = response.razorpay_order_id
    //                 const razorpay_payment_id = response.razorpay_payment_id
    //                 const razorpay_signature = response.razorpay_signature
    //                 axios.post('http://localhost:7979/api/product/payment-verification', {
    //                     razorpay_order_id, razorpay_payment_id, razorpay_signature
    //                 })
    //                     .then(result => {
    //                         console.log(result)
    //                         if (result.data === true) {
    //                             setcloseRazorpay(true)
    //                             router.push('/Success')
    //                             rzp.close()
    //                         }
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    //                 console.log('Payment successful!', response);
    //                 // Handle success, update order status, etc.
    //             },
    //             prefill: {
    //                 name: 'John Doe',
    //                 email: 'john@example.com',
    //                 contact: '1234567890',
    //             },
    //         };

    //         const rzp = new window.Razorpay(options);
    //         rzp.open();

    //     }

    //     return () => {
    //         document.head.removeChild(script);
    //     };
    // };

    // useEffect(() => {
    //     console.log(closeRazorpay)
    //     if (closeRazorpay == true) {
    //         rzp.close()
    //     }
    // }, [closeRazorpay])

    return (
        <>
            <Navbar />

            <div class="px-4 px-lg-0 body">
                {/* <!-- For demo purpose -->/ */}
                <div class="container text-white py-5 text-center">
                    <h1 class="display-4">Your shopping cart</h1>

                </div>
                {/* <!-- End -->/ */}

                <div class="pb-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                                {/* <!-- Shopping cart table --> */}
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="p-2 px-3 text-uppercase">Discount</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light">
                                                    <div class="py-2 text-uppercase">Quantity</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light" >
                                                    <div class="py-2 text-uppercase">Discounted Price</div>
                                                </th>
                                                <th scope="col" class="border-0 bg-light" >
                                                    <div class="py-2 text-uppercase">Remove</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                carts.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row" class="border-0">
                                                                <div class="p-2">
                                                                    <img src={data.photo} alt="photo" width={50} height={50} class="img-fluid rounded shadow-sm" />
                                                                    <div class="ml-3 d-inline-block align-middle mx-2">
                                                                        <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">{data.brandName} | {data.productName}</a></h5><span class="text-muted font-weight-normal font-italic d-block">
                                                                            {
                                                                                data.quantity > 10 ? (
                                                                                    <p className='text-success'>In Stock</p>
                                                                                ) : data.quantity > 0 ? (
                                                                                    <p className='text-warning'>Low Stock</p>
                                                                                ) : (
                                                                                    <p className='text-danger'>Out Of Stock</p>
                                                                                )
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <td class="border-0 align-middle"><strong>{data.discount} %</strong></td>
                                                            <td class="border-0 align-middle"><strong>&#8377; {data.price}</strong></td>
                                                            <td class="border-0 align-middle">
                                                                <div class="d-grid gap-2 d-md-block">
                                                                    <button class="btn btn-sm mx-auto" onClick={() => handelDecrement(data.productId)} type="button" style={{ height: "3rem", width: "3rem" }}>-</button>
                                                                    <strong className='btn' style={{ height: "3rem", width: "5rem" }}>{data.quantity}</strong>
                                                                    <button class="btn btn-sm mx-auto" onClick={() => handelIncrement(data)} type="button" style={{ height: "3rem", width: "3rem" }}>+</button>
                                                                </div>
                                                            </td>
                                                            <td className="border-0 align-middle">
                                                                <strong>&#8377; {((data.price - (data.price * data.discount) / 100) * data.quantity).toFixed(2)}</strong>
                                                            </td>
                                                            <td class="border-0 align-middle" ><FontAwesomeIcon icon="trash" className='text-danger mx-3' style={{ height: "20px", width: "20px" }} onClick={() => removeProductFromCart(data.pid)} /></td>
                                                        </tr>)
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                {/* <!-- End -->/ */}
                            </div>
                        </div>

                        <div class="row py-5 p-4 bg-white rounded shadow-sm">
                            <div class="col-lg-6">
                                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                                <div class="p-4">
                                    <p class="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                                    <div class="input-group mb-4 border rounded-pill p-2">
                                        <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" class="form-control border-0" />
                                        <div class="input-group-append border-0">
                                            <button id="button-addon3" type="button" class="btn btn-dark px-4 rounded-pill"><i class="fa fa-gift mr-2"></i>Apply coupon</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                                <div class="p-4">
                                    <p class="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                                    <textarea name="" cols="30" rows="2" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                                <div class="p-4">
                                    <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                                    <ul class="list-unstyled mb-4">
                                        <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>&#8377;{totalAmount}</strong></li>
                                        <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>&#8377;100.00</strong></li>
                                        <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>18.00%</strong></li>
                                        <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                                            <h5 class="font-weight-bold"><strong>&#8377;{checkoutTotal}</strong></h5>
                                        </li>
                                    </ul><button class="btn btn-dark rounded-pill py-2 btn-block" onClick={() => paymentHandel(checkoutTotal)}>Procceed to checkout</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CartInRedux


/*
1. webHook
2. performance improvement of nodejs application (pm2,cluster,elastic stack)
*/