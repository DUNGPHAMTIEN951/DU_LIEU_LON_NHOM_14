const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const {
  LateInsuranceStudent,
  CompletedInsuranceStudent,
  UnpaidStudent,
  OlympicStudent,
  RecoveryExamStudent,
  Student
} = require('./src/models/Student');

require('dotenv').config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27018/student_analysis?authSource=admin';

async function importCSVFiles(dir, type) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const data = await csv().fromFile(filePath);

    if (type === 'late') {
      for (const row of data) {
        await LateInsuranceStudent.create({
          studentId: row['Mã sinh viên'] || row['MSSV'],
          name: row['Họ và tên'],
          faculty: row['Khoa'] || row['Lớp'],
          reason: row['Lý do'] || row['Ghi chú'],
          note: row['Ghi chú']
        });
      }
    } else if (type === 'completed') {
      for (const row of data) {
        await CompletedInsuranceStudent.create({
          studentId: row['Mã sinh viên'] || row['MSSV'],
          name: row['Họ và tên'],
          faculty: row['Khoa'] || row['Lớp'],
          note: row['Ghi chú']
        });
      }
    } else if (type === 'unpaid') {
      for (const row of data) {
        await UnpaidStudent.create({
          studentId: row['Mã sinh viên'] || row['MSSV'],
          name: row['Họ và tên'],
          faculty: row['Khoa'] || row['Lớp'],
          semester: row['Học kỳ'],
          note: row['Ghi chú']
        });
      }
    } else if (type === 'olympic') {
      for (const row of data) {
        await OlympicStudent.create({
          studentId: row['Mã sinh viên'] || row['MSSV'],
          name: row['Họ và tên'],
          faculty: row['Khoa'] || row['Lớp'],
          subject: file.replace('.csv', ''),
          score: parseFloat(row['Điểm']),
          note: row['Ghi chú']
        });
      }
    } else if (type === 'recovery') {
      for (const row of data) {
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
      }
    }
    console.log(`Imported ${file}`);
  }
}

async function main() {
  await mongoose.connect(mongoUri);

  await importCSVFiles(path.join(__dirname, '../DATA/BHYT'), 'recovery');
  await importCSVFiles(path.join(__dirname, '../DATA/DS_Olympic'), 'olympic');
  // Thêm các dòng dưới nếu có các nhóm dữ liệu khác
  // await importCSVFiles('./DATA/xxx', 'late');
  // await importCSVFiles('./DATA/xxx', 'completed');
  // await importCSVFiles('./DATA/xxx', 'unpaid');

  mongoose.disconnect();
}

main(); 