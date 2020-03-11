
const updateCartItems = (cartItems, item, idx) => {

    if(item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }

    if(idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ]
};

const updateCartItem = (book, item = {}, quantity) => {

    const {
        id = book.id,
        count = 0,
        total = 0,
        title = book.title
    } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    }
};

const updateOrderTotal = (orderTotal, book, quantity) => {
    return orderTotal + quantity * book.price;
};


const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems, orderTotal, orderCount } } = state;
    const book = books.find(book => book.id === bookId);
    const itemIdx = cartItems.findIndex(book => book.id === bookId);
    const item = cartItems[itemIdx];

    const newItem = updateCartItem(book, item, quantity);
    const newTotal = updateOrderTotal(orderTotal, book, quantity);

    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIdx),
        orderTotal: newTotal,
        orderCount: orderCount + quantity
    };
};

const updateShoppingCart = (state, action) => {

    if(state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            orderCount: 0
        }
    }

    switch (action.type) {
        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1);

        case 'BOOK_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1);

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const deletedItem = state.shoppingCart.cartItems.find(book => book.id === action.payload);
            return updateOrder(state, action.payload, -deletedItem.count);

        default:
            return state.shoppingCart;
    }
};

export default updateShoppingCart;