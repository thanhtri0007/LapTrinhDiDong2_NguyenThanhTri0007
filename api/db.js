const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware để xử lý JSON
app.use(bodyParser.json());

// Sử dụng middleware cors
app.use(cors());

// Thiết lập kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
    host: 'localhost', // hoặc địa chỉ IP của máy chủ MySQL
    user: 'root',
    password: '',
    database: 'nguyenthanhtri_cdtt'
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
        return;
    }
    console.log('Kết nối đến cơ sở dữ liệu MySQL thành công!');
});

// Tạo API endpoint để lấy dữ liệu sản phẩm
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM ntt_product';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});

// Tạo API endpoint để lấy dữ liệu chi tiết sản phẩm theo ID
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM ntt_product WHERE id = ?';

    connection.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Kiểm tra nếu không có sản phẩm nào được tìm thấy
        if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        const product = results[0];
        res.json(product);
    });
});

// Tạo API endpoint để cập nhật chi tiết sản phẩm theo ID
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const newDetails = req.body.details; // Giả sử bạn gửi chi tiết sản phẩm qua body request

    const query = 'UPDATE ntt_product SET details = ? WHERE id = ?';

    connection.query(query, [newDetails, productId], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json({ success: true, message: 'Product details updated successfully' });
    });
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
