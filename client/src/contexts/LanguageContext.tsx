import { createContext, useContext, useState, ReactNode } from "react";

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
    "nav.back": "Back",
    "nav.apply": "Apply",
    
    // Step titles
    "step.1.title": "Basic Information",
    "step.2.title": "Application Type",
    "step.3.title": "Concerns & Additional Info",
    "step.4.title": "University Adaptation Scale",
    "step.5.title": "Consent & Agreement",
    
    // Step descriptions
    "step.1.desc": "Please enter your basic information.",
    "step.2.desc": "Please select your application type.",
    "step.3.desc": "Please select your concerns.",
    "step.4.desc": "Please rate your adaptation.",
    "step.5.desc": "Please review and agree to the terms.",
    
    // Form labels
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
    
    // Application type
    "form.applicationType": "Application Type",
    "form.applicationType.referred": "1. Referred by a peer counselor",
    "form.applicationType.direct": "2. Self-application",
    "form.counselorName": "Counselor Name",
    "form.availableTime": "Available Time",
    "form.availableTime.day": "Day",
    "form.availableTime.start": "Start",
    "form.availableTime.end": "End",
    
    // Topics
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
    
    // Story details
    "form.storyDetails": "Additional Notes",
    "form.storyDetails.placeholder": "Please share any additional information.",
    
    // Scale questions
    "scale.instruction": "Please rate the following statements from 1-5.",
    "scale.q1": "I am well adapted to the overall atmosphere of this university.",
    "scale.q2": "I have friends on campus with whom I can comfortably share my concerns.",
    "scale.q3": "I am interested in my studies and find studying satisfying.",
    "scale.q4": "I actively participate in various campus activities.",
    "scale.q5": "Overall, I am satisfied with my university life.",
    "scale.disagree": "Strongly Disagree",
    "scale.agree": "Strongly Agree",
    
    // Agreements
    "agreement.confidentiality": "Confidentiality & Exceptions",
    "agreement.confidentiality.desc": "We guarantee confidentiality. However, exceptions apply in the following cases:",
    "agreement.confidentiality.suicide": "Risk of suicide",
    "agreement.confidentiality.harm": "Risk of harm to others",
    "agreement.confidentiality.legal": "Legal reporting obligations",
    "agreement.privacy": "I agree to the collection and use of personal information.",
    "agreement.terms": "I agree to the program guidelines.",
    "agreement.confidentiality.check": "I agree to confidentiality and exceptions.",
    
    // Buttons
    "button.prev": "Previous",
    "button.next": "Next",
    "button.submit": "Submit",
    "button.submitting": "Submitting...",
    "button.home": "Back to Home",
    
    // Success message
    "success.title": "Application Submitted!",
    "success.referred": "Enjoy your counseling session.",
    "success.direct": "We will contact you based on your available times.",
    "success.desc": "We will contact you after reviewing your application.",
    
    // Error messages
    "error.name": "Please enter your name.",
    "error.studentId": "Please enter your student ID.",
    "error.phone": "Please enter your phone number.",
    "error.college": "Please select a college.",
    "error.collegeOther": "Please enter a college.",
    "error.department": "Please enter your department.",
    "error.gender": "Please select your gender.",
    "error.nationality": "Please enter your nationality.",
    "error.applicationType": "Please select an application type.",
    "error.counselorName": "Please enter the counselor name.",
    "error.topics": "Please select at least one concern.",
    "error.scale": "Please answer all scale questions.",
    "error.privacy": "Please agree to personal information collection.",
    "error.terms": "Please agree to the program guidelines.",
    "error.confidentiality": "Please agree to confidentiality terms.",
    "error.submission": "An error occurred during submission.",
    "success.submission": "Application submitted successfully!",
  },
  ko: {
    // Navigation
    "nav.back": "돌아가기",
    "nav.apply": "신청하기",
    
    // Step titles
    "step.1.title": "기본 정보 입력",
    "step.2.title": "신청 유형 선택",
    "step.3.title": "고민 영역 및 추가 정보",
    "step.4.title": "대학생활 적응 척도 검사",
    "step.5.title": "개인정보 동의",
    
    // Step descriptions
    "step.1.desc": "또래친구 신청에 필요한 기본 정보를 입력해주세요.",
    "step.2.desc": "신청 유형을 선택하고 추가 정보를 입력해주세요.",
    "step.3.desc": "나누고 싶은 고민 영역을 선택하고 추가 내용을 작성해주세요.",
    "step.4.desc": "5점 리커트 척도로 대학생활 적응도를 평가해주세요.",
    "step.5.desc": "또래소담 프로그램 참여를 위한 필수 동의사항을 확인해주세요.",
    
    // Form labels
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
    
    // Application type
    "form.applicationType": "신청 유형",
    "form.applicationType.referred": "1. 또래상담자가 미리 섭외하여 신청",
    "form.applicationType.direct": "2. 본인 신청",
    "form.counselorName": "또래상담자 이름",
    "form.availableTime": "상담 가능 시간",
    "form.availableTime.day": "요일",
    "form.availableTime.start": "시작",
    "form.availableTime.end": "종료",
    
    // Topics
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
    
    // Story details
    "form.storyDetails": "상담 시 이야기하고 싶은 것 (참고사항)",
    "form.storyDetails.placeholder": "상담 시 이야기하고 싶은 내용을 자유롭게 작성해주세요.",
    
    // Scale questions
    "scale.instruction": "다음 각 문항에 대해 1~5점 중 해당하는 점수를 선택해주세요.",
    "scale.q1": "나는 우리 대학교의 분위기에 전반적으로 잘 적응하고 있다.",
    "scale.q2": "캠퍼스 내에서 내 고민을 언제든 편하게 털어놓을 친구가 있다.",
    "scale.q3": "나는 학업에 관심이 있고 공부하는 것이 만족스럽다.",
    "scale.q4": "나는 캠퍼스 내 다양한 활동(동아리, 행사 등)에 적극적으로 참여하고 있다.",
    "scale.q5": "전반적으로 대학생활에 만족하고 있다.",
    "scale.disagree": "전혀 동의하지 않음",
    "scale.agree": "매우 동의함",
    
    // Agreements
    "agreement.confidentiality": "비밀보장 및 예외사항 안내",
    "agreement.confidentiality.desc": "또래소담 프로그램에서는 상담 내용의 비밀을 보장합니다. 다만 다음의 경우에는 비밀보장의 예외가 적용됩니다:",
    "agreement.confidentiality.suicide": "자살 위험이 있는 경우",
    "agreement.confidentiality.harm": "타인에게 직접적인 해를 끼칠 위험이 있는 경우",
    "agreement.confidentiality.legal": "법적으로 의무 보고 대상인 경우",
    "agreement.privacy": "개인정보 수집·이용에 동의합니다.",
    "agreement.terms": "또래소담 프로그램 운영 안내에 동의합니다.",
    "agreement.confidentiality.check": "비밀보장 및 예외사항 안내에 동의합니다.",
    
    // Buttons
    "button.prev": "이전",
    "button.next": "다음",
    "button.submit": "신청 완료",
    "button.submitting": "제출 중...",
    "button.home": "홈으로 돌아가기",
    
    // Success message
    "success.title": "신청이 완료되었습니다!",
    "success.referred": "상담자와의 상담을 기대해주세요.",
    "success.direct": "입력하신 상담 가능 시간에 맞춰 상담을 진행하겠습니다.",
    "success.desc": "관리자가 신청을 검토한 후 연락드리겠습니다.",
    
    // Error messages
    "error.name": "이름을 입력해주세요.",
    "error.studentId": "학번을 입력해주세요.",
    "error.phone": "휴대전화 번호를 입력해주세요.",
    "error.college": "단과대학을 선택해주세요.",
    "error.collegeOther": "단과대학을 입력해주세요.",
    "error.department": "학과를 입력해주세요.",
    "error.gender": "성별을 선택해주세요.",
    "error.nationality": "국적을 입력해주세요.",
    "error.applicationType": "신청 유형을 선택해주세요.",
    "error.counselorName": "상담자 이름을 입력해주세요.",
    "error.topics": "고민 영역을 선택해주세요.",
    "error.scale": "모든 척도 항목에 답변해주세요.",
    "error.privacy": "개인정보 수집·이용 동의를 확인해주세요.",
    "error.terms": "또래소담 프로그램 운영 안내를 확인해주세요.",
    "error.confidentiality": "비밀보장 및 예외사항 안내를 확인해주세요.",
    "error.submission": "신청 중 오류가 발생했습니다.",
    "success.submission": "신청이 완료되었습니다!",
  },
  ja: {
    // Navigation
    "nav.back": "戻る",
    "nav.apply": "申し込む",
    
    // Step titles
    "step.1.title": "基本情報入力",
    "step.2.title": "申し込みタイプ選択",
    "step.3.title": "悩みの領域と追加情報",
    "step.4.title": "大学生活適応スケール検査",
    "step.5.title": "個人情報同意",
    
    // Step descriptions
    "step.1.desc": "ピア友人申し込みに必要な基本情報を入力してください。",
    "step.2.desc": "申し込みタイプを選択し、追加情報を入力してください。",
    "step.3.desc": "共有したい悩みの領域を選択し、追加内容を作成してください。",
    "step.4.desc": "5点リッカート尺度で大学生活適応度を評価してください。",
    "step.5.desc": "ピア相談プログラム参加に必要な同意事項を確認してください。",
    
    // Form labels
    "form.name": "名前",
    "form.studentId": "学番",
    "form.phone": "携帯電話番号",
    "form.college": "単科大学",
    "form.collegeOther": "単科大学入力",
    "form.department": "学科",
    "form.gender": "性別",
    "form.gender.male": "男性",
    "form.gender.female": "女性",
    "form.gender.other": "その他",
    "form.nationality": "国籍",
    "form.nationality.local": "国内",
    "form.nationality.international": "留学生",
    "form.nationality.input": "国籍入力",
    
    // Application type
    "form.applicationType": "申し込みタイプ",
    "form.applicationType.referred": "1. ピア相談者が事前に勧誘して申し込み",
    "form.applicationType.direct": "2. 本人申し込み",
    "form.counselorName": "ピア相談者名",
    "form.availableTime": "相談可能時間",
    "form.availableTime.day": "曜日",
    "form.availableTime.start": "開始",
    "form.availableTime.end": "終了",
    
    // Topics
    "form.topics": "悩みの領域",
    "form.topics.relationships": "人間関係",
    "form.topics.dating": "恋愛",
    "form.topics.family": "家族",
    "form.topics.academics": "学業",
    "form.topics.career": "進路",
    "form.topics.adaptation": "大学生活適応",
    "form.topics.stress": "ストレス",
    "form.topics.loneliness": "孤独感",
    "form.topics.confidence": "自信",
    "form.topics.unsure": "まだよくわかりません",
    "form.topics.other": "その他",
    
    // Story details
    "form.storyDetails": "相談時に話したいこと（参考事項）",
    "form.storyDetails.placeholder": "相談時に話したい内容を自由に作成してください。",
    
    // Scale questions
    "scale.instruction": "次の各項目について1〜5点の中から該当する点数を選択してください。",
    "scale.q1": "私たちの大学の雰囲気に全体的にうまく適応しています。",
    "scale.q2": "キャンパス内でいつでも気軽に悩みを打ち明けられる友人がいます。",
    "scale.q3": "私は学業に興味があり、勉強することが満足できます。",
    "scale.q4": "私はキャンパス内のさまざまな活動（サークル、イベントなど）に積極的に参加しています。",
    "scale.q5": "全体的に大学生活に満足しています。",
    "scale.disagree": "全く同意しません",
    "scale.agree": "非常に同意します",
    
    // Agreements
    "agreement.confidentiality": "秘密保持と例外事項の案内",
    "agreement.confidentiality.desc": "ピア相談プログラムでは相談内容の秘密を保証します。ただし、以下の場合には秘密保持の例外が適用されます：",
    "agreement.confidentiality.suicide": "自殺の危険がある場合",
    "agreement.confidentiality.harm": "他者に直接的な害を与える危険がある場合",
    "agreement.confidentiality.legal": "法的に報告義務がある場合",
    "agreement.privacy": "個人情報の収集・利用に同意します。",
    "agreement.terms": "ピア相談プログラム運営案内に同意します。",
    "agreement.confidentiality.check": "秘密保持と例外事項の案内に同意します。",
    
    // Buttons
    "button.prev": "前へ",
    "button.next": "次へ",
    "button.submit": "申し込み完了",
    "button.submitting": "提出中...",
    "button.home": "ホームに戻る",
    
    // Success message
    "success.title": "申し込みが完了しました！",
    "success.referred": "相談者との相談をお楽しみください。",
    "success.direct": "入力された相談可能時間に合わせて相談を進めます。",
    "success.desc": "管理者が申し込みを確認した後、ご連絡します。",
    
    // Error messages
    "error.name": "名前を入力してください。",
    "error.studentId": "学番を入力してください。",
    "error.phone": "携帯電話番号を入力してください。",
    "error.college": "単科大学を選択してください。",
    "error.collegeOther": "単科大学を入力してください。",
    "error.department": "学科を入力してください。",
    "error.gender": "性別を選択してください。",
    "error.nationality": "国籍を入力してください。",
    "error.applicationType": "申し込みタイプを選択してください。",
    "error.counselorName": "相談者名を入力してください。",
    "error.topics": "悩みの領域を選択してください。",
    "error.scale": "すべてのスケール項目に答えてください。",
    "error.privacy": "個人情報の収集・利用同意を確認してください。",
    "error.terms": "ピア相談プログラム運営案内に同意してください。",
    "error.confidentiality": "秘密保持と例外事項の案内に同意してください。",
    "error.submission": "申し込み中にエラーが発生しました。",
    "success.submission": "申し込みが完了しました！",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ko";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
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
