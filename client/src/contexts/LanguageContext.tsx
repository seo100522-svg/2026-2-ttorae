import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
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
    "form.storyDetails": "What you'd like to discuss - Notes",
    "form.storyDetails.placeholder": "Please feel free to write what you'd like to discuss.",
    
    // Scale questions
    "scale.instruction": "Please rate each statement from 1 to 5.",
    "scale.q1": "I am well adapted to the overall atmosphere of this university.",
    "scale.q2": "I have a friend on campus with whom I can comfortably share my concerns.",
    "scale.q3": "I am interested in my studies and find studying satisfying.",
    "scale.q4": "I actively participate in various campus activities.",
    "scale.q5": "Overall, I am satisfied with my university life.",
    "scale.disagree": "Strongly Disagree",
    "scale.agree": "Strongly Agree",
    
    // Agreements
    "agreement.confidentiality": "Confidentiality & Exceptions Notice",
    "agreement.confidentiality.desc": "The program guarantees confidentiality of counseling content. However, exceptions apply in the following cases:",
    "agreement.confidentiality.suicide": "When there is suicide risk",
    "agreement.confidentiality.harm": "When there is risk of direct harm to others",
    "agreement.confidentiality.legal": "When legally required to report",
    "agreement.privacy": "I agree to the collection and use of personal information.",
    "agreement.terms": "I agree to the program operation guidelines.",
    "agreement.confidentiality.check": "I agree to the confidentiality and exceptions notice.",
    
    // Buttons
    "button.prev": "Previous",
    "button.next": "Next",
    "button.submit": "Submit",
    "button.submitting": "Submitting...",
    "button.home": "Go Home",
    
    // Success message
    "success.title": "Application submitted successfully!",
    "success.referred": "Look forward to counseling with your counselor.",
    "success.direct": "We will proceed with counseling according to your available time.",
    "success.desc": "We will contact you after reviewing your application.",
    
    // Error messages
    "error.name": "Please enter your name.",
    "error.studentId": "Please enter your student ID.",
    "error.phone": "Please enter your phone number.",
    "error.college": "Please select your college.",
    "error.collegeOther": "Please enter your college.",
    "error.department": "Please enter your department.",
    "error.gender": "Please select your gender.",
    "error.nationality": "Please enter your nationality.",
    "error.applicationType": "Please select application type.",
    "error.counselorName": "Please enter counselor name.",
    "error.topics": "Please select a concern area.",
    "error.scale": "Please answer all questions.",
    "error.privacy": "Please agree to the collection and use of personal information.",
    "error.terms": "Please agree to the program operation guidelines.",
    "error.confidentiality": "Please agree to the confidentiality and exceptions notice.",
    "error.submission": "An error occurred during submission.",
    "success.submission": "Application submitted successfully!",
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
    return translations[language][key] || key;
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
