const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: path.join(path.resolve('src/main'), 'Validator.js'),
    output: {
        path: path.resolve('dist'),
        filename: 'Validator.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin( [  { from: './src/main/Validator.d.ts', to: './Validator.d.ts' } ] )
    ],
    externals: {      
        // Don't bundle react or react-dom      
        react: {          
            commonjs: "react",          
            commonjs2: "react",          
            amd: "React",          
            root: "React"      
        },      
        "react-dom": {          
            commonjs: "react-dom",          
            commonjs2: "react-dom",          
            amd: "ReactDOM",          
            root: "ReactDOM"      
        }  
    } 
}