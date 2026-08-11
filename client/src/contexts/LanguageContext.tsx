import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ko" | "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.title": "Peers Program",
    "nav.back": "Back",
    
    // Home page
    "home.hero.title": "Apply for Peer Friend",
    "home.hero.subtitle": "Share your concerns about school life, relationships, and career with Peers counselors in a comfortable environment.",
    "home.hero.desc": "This page is for applying to participate in the Peers program as a peer friend.",
    "home.features.title": "What is the Peers Program?",
    "home.features.feature1.title": "1:1 Peer Counseling / Group Activities",
    "home.features.feature1.desc": "1:1 Peer Counseling: You will be matched 1:1 with a peer counselor for counseling sessions. Group Activities: Participate in group activities with a small group of peer counselors.",
    "home.features.feature2.title": "Concerns About School Life and Daily Life",
    "home.features.feature2.desc": "Share everyday concerns about academics, relationships, and career.",
    "home.features.feature3.title": "5 Points for Non-Curricular Activities",
    "home.features.feature3.desc": "Participants in the Peers program receive 5 points for non-curricular activities.",
    "home.process.title": "Application Process",
    "home.process.step1.title": "Enter Basic Information",
    "home.process.step1.desc": "Enter your name, student ID, department, and contact information.",
    "home.process.step2.title": "Reason for Application",
    "home.process.step2.desc": "Select whether you were referred by a peer counselor or applying directly.",
    "home.process.step3.title": "Complete Application",
    "home.process.step3.desc": "Agree to the terms and complete your application.",
    "home.cta.title": "Apply Now",
    "home.cta.subtitle": "After applying, our staff will contact you to match you with a peer counselor.",
    "footer.copyright": "",
    
    // Application form
    "form.title": "Peer Counselor Application",
    "form.subtitle": "Apply to become a peer counselor for the Peers program",
    "form.password": "Password",
    
    "form.step1.title": "Step 1: Basic Information",
    "form.step2.title": "Step 2: Reason for Application",
    "form.step3.title": "Step 3: Concerns & Additional Info",
    "form.step4.title": "Step 4: Agreements & Confirmation",
    
    "form.name": "Name",
    "form.studentId": "Student ID",
    "form.phone": "Phone Number",
    "form.college": "College",
    "form.department": "Department",
    "form.gender": "Gender",
    "form.gender.male": "Male",
    "form.gender.female": "Female",
    "form.grade": "Grade",
    "form.grade.1": "1st Year",
    "form.grade.2": "2nd Year",
    "form.grade.3": "3rd Year",
    "form.grade.4": "4th Year",
    
    "form.applicationType.label": "Application Type",
    "form.applicationType.preArranged": "Recommended by Peer Counselor",
    "form.applicationType.direct": "Self-initiated Application",
    
    "form.counselorName.label": "Counselor Name",
    "form.counselorName.hint": "Please enter the name of the peer counselor you will work with.",
    
    "form.agreedSchedule.label": "If you have an agreed time, please note it.",
    
    "form.availableTime.label": "Available Times",
    "form.availableTime.hint": "Please select the days and times you are available for counseling",
    
    "form.day.monday": "Monday",
    "form.day.tuesday": "Tuesday",
    "form.day.wednesday": "Wednesday",
    "form.day.thursday": "Thursday",
    "form.day.friday": "Friday",
    
    "form.topics.label": "Concerns (Select all that apply)",
    "form.topics.relationships": "Relationships",
    "form.topics.dating": "Dating",
    "form.topics.family": "Family",
    "form.topics.academics": "Academics",
    "form.topics.career": "Career",
    "form.topics.adaptation": "University Adjustment",
    "form.topics.stress": "Stress",
    "form.topics.loneliness": "Loneliness",
    "form.topics.confidence": "Confidence",
    "form.topics.other": "Other",
    "form.topics.unknown": "Not sure yet",
    
    "form.additionalMessage.label": "Additional Message",
    "form.additionalMessage.hint": "Please share any additional information about your concerns or yourself",
    
    "form.optional": "Optional",
    "form.confirmInfo": "Confirmation of Information",
    
    "form.nationality.label": "Nationality",
    "form.nationality.domestic": "Domestic Student",
    "form.nationality.international": "International Student",
    "form.nationality.input": "Country of Residence",
    
    "form.agreement.privacy": "I agree to the collection and use of personal information. The collected information will be used only for the operation of the Peers program and matching purposes, and will be protected according to relevant laws and regulations. I understand that peer counselors are not professional counselors but have received peer counseling training, and in crisis situations, I may be referred to the Student Counseling Center.",
    "form.agreement.confidentiality": "I understand that all conversations with peer counselors are confidential and will be kept private. However, confidentiality may not be maintained if there is a risk of harm to myself or others.",
    
    // Placeholders
    "placeholder.name": "Enter your full name",
    "placeholder.studentId": "e.g., 202612345",
    "placeholder.phone": "e.g., 010-1234-5678",
    "placeholder.selectCollege": "Select your college",
    "placeholder.department": "Enter your department name",
    "placeholder.selectGrade": "Select your grade",
    "placeholder.counselorName": "Enter counselor name",
    "placeholder.agreedSchedule": "e.g., Monday 2:00 PM - 3:00 PM",
    "placeholder.day": "Select day",
    "placeholder.additionalMessage": "Share your thoughts or concerns...",
    "placeholder.nationality": "e.g., China, Japan, USA",
    "placeholder.password": "Enter password",
    
    "error.nationalityRequired": "Please enter your country of residence",
    
    // Buttons
    "button.prev": "Previous",
    "button.next": "Next",
    "button.submit": "Complete Application",
    "button.submitting": "Submitting...",
    "button.home": "Back to Home",
    "button.applyAgain": "Apply Again",
    "button.addTime": "Add Time Slot",
    "button.delete": "Delete",
    "button.apply": "Apply",
    "button.applyNow": "Apply Now",
    "button.exportExcel": "Export to Excel",
    "button.exporting": "Exporting...",
    "button.view": "View",
    "button.admin": "Admin",
    "button.login": "Login",
    "button.loggingIn": "Logging in...",
    "button.cancel": "Cancel",
    
    // Errors
    "error.nameRequired": "Please enter your name",
    "error.studentIdRequired": "Please enter your student ID",
    "error.phoneRequired": "Please enter your phone number",
    "error.collegeRequired": "Please select your college",
    "error.departmentRequired": "Please enter your department",
    "error.genderRequired": "Please select your gender",
    "error.gradeRequired": "Please select your grade",
    "error.applicationTypeRequired": "Please select an application type",
    "error.counselorNameRequired": "Please enter the counselor name",
    "error.availableTimeRequired": "Please add at least one available time slot",
    "error.topicsRequired": "Please select at least one concern",
    "error.privacyRequired": "Please agree to the privacy policy",
    "error.confidentialityRequired": "Please agree to the confidentiality agreement",
    "error.auccqRequired": "Please answer all AUCCQ questions",
    "error.submitFailed": "Failed to submit the application",
    "error.exportFailed": "Failed to export data",
    "error.passwordRequired": "Please enter password",
    "error.invalidPassword": "Invalid password",
    "error.loginFailed": "Login failed",
    
    // Messages
    "message.submitSuccess": "Application submitted successfully!",
    "message.submitSuccessDesc": "Your application has been successfully submitted. We will contact you soon.",
    "message.nextSteps": "Next Steps",
    "message.adminLoginSuccess": "Admin login successful",
    "message.step1": "Step 1: We will review your application.",
    "message.step2": "Step 2: We will match you with an appropriate peer counselor.",
    "message.step3": "Step 3: The counselor will contact you to schedule your first meeting.",
    "message.step4": "Step 4: The peer counseling program will begin.",
    
    // AUCCQ Scale (Step 5)
    "form.step5.title": "Step 5: University Life Adaptation Scale",
    "form.auccq.label": "University Life Adaptation Scale (AUCCQ)",
    "form.auccq.instruction": "Please rate your agreement with each statement on a scale of 1 to 5.",
    "form.auccq.scale.1": "Strongly Disagree",
    "form.auccq.scale.2": "Disagree",
    "form.auccq.scale.3": "Neutral",
    "form.auccq.scale.4": "Agree",
    "form.auccq.scale.5": "Strongly Agree",
    "form.auccq.q1": "I am satisfied with my current academic performance.",
    "form.auccq.q2": "I have good relationships with my classmates.",
    "form.auccq.q3": "I feel confident in my ability to handle university coursework.",
    "form.auccq.q4": "I have found my sense of purpose at university.",
    "form.auccq.q5": "I feel comfortable participating in class discussions.",
    "form.auccq.q6": "I have a good balance between academics and personal life.",
    "form.auccq.q7": "I feel supported by my friends and peers.",
    "form.auccq.q8": "I am satisfied with my social life at university.",
    "form.auccq.q9": "I feel motivated to attend classes.",
    "form.auccq.q10": "I have adapted well to university life.",
    "form.auccq.q11": "I feel stressed about my studies.",
    "form.auccq.q12": "I have difficulty making new friends.",
    "form.auccq.q13": "I feel lonely at university.",
    "form.auccq.q14": "I struggle with time management.",
    "form.auccq.q15": "I feel anxious about my future career.",
    "form.auccq.q16": "I have experienced homesickness.",
    "form.auccq.q17": "I feel overwhelmed by university expectations.",
    "form.auccq.q18": "I have difficulty concentrating on my studies.",
    "form.auccq.q19": "I feel confident about my decision to attend this university.",
    "form.auccq.q20": "I would recommend this university to others.",
    
    // Admin Dashboard
    "admin.title": "Admin Dashboard",
    "admin.description": "Manage peer counselor applications",
    "admin.applications": "Applications",
    "admin.applicationsDesc": "View and manage all submitted applications",
    "admin.noApplications": "No applications found",
    "admin.applicationDetail": "Application Details",
    "admin.status": "Status",
    "admin.submittedAt": "Submitted At",
    "status.pending": "Pending",
    "status.matched": "Matched",
    "status.cancelled": "Cancelled",
    "table.id": "ID",
    "table.studentName": "Student Name",
    "table.college": "College",
    "table.applicationType": "Application Type",
    "table.status": "Status",
    "table.submittedAt": "Submitted At",
    "table.actions": "Actions",
    "placeholder.notAvailable": "N/A",
  },
  
  ko: {
    // Navigation
    "nav.title": "또래소담 프로그램",
    "nav.back": "뒤로",
    
    // Home page
    "home.hero.title": "또래친구 신청하기",
    "home.hero.subtitle": "학교생활, 인간관계, 진로 등 대학생활의 고민을 또래상담자와 편안하게 나누세요.",
    "home.hero.desc": "이 페이지는 또래소담 프로그램의 또래친구로 참여하기 위한 신청 페이지입니다.",
    "home.features.title": "또래소담 프로그램이란?",
    "home.features.feature1.title": "또래상담자와 1:1 상담 / 집단활동 진행",
    "home.features.feature1.desc": "1:1 또래상담/집단활동 진행: 진행될 프로그램 관련 사항은 또래상담자가 연락드릴 예정입니다.",
    "home.features.feature2.title": "학교생활과 일상의 고민",
    "home.features.feature2.desc": "학업, 인간관계, 진로 등 일상의 고민을 편하게 나눌 수 있습니다.",
    "home.features.feature3.title": "비교과 점수 5점 부여",
    "home.features.feature3.desc": "또래소담 프로그램 참여자에게 비교과 점수 5점을 부여합니다.",
    "home.process.title": "신청 절차",
    "home.process.step1.title": "기본정보 입력",
    "home.process.step1.desc": "이름, 학번, 학과, 연락처 등 기본정보를 입력합니다.",
    "home.process.step2.title": "활동 신청 계기",
    "home.process.step2.desc": "또래상담자의 권유/추천인지, 자발적 신청(직접 신청)인지 선택합니다.",
    "home.process.step3.title": "신청 완료",
    "home.process.step3.desc": "약관에 동의하고 신청을 완료합니다.",
    "home.cta.title": "지금 신청하기",
    "home.cta.subtitle": "신청 후 담당자가 연락하여 또래상담자와 매칭해 드릴 예정입니다.",
    "footer.copyright": "",
    
    // Application form
    "form.title": "또래친구 신청하기",
    "form.subtitle": "또래소담 프로그램의 또래친구로 신청해주세요",
    
    "form.step1.title": "1단계: 기본정보",
    "form.step2.title": "2단계: 활동 신청 계기",
    "form.step3.title": "3단계: 고민 영역 및 추가정보",
    "form.step4.title": "4단계: 동의 및 확인",
    
    "form.name": "이름",
    "form.studentId": "학번",
    "form.phone": "전화번호",
    "form.college": "단과대학",
    "form.department": "학과",
    "form.gender": "성별",
    "form.gender.male": "남성",
    "form.gender.female": "여성",
    "form.grade": "학년",
    "form.grade.1": "1학년",
    "form.grade.2": "2학년",
    "form.grade.3": "3학년",
    "form.grade.4": "4학년",
    
    "form.applicationType.label": "신청 유형",
    "form.applicationType.preArranged": "또래상담자의 권유/추천으로 신청",
    "form.applicationType.direct": "자발적 신청(직접 신청)",
    
    "form.counselorName.label": "상담자 이름",
    "form.counselorName.hint": "함께 활동을 진행할 또래상담자의 이름을 입력해주세요.",
    
    "form.agreedSchedule.label": "약속된 시간이 있다면 적어주세요.",
    
    "form.availableTime.label": "상담 가능 시간",
    "form.availableTime.hint": "상담 가능한 요일과 시간을 선택해주세요",
    
    "form.day.monday": "월요일",
    "form.day.tuesday": "화요일",
    "form.day.wednesday": "수요일",
    "form.day.thursday": "목요일",
    "form.day.friday": "금요일",
    
    "form.topics.label": "고민 영역 (복수 선택 가능)",
    "form.topics.relationships": "대인관계",
    "form.topics.dating": "연애",
    "form.topics.family": "가족",
    "form.topics.academics": "학업",
    "form.topics.career": "진로",
    "form.topics.adaptation": "대학생활 적응",
    "form.topics.stress": "스트레스",
    "form.topics.loneliness": "외로움",
    "form.topics.confidence": "자신감",
    "form.topics.other": "기타",
    "form.topics.unknown": "아직 잘 모르겠어요",
    
    "form.additionalMessage.label": "추가 메시지",
    "form.additionalMessage.hint": "고민이나 자신에 대해 추가로 나누고 싶은 이야기가 있으면 적어주세요",
    
    "form.optional": "선택사항",
    "form.confirmInfo": "신청 정보 확인",
    
    "form.nationality.label": "국적",
    "form.nationality.domestic": "내국인",
    "form.nationality.international": "유학생",
    "form.nationality.input": "거주 국가",
    
    "form.agreement.privacy": "개인정보 수집 및 이용에 동의합니다. 수집된 정보는 또래소담 프로그램 운영 및 매칭 목적으로만 사용되며, 관련 법규에 따라 보호됩니다. 또래상담자는 전문상담자가 아닌 또래상담교육을 받은 또래상담자이며, 위기상황에는 학생상담센터와 연계될 수 있음을 이해합니다.",
    "form.agreement.confidentiality": "또래상담자와의 모든 대화는 비밀로 유지되나, 자신이나 타인을 해할 위험이 있을 경우 비밀보장에서 예외됩니다.",
    
    // Placeholders
    "placeholder.name": "이름을 입력해주세요",
    "placeholder.studentId": "예: 202612345",
    "placeholder.phone": "예: 010-1234-5678",
    "placeholder.selectCollege": "단과대학을 선택해주세요",
    "placeholder.department": "학과명을 입력해주세요",
    "placeholder.selectGrade": "학년을 선택해주세요",
    "placeholder.counselorName": "상담자 이름을 입력해주세요",
    "placeholder.agreedSchedule": "예: 월요일 오후 2시 ~ 3시",
    "placeholder.day": "요일을 선택해주세요",
    "placeholder.additionalMessage": "고민이나 생각을 자유롭게 적어주세요...",
    "placeholder.nationality": "예: 중국, 일본, 미국",
    "placeholder.password": "비밀번호를 입력해주세요",
    
    "error.nationalityRequired": "거주 국가를 입력해주세요",
    
    // Buttons
    "button.prev": "이전",
    "button.next": "다음",
    "button.home": "홈으로 돌아가기",
    "button.applyAgain": "다시 신청하기",
    "button.submit": "신청 완료",
    "button.submitting": "제출 중...",
    "button.addTime": "시간 추가",
    "button.delete": "삭제",
    "button.apply": "신청하기",
    "button.applyNow": "신청하기",
    "button.exportExcel": "엑셀로 다운로드",
    "button.exporting": "다운로드 중...",
    "button.view": "보기",
    "button.admin": "관리자",
    "button.login": "로그인",
    "button.loggingIn": "로그인 중...",
    "button.cancel": "취소",
    
    // Errors
    "error.nameRequired": "이름을 입력해주세요",
    "error.studentIdRequired": "학번을 입력해주세요",
    "error.phoneRequired": "휴대전화 번호를 입력해주세요",
    "error.collegeRequired": "단과대학을 선택해주세요",
    "error.departmentRequired": "학과를 입력해주세요",
    "error.genderRequired": "성별을 선택해주세요",
    "error.gradeRequired": "학년을 선택해주세요",
    "error.applicationTypeRequired": "신청 유형을 선택해주세요",
    "error.counselorNameRequired": "상담자 이름을 입력해주세요",
    "error.availableTimeRequired": "상담 가능 시간을 최소 하나 추가해주세요",
    "error.topicsRequired": "고민 영역을 최소 하나 선택해주세요",
    "error.privacyRequired": "개인정보 수집 및 이용에 동의해주세요",
    "error.confidentialityRequired": "비밀보장 약관에 동의해주세요",
    "error.auccqRequired": "AUCCQ 모든 문항에 답변해주세요",
    "error.submitFailed": "신청 제출에 실패했습니다",
    "error.exportFailed": "데이터 내보내기에 실패했습니다",
    "error.passwordRequired": "비밀번호를 입력해주세요",
    "error.invalidPassword": "비밀번호가 잘못되었습니다",
    "error.loginFailed": "로그인에 실패했습니다",
    
    // Messages
    "message.submitSuccess": "신청이 완료되었습니다!",
    "message.submitSuccessDesc": "신청이 성공적으로 완료되었습니다. 곧 담당자가 연락드리겠습니다.",
    "message.nextSteps": "다음 단계",
    "message.step1": "1단계: 담당자가 귀하의 신청을 검토합니다.",
    "message.step2": "2단계: 적절한 또래상담자와 매칭됩니다.",
    "message.step3": "3단계: 상담자가 연락하여 첫 만남을 예약합니다.",
    "message.step4": "4단계: 또래상담 프로그램이 시작됩니다.",
    
    // AUCCQ Scale (Step 5)
    "form.step5.title": "5단계: 대학생활적응 척도",
    "form.auccq.label": "대학생활적응 척도 (AUCCQ)",
    "form.auccq.instruction": "각 문항에 대해 1~5점 중 해당하는 점수를 선택해주세요.",
    "form.auccq.scale.1": "전혀 그렇지 않다",
    "form.auccq.scale.2": "그렇지 않다",
    "form.auccq.scale.3": "보통이다",
    "form.auccq.scale.4": "그렇다",
    "form.auccq.scale.5": "매우 그렇다",
    "form.auccq.q1": "나는 현재 학업 성적에 만족한다.",
    "form.auccq.q2": "나는 반 친구들과 좋은 관계를 유지하고 있다.",
    "form.auccq.q3": "나는 대학 과정을 처리할 수 있는 능력에 자신감이 있다.",
    "form.auccq.q4": "나는 대학에서 내 목적의식을 찾았다.",
    "form.auccq.q5": "나는 수업 토론에 참여하는 것이 편하다.",
    "form.auccq.q6": "나는 학업과 개인 생활 사이의 균형을 잘 유지하고 있다.",
    "form.auccq.q7": "나는 친구와 또래 친구들의 지원을 받고 있다고 느낀다.",
    "form.auccq.q8": "나는 대학의 사회생활에 만족한다.",
    "form.auccq.q9": "나는 수업에 참석하고 싶은 동기가 있다.",
    "form.auccq.q10": "나는 대학생활에 잘 적응했다고 생각한다.",
    "form.auccq.q11": "나는 학업으로 인한 스트레스를 받고 있다.",
    "form.auccq.q12": "나는 새로운 친구를 사귀기 어렵다.",
    "form.auccq.q13": "나는 대학에서 외로움을 느낀다.",
    "form.auccq.q14": "나는 시간 관리에 어려움을 겪고 있다.",
    "form.auccq.q15": "나는 미래 진로에 대해 불안감을 느낀다.",
    "form.auccq.q16": "나는 향수병을 경험했다.",
    "form.auccq.q17": "나는 대학의 기대감에 압도당한다고 느낀다.",
    "form.auccq.q18": "나는 학업에 집중하기 어렵다.",
    "form.auccq.q19": "나는 이 대학에 다니기로 한 결정에 자신감이 있다.",
    "form.auccq.q20": "나는 이 대학을 다른 사람에게 추천하고 싶다.",
    
    // Admin Dashboard
    "admin.title": "관리자 대시보드",
    "admin.description": "또래친구 신청 관리",
    "admin.applications": "신청서",
    "admin.applicationsDesc": "제출된 모든 신청서를 보고 관리합니다",
    "admin.noApplications": "신청서가 없습니다",
    "admin.applicationDetail": "신청서 상세정보",
    "admin.status": "상태",
    "admin.submittedAt": "제출 시간",
    "status.pending": "검토 중",
    "status.matched": "매칭 완료",
    "status.cancelled": "취소됨",
    "table.id": "ID",
    "table.studentName": "학생명",
    "table.college": "단과대학",
    "table.applicationType": "신청 유형",
    "table.status": "상태",
    "table.submittedAt": "제출 시간",
    "table.actions": "작업",
    "placeholder.notAvailable": "N/A",
  },
  
  ja: {
    // Navigation
    "nav.title": "ピアプログラム",
    "nav.back": "戻る",
    
    // Home page
    "home.hero.title": "ピアフレンドに申請してください",
    "home.hero.subtitle": "学校生活、人間関係、キャリアなど、大学生活の悩みをピアカウンセラーと気軽に共有しましょう。",
    "home.hero.desc": "このページはピアプログラムのピアフレンドとして参加するための申請ページです。",
    "home.features.title": "ピアプログラムとは？",
    "home.features.feature1.title": "1:1ピアカウンセリング / 集団活動の実施",
    "home.features.feature1.desc": "ピアプログラムのピアカウンセラーと1:1でマッチングされ、カウンセリングを受けます。",
    "home.features.feature2.title": "学校生活と日常の悩み",
    "home.features.feature2.desc": "学業、人間関係、キャリアなど、日常の悩みを気軽に共有できます。",
    "home.features.feature3.title": "課外活動ポイント5点付与",
    "home.features.feature3.desc": "ピアプログラム参加者に課外活動ポイント5点を付与します。",
    "home.process.title": "申請手順",
    "home.process.step1.title": "基本情報の入力",
    "home.process.step1.desc": "名前、学番、学科、連絡先などの基本情報を入力します。",
    "home.process.step2.title": "申請タイプの選択",
    "home.process.step2.desc": "事前に紹介されたカウンセラーがいるかどうかを選択します。",
    "home.process.step3.title": "申請完了",
    "home.process.step3.desc": "利用規約に同意して申請を完了します。",
    "home.cta.title": "今すぐ申請",
    "home.cta.subtitle": "申請後、担当者が連絡してピアカウンセラーとマッチングさせていただく予定です。",
    "footer.copyright": "© 2026 ピアプログラム。著作権所有。",
    
    // Application form
    "form.title": "ピアフレンド申請",
    "form.subtitle": "ピアプログラムのピアフレンドとして申請してください",
    
    "form.step1.title": "ステップ1：基本情報",
    "form.step2.title": "ステップ2：活動申請の理由",
    "form.step3.title": "ステップ3：悩みの分野と追加情報",
    "form.step4.title": "ステップ4：同意と確認",
    
    "form.name": "名前",
    "form.studentId": "学番",
    "form.phone": "電話番号",
    "form.college": "学部",
    "form.department": "学科",
    "form.gender": "性別",
    "form.gender.male": "男性",
    "form.gender.female": "女性",
    "form.grade": "学年",
    "form.grade.1": "1年生",
    "form.grade.2": "2年生",
    "form.grade.3": "3年生",
    "form.grade.4": "4年生",
    
    "form.applicationType.label": "申請タイプ",
    "form.applicationType.preArranged": "ピアカウンセラーの推奨で申請",
    "form.applicationType.direct": "自発的に申請（直接申請）",
    
    "form.counselorName.label": "カウンセラー名",
    "form.counselorName.hint": "一緒に活動を進めるピアカウンセラーの名前を入力してください。",
    
    "form.agreedSchedule.label": "約束された時間があれば記してください。",
    
    "form.availableTime.label": "カウンセリング可能時間",
    "form.availableTime.hint": "カウンセリング可能な曜日と時間を選択してください",
    
    "form.day.monday": "月曜日",
    "form.day.tuesday": "火曜日",
    "form.day.wednesday": "水曜日",
    "form.day.thursday": "木曜日",
    "form.day.friday": "金曜日",
    
    "form.topics.label": "悩みの分野（複数選択可）",
    "form.topics.relationships": "人間関係",
    "form.topics.dating": "恋愛",
    "form.topics.family": "家族",
    "form.topics.academics": "学業",
    "form.topics.career": "キャリア",
    "form.topics.adaptation": "大学生活への適応",
    "form.topics.stress": "ストレス",
    "form.topics.loneliness": "孤独感",
    "form.topics.confidence": "自信",
    "form.topics.other": "その他",
    "form.topics.unknown": "まだわかりません",
    
    "form.additionalMessage.label": "追加メッセージ",
    "form.additionalMessage.hint": "悩みや自分自身について、さらに共有したいことがあれば記入してください",
    
    "form.optional": "オプション",
    "form.confirmInfo": "申請情報の確認",
    
    "form.nationality.label": "国籍",
    "form.nationality.domestic": "国内学生",
    "form.nationality.international": "留学生",
    "form.nationality.input": "居住国",
    
    "form.agreement.privacy": "個人情報の収集と使用に同意します。収集された情報はピアプログラムの運営とマッチング目的でのみ使用され、関連法規に従って保護されます。ピアカウンセラーは専門のカウンセラーではなく、ピアカウンセリング研修を受けたピアカウンセラーであり、危機的状況では学生相談センターと連携される可能性があることを理解します。",
    "form.agreement.confidentiality": "ピアカウンセラーとのすべての会話は機密扱いとなり、個人情報が保護されることを理解します。ただし、自分自身または他者を害するおそれがある場合、機密保持は例外となる場合があります。",
    
    // Placeholders
    "placeholder.name": "名前を入力してください",
    "placeholder.studentId": "例：202612345",
    "placeholder.phone": "例：090-1234-5678",
    "placeholder.selectCollege": "学部を選択してください",
    "placeholder.department": "学科名を入力してください",
    "placeholder.selectGrade": "学年を選択してください",
    "placeholder.counselorName": "カウンセラー名を入力してください",
    "placeholder.agreedSchedule": "例：月曜日 午後2時～3時",
    "placeholder.day": "曜日を選択してください",
    "placeholder.additionalMessage": "悩みや考えを自由に記入してください...",
    "placeholder.nationality": "例：中国、日本、アメリカ",
    
    "error.nationalityRequired": "居住国を入力してください",
    
    // Buttons
    "button.prev": "戻る",
    "button.next": "次へ",
    "button.home": "ホームに戻る",
    "button.applyAgain": "もう一度申請する",
    "button.submit": "申請完了",
    "button.submitting": "送信中...",
    "button.addTime": "時間を追加",
    "button.delete": "削除",
    "button.apply": "申請する",
    "button.applyNow": "今すぐ申請する",
    "button.exportExcel": "Excelにエクスポート",
    "button.exporting": "エクスポート中...",
    "button.view": "表示",
    "button.admin": "管理者",
    "button.login": "ログイン",
    "button.loggingIn": "ログイン中...",
    "button.cancel": "キャンセル",
    
    // Errors
    "error.nameRequired": "名前を入力してください",
    "error.studentIdRequired": "学番を入力してください",
    "error.phoneRequired": "携帯電話番号を入力してください",
    "error.collegeRequired": "学部を選択してください",
    "error.departmentRequired": "学科を入力してください",
    "error.genderRequired": "性別を選択してください",
    "error.gradeRequired": "学年を選択してください",
    "error.applicationTypeRequired": "申請タイプを選択してください",
    "error.counselorNameRequired": "カウンセラー名を入力してください",
    "error.availableTimeRequired": "カウンセリング可能時間を最低1つ追加してください",
    "error.topicsRequired": "悩みの分野を最低1つ選択してください",
    "error.privacyRequired": "個人情報の収集と使用に同意してください",
    "error.confidentialityRequired": "秘密保持契約に同意してください",
    "error.auccqRequired": "AUCCQのすべての訪問に答えてください",
    "error.submitFailed": "申請の送信に失敗しました",
    "error.exportFailed": "データのエクスポートに失敗しました",
    "error.passwordRequired": "パスワードを入力してください",
    "error.invalidPassword": "パスワードが間違っています",
    "error.loginFailed": "ログインに失敗しました",
    
    // Messages
    "message.submitSuccess": "申請が完了しました！",
    "message.submitSuccessDesc": "申請が正常に完了しました。もうすぐ担当者から連絡させていただきます。",
    "message.nextSteps": "次のステップ",
    "message.step1": "ステップ 1: 担当者が申請を確認します。",
    "message.step2": "ステップ 2: 適切なピアカウンセラーとマッチングします。",
    "message.step3": "ステップ 3: カウンセラーが連絡して初回面談を予約します。",
    "message.step4": "ステップ 4: ピアカウンセリングプログラムが開始します。",
    
    // AUCCQ Scale (Step 5)
    "form.step5.title": "ステップ5：大学生活適応尺度",
    "form.auccq.label": "大学生活適応尺度（AUCCQ）",
    "form.auccq.instruction": "各項目について、1～5点の中から該当する点数を選択してください。",
    "form.auccq.scale.1": "全く同意しない",
    "form.auccq.scale.2": "同意しない",
    "form.auccq.scale.3": "どちらでもない",
    "form.auccq.scale.4": "同意する",
    "form.auccq.scale.5": "非常に同意する",
    "form.auccq.q1": "私は現在の学業成績に満足している。",
    "form.auccq.q2": "私はクラスメートと良好な関係を保っている。",
    "form.auccq.q3": "私は大学の課程に対処できる能力に自信がある。",
    "form.auccq.q4": "私は大学での自分の目的を見つけた。",
    "form.auccq.q5": "私は授業での議論に参加することが快適である。",
    "form.auccq.q6": "私は学業と個人生活のバランスを上手く保っている。",
    "form.auccq.q7": "私は友人や同級生からのサポートを感じている。",
    "form.auccq.q8": "私は大学での社会生活に満足している。",
    "form.auccq.q9": "私は授業に参加したいというモチベーションがある。",
    "form.auccq.q10": "私は大学生活に上手く適応していると思う。",
    "form.auccq.q11": "私は学業によるストレスを感じている。",
    "form.auccq.q12": "私は新しい友人を作ることが難しい。",
    "form.auccq.q13": "私は大学で孤独を感じている。",
    "form.auccq.q14": "私は時間管理に困難を感じている。",
    "form.auccq.q15": "私は将来のキャリアについて不安を感じている。",
    "form.auccq.q16": "私はホームシックを経験した。",
    "form.auccq.q17": "私は大学の期待に圧倒されていると感じている。",
    "form.auccq.q18": "私は学業に集中することが難しい。",
    "form.auccq.q19": "私はこの大学に通うという決断に自信がある。",
    "form.auccq.q20": "私はこの大学を他の人にお劧めしたい。",
    
    // Admin Dashboard
    "admin.title": "管理者ダッシュボード",
    "admin.description": "ピアカウンセラー申請を管理",
    "admin.applications": "申請",
    "admin.applicationsDesc": "すべての提出された申請を表示および管理",
    "admin.noApplications": "申請が見つかりません",
    "admin.applicationDetail": "申請の詳細",
    "admin.status": "ステータス",
    "admin.submittedAt": "提出日時",
    "status.pending": "保留中",
    "status.matched": "マッチ済み",
    "status.cancelled": "キャンセル済み",
    "table.id": "ID",
    "table.studentName": "学生名",
    "table.college": "学部",
    "table.applicationType": "申請タイプ",
    "table.status": "ステータス",
    "table.submittedAt": "提出日時",
    "table.actions": "アクション",
    "placeholder.notAvailable": "N/A",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "ko";
    const saved = localStorage.getItem("language") as Language;
    return saved || "ko";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}


// Note: Additional translation keys needed for SubmissionSuccess page:
// - button.home: "Home" / "홈" / "ホーム"
// - button.applyAgain: "Apply Again" / "다시 신청하기" / "もう一度申請する"

// Note: Additional translation keys needed:
// - error.submitFailed: "Failed to submit application" / "신청 제출 실패" / "申請の送信に失敗しました"
// - button.submitting: "Submitting..." / "제출 중..." / "送信中..."
