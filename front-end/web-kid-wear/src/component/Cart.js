import React, { useEffect, useState } from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import * as service from "../service/ProductServie"
import Swal from "sweetalert2";
import "./style.css"
import { Link } from 'react-router-dom';


const Cart = () => {
    const [flag, setFlag] = useState(false)
    const [cart, setCart] = useState([]);
    const [cartSame, setCartSame] = useState([]);
    const [sum, setSum] = useState(0)
    useEffect(() => {
        const fetchApi = async (accountId) => {
            try {
                const result = await service.getCart(accountId);
                const result1 = await service.getSum(accountId);
                console.log(result);
                setCart(result)
                setSum(result1)
                document.title = "Cart"
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi(1)
    }, [flag]);

    const handlePlus = async (id) => {

        await service.plusQuantity(id)
        setFlag(!flag)
    }
    const handleDiv = async (id) => {

        await service.divQuantity(id)
        setFlag(!flag)
    }
    const alert = (cartItem) => {
        Swal.fire({
            title: "Do you want to delete this product? ",
            text: "You definitely want to delete the product " + cartItem.product.name + " ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'my-swal-popup',
                header: 'my-swal-header',
                title: 'my-swal-title',
                closeButton: 'my-swal-closeButton',
                content: 'my-swal-content',
                actions: 'my-swal-actions',
                confirmButton: 'my-swal-confirmButton',
                cancelButton: 'my-swal-cancelButton',
                footer: 'my-swal-footer'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Done !",
                    icon: "success",
                });
                service.deleteCartItem(cartItem.id)
                setFlag(!flag)
            }
        });
    }
    const handleDelete = async (cartItem) => {
        alert(cartItem)
    }
    return (
        <div>
            <Header2 />
            <div class="banner-wrapper has_background">
                <img src="https://dreamingtheme.kiendaotac.com/html/kodory/assets/images/banner-for-all2.jpg"
                    class="img-responsive attachment-1920x447 size-1920x447" alt="img" />
                <div class="banner-wrapper-inner container">
                    <h1 class="page-title">Cart</h1>
                    <div role="navigation" aria-label="Breadcrumbs" class="breadcrumb-trail breadcrumbs">
                        <ul class="trail-items breadcrumb">
                            <li class="trail-item trail-begin"><a href="index.html"><span>Home</span></a></li>
                            <li class="trail-item trail-end active"><span>Cart</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <main className="site-main main-container no-sidebar">
                <div className="container">
                    <div className="row">
                        <div className="main-content col-md-12">
                            <div className="page-main-content">
                                <div className="kodory">
                                    <div className="kodory-notices-wrapper" />
                                    <form className="kodory-cart-form">
                                        <table className="shop_table shop_table_responsive cart kodory-cart-form__contents">
                                            <thead>
                                                <tr>
                                                    <th className="product-remove ">Remove</th>
                                                    <th className="product-thumbnail ">Image</th>
                                                    <th className="product-name ">Product</th>
                                                    <th className="product-price ">Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-subtotal">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart ? (
                                                    cart.map((cartItem, index) => (

                                                        <tr className="kodory-cart-form__cart-item cart_item" key={index}>

                                                            <td className="product-remove">
                                                                <a
                                                                    onClick={() => handleDelete(cartItem)}
                                                                    className="remove"
                                                                    aria-label="Remove this item"
                                                                    data-product_id={27}
                                                                    data-product_sku="885B712"
                                                                >
                                                                    ×
                                                                </a>
                                                            </td>
                                                            <td className="product-thumbnail">
                                                                <Link to={`/product/${cartItem.product.id}`}>
                                                                    <img
                                                                        src={cartItem.product.image}
                                                                        className="attachment-kodory_thumbnail size-kodory_thumbnail"
                                                                        alt="img"
                                                                        width={600}
                                                                        height={778}
                                                                    />
                                                                </Link>
                                                            </td>
                                                            <td className="product-name" data-title="Product">
                                                                <Link to={`/product/${cartItem.product.id}`}>
                                                                    {cartItem.product.name}
                                                                </Link>
                                                            </td>
                                                            <td className="product-price" data-title="Price">
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">$</span>
                                                                    {cartItem.price}
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity" data-title="Quantity">
                                                                <div className="quantity" >

                                                                    <span className="qty-label">Quantiy:</span>
                                                                    <div className="control">
                                                                        {cartItem.quantity > 1 ? (

                                                                            <a
                                                                                className="btn-number qtyminus quantity-minus"
                                                                                onClick={() => handleDiv(cartItem.id)}
                                                                            >
                                                                                -
                                                                            </a>
                                                                        ) : (<span></span>)}
                                                                        {/* <p style={{ marginTop: '5px' }}>{cartItem.quantity}</p> */}
                                                                        <input type="text" value={cartItem.quantity} title="Qty"
                                                                            className="input-qty input-text qty text" />
                                                                        <a
                                                                            className="btn-number qtyplus quantity-plus"
                                                                            onClick={() => handlePlus(cartItem.id)}
                                                                        >
                                                                            +
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal" data-title="Total">
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">$</span>
                                                                    {(cartItem.price * cartItem.quantity).toFixed(2)}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (<p>Cart Emty</p>)}


                                            </tbody>
                                        </table>
                                    </form>
                                    <div className="cart-collaterals">
                                        <div className="cart_totals ">
                                            <h2>Cart totals</h2>
                                            <table className="shop_table shop_table_responsive">
                                                <tbody>
                                                    <tr className="cart-subtotal">
                                                        <th>Subtotal</th>
                                                        <td data-title="Subtotal">
                                                            <span className="kodory-Price-amount amount">
                                                                <span className="kodory-Price-currencySymbol">$</span>
                                                                <span className="kodory-Price-currencySymbol">{sum.toFixed(2)}</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="order-total">
                                                        <th>Total</th>
                                                        <td data-title="Total">
                                                            <strong>
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    {sum.toFixed(2)}
                                                                </span>
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="kodory-proceed-to-checkout">
                                                <a
                                                    href="#"
                                                    className="checkout-button button alt kodory-forward"
                                                >
                                                    Proceed to checkout
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 dreaming_crosssell-product">
                                        {/* <div className="block-title">
                                            <h2 className="product-grid-title">
                                                Cross Sell Products
                                                <span />
                                            </h2>
                                        </div>
                                        <div
                                            className="owl-slick owl-products equal-container better-height"
                                            data-slick='{"arrows":false,"slidesMargin":30,"dots":true,"infinite":false,"slidesToShow":4}'
                                            data-responsive='[{"breakpoint":480,"settings":{"slidesToShow":2,"slidesMargin":"10"}},{"breakpoint":768,"settings":{"slidesToShow":2,"slidesMargin":"10"}},{"breakpoint":992,"settings":{"slidesToShow":3,"slidesMargin":"20"}},{"breakpoint":1200,"settings":{"slidesToShow":3,"slidesMargin":"20"}},{"breakpoint":1500,"settings":{"slidesToShow":3,"slidesMargin":"30"}}]'
                                        >
                                            <div className="product-item style-01 post-278 page type-page status-publish hentry">
                                                <div className="product-inner tooltip-left">
                                                    <div className="product-thumb">
                                                        <a
                                                            className="thumb-link"
                                                            href="single-product.html"
                                                            tabIndex={0}
                                                        >
                                                            <img
                                                                className="img-responsive"
                                                                src="assets/images/apro51012-1-600x778.jpg"
                                                                alt="Dazzling Toys"
                                                                width={600}
                                                                height={778}
                                                            />
                                                        </a>
                                                        <div className="flash">
                                                            <span className="onsale">
                                                                <span className="number">-21%</span>
                                                            </span>
                                                            <span className="onnew">
                                                                <span className="text">New</span>
                                                            </span>
                                                        </div>
                                                        <div className="group-button">
                                                            <div className="yith-wcwl-add-to-wishlist">
                                                                <div className="yith-wcwl-add-button show">
                                                                    <a href="wishlist.html" className="add_to_wishlist">
                                                                        Add to Wishlist
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="kodory product compare-button">
                                                                <a href="compare.html" className="compare button">
                                                                    Compare
                                                                </a>
                                                            </div>
                                                            <a
                                                                href="single-product.html"
                                                                className="button yith-wcqv-button"
                                                            >
                                                                Quick View
                                                            </a>
                                                            <div className="add-to-cart">
                                                                <a
                                                                    href="#"
                                                                    className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                                                                >
                                                                    Add to cart
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-info equal-elem">
                                                        <h3 className="product-name product_title">
                                                            <a href="single-product.html" tabIndex={0}>
                                                                Dazzling Toys
                                                            </a>
                                                        </h3>
                                                        <div className="rating-wapper nostar">
                                                            <div className="star-rating">
                                                                <span style={{ width: "0%" }}>
                                                                    Rated <strong className="rating">0</strong> out of 5
                                                                </span>
                                                            </div>
                                                            <span className="review">(0)</span>
                                                        </div>
                                                        <span className="price">
                                                            <del>
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    125.00
                                                                </span>
                                                            </del>
                                                            <ins>
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    99.00
                                                                </span>
                                                            </ins>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-item style-01 post-36 product type-product status-publish has-post-thumbnail product_cat-table product_cat-bed product_tag-light product_tag-table product_tag-sock first instock sale shipping-taxable purchasable product-type-simple">
                                                <div className="product-inner tooltip-left">
                                                    <div className="product-thumb">
                                                        <a
                                                            className="thumb-link"
                                                            href="single-product.html"
                                                            tabIndex={0}
                                                        >
                                                            <img
                                                                className="img-responsive"
                                                                src="assets/images/apro71-1-600x778.jpg"
                                                                alt="Kid Backpack"
                                                                width={600}
                                                                height={778}
                                                            />
                                                        </a>
                                                        <div className="flash">
                                                            <span className="onsale">
                                                                <span className="number">-18%</span>
                                                            </span>
                                                            <span className="onnew">
                                                                <span className="text">New</span>
                                                            </span>
                                                        </div>
                                                        <div className="group-button">
                                                            <div className="yith-wcwl-add-to-wishlist">
                                                                <div className="yith-wcwl-add-button show">
                                                                    <a href="wishlist.html" className="add_to_wishlist">
                                                                        Add to Wishlist
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="kodory product compare-button">
                                                                <a href="compare.html" className="compare button">
                                                                    Compare
                                                                </a>
                                                            </div>
                                                            <a href="#" className="button yith-wcqv-button">
                                                                Quick View
                                                            </a>
                                                            <div className="add-to-cart">
                                                                <a
                                                                    href="#"
                                                                    className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                                                                >
                                                                    Add to cart
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-info equal-elem">
                                                        <h3 className="product-name product_title">
                                                            <a href="single-product.html" tabIndex={0}>
                                                                Kid Backpack
                                                            </a>
                                                        </h3>
                                                        <div className="rating-wapper nostar">
                                                            <div className="star-rating">
                                                                <span style={{ width: "0%" }}>
                                                                    Rated <strong className="rating">0</strong> out of 5
                                                                </span>
                                                            </div>
                                                            <span className="review">(0)</span>
                                                        </div>
                                                        <span className="price">
                                                            <del>
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    109.00
                                                                </span>
                                                            </del>
                                                            <ins>
                                                                <span className="kodory-Price-amount amount">
                                                                    <span className="kodory-Price-currencySymbol">
                                                                        $
                                                                    </span>
                                                                    89.00
                                                                </span>
                                                            </ins>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-item style-01 post-32 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-sofas product_tag-hat product_tag-sock  instock sale featured shipping-taxable purchasable product-type-simple">
                                                <div className="product-inner tooltip-left">
                                                    <div className="product-thumb">
                                                        <a
                                                            className="thumb-link"
                                                            href="single-product.html"
                                                            tabIndex={0}
                                                        >
                                                            <img
                                                                className="img-responsive"
                                                                src="assets/images/apro91-1-600x778.jpg"
                                                                alt="Elegant Diamond"
                                                                width={600}
                                                                height={778}
                                                            />
                                                        </a>
                                                        <div className="flash">
                                                            <span className="onnew">
                                                                <span className="text">New</span>
                                                            </span>
                                                        </div>
                                                        <div className="group-button">
                                                            <div className="yith-wcwl-add-to-wishlist">
                                                                <div className="yith-wcwl-add-button show">
                                                                    <a href="wishlist.html" className="add_to_wishlist">
                                                                        Add to Wishlist
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="kodory product compare-button">
                                                                <a href="compare.html" className="compare button">
                                                                    Compare
                                                                </a>
                                                            </div>
                                                            <a href="#" className="button yith-wcqv-button">
                                                                Quick View
                                                            </a>
                                                            <div className="add-to-cart">
                                                                <a
                                                                    href="#"
                                                                    className="button product_type_simple add_to_cart_button ajax_add_to_cart"
                                                                >
                                                                    Add to cart
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-info equal-elem">
                                                        <h3 className="product-name product_title">
                                                            <a href="single-product.html" tabIndex={0}>
                                                                Elegant Diamond
                                                            </a>
                                                        </h3>
                                                        <div className="rating-wapper nostar">
                                                            <div className="star-rating">
                                                                <span style={{ width: "0%" }}>
                                                                    Rated <strong className="rating">0</strong> out of 5
                                                                </span>
                                                            </div>
                                                            <span className="review">(0)</span>
                                                        </div>
                                                        <span className="price">
                                                            <span className="kodory-Price-amount amount">
                                                                <span className="kodory-Price-currencySymbol">$</span>
                                                                89.00
                                                            </span>{" "}
                                                            –
                                                            <span className="kodory-Price-amount amount">
                                                                <span className="kodory-Price-currencySymbol">$</span>
                                                                139.00
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;