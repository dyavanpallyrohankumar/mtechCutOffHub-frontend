/* ============================= */
/* Dashboard Summary Mock Data  */
/* ============================= */

export const dashboardSummaryMock = {
    totalColleges: 218,
    totalBranches: 1243,
    totalAllotments: 50231,
    activeYears: 5,
    lastImportDate: "2026-03-01T18:30:00",
    systemVersion: "1.2.0"
};

/* ============================= */
/* Year-wise Allotment Trend    */
/* ============================= */

export const yearlyTrendMock = [
    { year: 2021, count: 8200 },
    { year: 2022, count: 9450 },
    { year: 2023, count: 10120 },
    { year: 2024, count: 11240 },
    { year: 2025, count: 11321 },
];

/* ============================= */
/* Recent Activity Logs         */
/* ============================= */

export const recentActivityMock = [
    {
        id: 1,
        type: "IMPORT",
        message: "2025 Phase II allotment data imported successfully",
        createdAt: "2026-03-02T14:20:00"
    },
    {
        id: 2,
        type: "UPDATE",
        message: "RVCE – CSE cutoff updated for 2024",
        createdAt: "2026-03-02T12:05:00"
    },
    {
        id: 3,
        type: "CREATE",
        message: "New branch added: AI & ML – BMSCE",
        createdAt: "2026-03-01T18:10:00"
    },
    {
        id: 4,
        type: "VALIDATION",
        message: "Duplicate allotment records detected (3 entries)",
        createdAt: "2026-03-01T10:45:00"
    },
    {
        id: 5,
        type: "LOGIN",
        message: "Admin login from Chennai (IP: 103.xxx.xxx.12)",
        createdAt: "2026-02-28T21:14:00"
    }
];

/* ============================= */
/* Data Health Metrics          */
/* ============================= */

export const dataHealthMock = {
    missingCategories: 12,
    duplicateRecords: 3,
    unmappedBranches: 5,
    unverifiedAllotments: 18
};

/* ============================= */
/* System Info (Optional)       */
/* ============================= */

export const systemInfoMock = {
    databaseStatus: "CONNECTED",
    lastBackup: "2026-03-02T02:00:00",
    serverUptime: "4 days 12 hours",
    apiLatency: "124ms"
};