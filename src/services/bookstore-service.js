export default class BookstoreService {

     data = [
        {
            id: 1,
            title: 'Production-Ready Microservices',
            author: 'Susan J. Fowler',
            price: 32,
            coverImage: 'https://covers.oreillystatic.com/images/0636920053675/lrg.jpg'
        },
        {
            id: 2,
            title: 'Release It!',
            author: 'Michael T. Nygard',
            price: 20,
            coverImage: 'https://images-na.ssl-images-amazon.com/images/I/419zAwJJH4L._SX415_BO1,204,203,200_.jpg'
        }
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
           setTimeout(() => {
              resolve(this.data);
           }, 700);
        });
    }
}