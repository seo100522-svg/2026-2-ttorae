import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COLLEGES = [
  "인문사회대학",
  "글로벌비즈니스대학",
  "신학대학",
  "건강보건대학",
  "예술체육대학",
  "소프트웨어융합대학",
  "자유전공대학",
  "기타",
];

const GENDERS = [
  { value: "male", label: "남성 (Male)" },
  { value: "female", label: "여성 (Female)" },
  { value: "other", label: "기타 (Other)" },
];

const TOPICS = [
  { value: "인간관계", label: "인간관계 (Relationships)" },
  { value: "연애", label: "연애 (Dating)" },
  { value: "가족", label: "가족 (Family)" },
  { value: "학업", label: "학업 (Academics)" },
  { value: "진로", label: "진로 (Career)" },
  { value: "대학생활 적응", label: "대학생활 적응 (University Adjustment)" },
  { value: "스트레스", label: "스트레스 (Stress)" },
  { value: "외로움", label: "외로움 (Loneliness)" },
  { value: "자신감", label: "자신감 (Confidence)" },
  { value: "아직 잘 모르겠음", label: "아직 잘 모르겠음 (Not sure yet)" },
];

const SCALE_QUESTIONS = [
  "나는 우리 대학교의 분위기에 전반적으로 잘 적응하고 있다. (I am well adapted to the overall atmosphere of this university.)",
  "캠퍼스 내에서 내 고민을 언제든 편하게 털어놓을 친구가 있다. (I have a friend on campus with whom I can comfortably share my concerns.)",
  "나는 학업에 관심이 있고 공부하는 것이 만족스럽다. (I am interested in my studies and find studying satisfying.)",
  "나는 캠퍼스 내 다양한 활동(동아리, 행사 등)에 적극적으로 참여하고 있다. (I actively participate in various campus activities.)",
  "전반적으로 대학생활에 만족하고 있다. (Overall, I am satisfied with my university life.)",
];

const WEEKDAYS = ["월", "화", "수", "목", "금"];
const HOURS = Array.from({ length: 10 }, (_, i) => {
  const hour = 9 + i;
  return { value: hour.toString(), label: `${hour}:00` };
});

interface AvailableTime {
  day: string;
  startHour: string;
  endHour: string;
}

interface FormData {
  // Step 1: Basic Info
  studentName: string;
  studentId: string;
  phoneNumber: string;
  college: string;
  collegeOther: string;
  department: string;
  gender: "male" | "female" | "other" | "";
  nationalityType: "local" | "international";
  nationality: string;
  
  // Step 2: Application Type
  applicationType: "referred" | "direct" | "";
  referredCounselorName: string;
  availableTimes: AvailableTime[];
  
  // Step 3: Topics & Additional Info
  topics: string;
  topicsOther: string;
  storyDetails: string;
  
  // Step 4: Scale Assessment
  scaleResponses: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
  };
  
  // Step 5: Agreements
  agreePrivacy: boolean;
  agreeTerms: boolean;
  agreeConfidentiality: boolean;
}

export default function ApplicationForm() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const createApplicationMutation = trpc.applications.create.useMutation();

  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    studentId: "",
    phoneNumber: "",
    college: "",
    collegeOther: "",
    department: "",
    gender: "",
    nationalityType: "local",
    nationality: "",
    applicationType: "",
    referredCounselorName: "",
    availableTimes: [{ day: "월", startHour: "09", endHour: "10" }],
    topics: "",
    topicsOther: "",
    storyDetails: "",
    scaleResponses: { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 },
    agreePrivacy: false,
    agreeTerms: false,
    agreeConfidentiality: false,
  });

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.studentName.trim()) {
          toast.error("이름을 입력해주세요. (Please enter your name.)");
          return false;
        }
        if (!formData.studentId.trim()) {
          toast.error("학번을 입력해주세요. (Please enter your student ID.)");
          return false;
        }
        if (!formData.phoneNumber.trim()) {
          toast.error("휴대전화 번호를 입력해주세요. (Please enter your phone number.)");
          return false;
        }
        if (!formData.college) {
          toast.error("단과대학을 선택해주세요. (Please select your college.)");
          return false;
        }
        if (formData.college === "기타" && !formData.collegeOther.trim()) {
          toast.error("단과대학을 입력해주세요. (Please enter your college.)");
          return false;
        }
        if (!formData.department.trim()) {
          toast.error("학과를 입력해주세요. (Please enter your department.)");
          return false;
        }
        if (!formData.gender) {
          toast.error("성별을 선택해주세요. (Please select your gender.)");
          return false;
        }
        if (formData.nationalityType === "international" && !formData.nationality.trim()) {
          toast.error("국적을 입력해주세요. (Please enter your nationality.)");
          return false;
        }
        return true;

      case 2:
        if (!formData.applicationType) {
          toast.error("신청 유형을 선택해주세요. (Please select application type.)");
          return false;
        }
        if (formData.applicationType === "referred" && !formData.referredCounselorName.trim()) {
          toast.error("상담자 이름을 입력해주세요. (Please enter counselor name.)");
          return false;
        }
        return true;

      case 3:
        if (!formData.topics && !formData.topicsOther) {
          toast.error("고민 영역을 선택해주세요. (Please select a concern area.)");
          return false;
        }
        return true;

      case 4:
        if (formData.scaleResponses.q1 === 0 || formData.scaleResponses.q2 === 0 || 
            formData.scaleResponses.q3 === 0 || formData.scaleResponses.q4 === 0 || 
            formData.scaleResponses.q5 === 0) {
          toast.error("모든 척도 항목에 답변해주세요. (Please answer all questions.)");
          return false;
        }
        return true;

      case 5:
        if (!formData.agreePrivacy) {
          toast.error("개인정보 수집·이용 동의를 확인해주세요.");
          return false;
        }
        if (!formData.agreeTerms) {
          toast.error("또래소담 프로그램 운영 안내를 확인해주세요.");
          return false;
        }
        if (!formData.agreeConfidentiality) {
          toast.error("비밀보장 및 예외사항 안내를 확인해주세요.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTimeChange = (index: number, field: string, value: string) => {
    const newTimes = [...formData.availableTimes];
    newTimes[index] = { ...newTimes[index], [field]: value };
    setFormData({ ...formData, availableTimes: newTimes });
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    try {
      const collegeStr = formData.college === "기타" ? formData.collegeOther : formData.college;
      const topicsStr = formData.topicsOther ? `${formData.topics}${formData.topics ? ", " : ""}${formData.topicsOther}` : formData.topics;
      const availableTimesStr = formData.applicationType === "direct"
        ? formData.availableTimes
            .map((t) => `${t.day}요일 ${t.startHour}:00~${t.endHour}:00`)
            .join("\n")
        : "";

      await createApplicationMutation.mutateAsync({
        studentName: formData.studentName,
        studentId: formData.studentId,
        phoneNumber: formData.phoneNumber,
        college: collegeStr,
        department: formData.department,
        gender: formData.gender as "male" | "female" | "other",
        nationalityType: formData.nationalityType,
        nationality: formData.nationality,
        topics: topicsStr,
        storyDetails: `[신청 유형: ${formData.applicationType === "referred" ? "또래상담자가 미리 섭외하여 신청" : "본인 신청"}]\n${formData.applicationType === "referred" ? `상담자: ${formData.referredCounselorName}` : `상담 가능 시간:\n${availableTimesStr}`}\n\n${formData.storyDetails}`,
        scaleResponses: formData.scaleResponses,
      });

      setSubmitSuccess(true);
      toast.success("신청이 완료되었습니다! (Application submitted successfully!)");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("신청 중 오류가 발생했습니다. (An error occurred during submission.)");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="shadow-lg">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">신청이 완료되었습니다!</h2>
              <p className="text-slate-600 mb-2">(Application submitted successfully!)</p>
              <p className="text-slate-600 mb-6">
                {formData.applicationType === "referred"
                  ? `${formData.referredCounselorName} 상담자와의 상담을 기대해주세요.`
                  : "입력하신 상담 가능 시간에 맞춰 상담을 진행하겠습니다."}
              </p>
              <p className="text-sm text-slate-500 mb-8">
                관리자가 신청을 검토한 후 연락드리겠습니다.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-slate-700 hover:bg-slate-800"
              >
                홈으로 돌아가기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-slate-600 hover:text-slate-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          돌아가기
        </Button>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
            <CardTitle>
              {currentStep === 1 && "기본 정보 입력 (Basic Information)"}
              {currentStep === 2 && "신청 유형 선택 (Application Type)"}
              {currentStep === 3 && "고민 영역 및 추가 정보 (Concerns & Additional Info)"}
              {currentStep === 4 && "대학생활 적응 척도 검사 (University Adaptation Scale)"}
              {currentStep === 5 && "개인정보 동의 (Consent & Agreement)"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "또래친구 신청에 필요한 기본 정보를 입력해주세요. (Please enter your basic information.)"}
              {currentStep === 2 && "신청 유형을 선택하고 추가 정보를 입력해주세요. (Please select your application type.)"}
              {currentStep === 3 && "나누고 싶은 고민 영역을 선택하고 추가 내용을 작성해주세요. (Please select your concerns.)"}
              {currentStep === 4 && "5점 리커트 척도로 대학생활 적응도를 평가해주세요. (Please rate your adaptation.)"}
              {currentStep === 5 && "또래소담 프로그램 참여를 위한 필수 동의사항을 확인해주세요. (Please review and agree to the terms.)"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep >= step
                        ? "bg-slate-700 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        currentStep > step ? "bg-slate-700" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">이름 * (Name *)</Label>
                  <Input
                    id="name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="예: 김○○"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentId">학번 * (Student ID *)</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      placeholder="예: 20261130"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">휴대전화 번호 * (Phone *)</Label>
                    <Input
                      id="phone"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="예: 010-1234-5678"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="college">단과대학 * (College *)</Label>
                  <Select value={formData.college} onValueChange={(value) => setFormData({ ...formData, college: value, collegeOther: "" })}>
                    <SelectTrigger id="college">
                      <SelectValue placeholder="선택 (Select)" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLLEGES.map((college) => (
                        <SelectItem key={college} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.college === "기타" && (
                  <div>
                    <Label htmlFor="collegeOther">단과대학 입력 * (Enter College *)</Label>
                    <Input
                      id="collegeOther"
                      value={formData.collegeOther}
                      onChange={(e) => setFormData({ ...formData, collegeOther: e.target.value })}
                      placeholder="예: 대학원"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="department">학과 * (Department *)</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="예: 사회학과"
                  />
                </div>

                <div>
                  <Label>성별 * (Gender *)</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value as "male" | "female" | "other" })}>
                    <div className="space-y-2">
                      {GENDERS.map((gender) => (
                        <div key={gender.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={gender.value} id={gender.value} />
                          <Label htmlFor={gender.value} className="font-normal cursor-pointer">{gender.label}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>국적 * (Nationality *)</Label>
                  <RadioGroup value={formData.nationalityType} onValueChange={(value) => setFormData({ ...formData, nationalityType: value as "local" | "international" })}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="local" id="local" />
                        <Label htmlFor="local" className="font-normal cursor-pointer">내국인 (Domestic)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="international" id="international" />
                        <Label htmlFor="international" className="font-normal cursor-pointer">외국인 유학생 (International Student)</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.nationalityType === "international" && (
                  <div>
                    <Label htmlFor="nationality">국적 입력 * (Enter Nationality *)</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      placeholder="예: 중국"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Application Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>신청 유형 * (Application Type *)</Label>
                  <RadioGroup value={formData.applicationType} onValueChange={(value) => setFormData({ ...formData, applicationType: value as "referred" | "direct" })}>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2 p-3 border border-slate-200 rounded-lg">
                        <RadioGroupItem value="referred" id="referred" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="referred" className="font-normal cursor-pointer">
                            1. 또래상담자가 미리 섭외하여 신청
                            <br />
                            <span className="text-sm text-slate-500">(1. Referred by a peer counselor)</span>
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 p-3 border border-slate-200 rounded-lg">
                        <RadioGroupItem value="direct" id="direct" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="direct" className="font-normal cursor-pointer">
                            2. 본인 신청
                            <br />
                            <span className="text-sm text-slate-500">(2. Self-application)</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.applicationType === "referred" && (
                  <div>
                    <Label htmlFor="counselor">또래상담자 이름 * (Counselor Name *)</Label>
                    <Input
                      id="counselor"
                      value={formData.referredCounselorName}
                      onChange={(e) => setFormData({ ...formData, referredCounselorName: e.target.value })}
                      placeholder="예: 이○○"
                    />
                  </div>
                )}

                {formData.applicationType === "direct" && (
                  <div>
                    <Label>상담 가능 시간 (Available Time)</Label>
                    <div className="space-y-3">
                      {formData.availableTimes.map((time, index) => (
                        <div key={index} className="flex gap-2 items-end">
                          <div className="flex-1">
                            <Label className="text-sm">요일 (Day)</Label>
                            <Select value={time.day} onValueChange={(value) => handleTimeChange(index, "day", value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {WEEKDAYS.map((day) => (
                                  <SelectItem key={day} value={day}>{day}요일</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm">시작 (Start)</Label>
                            <Select value={time.startHour} onValueChange={(value) => handleTimeChange(index, "startHour", value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour.value} value={hour.value}>{hour.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm">종료 (End)</Label>
                            <Select value={time.endHour} onValueChange={(value) => handleTimeChange(index, "endHour", value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour.value} value={hour.value}>{hour.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Topics & Additional Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>고민 영역 * (Concerns *)</Label>
                  <div className="space-y-2">
                    {TOPICS.map((topic) => (
                      <div key={topic.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={topic.value}
                          checked={formData.topics.includes(topic.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({ ...formData, topics: formData.topics ? `${formData.topics}, ${topic.value}` : topic.value });
                            } else {
                              const topics = formData.topics.split(", ").filter((t) => t !== topic.value).join(", ");
                              setFormData({ ...formData, topics });
                            }
                          }}
                        />
                        <Label htmlFor={topic.value} className="font-normal cursor-pointer">{topic.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.topics.includes("아직 잘 모르겠음") && (
                  <div>
                    <Label htmlFor="topicsOther">기타 (Other)</Label>
                    <Input
                      id="topicsOther"
                      value={formData.topicsOther}
                      onChange={(e) => setFormData({ ...formData, topicsOther: e.target.value })}
                      placeholder="자유롭게 입력해주세요"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="story">상담 시 이야기하고 싶은 것 (참고사항) * (What you'd like to discuss - Notes *)</Label>
                  <Textarea
                    id="story"
                    value={formData.storyDetails}
                    onChange={(e) => setFormData({ ...formData, storyDetails: e.target.value })}
                    placeholder="상담 시 이야기하고 싶은 내용을 자유롭게 작성해주세요."
                    rows={5}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Scale Assessment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <p className="text-sm text-slate-600 mb-4">
                  다음 각 문항에 대해 1~5점 중 해당하는 점수를 선택해주세요.
                  <br />
                  (Please rate each statement from 1 to 5.)
                </p>
                {SCALE_QUESTIONS.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-sm font-semibold">{index + 1}. {question}</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <Button
                          key={score}
                          variant={formData.scaleResponses[`q${index + 1}` as keyof typeof formData.scaleResponses] === score ? "default" : "outline"}
                          onClick={() => setFormData({
                            ...formData,
                            scaleResponses: {
                              ...formData.scaleResponses,
                              [`q${index + 1}`]: score
                            } as any
                          })}
                          className="flex-1"
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>전혀 동의하지 않음 (Strongly Disagree)</span>
                      <span>매우 동의함 (Strongly Agree)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 5: Agreements */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-slate-900">비밀보장 및 예외사항 안내</h3>
                  <p className="text-sm text-slate-700">
                    또래소담 프로그램에서는 상담 내용의 비밀을 보장합니다. 다만 다음의 경우에는 비밀보장의 예외가 적용됩니다:
                  </p>
                  <ul className="text-sm text-slate-700 space-y-2 ml-4">
                    <li>• 자살 위험이 있는 경우</li>
                    <li>• 타인에게 직접적인 해를 끼칠 위험이 있는 경우</li>
                    <li>• 법적으로 의무 보고 대상인 경우</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                    />
                    <Label htmlFor="privacy" className="font-normal cursor-pointer text-sm">
                      개인정보 수집·이용에 동의합니다. (I agree to the collection and use of personal information.)
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="font-normal cursor-pointer text-sm">
                      또래소담 프로그램 운영 안내에 동의합니다. (I agree to the program operation guidelines.)
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="confidentiality"
                      checked={formData.agreeConfidentiality}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeConfidentiality: checked as boolean })}
                    />
                    <Label htmlFor="confidentiality" className="font-normal cursor-pointer text-sm">
                      비밀보장 및 예외사항 안내에 동의합니다. (I agree to the confidentiality and exceptions notice.)
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                이전
              </Button>
              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-slate-700 hover:bg-slate-800"
                >
                  다음
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-slate-700 hover:bg-slate-800"
                >
                  {isSubmitting ? "제출 중..." : "신청 완료"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
