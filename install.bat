@echo off
echo Installing Roof Biz Solutions CMS...
echo.

echo Installing backend dependencies...
cd backend
call npm install
call npm install slugify express-validator cloudinary multer-storage-cloudinary
echo.

echo Installing frontend dependencies...
cd ..\frontend
call npm install
call npm install antd react-quill recharts dayjs
echo.

echo Seeding database...
cd ..\backend
call node seed-enhanced.js
echo.

echo Installation complete!
echo.
echo To start the application:
echo 1. Start backend: cd backend && npm run dev
echo 2. Start frontend: cd frontend && npm run dev
echo 3. Access admin panel: http://localhost:5173/admin/login
echo    Email: admin@roofbizsolutions.com
echo    Password: admin123
echo.
pause