const students = [
  {
    studentId: 'SV001',
    name: 'Nguyen Van A',
    faculty: 'CNTT',
    subject: 'Toán',
    score: 8.5,
    year: 2023
  },
  {
    studentId: 'SV002',
    name: 'Tran Thi B',
    faculty: 'CNTT',
    subject: 'Lập trình',
    score: 9.0,
    year: 2023
  },
  {
    studentId: 'SV003',
    name: 'Le Van C',
    faculty: 'Điện',
    subject: 'Vật lý',
    score: 7.5,
    year: 2023
  }
];

const lateInsuranceStudents = [
  {
    studentId: 'SV001',
    name: 'Nguyen Van A',
    faculty: 'CNTT',
    paymentDate: new Date('2023-12-01'),
    amount: 500000,
    status: 'pending'
  },
  {
    studentId: 'SV002',
    name: 'Tran Thi B',
    faculty: 'CNTT',
    paymentDate: new Date('2023-12-15'),
    amount: 500000,
    status: 'completed'
  }
];

const olympicStudents = [
  {
    studentId: 'SV001',
    name: 'Nguyen Van A',
    faculty: 'CNTT',
    subject: 'Lập trình',
    award: 'Gold',
    year: 2023,
    competitionName: 'Olympic Tin học'
  },
  {
    studentId: 'SV002',
    name: 'Tran Thi B',
    faculty: 'CNTT',
    subject: 'Lập trình',
    award: 'Silver',
    year: 2023,
    competitionName: 'Olympic Tin học'
  }
];

const completedInsuranceStudents = [
  {
    studentId: 'SV001',
    name: 'Nguyen Van A',
    faculty: 'CNTT',
    paymentDate: new Date('2023-09-01'),
    amount: 500000,
    insuranceNumber: 'BH001',
    validUntil: new Date('2024-09-01')
  },
  {
    studentId: 'SV002',
    name: 'Tran Thi B',
    faculty: 'CNTT',
    paymentDate: new Date('2023-09-05'),
    amount: 500000,
    insuranceNumber: 'BH002',
    validUntil: new Date('2024-09-05')
  },
  {
    studentId: 'SV003',
    name: 'Le Van C',
    faculty: 'Điện',
    paymentDate: new Date('2023-09-10'),
    amount: 500000,
    insuranceNumber: 'BH003',
    validUntil: new Date('2024-09-10')
  },
  {
    studentId: 'SV004',
    name: 'Pham Thi D',
    faculty: 'Cơ khí',
    paymentDate: new Date('2023-09-15'),
    amount: 500000,
    insuranceNumber: 'BH004',
    validUntil: new Date('2024-09-15')
  },
  {
    studentId: 'SV005',
    name: 'Hoang Van E',
    faculty: 'CNTT',
    paymentDate: new Date('2023-09-20'),
    amount: 500000,
    insuranceNumber: 'BH005',
    validUntil: new Date('2024-09-20')
  },
  {
    studentId: 'SV006',
    name: 'Vu Thi F',
    faculty: 'Điện',
    paymentDate: new Date('2023-09-25'),
    amount: 500000,
    insuranceNumber: 'BH006',
    validUntil: new Date('2024-09-25')
  },
  {
    studentId: 'SV007',
    name: 'Dang Van G',
    faculty: 'Cơ khí',
    paymentDate: new Date('2023-09-30'),
    amount: 500000,
    insuranceNumber: 'BH007',
    validUntil: new Date('2024-09-30')
  },
  {
    studentId: 'SV008',
    name: 'Bui Thi H',
    faculty: 'CNTT',
    paymentDate: new Date('2023-10-01'),
    amount: 500000,
    insuranceNumber: 'BH008',
    validUntil: new Date('2024-10-01')
  },
  {
    studentId: 'SV009',
    name: 'Do Van I',
    faculty: 'Điện',
    paymentDate: new Date('2023-10-05'),
    amount: 500000,
    insuranceNumber: 'BH009',
    validUntil: new Date('2024-10-05')
  },
  {
    studentId: 'SV010',
    name: 'Ngo Thi K',
    faculty: 'Cơ khí',
    paymentDate: new Date('2023-10-10'),
    amount: 500000,
    insuranceNumber: 'BH010',
    validUntil: new Date('2024-10-10')
  },
  {
    studentId: 'SV011',
    name: 'Ly Van L',
    faculty: 'CNTT',
    paymentDate: new Date('2023-10-15'),
    amount: 500000,
    insuranceNumber: 'BH011',
    validUntil: new Date('2024-10-15')
  },
  {
    studentId: 'SV012',
    name: 'Truong Thi M',
    faculty: 'Điện',
    paymentDate: new Date('2023-10-20'),
    amount: 500000,
    insuranceNumber: 'BH012',
    validUntil: new Date('2024-10-20')
  },
  {
    studentId: 'SV013',
    name: 'Ho Van N',
    faculty: 'Cơ khí',
    paymentDate: new Date('2023-10-25'),
    amount: 500000,
    insuranceNumber: 'BH013',
    validUntil: new Date('2024-10-25')
  },
  {
    studentId: 'SV014',
    name: 'Duong Thi O',
    faculty: 'CNTT',
    paymentDate: new Date('2023-10-30'),
    amount: 500000,
    insuranceNumber: 'BH014',
    validUntil: new Date('2024-10-30')
  },
  {
    studentId: 'SV015',
    name: 'Mai Van P',
    faculty: 'Điện',
    paymentDate: new Date('2023-11-01'),
    amount: 500000,
    insuranceNumber: 'BH015',
    validUntil: new Date('2024-11-01')
  },
  {
    studentId: 'SV016',
    name: 'Dao Thi Q',
    faculty: 'Cơ khí',
    paymentDate: new Date('2023-11-05'),
    amount: 500000,
    insuranceNumber: 'BH016',
    validUntil: new Date('2024-11-05')
  },
  {
    studentId: 'SV017',
    name: 'Dinh Van R',
    faculty: 'CNTT',
    paymentDate: new Date('2023-11-10'),
    amount: 500000,
    insuranceNumber: 'BH017',
    validUntil: new Date('2024-11-10')
  },
  {
    studentId: 'SV018',
    name: 'Le Thi S',
    faculty: 'Điện',
    paymentDate: new Date('2023-11-15'),
    amount: 500000,
    insuranceNumber: 'BH018',
    validUntil: new Date('2024-11-15')
  },
  {
    studentId: 'SV019',
    name: 'Nguyen Van T',
    faculty: 'Cơ khí',
    paymentDate: new Date('2023-11-20'),
    amount: 500000,
    insuranceNumber: 'BH019',
    validUntil: new Date('2024-11-20')
  },
  {
    studentId: 'SV020',
    name: 'Tran Thi U',
    faculty: 'CNTT',
    paymentDate: new Date('2023-11-25'),
    amount: 500000,
    insuranceNumber: 'BH020',
    validUntil: new Date('2024-11-25')
  }
];

const unpaidStudents = [
  {
    studentId: 'SV001',
    name: 'Nguyen Van A',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2023-12-15'),
    status: 'urgent'
  },
  {
    studentId: 'SV002',
    name: 'Tran Thi B',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2023-12-20'),
    status: 'warning'
  },
  {
    studentId: 'SV003',
    name: 'Le Van C',
    faculty: 'Điện',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2023-12-25'),
    status: 'pending'
  },
  {
    studentId: 'SV004',
    name: 'Pham Thi D',
    faculty: 'Cơ khí',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2023-12-30'),
    status: 'urgent'
  },
  {
    studentId: 'SV005',
    name: 'Hoang Van E',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-01-05'),
    status: 'warning'
  },
  {
    studentId: 'SV006',
    name: 'Vu Thi F',
    faculty: 'Điện',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-01-10'),
    status: 'pending'
  },
  {
    studentId: 'SV007',
    name: 'Dang Van G',
    faculty: 'Cơ khí',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-01-15'),
    status: 'urgent'
  },
  {
    studentId: 'SV008',
    name: 'Bui Thi H',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-01-20'),
    status: 'warning'
  },
  {
    studentId: 'SV009',
    name: 'Do Van I',
    faculty: 'Điện',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-01-25'),
    status: 'pending'
  },
  {
    studentId: 'SV010',
    name: 'Ngo Thi K',
    faculty: 'Cơ khí',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-01-30'),
    status: 'urgent'
  },
  {
    studentId: 'SV011',
    name: 'Ly Van L',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-02-05'),
    status: 'warning'
  },
  {
    studentId: 'SV012',
    name: 'Truong Thi M',
    faculty: 'Điện',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-02-10'),
    status: 'pending'
  },
  {
    studentId: 'SV013',
    name: 'Ho Van N',
    faculty: 'Cơ khí',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-02-15'),
    status: 'urgent'
  },
  {
    studentId: 'SV014',
    name: 'Duong Thi O',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-02-20'),
    status: 'warning'
  },
  {
    studentId: 'SV015',
    name: 'Mai Van P',
    faculty: 'Điện',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-02-25'),
    status: 'pending'
  },
  {
    studentId: 'SV016',
    name: 'Dao Thi Q',
    faculty: 'Cơ khí',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-03-01'),
    status: 'urgent'
  },
  {
    studentId: 'SV017',
    name: 'Dinh Van R',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-03-05'),
    status: 'warning'
  },
  {
    studentId: 'SV018',
    name: 'Le Thi S',
    faculty: 'Điện',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-03-10'),
    status: 'pending'
  },
  {
    studentId: 'SV019',
    name: 'Nguyen Van T',
    faculty: 'Cơ khí',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-03-15'),
    status: 'urgent'
  },
  {
    studentId: 'SV020',
    name: 'Tran Thi U',
    faculty: 'CNTT',
    semester: '2023-2',
    amount: 15000000,
    dueDate: new Date('2024-03-20'),
    status: 'warning'
  }
];

const recoveryExamStudents = [
  {
    studentId: 'SV001',
    name: 'Nguyen Van A',
    faculty: 'CNTT',
    subject: 'Lập trình',
    originalExamDate: new Date('2023-12-15'),
    recoveryExamDate: new Date('2024-01-15'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV002',
    name: 'Tran Thi B',
    faculty: 'CNTT',
    subject: 'Cơ sở dữ liệu',
    originalExamDate: new Date('2023-12-16'),
    recoveryExamDate: new Date('2024-01-16'),
    reason: 'Tai nạn',
    status: 'pending'
  },
  {
    studentId: 'SV003',
    name: 'Le Van C',
    faculty: 'Điện',
    subject: 'Vật lý',
    originalExamDate: new Date('2023-12-17'),
    recoveryExamDate: new Date('2024-01-17'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV004',
    name: 'Pham Thi D',
    faculty: 'Cơ khí',
    subject: 'Cơ học',
    originalExamDate: new Date('2023-12-18'),
    recoveryExamDate: new Date('2024-01-18'),
    reason: 'Tai nạn',
    status: 'rejected'
  },
  {
    studentId: 'SV005',
    name: 'Hoang Van E',
    faculty: 'CNTT',
    subject: 'Mạng máy tính',
    originalExamDate: new Date('2023-12-19'),
    recoveryExamDate: new Date('2024-01-19'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV006',
    name: 'Vu Thi F',
    faculty: 'Điện',
    subject: 'Điện tử',
    originalExamDate: new Date('2023-12-20'),
    recoveryExamDate: new Date('2024-01-20'),
    reason: 'Tai nạn',
    status: 'pending'
  },
  {
    studentId: 'SV007',
    name: 'Dang Van G',
    faculty: 'Cơ khí',
    subject: 'Cơ học',
    originalExamDate: new Date('2023-12-21'),
    recoveryExamDate: new Date('2024-01-21'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV008',
    name: 'Bui Thi H',
    faculty: 'CNTT',
    subject: 'Lập trình',
    originalExamDate: new Date('2023-12-22'),
    recoveryExamDate: new Date('2024-01-22'),
    reason: 'Tai nạn',
    status: 'rejected'
  },
  {
    studentId: 'SV009',
    name: 'Do Van I',
    faculty: 'Điện',
    subject: 'Vật lý',
    originalExamDate: new Date('2023-12-23'),
    recoveryExamDate: new Date('2024-01-23'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV010',
    name: 'Ngo Thi K',
    faculty: 'Cơ khí',
    subject: 'Cơ học',
    originalExamDate: new Date('2023-12-24'),
    recoveryExamDate: new Date('2024-01-24'),
    reason: 'Tai nạn',
    status: 'pending'
  },
  {
    studentId: 'SV011',
    name: 'Ly Van L',
    faculty: 'CNTT',
    subject: 'Cơ sở dữ liệu',
    originalExamDate: new Date('2023-12-25'),
    recoveryExamDate: new Date('2024-01-25'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV012',
    name: 'Truong Thi M',
    faculty: 'Điện',
    subject: 'Điện tử',
    originalExamDate: new Date('2023-12-26'),
    recoveryExamDate: new Date('2024-01-26'),
    reason: 'Tai nạn',
    status: 'rejected'
  },
  {
    studentId: 'SV013',
    name: 'Ho Van N',
    faculty: 'Cơ khí',
    subject: 'Cơ học',
    originalExamDate: new Date('2023-12-27'),
    recoveryExamDate: new Date('2024-01-27'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV014',
    name: 'Duong Thi O',
    faculty: 'CNTT',
    subject: 'Mạng máy tính',
    originalExamDate: new Date('2023-12-28'),
    recoveryExamDate: new Date('2024-01-28'),
    reason: 'Tai nạn',
    status: 'pending'
  },
  {
    studentId: 'SV015',
    name: 'Mai Van P',
    faculty: 'Điện',
    subject: 'Vật lý',
    originalExamDate: new Date('2023-12-29'),
    recoveryExamDate: new Date('2024-01-29'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV016',
    name: 'Dao Thi Q',
    faculty: 'Cơ khí',
    subject: 'Cơ học',
    originalExamDate: new Date('2023-12-30'),
    recoveryExamDate: new Date('2024-01-30'),
    reason: 'Tai nạn',
    status: 'rejected'
  },
  {
    studentId: 'SV017',
    name: 'Dinh Van R',
    faculty: 'CNTT',
    subject: 'Lập trình',
    originalExamDate: new Date('2023-12-31'),
    recoveryExamDate: new Date('2024-01-31'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV018',
    name: 'Le Thi S',
    faculty: 'Điện',
    subject: 'Điện tử',
    originalExamDate: new Date('2024-01-01'),
    recoveryExamDate: new Date('2024-02-01'),
    reason: 'Tai nạn',
    status: 'pending'
  },
  {
    studentId: 'SV019',
    name: 'Nguyen Van T',
    faculty: 'Cơ khí',
    subject: 'Cơ học',
    originalExamDate: new Date('2024-01-02'),
    recoveryExamDate: new Date('2024-02-02'),
    reason: 'Bệnh',
    status: 'approved'
  },
  {
    studentId: 'SV020',
    name: 'Tran Thi U',
    faculty: 'CNTT',
    subject: 'Cơ sở dữ liệu',
    originalExamDate: new Date('2024-01-03'),
    recoveryExamDate: new Date('2024-02-03'),
    reason: 'Tai nạn',
    status: 'rejected'
  }
];

module.exports = {
  students,
  lateInsuranceStudents,
  olympicStudents,
  completedInsuranceStudents,
  unpaidStudents,
  recoveryExamStudents
}; 