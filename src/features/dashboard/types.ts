// src/features/dashboard/types.ts

export interface StudentDashboardData {
  attendancePercentage: number;
  paymentStatus: {
    totalPaid: number;
    remainingBalance: number;
    currency: string;
    isUpToDate: boolean;
  };
  upcomingCourses: Array<{
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    location: string;
    instructorName: string;
  }>;
  unreadNotifications: number;
}

export interface TeacherDashboardData {
  coursesStats: Array<{
    id: string;
    title: string;
    studentCount: number;
    averageAttendance: number;
  }>;
  recentAttendance: Array<{
    sessionId: string;
    courseTitle: string;
    date: string;
    presentCount: number;
    totalCount: number;
  }>;
}

export interface AttendanceRecord {
  studentName: string;
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedAt: string;
}
