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
    
    "form.step1.title": "Step 1: Basic Information",
    "form.step2.title": "Step 2: Application Type",
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
    "form.applicationType.preArranged": "Pre-arranged with a counselor",
    "form.applicationType.direct": "Direct application",
    
    "form.counselorName.label": "Counselor Name",
    "form.counselorName.hint": "Please enter the name of the counselor who referred you",
    
    "form.agreedSchedule.label": "Agreed Schedule",
    
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
    "form.agreement.confidentiality": "I understand that all conversations with peer counselors are confidential and will be kept private.",
    
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
    
    "error.nationalityRequired": "Please enter your country of residence",
    
    // Buttons
    "button.prev": "Previous",
    "button.next": "Next",
    "button.submit": "Complete Application",
    "button.addTime": "Add Time Slot",
    "button.delete": "Delete",
    "button.apply": "Apply",
    "button.applyNow": "Apply Now",
    
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
    
    // Messages
    "message.submitSuccess": "Application submitted successfully!",
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
    "form.step2.title": "2단계: 신청 유형",
    "form.step3.title": "3단계: 고민 영역 및 추가정보",
    "form.step4.title": "4단계: 동의 및 확인",
    
    "form.name": "이름",
    "form.studentId": "학번",
    "form.phone": "휴대전화 번호",
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
    "form.applicationType.preArranged": "미리 섭외된 상담자와 신청",
    "form.applicationType.direct": "직접 신청",
    
    "form.counselorName.label": "상담자 이름",
    "form.counselorName.hint": "미리 섭외해주신 상담자의 이름을 입력해주세요",
    
    "form.agreedSchedule.label": "약속된 상담 시간",
    
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
    "form.agreement.confidentiality": "또래상담자와의 모든 대화는 비밀로 유지되며 개인정보가 보호됨을 이해합니다.",
    
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
    
    "error.nationalityRequired": "거주 국가를 입력해주세요",
    
    // Buttons
    "button.prev": "뒤로",
    "button.next": "다음",
    "button.submit": "신청 완료",
    "button.addTime": "시간 추가",
    "button.delete": "삭제",
    "button.apply": "신청하기",
    "button.applyNow": "신청하기",
    
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
    
    // Messages
    "message.submitSuccess": "신청이 완료되었습니다!",
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
    "form.step2.title": "ステップ2：申請タイプ",
    "form.step3.title": "ステップ3：悩みの分野と追加情報",
    "form.step4.title": "ステップ4：同意と確認",
    
    "form.name": "名前",
    "form.studentId": "学番",
    "form.phone": "携帯電話番号",
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
    "form.applicationType.preArranged": "事前に紹介されたカウンセラーと申請",
    "form.applicationType.direct": "直接申請",
    
    "form.counselorName.label": "カウンセラー名",
    "form.counselorName.hint": "事前に紹介してくれたカウンセラーの名前を入力してください",
    
    "form.agreedSchedule.label": "約束されたカウンセリング時間",
    
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
    "form.agreement.confidentiality": "ピアカウンセラーとのすべての会話は機密扱いとなり、個人情報が保護されることを理解します。",
    
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
    "button.submit": "申請完了",
    "button.addTime": "時間を追加",
    "button.delete": "削除",
    "button.apply": "申請する",
    "button.applyNow": "申請する",
    
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
    
    // Messages
    "message.submitSuccess": "申請が完了しました！",
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
