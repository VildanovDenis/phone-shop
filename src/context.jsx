import React, { Component } from "react";

import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalIsOpen: false,
    modalProduct: detailProduct
  };

  componentDidMount() {
    this.setProduct();
  }

  setProduct = () => {
    const productList = storeProducts.reduce((productList, item) => {
      return (productList = [...productList, item]);
    }, []);
    this.setState({
      products: productList
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({
      detailProduct: product
    });
  };

  addToCart = id => {
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState({
      product: tempProducts,
      cart: [...this.state.cart, product]
    });
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState({
      modalIsOpen: true,
      modalProduct: product
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
