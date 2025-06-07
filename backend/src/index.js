require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const Student = require('./models/Student');
const { LateInsuranceStudent, CompletedInsuranceStudent, UnpaidStudent, OlympicStudent, RecoveryExamStudent } = require('./models/Student');
const fs = require('fs');
const studentRoutes = require('./routes/studentRoutes');
const completedInsuranceRoutes = require('./routes/completedInsuranceRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://admin:password123@localhost:27018/student_analysis?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    let data = [];
    let sheetName = '';
    console.log('--- UPLOAD FILE ---');
    console.log('File name:', req.file.originalname);
    // Xử lý file CSV
    if (req.file.originalname.endsWith('.csv')) {
      const csv = require('csvtojson');
      data = await csv().fromFile(req.file.path);
      sheetName = req.file.originalname.replace('.csv', '');
    } else {
      const workbook = xlsx.readFile(req.file.path);
      sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(worksheet);
    }
    console.log('Số dòng đọc được:', data.length);
    if (data.length > 0) {
      console.log('Các trường (keys) của dòng đầu:', Object.keys(data[0]));
    }

    // Phân biệt file bảo hiểm y tế dựa vào tên file hoặc cột đặc trưng
    if (req.file.originalname.includes('phục hồi lịch thi') || req.file.originalname.includes('bảo hiểm')) {
      console.log('Nhận diện: LateInsuranceStudent');
      for (const row of data) {
        try {
          await LateInsuranceStudent.create({
            studentId: row['Mã sinh viên'] || row['MSSV'],
            name: row['Họ và tên'],
            faculty: row['Khoa'] || row['Lớp'],
            reason: row['Lý do'] || row['Ghi chú'],
            note: row['Ghi chú']
          });
        } catch (err) {
          console.error('Lỗi import dòng:', row, err.message);
        }
      }
      fs.unlinkSync(req.file.path);
      return res.json({ message: 'Late insurance students imported successfully' });
    }

    if (req.file.originalname.includes('hoàn thành đóng bhyt')) {
      console.log('Nhận diện: CompletedInsuranceStudent');
      for (const row of data) {
        try {
          await CompletedInsuranceStudent.create({
            studentId: row['Mã sinh viên'] || row['MSSV'],
            name: row['Họ và tên'],
            faculty: row['Khoa'] || row['Lớp'],
            note: row['Ghi chú']
          });
        } catch (err) {
          console.error('Lỗi import dòng:', row, err.message);
        }
      }
      fs.unlinkSync(req.file.path);
      return res.json({ message: 'Completed insurance students imported successfully' });
    }

    if (req.file.originalname.includes('chưa hoàn thành học phí')) {
      console.log('Nhận diện: UnpaidStudent');
      for (const row of data) {
        try {
          await UnpaidStudent.create({
            studentId: row['Mã sinh viên'] || row['MSSV'],
            name: row['Họ và tên'],
            faculty: row['Khoa'] || row['Lớp'],
            semester: row['Học kỳ'],
            note: row['Ghi chú']
          });
        } catch (err) {
          console.error('Lỗi import dòng:', row, err.message);
        }
      }
      fs.unlinkSync(req.file.path);
      return res.json({ message: 'Unpaid students imported successfully' });
    }

    if (req.file.originalname.includes('Olympic')) {
      console.log('Nhận diện: OlympicStudent');
      for (const row of data) {
        try {
          await OlympicStudent.create({
            studentId: row['Mã sinh viên'] || row['MSSV'],
            name: row['Họ và tên'],
            faculty: row['Khoa'] || row['Lớp'],
            subject: sheetName,
            score: parseFloat(row['Điểm']),
            note: row['Ghi chú']
          });
        } catch (err) {
          console.error('Lỗi import dòng:', row, err.message);
        }
      }
      fs.unlinkSync(req.file.path);
      return res.json({ message: 'Olympic students imported successfully' });
    }

    if (req.file.originalname.includes('phục hồi lịch thi')) {
      console.log('Nhận diện: RecoveryExamStudent');
      for (const row of data) {
        try {
          await RecoveryExamStudent.create({
            studentId: row['MSSV'] || row['Mã sinh viên'],
            name: row['Tên'] || row['Họ và tên'],
            faculty: row['Khoa'],
            class: row['Lớp'],
            phone: row['sđt'],
            tuitionPaidDate: row['Thời gian \nnộp học phí'] || row['Thời gian nộp học phí'],
            submittedApplication: row['Nộp đơn\n(bản cứng ở pCTCT-SV)'] || row['Nộp đơn (bản cứng ở pCTCT-SV)'],
            tuitionDebt: row['NỢ HỌC PHÍ\ndữ liệu đến hết 11/5/2025'] || row['NỢ HỌC PHÍ']
          });
        } catch (err) {
          console.error('Lỗi import dòng:', row, err.message);
        }
      }
      fs.unlinkSync(req.file.path);
      return res.json({ message: 'Recovery exam students imported successfully' });
    }

    // Import điểm thi Olympic hoặc các file điểm khác
    console.log('Nhận diện: Student (điểm thi hoặc file khác)');
    for (const row of data) {
      try {
        let student = await Student.findOne({ studentId: row['Mã sinh viên'] });
        if (student) {
          student.scores.push({
            subject: sheetName,
            score: parseFloat(row['Điểm']),
            semester: row['Học kỳ']
          });
          await student.save();
        } else {
          student = new Student({
            studentId: row['Mã sinh viên'],
            name: row['Họ và tên'],
            faculty: row['Khoa'],
            scores: [{
              subject: sheetName,
              score: parseFloat(row['Điểm']),
              semester: row['Học kỳ']
            }]
          });
          await student.save();
        }
      } catch (err) {
        console.error('Lỗi import dòng:', row, err.message);
      }
    }
    fs.unlinkSync(req.file.path);
    res.json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Lỗi tổng quát khi import:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $unwind: '$scores'
      },
      {
        $group: {
          _id: {
            subject: '$scores.subject',
            faculty: '$faculty'
          },
          avgScore: { $avg: '$scores.score' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.subject',
          faculties: {
            $push: {
              faculty: '$_id.faculty',
              avgScore: '$avgScore',
              count: '$count'
            }
          },
          overallAvg: { $avg: '$avgScore' }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint lấy danh sách sinh viên đóng muộn bảo hiểm y tế
app.get('/api/late-insurance-students', async (req, res) => {
  try {
    const lateStudents = await LateInsuranceStudent.find();
    res.json(lateStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint lấy danh sách sinh viên hoàn thành đóng BHYT
app.get('/api/completed-insurance-students', async (req, res) => {
  try {
    const completedStudents = await CompletedInsuranceStudent.find();
    res.json(completedStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint lấy danh sách sinh viên chưa hoàn thành học phí
app.get('/api/unpaid-students', async (req, res) => {
  try {
    const unpaidStudents = await UnpaidStudent.find();
    res.json(unpaidStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint lấy danh sách sinh viên tham gia Olympic
app.get('/api/olympic-students', async (req, res) => {
  try {
    const olympicStudents = await OlympicStudent.find();
    res.json(olympicStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint lấy danh sách sinh viên phục hồi lịch thi (BHYT)
app.get('/api/recovery-exam-students', async (req, res) => {
  try {
    const recoveryStudents = await RecoveryExamStudent.find();
    res.json(recoveryStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes
const unpaidRoutes = require('../routes/unpaidRoutes');
const recoveryExamRoutes = require('../routes/recoveryExamRoutes');

app.use('/api/completed-insurance', completedInsuranceRoutes);
app.use('/api/unpaid', unpaidRoutes);
app.use('/api/recovery-exam', recoveryExamRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 