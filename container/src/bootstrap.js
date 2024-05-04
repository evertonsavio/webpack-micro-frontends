import { mount as productMout } from 'products/ProductsIndex';
import { mount as cartMount } from 'cart/CartShow';
import 'cart/CartShow';

console.log("Container!")

// Never assign an id that is equal to the name of a global variable on webpack.config.js at ModuleFederationPlugin
productMout(document.querySelector("#my-products"));
cartMount(document.querySelector("#my-cart"));
