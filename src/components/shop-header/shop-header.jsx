import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ShopHeader = ({ total, count }) => {
    return (
        <header className="shop-header row">
            <Link to="/" className="logo text-dark">ReStore</Link>
            <Link to="/cart" className="shop-cart">
                <i className="cart-icon fa fa-shopping-cart" />
                {count} товаров (${total})
            </Link>
        </header>
    );
};

const mapStateToProps = ({shoppingCart: { orderTotal, orderCount } }) => {
    return {
        total: orderTotal,
        count: orderCount
    }
};

export default connect(mapStateToProps)(ShopHeader);