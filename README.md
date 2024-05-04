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
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
    },
    plugins: [
        new  HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
```

### Designate one app as the Host (Container) and one as the Remote
1. In the Remote, decide which modules (files) you want to make available to other projects
2. Set up Module Federation plugin to expose those files
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
    mode: 'development',
    devServer: {
        port: 8081,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'products',
            filename: 'remoteEntry.js',
            exposes: {
                './ProductsIndex': './src/index'
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

```
3. In the Host, decide which files you want to get from the remotte
4. Set up Module Federation plugin to fetch those files
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                products: 'products@http://localhost:8081/remoteEntry.js'
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};


const HtmlWebpackPlugin = require('html-webpack-plugin')

```
5. In the Host, refactor the entry point to load asynchronously
> Rename index.js to bootstrap.js and creates a new index.js with import('./bootstrap')
6. In the Host, import whatever files you need from the remote.
