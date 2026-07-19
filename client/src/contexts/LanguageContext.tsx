import { createContext, useContext, useState, ReactNode, useEffect } from "react";

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
    "home.hero.title": "Peers: Your Supportive Companion in University Life",
    "home.hero.subtitle": "Share your concerns about school life, relationships, and career with Peers counselors in a comfortable environment.",
    "home.hero.desc": "This page is for applying to participate in the Peers program as a peer friend.",
    "home.features.title": "What is the Peers Program?",
    "home.features.feature1.title": "1:1 Matching with Peer Counselors",
    "home.features.feature1.desc": "You will be matched 1:1 with a peer counselor from the Peers program for counseling sessions.",
    "home.features.feature2.title": "Concerns About School Life and Daily Life",
    "home.features.feature2.desc": "Share everyday concerns about academics, relationships, and career.",
    "home.features.feature3.title": "5 Points for Non-Curricular Activities",
    "home.features.feature3.desc": "Participants in the Peers program receive 5 points for non-curricular activities.",
    "home.process.title": "Application Process",
    "home.process.step1.title": "Enter Basic Information",
    "home.process.step1.desc": "Enter your name, student ID, department, and contact information.",
    "home.process.step2.title": "Select Application Type",
    "home.process.step2.desc": "Choose whether you have a predetermined counselor or not.",
    "home.process.step3.title": "Complete Application",
    "home.process.step3.desc": "Agree to the terms and complete your application.",
    "home.cta.title": "Apply Now",
    "home.cta.subtitle": "After applying, our staff will contact you to match you with a peer counselor.",
    "footer.copyright": "© 2026 Peers Program. All rights reserved.",
    
    // Application form
    "step.1.title": "Basic Information",
    "step.1.desc": "Please enter your basic information.",
    "step.2.title": "Application Type",
    "step.2.desc": "Please select your application type.",
    "step.3.title": "Concerns & Additional Info",
    "step.3.desc": "Please select your concerns.",
    "step.4.title": "University Adaptation Scale",
    "step.4.desc": "Please rate your adaptation.",
    "step.5.title": "Consent & Agreement",
    "step.5.desc": "Please review and agree to the terms.",
    
    "form.name": "Name",
    "form.studentId": "Student ID",
    "form.phone": "Phone",
    "form.college": "College",
    "form.collegeOther": "Enter College",
    "form.department": "Department",
    "form.gender": "Gender",
    "form.gender.male": "Male",
    "form.gender.female": "Female",
    "form.gender.other": "Other",
    "form.nationality": "Nationality",
    "form.nationality.local": "Domestic",
    "form.nationality.international": "International Student",
    "form.nationality.input": "Enter Nationality",
    
    "form.applicationType": "Application Type",
    "form.applicationType.referred": "Pre-arranged with a counselor",
    "form.applicationType.direct": "Direct application",
    "form.counselorName": "Counselor Name",
    "form.availableTime": "Available Times",
    
    "form.topics": "Concerns",
    "form.topics.relationships": "Relationships",
    "form.topics.dating": "Dating",
    "form.topics.family": "Family",
    "form.topics.academics": "Academics",
    "form.topics.career": "Career",
    "form.topics.adaptation": "University Adjustment",
    "form.topics.stress": "Stress",
    "form.topics.loneliness": "Loneliness",
    "form.topics.confidence": "Confidence",
    "form.topics.unsure": "Not sure yet",
    "form.topics.other": "Other",
    
    "form.storyDetails": "Additional Notes",
    "form.storyDetails.placeholder": "Please share any additional information.",
    
    "form.college.humanities": "Humanities & Social Sciences",
    "form.college.globalBiz": "Global Business",
    "form.college.theology": "Theology",
    "form.college.health": "Health & Wellness",
    "form.college.arts": "Arts & Sports",
    "form.college.sw": "SW Convergence",
    "form.college.liberal": "Liberal Arts",
    "form.college.other": "Other",
    
    "form.availableTime.mon": "Monday",
    "form.availableTime.tue": "Tuesday",
    "form.availableTime.wed": "Wednesday",
    "form.availableTime.thu": "Thursday",
    "form.availableTime.fri": "Friday",
    
    "placeholder.name": "e.g., John Doe",
    "placeholder.studentId": "e.g., 20261130",
    "placeholder.phone": "e.g., 010-1234-5678",
    "placeholder.department": "e.g., Sociology",
    "placeholder.counselor": "e.g., John Doe",
    "placeholder.nationality": "e.g., China",
    "placeholder.select": "Select",
    
    "scale.q1": "I am well adapted to the overall atmosphere of this university.",
    "scale.q2": "I have good relationships with my peers.",
    "scale.q3": "I am satisfied with my academic life.",
    "scale.q4": "I have a clear sense of direction for my future.",
    "scale.q5": "I feel supported by the university community.",
    "scale.instruction": "Rate your agreement on a scale of 1-5.",
    "scale.disagree": "Strongly Disagree",
    "scale.agree": "Strongly Agree",
    
    "agreement.privacy": "I agree to the privacy policy.",
    "agreement.terms": "I agree to the terms of service.",
    "agreement.confidentiality": "Confidentiality & Exceptions",
    "agreement.confidentiality.desc": "All conversations are confidential, except in these situations:",
    "agreement.confidentiality.suicide": "Imminent risk of suicide or self-harm",
    "agreement.confidentiality.harm": "Imminent risk of harm to others",
    "agreement.confidentiality.legal": "Legal obligations or court orders",
    "agreement.confidentiality.check": "I understand and agree to the confidentiality policy.",
    
    "button.prev": "Previous",
    "button.next": "Next",
    "button.submit": "Submit",
    "button.submitting": "Submitting...",
    "button.apply": "Apply",
    "button.applyNow": "Apply Now",
    "button.home": "Go Home",
    
    "error.name": "Please enter your name.",
    "error.studentId": "Please enter your student ID.",
    "error.phone": "Please enter your phone number.",
    "error.college": "Please select a college.",
    "error.collegeOther": "Please enter your college.",
    "error.department": "Please enter your department.",
    "error.gender": "Please select your gender.",
    "error.nationality": "Please enter your nationality.",
    "error.applicationType": "Please select an application type.",
    "error.counselorName": "Please enter the counselor's name.",
    "error.topics": "Please select at least one concern.",
    "error.scale": "Please answer all scale questions.",
    "error.privacy": "Please agree to the privacy policy.",
    "error.terms": "Please agree to the terms of service.",
    "error.confidentiality": "Please agree to the confidentiality policy.",
    "error.submission": "An error occurred during submission.",
    
    "success.title": "Application Submitted!",
    "success.referred": "Enjoy your counseling session with {name}.",
    "success.direct": "We will contact you based on your available times.",
    "success.desc": "We will contact you after reviewing your application.",
  },
  ko: {
    // Navigation
    "nav.title": "또래소담 프로그램",
    "nav.back": "돌아가기",
    
    // Home page
    "home.hero.title": "대학생활의 든든한 동반자, 또래상담자 Peers",
    "home.hero.subtitle": "학교생활, 인간관계, 진로 등 대학생활의 고민을 또래상담자와 편안하게 나누어 보세요.",
    "home.hero.desc": "이 페이지는 또래상담 프로그램에 참여할 '또래친구' 신청 페이지입니다.",
    "home.features.title": "또래상담 프로그램은 어떤 프로그램인가요?",
    "home.features.feature1.title": "또래상담자와 1:1 매칭",
    "home.features.feature1.desc": "또래소담 프로그램의 또래상담자와 1:1로 매칭되어 상담을 진행합니다.",
    "home.features.feature2.title": "학교생활과 일상의 고민",
    "home.features.feature2.desc": "학업, 인간관계, 진로 등 일상적인 고민을 나눕니다.",
    "home.features.feature3.title": "비교과 점수 5점 부여",
    "home.features.feature3.desc": "또래소담 프로그램 참여 시 비교과 점수 5점이 부여됩니다.",
    "home.process.title": "신청 절차",
    "home.process.step1.title": "기본 정보 입력",
    "home.process.step1.desc": "이름, 학번, 학과, 연락처를 입력합니다.",
    "home.process.step2.title": "신청 유형 선택",
    "home.process.step2.desc": "미리 정해진 상담자가 있는지 선택합니다.",
    "home.process.step3.title": "신청 완료",
    "home.process.step3.desc": "동의 후 신청을 완료합니다.",
    "home.cta.title": "지금 바로 신청하세요",
    "home.cta.subtitle": "신청 후 담당자가 연락하여 또래상담자와 매칭할 때 알려드립니다.",
    "footer.copyright": "© 2026 또래소담 프로그램. 모든 권리 보유.",
    
    // Application form
    "step.1.title": "기본 정보 입력",
    "step.1.desc": "또래친구 신청에 필요한 기본 정보를 입력해주세요.",
    "step.2.title": "신청 유형 선택",
    "step.2.desc": "신청 유형을 선택해주세요.",
    "step.3.title": "고민 영역 선택",
    "step.3.desc": "상담받고 싶은 고민 영역을 선택해주세요.",
    "step.4.title": "대학생활 적응 척도",
    "step.4.desc": "대학생활 적응 정도를 평가해주세요.",
    "step.5.title": "동의 및 최종 제출",
    "step.5.desc": "약관을 검토하고 동의해주세요.",
    
    "form.name": "이름",
    "form.studentId": "학번",
    "form.phone": "휴대전화 번호",
    "form.college": "단과대학",
    "form.collegeOther": "단과대학 입력",
    "form.department": "학과",
    "form.gender": "성별",
    "form.gender.male": "남성",
    "form.gender.female": "여성",
    "form.gender.other": "기타",
    "form.nationality": "국적",
    "form.nationality.local": "내국인",
    "form.nationality.international": "외국인 유학생",
    "form.nationality.input": "국적 입력",
    
    "form.applicationType": "신청 유형",
    "form.applicationType.referred": "미리 섭외받고 신청",
    "form.applicationType.direct": "직접 신청",
    "form.counselorName": "또래상담자 이름",
    "form.availableTime": "상담 가능 시간",
    
    "form.topics": "고민 영역",
    "form.topics.relationships": "인간관계",
    "form.topics.dating": "연애",
    "form.topics.family": "가족",
    "form.topics.academics": "학업",
    "form.topics.career": "진로",
    "form.topics.adaptation": "대학생활 적응",
    "form.topics.stress": "스트레스",
    "form.topics.loneliness": "외로움",
    "form.topics.confidence": "자신감",
    "form.topics.unsure": "아직 잘 모르겠음",
    "form.topics.other": "기타",
    
    "form.storyDetails": "상담 시 이야기하고 싶은 것 (참고사항)",
    "form.storyDetails.placeholder": "상담 시 이야기하고 싶은 내용을 자유롭게 작성해주세요.",
    
    "form.college.humanities": "인문사회대학",
    "form.college.globalBiz": "글로벌비즈니스대학",
    "form.college.theology": "신학대학",
    "form.college.health": "건강보건대학",
    "form.college.arts": "예술체육대학",
    "form.college.sw": "소프트웨어융합대학",
    "form.college.liberal": "자유전공대학",
    "form.college.other": "기타",
    
    "form.availableTime.mon": "월요일",
    "form.availableTime.tue": "화요일",
    "form.availableTime.wed": "수요일",
    "form.availableTime.thu": "목요일",
    "form.availableTime.fri": "금요일",
    
    "placeholder.name": "예: 김○○",
    "placeholder.studentId": "예: 20261130",
    "placeholder.phone": "예: 010-1234-5678",
    "placeholder.department": "예: 사회학과",
    "placeholder.counselor": "예: 김○○",
    "placeholder.nationality": "예: 중국",
    "placeholder.select": "선택",
    
    "scale.q1": "나는 우리 대학교의 분위기에 전반적으로 잘 적응하고 있다.",
    "scale.q2": "나는 같은 학년 학우들과 좋은 관계를 유지하고 있다.",
    "scale.q3": "나는 학교 공부에 만족하고 있다.",
    "scale.q4": "나는 미래에 대해 명확한 방향을 가지고 있다.",
    "scale.q5": "나는 대학 공동체로부터 지지를 받고 있다고 느낀다.",
    "scale.instruction": "1~5 척도로 동의 정도를 표시해주세요.",
    "scale.disagree": "전혀 그렇지 않다",
    "scale.agree": "매우 그렇다",
    
    "agreement.privacy": "개인정보 처리방침에 동의합니다.",
    "agreement.terms": "서비스 이용약관에 동의합니다.",
    "agreement.confidentiality": "비밀보장 및 예외사항 안내",
    "agreement.confidentiality.desc": "모든 상담 내용은 비밀이 보장되며, 다음의 경우는 예외입니다:",
    "agreement.confidentiality.suicide": "자살 또는 자해의 위험이 임박한 경우",
    "agreement.confidentiality.harm": "타인에게 해를 끼칠 위험이 임박한 경우",
    "agreement.confidentiality.legal": "법적 의무 또는 법원 명령이 있는 경우",
    "agreement.confidentiality.check": "비밀보장 정책을 이해하고 동의합니다.",
    
    "button.prev": "이전",
    "button.next": "다음",
    "button.submit": "신청 완료",
    "button.submitting": "제출 중...",
    "button.apply": "신청하기",
    "button.applyNow": "또래친구 신청하기",
    "button.home": "홈으로",
    
    "error.name": "이름을 입력해주세요.",
    "error.studentId": "학번을 입력해주세요.",
    "error.phone": "휴대전화 번호를 입력해주세요.",
    "error.college": "단과대학을 선택해주세요.",
    "error.collegeOther": "단과대학을 입력해주세요.",
    "error.department": "학과를 입력해주세요.",
    "error.gender": "성별을 선택해주세요.",
    "error.nationality": "국적을 입력해주세요.",
    "error.applicationType": "신청 유형을 선택해주세요.",
    "error.counselorName": "또래상담자 이름을 입력해주세요.",
    "error.topics": "고민 영역을 선택해주세요.",
    "error.scale": "모든 척도 문항에 답변해주세요.",
    "error.privacy": "개인정보 처리방침에 동의해주세요.",
    "error.terms": "서비스 이용약관에 동의해주세요.",
    "error.confidentiality": "비밀보장 정책에 동의해주세요.",
    "error.submission": "신청 중 오류가 발생했습니다.",
    
    "success.title": "신청이 완료되었습니다!",
    "success.referred": "{name} 또래상담자와의 상담을 기대해주세요.",
    "success.direct": "귀하의 가능한 시간을 바탕으로 연락드리겠습니다.",
    "success.desc": "신청서 검토 후 연락드리겠습니다.",
  },
  ja: {
    // Navigation
    "nav.title": "ピアプログラム",
    "nav.back": "戻る",
    
    // Home page
    "home.hero.title": "「大学生活の心強いパートナー、ピアカウンセラー Peers」",
    "home.hero.subtitle": "学校生活、人間関係、キャリアなど大学生活の悩みをピアカウンセラーと安心して話し合いましょう。",
    "home.hero.desc": "このページはピアプログラムに参加する「ピアフレンド」として申し込むためのページです。",
    "home.features.title": "ピアプログラムとはどのようなプログラムですか?",
    "home.features.feature1.title": "ピアカウンセラーとの1:1マッチング",
    "home.features.feature1.desc": "ピアプログラムのピアカウンセラーと1:1でマッチングされ、カウンセリングを受けます。",
    "home.features.feature2.title": "学校生活と日常の悩み",
    "home.features.feature2.desc": "学業、人間関係、キャリアなど日常的な悩みを話し合います。",
    "home.features.feature3.title": "非課程ポイント5点付与",
    "home.features.feature3.desc": "ピアプログラム参加時に非課程ポイント5点が付与されます。",
    "home.process.title": "申し込み手続き",
    "home.process.step1.title": "基本情報を入力",
    "home.process.step1.desc": "名前、学籍番号、学科、連絡先を入力します。",
    "home.process.step2.title": "申し込みタイプを選択",
    "home.process.step2.desc": "事前に決まったカウンセラーがいるかどうかを選択します。",
    "home.process.step3.title": "申し込み完了",
    "home.process.step3.desc": "同意して申し込みを完了します。",
    "home.cta.title": "今すぐ申し込む",
    "home.cta.subtitle": "申し込み後、担当者が連絡し、ピアカウンセラーとマッチングしたらお知らせします。",
    "footer.copyright": "© 2026 ピアプログラム。すべての権利を保有しています。",
    
    // Application form
    "step.1.title": "基本情報入力",
    "step.1.desc": "ピアフレンド申し込みに必要な基本情報を入力してください。",
    "step.2.title": "申し込みタイプ選択",
    "step.2.desc": "申し込みタイプを選択してください。",
    "step.3.title": "悩みの領域選択",
    "step.3.desc": "相談したい悩みの領域を選択してください。",
    "step.4.title": "大学生活適応尺度",
    "step.4.desc": "大学生活への適応度を評価してください。",
    "step.5.title": "同意と最終提出",
    "step.5.desc": "利用規約を確認して同意してください。",
    
    "form.name": "名前",
    "form.studentId": "学籍番号",
    "form.phone": "携帯電話番号",
    "form.college": "学部",
    "form.collegeOther": "学部を入力",
    "form.department": "学科",
    "form.gender": "性別",
    "form.gender.male": "男性",
    "form.gender.female": "女性",
    "form.gender.other": "その他",
    "form.nationality": "国籍",
    "form.nationality.local": "国内学生",
    "form.nationality.international": "留学生",
    "form.nationality.input": "国籍を入力",
    
    "form.applicationType": "申し込みタイプ",
    "form.applicationType.referred": "事前にスカウトされて申し込み",
    "form.applicationType.direct": "直接申し込み",
    "form.counselorName": "ピアカウンセラー名",
    "form.availableTime": "相談可能時間",
    
    "form.topics": "悩みの領域",
    "form.topics.relationships": "人間関係",
    "form.topics.dating": "恋愛",
    "form.topics.family": "家族",
    "form.topics.academics": "学業",
    "form.topics.career": "キャリア",
    "form.topics.adaptation": "大学生活への適応",
    "form.topics.stress": "ストレス",
    "form.topics.loneliness": "孤独感",
    "form.topics.confidence": "自信",
    "form.topics.unsure": "まだよくわかりません",
    "form.topics.other": "その他",
    
    "form.storyDetails": "相談時に話したいこと（参考事項）",
    "form.storyDetails.placeholder": "相談時に話したい内容を自由に作成してください。",
    
    "form.college.humanities": "人文社会大学",
    "form.college.globalBiz": "グローバルビジネス大学",
    "form.college.theology": "神学大学",
    "form.college.health": "健康保健大学",
    "form.college.arts": "芸術体育大学",
    "form.college.sw": "ソフトウェア融合大学",
    "form.college.liberal": "自由専放大学",
    "form.college.other": "その他",
    
    "form.availableTime.mon": "月曜日",
    "form.availableTime.tue": "火曜日",
    "form.availableTime.wed": "水曜日",
    "form.availableTime.thu": "木曜日",
    "form.availableTime.fri": "金曜日",
    
    "placeholder.name": "例: 山田太郎",
    "placeholder.studentId": "例: 20261130",
    "placeholder.phone": "例: 090-1234-5678",
    "placeholder.department": "例: 社会学科",
    "placeholder.counselor": "例: 山田太郎",
    "placeholder.nationality": "例: 中国",
    "placeholder.select": "選択してください",
    
    "scale.q1": "私たちの大学の雰囲気に全体的にうまく適応しています。",
    "scale.q2": "同学年の学友と良い関係を保っています。",
    "scale.q3": "学校の勉強に満足しています。",
    "scale.q4": "将来について明確な方向性を持っています。",
    "scale.q5": "大学コミュニティからサポートを受けていると感じます。",
    "scale.instruction": "1～5の尺度で同意度を示してください。",
    "scale.disagree": "全く同意しません",
    "scale.agree": "非常に同意します",
    
    "agreement.privacy": "プライバシーポリシーに同意します。",
    "agreement.terms": "利用規約に同意します。",
    "agreement.confidentiality": "秘密保持と例外事項の案内",
    "agreement.confidentiality.desc": "すべての相談内容は秘密が保証されますが、以下の場合は例外です:",
    "agreement.confidentiality.suicide": "自殺または自傷の危険が差し迫っている場合",
    "agreement.confidentiality.harm": "他者に危害を加える危険が差し迫っている場合",
    "agreement.confidentiality.legal": "法的義務または裁判所命令がある場合",
    "agreement.confidentiality.check": "秘密保持ポリシーを理解し同意します。",
    
    "button.prev": "前へ",
    "button.next": "次へ",
    "button.submit": "申し込み完了",
    "button.submitting": "送信中...",
    "button.apply": "申し込む",
    "button.applyNow": "今すぐ申し込む",
    "button.home": "ホームへ",
    
    "error.name": "名前を入力してください。",
    "error.studentId": "学籍番号を入力してください。",
    "error.phone": "携帯電話番号を入力してください。",
    "error.college": "学部を選択してください。",
    "error.collegeOther": "学部を入力してください。",
    "error.department": "学科を入力してください。",
    "error.gender": "性別を選択してください。",
    "error.nationality": "国籍を入力してください。",
    "error.applicationType": "申し込みタイプを選択してください。",
    "error.counselorName": "ピアカウンセラー名を入力してください。",
    "error.topics": "悩みの領域を選択してください。",
    "error.scale": "すべての尺度項目に回答してください。",
    "error.privacy": "プライバシーポリシーに同意してください。",
    "error.terms": "利用規約に同意してください。",
    "error.confidentiality": "秘密保持ポリシーに同意してください。",
    "error.submission": "申し込み中にエラーが発生しました。",
    
    "success.title": "申し込みが完了しました!",
    "success.referred": "{name}ピアカウンセラーとの相談をお楽しみください。",
    "success.direct": "ご都合のつく時間をもとに連絡させていただきます。",
    "success.desc": "申し込み書を確認した後、ご連絡させていただきます。",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ko";
  });

  // Sync HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const translated = translations[language]?.[key];
    if (translated === undefined) {
      console.warn(`Translation key not found: ${key} for language: ${language}`);
      return key;
    }
    return translated;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
