import React from 'react';
import { connect } from 'react-redux';

import {bookAddedToCart, bookRemovedFromCart, allBooksRemovedFromCart } from "../../actions";


const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {


  if(!items.length) {
      return <p>В корзине нет товаров!</p>;
  }

  return(
      <div>
          <h2>Ваш заказ</h2>
          <table className="shopping-cart-table">
              <tbody>
              <tr>
                  <th>#</th>
                  <th>Имя</th>
                  <th>Кол-во</th>
                  <th>Цена</th>
                  <th></th>
              </tr>
              {
                  items.map((item, idx) => {
                      const { id, title, count, total } = item;
                    return(
                        <tr key={id}>
                          <td>{idx + 1}</td>
                          <td>{title}</td>
                          <td>{count}</td>
                          <td>${total}</td>
                          <td className="shopping-cart-table__actions">
                              <button className="btn btn-outline-success btn-sm"
                                      onClick={() => onDecrease(id)}>
                                <i className="fa fa-minus" />
                              </button>
                              <button className="btn btn-outline-success btn-sm"
                                      onClick={() => onIncrease(id)}>
                                <i className="fa fa-plus" />
                              </button>
                              <button className="btn btn-outline-danger btn-sm"
                                      onClick={() => onDelete(id)}>
                                <i className="fa fa-trash" />
                              </button>
                          </td>
                        </tr>
                    )
                  })
              }
              </tbody>
          </table>
          <p className="total-price">Всего товаров на сумму: ${total}</p>
      </div>
  )
};

const mapStateToProps = ({shoppingCart: { cartItems, orderTotal } }) => {
  return {
      items: cartItems,
      total: orderTotal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      onIncrease: id => dispatch(bookAddedToCart(id)),
      onDecrease: id => dispatch(bookRemovedFromCart(id)),
      onDelete: id => dispatch(allBooksRemovedFromCart(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);