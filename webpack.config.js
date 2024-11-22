const path = require('path');

module.exports = {
    entry: './src/index.js', // Đường dẫn tới file JavaScript chính
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
