## Microfrontends Webpack Setup ( Run-Time Integrations )

### Setup Webpack
On each microfront end run:
```
npm init -y
npm install webpack@5.88.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 faker@5.1.0 html-webpack-plugin@5.5.0 --save-exact
```

Create webpack.config.js file:
```
module.exports = {
    mode: 'development',
};

#package.json
    "scripts": {
        "start": "webpack"
    },
```
Run the webpack config:
```
npm run start
```
The dist folder will be created with the bundle.js / main.js.

### Setup Webpack Dev Server
PORT: 8081.
```
module.exports = {
    mode: 'development',
    devServer: {
        port: 8081,
    },
};

#package.json
    "scripts": {
        "start": "webpack serve"
    },
```
Create the public folder and add index.html there.
Add plugin to automatically add script tags to html file on webpack.config.js.
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        port: 8081,
    },
    plugins: [
        new  HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
```

### Setup Container ( Decides what to render )
```
npm init -y
npm install webpack@5.88.0 webpack-cli@4.10.0 webpack-dev-server@4.7.4 html-webpack-plugin@5.5.0 nodemon --save-exact
```
