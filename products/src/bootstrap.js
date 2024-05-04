import faker from 'faker';

const mount = (el) => {

    let products = '';

    for (let i = 0; i < 10; i++) {
        products += `<div>${faker.commerce.productName()}</div>`;
    };

    el.innerHTML = products;
    // on React would be: ReactDOM.render(<App />, el);
};

// Context/Situation #1
// We are running this file in development in isolation
// We are using our local index.html file
// Which DEFINITELY has an element with an id of 'dev-products'
// We want to immediately render our app into that element
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector("#dev-products");

    // Assuming our container doesnt have an #dev-products element
    if (el) {
        // We are probably running in isolation
        mount(el);
    }
};

// Context/Situaltion #2
// We are running this file in development or production
// through the CONTAINER app
// NO GUARANTEE that an element with an id of 'dev-products' exists
// We do not want try to immediately render the app

export { mount };
