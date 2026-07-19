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

const TOPICS = [
  { value: "인간관계", label: "인간관계" },
  { value: "연애", label: "연애" },
  { value: "가족", label: "가족" },
  { value: "학업", label: "학업" },
  { value: "진로", label: "진로" },
  { value: "대학생활 적응", label: "대학생활 적응" },
  { value: "스트레스", label: "스트레스" },
  { value: "외로움", label: "외로움" },
  { value: "자신감", label: "자신감" },
  { value: "아직 잘 모르겠음", label: "아직 잘 모르겠음" },
];

const SCALE_QUESTIONS = [
  "나는 우리 대학교의 분위기에 전반적으로 잘 적응하고 있다.",
  "캠퍼스 내에서 내 고민을 언제든 편하게 털어놓을 친구가 있다.",
  "나는 학업에 관심이 있고 공부하는 것이 만족스럽다.",
  "나는 캠퍼스 내 다양한 활동(동아리, 행사 등)에 적극적으로 참여하고 있다.",
  "전반적으로 대학생활에 만족하고 있다.",
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
          toast.error("이름을 입력해주세요.");
          return false;
        }
        if (!formData.studentId.trim()) {
          toast.error("학번을 입력해주세요.");
          return false;
        }
        if (!formData.phoneNumber.trim()) {
          toast.error("휴대전화 번호를 입력해주세요.");
          return false;
        }
        if (!formData.college) {
          toast.error("단과대학을 선택해주세요.");
          return false;
        }
        if (formData.college === "기타" && !formData.collegeOther.trim()) {
          toast.error("단과대학을 입력해주세요.");
          return false;
        }
        if (!formData.department.trim()) {
          toast.error("학과를 입력해주세요.");
          return false;
        }
        if (formData.nationalityType === "international" && !formData.nationality.trim()) {
          toast.error("국적을 입력해주세요.");
          return false;
        }
        return true;

      case 2:
        if (!formData.applicationType) {
          toast.error("신청 유형을 선택해주세요.");
          return false;
        }
        if (formData.applicationType === "referred" && !formData.referredCounselorName.trim()) {
          toast.error("상담자 이름을 입력해주세요.");
          return false;
        }
        return true;

      case 3:
        if (!formData.topics && !formData.topicsOther) {
          toast.error("고민 영역을 선택해주세요.");
          return false;
        }
        return true;

      case 4:
        if (formData.scaleResponses.q1 === 0 || formData.scaleResponses.q2 === 0 || 
            formData.scaleResponses.q3 === 0 || formData.scaleResponses.q4 === 0 || 
            formData.scaleResponses.q5 === 0) {
          toast.error("모든 척도 항목에 답변해주세요.");
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
        nationalityType: formData.nationalityType,
        nationality: formData.nationality,
        topics: topicsStr,
        storyDetails: `[신청 유형: ${formData.applicationType === "referred" ? "미리 섭외받고 신청" : "직접 신청"}]\n${formData.applicationType === "referred" ? `상담자: ${formData.referredCounselorName}` : `상담 가능 시간:\n${availableTimesStr}`}\n\n${formData.storyDetails}`,
        scaleResponses: formData.scaleResponses,
      });

      setSubmitSuccess(true);
      toast.success("신청이 완료되었습니다!");
    } catch (error) {
      toast.error("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
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
              {currentStep === 1 && "기본 정보 입력"}
              {currentStep === 2 && "신청 유형 선택"}
              {currentStep === 3 && "고민 영역 및 추가 정보"}
              {currentStep === 4 && "대학생활 적응 척도 검사"}
              {currentStep === 5 && "개인정보 동의"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "또래친구 신청에 필요한 기본 정보를 입력해주세요."}
              {currentStep === 2 && "신청 유형을 선택하고 추가 정보를 입력해주세요."}
              {currentStep === 3 && "나누고 싶은 고민 영역을 선택하고 추가 내용을 작성해주세요."}
              {currentStep === 4 && "5점 리커트 척도로 대학생활 적응도를 평가해주세요."}
              {currentStep === 5 && "또래소담 프로그램 참여를 위한 필수 동의사항을 확인해주세요."}
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
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="예: 김○○"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentId">학번 *</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      placeholder="예: 20261130"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">휴대전화 번호 *</Label>
                    <Input
                      id="phone"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="예: 010-1234-5678"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="college">단과대학 *</Label>
                  <Select value={formData.college} onValueChange={(value) => setFormData({ ...formData, college: value, collegeOther: "" })}>
                    <SelectTrigger id="college">
                      <SelectValue placeholder="선택" />
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
                    <Label htmlFor="collegeOther">단과대학 입력 *</Label>
                    <Input
                      id="collegeOther"
                      value={formData.collegeOther}
                      onChange={(e) => setFormData({ ...formData, collegeOther: e.target.value })}
                      placeholder="예: 의과대학"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="department">학과 *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="예: 사회학과"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">국적 *</Label>
                  <RadioGroup value={formData.nationalityType} onValueChange={(value) => setFormData({ ...formData, nationalityType: value as "local" | "international" })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local" className="cursor-pointer">내국인</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="international" id="international" />
                      <Label htmlFor="international" className="cursor-pointer">외국인 유학생</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.nationalityType === "international" && (
                  <div>
                    <Label htmlFor="nationality">국적 *</Label>
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
                  <Label className="text-base font-semibold mb-3 block">신청 유형을 선택해주세요 *</Label>
                  <RadioGroup value={formData.applicationType} onValueChange={(value) => setFormData({ ...formData, applicationType: value as "referred" | "direct" })}>
                    <div className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value="referred" id="referred" />
                      <Label htmlFor="referred" className="cursor-pointer font-semibold">미리 섭외받고 신청</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="direct" id="direct" />
                      <Label htmlFor="direct" className="cursor-pointer font-semibold">직접 신청</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.applicationType === "referred" && (
                  <div>
                    <Label htmlFor="counselor">상담자 이름 *</Label>
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
                    <Label className="text-base font-semibold mb-3 block">상담 가능 시간 *</Label>
                    <div className="space-y-3">
                      {formData.availableTimes.map((time, index) => (
                        <div key={index} className="flex gap-2 items-end">
                          <div className="flex-1">
                            <Label className="text-sm">요일</Label>
                            <Select value={time.day} onValueChange={(value) => handleTimeChange(index, "day", value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {WEEKDAYS.map((day) => (
                                  <SelectItem key={day} value={day}>
                                    {day}요일
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm">시작 시간</Label>
                            <Select value={time.startHour} onValueChange={(value) => handleTimeChange(index, "startHour", value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour.value} value={hour.value}>
                                    {hour.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm">종료 시간</Label>
                            <Select value={time.endHour} onValueChange={(value) => handleTimeChange(index, "endHour", value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {HOURS.map((hour) => (
                                  <SelectItem key={hour.value} value={hour.value}>
                                    {hour.label}
                                  </SelectItem>
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
                  <Label className="text-base font-semibold mb-3 block">어떤 이야기를 나누고 싶나요?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {TOPICS.map((topic) => (
                      <div key={topic.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={topic.value}
                          checked={formData.topics.includes(topic.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              const newTopics = formData.topics ? `${formData.topics}, ${topic.value}` : topic.value;
                              setFormData({ ...formData, topics: newTopics });
                            } else {
                              const newTopics = formData.topics
                                .split(", ")
                                .filter((t) => t !== topic.value)
                                .join(", ");
                              setFormData({ ...formData, topics: newTopics });
                            }
                          }}
                        />
                        <Label htmlFor={topic.value} className="cursor-pointer">
                          {topic.label}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="topics-other"
                        checked={formData.topicsOther !== ""}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, topicsOther: "" });
                          } else {
                            setFormData({ ...formData, topicsOther: "" });
                          }
                        }}
                      />
                      <Label htmlFor="topics-other" className="cursor-pointer">
                        기타
                      </Label>
                    </div>
                  </div>
                  {formData.topicsOther !== "" && (
                    <div className="mt-3">
                      <Input
                        value={formData.topicsOther}
                        onChange={(e) => setFormData({ ...formData, topicsOther: e.target.value })}
                        placeholder="나누고 싶은 고민을 입력해주세요."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="story">추가 메시지 (선택사항)</Label>
                  <Textarea
                    id="story"
                    value={formData.storyDetails}
                    onChange={(e) => setFormData({ ...formData, storyDetails: e.target.value })}
                    placeholder="상담자에게 전하고 싶은 추가 메시지가 있으면 작성해주세요."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Scale Assessment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-700">
                    다음 문항들에 대해 5점 척도로 응답해주세요. (1점: 전혀 그렇지 않다 ~ 5점: 매우 그렇다)
                  </p>
                </div>

                {SCALE_QUESTIONS.map((question, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <p className="text-sm font-semibold text-slate-900 mb-3">
                      Q{index + 1}. {question}
                    </p>
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          onClick={() => {
                            const key = `q${index + 1}` as keyof typeof formData.scaleResponses;
                            setFormData({
                              ...formData,
                              scaleResponses: { ...formData.scaleResponses, [key]: score },
                            });
                          }}
                          className={`flex-1 py-2 px-1 rounded text-sm font-semibold transition-colors ${
                            formData.scaleResponses[`q${index + 1}` as keyof typeof formData.scaleResponses] === score
                              ? "bg-slate-700 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 5: Agreements */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-slate-700 font-semibold mb-2">또래소담 프로그램 참여 안내</p>
                  <p className="text-sm text-slate-700">
                    또래소담 프로그램은 또래상담자와 학생 간의 일대일 상담을 통해 대학생활의 다양한 고민을 나누는 프로그램입니다.
                  </p>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">비밀보장 및 예외사항 안내</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• 상담 내용은 비밀로 보장됩니다.</li>
                      <li>• 다만, 다음의 경우 비밀보장의 예외가 있습니다:</li>
                      <li className="ml-4">- 자살 위험이 있는 경우</li>
                      <li className="ml-4">- 타인에게 심각한 해를 끼칠 위험이 있는 경우</li>
                      <li className="ml-4">- 아동학대, 성폭력 등 법적 의무 보고 대상인 경우</li>
                      <li>• 위 경우에는 관련 기관에 보고할 수 있습니다.</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                    />
                    <Label htmlFor="privacy" className="cursor-pointer">
                      <span className="font-semibold">[필수]</span> 개인정보 수집·이용 동의
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="cursor-pointer">
                      <span className="font-semibold">[필수]</span> 또래소담 프로그램 운영 안내 확인
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="confidentiality"
                      checked={formData.agreeConfidentiality}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeConfidentiality: checked as boolean })}
                    />
                    <Label htmlFor="confidentiality" className="cursor-pointer">
                      <span className="font-semibold">[필수]</span> 비밀보장 및 예외사항 안내 확인
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t">
              {currentStep < 5 ? (
                <>
                  <Button
                    onClick={handlePrev}
                    variant="outline"
                    disabled={currentStep === 1}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    이전
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-slate-700 hover:bg-slate-800"
                  >
                    다음
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </>
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
