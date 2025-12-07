import dayjs from 'dayjs';

// Generate last 7 days for charts
const last7Days = Array.from({ length: 7 }, (_, i) => {
  return dayjs().subtract(6 - i, 'day').format('MMM DD');
});

export const scanResults = Array.from({ length: 50 }, (_, i) => ({
  id: `SCAN-${1000 + i}`,
  timestamp: dayjs().subtract(Math.floor(Math.random() * 24), 'hour').toISOString(),
  status: Math.random() > 0.1 ? 'PASS' : 'FAIL',
  confidence: 85 + Math.random() * 14.9,
  workerId: `W-${100 + Math.floor(Math.random() * 5)}`,
  batchId: `BATCH-${['A1', 'B2', 'C3'][Math.floor(Math.random() * 3)]}`,
  failureReason: Math.random() > 0.1 ? null : ['Misalignment', 'Missing Component', 'Soldering Defect'][Math.floor(Math.random() * 3)]
}));

export const workerStats = [
  { workerId: 'W-101', workerName: 'Alice Johnson', currentStatus: 'Active', liveScanCount: 145, failStreak: 0, lastScanResult: 'PASS' },
  { workerId: 'W-102', workerName: 'Bob Smith', currentStatus: 'Active', liveScanCount: 132, failStreak: 1, lastScanResult: 'FAIL' },
  { workerId: 'W-103', workerName: 'Charlie Davis', currentStatus: 'Idle', liveScanCount: 98, failStreak: 0, lastScanResult: 'PASS' },
  { workerId: 'W-104', workerName: 'Diana Evans', currentStatus: 'Active', liveScanCount: 156, failStreak: 0, lastScanResult: 'PASS' },
  { workerId: 'W-105', workerName: 'Ethan Hunt', currentStatus: 'Offline', liveScanCount: 45, failStreak: 0, lastScanResult: 'PASS' },
];

export const batchData = [
  { batchId: 'BATCH-A1', expectedPartNumber: 'IC-7400', totalScanned: 500, failRate: 2.4, timePerScanMs: 120 },
  { batchId: 'BATCH-B2', expectedPartNumber: 'IC-555', totalScanned: 350, failRate: 1.8, timePerScanMs: 115 },
  { batchId: 'BATCH-C3', expectedPartNumber: 'MCU-328', totalScanned: 120, failRate: 5.2, timePerScanMs: 145 },
];

export const performanceHistory = last7Days.map(day => ({
  date: day,
  passRate: 90 + Math.random() * 9,
  throughput: 1000 + Math.floor(Math.random() * 500)
}));
