# DU_LIEU_LON_NHOM_14

Hệ thống quản lý sinh viên theo các mẫu có sẵn

Phạm Tiến Dũng 2221050669
Phạm Thanh Sơn 2221050627

## Tính năng chính

- Quản lý thông tin sinh viên
- Quản lý bảo hiểm y tế
- Quản lý thanh toán
- Quản lý kỳ thi
- Quản lý cuộc thi Olympic
- Báo cáo thống kê

## Công nghệ sử dụng

### Backend
- Node.js
- Express.js
- MongoDB
- Docker

### Frontend
- React.js
- Material-UI
- Redux
- Axios

## Cài đặt và chạy

### Yêu cầu
- Node.js >= 14
- Docker và Docker Compose
- MongoDB

### Cài đặt

1. Clone repository:
```bash
git clone https://github.com/DUNGPHAMTIEN951/DU_LIEU_LON_NHOM_14.git
cd DU_LIEU_LON_NHOM_14
```

2. Cài đặt dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

3. Chạy với Docker:
```bash
docker-compose up
```

4. Hoặc chạy riêng lẻ:
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

## Cấu trúc project

```
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── docker-compose.yml
```


