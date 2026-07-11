import * as XLSX from 'xlsx';

interface ApplicationData {
  id: number;
  studentName: string;
  studentId: string;
  phoneNumber: string;
  college: string;
  department: string;
  nationalityType: "local" | "international";
  nationality?: string | null;
  topics: string;
  storyDetails?: string | null;
  status: "pending" | "matched" | "cancelled";
  createdAt: Date;
  updatedAt?: Date;
  scale?: {
    id?: number;
    applicationId?: number;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

const STATUS_LABELS = {
  pending: "대기",
  matched: "매칭완료",
  cancelled: "취소",
};

const STATUS_LABELS_EN = {
  pending: "Pending",
  matched: "Matched",
  cancelled: "Cancelled",
};

/**
 * 신청 목록을 엑셀 파일로 내보내기
 */
export function exportApplicationsToExcel(applications: ApplicationData[]) {
  // 1. 요약 시트 생성
  const summaryData = [
    ["또래소담 프로그램 신청 현황"],
    [],
    ["통계"],
    ["전체 신청", applications.length],
    ["대기", applications.filter(a => a.status === "pending").length],
    ["매칭완료", applications.filter(a => a.status === "matched").length],
    ["취소", applications.filter(a => a.status === "cancelled").length],
  ];

  // 2. 신청 목록 시트 생성
  const listData = [
    [
      "신청ID",
      "이름",
      "학번",
      "연락처",
      "단과대학",
      "학과",
      "국적",
      "상담주제",
      "상태",
      "신청일",
      "척도검사-Q1",
      "척도검사-Q2",
      "척도검사-Q3",
      "척도검사-Q4",
      "척도검사-Q5",
      "평균점수",
    ],
    ...applications.map(app => [
      app.id,
      app.studentName,
      app.studentId,
      app.phoneNumber,
      app.college,
      app.department,
      app.nationalityType === "local" ? "국내" : `국외(${app.nationality})`,
      JSON.parse(app.topics).join(", "),
      STATUS_LABELS[app.status],
      new Date(app.createdAt).toLocaleDateString("ko-KR"),
      app.scale?.q1 || "-",
      app.scale?.q2 || "-",
      app.scale?.q3 || "-",
      app.scale?.q4 || "-",
      app.scale?.q5 || "-",
      app.scale
        ? (
            (app.scale.q1 + app.scale.q2 + app.scale.q3 + app.scale.q4 + app.scale.q5) /
            5
          ).toFixed(2)
        : "-",
    ]),
  ];

  // 3. 상세 정보 시트 생성
  const detailData: any[] = [];
  applications.forEach((app, index) => {
    if (index > 0) {
      detailData.push([]); // 신청자 간 빈 줄
    }
    detailData.push(["신청자 상세 정보"]);
    detailData.push(["이름", app.studentName]);
    detailData.push(["학번", app.studentId]);
    detailData.push(["연락처", app.phoneNumber]);
    detailData.push(["단과대학", app.college]);
    detailData.push(["학과", app.department]);
    detailData.push(["국적", app.nationalityType === "local" ? "국내" : `국외(${app.nationality})`]);
    detailData.push(["상담주제", JSON.parse(app.topics).join(", ")]);
    detailData.push(["상담 내용", app.storyDetails || "-"]);
    detailData.push(["상태", STATUS_LABELS[app.status]]);
    detailData.push(["신청일", new Date(app.createdAt).toLocaleDateString("ko-KR")]);
    if (app.scale) {
      detailData.push([]);
      detailData.push(["척도 검사 결과"]);
      detailData.push(["대학교 분위기 적응", app.scale.q1]);
      detailData.push(["고민 나눌 친구", app.scale.q2]);
      detailData.push(["학업 관심 및 만족", app.scale.q3]);
      detailData.push(["캠퍼스 활동 참여", app.scale.q4]);
      detailData.push(["전반적 대학생활 만족도", app.scale.q5]);
      detailData.push([
        "평균 점수",
        ((app.scale.q1 + app.scale.q2 + app.scale.q3 + app.scale.q4 + app.scale.q5) / 5).toFixed(2),
      ]);
    }
  });

  // 4. 워크북 생성 및 시트 추가
  const workbook = XLSX.utils.book_new();

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, "요약");

  const listSheet = XLSX.utils.aoa_to_sheet(listData);
  // 헤더 스타일 설정
  const headerRange = XLSX.utils.decode_range(listSheet['!ref'] || 'A1');
  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (listSheet[cellAddress]) {
      listSheet[cellAddress].s = {
        fill: { fgColor: { rgb: "FFD3D3D3" } },
        font: { bold: true },
      };
    }
  }
  XLSX.utils.book_append_sheet(workbook, listSheet, "신청목록");

  const detailSheet = XLSX.utils.aoa_to_sheet(detailData);
  XLSX.utils.book_append_sheet(workbook, detailSheet, "상세정보");

  // 5. 파일 다운로드
  const fileName = `또래소담_신청현황_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
