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
  "인문과학대학",
  "사회과학대학",
  "자연과학대학",
  "공과대학",
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
  { value: "기타", label: "기타" },
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
  department: string;
  nationalityType: "local" | "international";
  nationality: string;
  
  // Step 2: Application Type
  applicationType: "referred" | "direct" | "";
  referredCounselorName: string;
  availableTimes: AvailableTime[];
  
  // Step 3: Topics & Additional Info
  topics: string;
  storyDetails: string;
  
  // Step 4: Scale Assessment
  scaleResponses: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
  };
  
  // Agreements
  agreePrivacy: boolean;
  agreeTerms: boolean;
}

export default function ApplicationForm() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    studentId: "",
    phoneNumber: "",
    college: "",
    department: "",
    nationalityType: "local",
    nationality: "",
    applicationType: "",
    referredCounselorName: "",
    availableTimes: [{ day: "월", startHour: "09", endHour: "10" }],
    topics: "",
    storyDetails: "",
    scaleResponses: { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 },
    agreePrivacy: false,
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const createApplicationMutation = trpc.applications.create.useMutation();

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
          toast.error("진행할 또래상담자 이름을 입력해주세요.");
          return false;
        }
        if (formData.applicationType === "direct" && formData.availableTimes.length === 0) {
          toast.error("최소 한 개 이상의 상담 가능 시간을 입력해주세요.");
          return false;
        }
        return true;

      case 3:
        return true;

      case 4:
        if (formData.scaleResponses.q1 === 0 || formData.scaleResponses.q2 === 0 || 
            formData.scaleResponses.q3 === 0 || formData.scaleResponses.q4 === 0 || 
            formData.scaleResponses.q5 === 0) {
          toast.error("모든 척도 항목에 답변해주세요.");
          return false;
        }
        if (!formData.agreePrivacy) {
          toast.error("개인정보 수집·이용 동의를 확인해주세요.");
          return false;
        }
        if (!formData.agreeTerms) {
          toast.error("또래상담 운영 및 비밀보장 예외 안내를 확인해주세요.");
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddTime = () => {
    setFormData({
      ...formData,
      availableTimes: [...formData.availableTimes, { day: "월", startHour: "09", endHour: "10" }],
    });
  };

  const handleRemoveTime = (index: number) => {
    setFormData({
      ...formData,
      availableTimes: formData.availableTimes.filter((_, i) => i !== index),
    });
  };

  const handleUpdateTime = (index: number, field: keyof AvailableTime, value: string) => {
    const newTimes = [...formData.availableTimes];
    newTimes[index] = { ...newTimes[index], [field]: value };
    setFormData({ ...formData, availableTimes: newTimes });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const availableTimesStr = formData.applicationType === "direct"
        ? formData.availableTimes
            .map((t) => `${t.day}요일 ${t.startHour}:00~${t.endHour}:00`)
            .join("\n")
        : "";

      await createApplicationMutation.mutateAsync({
        studentName: formData.studentName,
        studentId: formData.studentId,
        phoneNumber: formData.phoneNumber,
        college: formData.college,
        department: formData.department,
        nationalityType: formData.nationalityType,
        nationality: formData.nationality,
        topics: formData.topics,
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="text-5xl mb-4">✓</div>
              <CardTitle className="text-3xl">또래친구 신청이 완료되었어요.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-slate-700">
                  작성해 주신 내용을 담당자가 확인한 후 입력하신 연락처로 안내드릴 예정입니다.
                </p>
              </div>

              {formData.applicationType === "referred" && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-slate-700">
                    작성하신 또래상담자 정보를 확인한 후 상담 진행과 관련된 안내를 드릴 예정입니다.
                  </p>
                </div>
              )}

              {formData.applicationType === "direct" && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-slate-700">
                    작성하신 상담 가능 시간을 바탕으로 또래상담자를 매칭한 후 연락드릴 예정입니다.
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm text-slate-600">
                <p>• 담당자 연락처: 학생상담센터</p>
                <p>• 긴급상황: 112, 119, 자살예방상담전화 109</p>
              </div>

              <Button
                onClick={() => navigate("/")}
                className="w-full bg-slate-700 hover:bg-slate-800"
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-slate-600 hover:text-slate-900 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">또래친구 신청</h1>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= step
                    ? "bg-slate-700 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? "bg-slate-700" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "기본 정보 입력"}
              {currentStep === 2 && "신청 유형 선택"}
              {currentStep === 3 && "고민 영역 및 추가 정보"}
              {currentStep === 4 && "대학생활 적응 척도 검사"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "또래친구 신청에 필요한 기본 정보를 입력해주세요."}
              {currentStep === 2 && "신청 유형을 선택하고 추가 정보를 입력해주세요."}
              {currentStep === 3 && "나누고 싶은 고민 영역을 선택하고 추가 내용을 작성해주세요."}
              {currentStep === 4 && "5점 리커트 척도로 대학생활 적응도를 평가해주세요."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
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
                      placeholder="예: 2026130"
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
                  <Select value={formData.college} onValueChange={(value) => setFormData({ ...formData, college: value })}>
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
                  <RadioGroup value={formData.nationalityType} onValueChange={(value: any) => setFormData({ ...formData, nationalityType: value })}>
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
                    <Label htmlFor="nationality">국적 입력 *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      placeholder="예: 베트남"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Application Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">어떤 방식으로 또래상담을 신청하시나요? *</Label>
                  <RadioGroup value={formData.applicationType} onValueChange={(value: any) => setFormData({ ...formData, applicationType: value })}>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="referred" id="referred" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="referred" className="font-semibold cursor-pointer">
                            미리 섭외받고 신청
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            이미 상담을 진행하기로 한 또래상담자가 있는 경우 선택해 주세요.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="direct" id="direct" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="direct" className="font-semibold cursor-pointer">
                            직접 신청
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            아직 정해진 또래상담자가 없으며, 상담 가능한 시간에 맞춰 매칭을 원하는 경우 선택해 주세요.
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Referred Counselor Name */}
                {formData.applicationType === "referred" && (
                  <div>
                    <Label htmlFor="counselorName">진행할 또래상담자 이름 *</Label>
                    <p className="text-sm text-slate-600 mb-2">
                      미리 상담을 진행하기로 한 또래상담자의 이름을 작성해 주세요.
                    </p>
                    <Input
                      id="counselorName"
                      value={formData.referredCounselorName}
                      onChange={(e) => setFormData({ ...formData, referredCounselorName: e.target.value })}
                      placeholder="예: 김○○"
                    />
                  </div>
                )}

                {/* Available Times */}
                {formData.applicationType === "direct" && (
                  <div>
                    <Label className="text-base font-semibold mb-2 block">상담 가능한 시간을 작성해 주세요. *</Label>
                    <p className="text-sm text-slate-600 mb-4">
                      월요일부터 금요일, 오전 9시부터 오후 6시 사이에서 가능한 요일과 시간을 작성해 주세요. 가능한 시간을 여러 개 작성하면 매칭이 더 원활합니다.
                    </p>

                    <div className="space-y-3">
                      {formData.availableTimes.map((time, index) => (
                        <div key={index} className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label className="text-xs text-slate-600">요일</Label>
                            <Select value={time.day} onValueChange={(value) => handleUpdateTime(index, "day", value)}>
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
                            <Label className="text-xs text-slate-600">시작 시간</Label>
                            <Select value={time.startHour} onValueChange={(value) => handleUpdateTime(index, "startHour", value)}>
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
                            <Label className="text-xs text-slate-600">종료 시간</Label>
                            <Select value={time.endHour} onValueChange={(value) => handleUpdateTime(index, "endHour", value)}>
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

                          {formData.availableTimes.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveTime(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              삭제
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddTime}
                      className="mt-3"
                    >
                      + 다른 가능 시간 추가하기
                    </Button>
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
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalMessage">또래상담자에게 미리 전하고 싶은 내용</Label>
                  <p className="text-sm text-slate-600 mb-2">
                    자세한 사연을 모두 작성하지 않아도 됩니다. 상담자가 미리 알면 좋을 내용만 편하게 작성해 주세요.
                  </p>
                  <Textarea
                    id="additionalMessage"
                    value={formData.storyDetails}
                    onChange={(e) => setFormData({ ...formData, storyDetails: e.target.value })}
                    placeholder="선택사항입니다."
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
                    다음 문항들을 읽고 자신의 생각과 가장 가깝다고 생각하는 번호를 선택해주세요.
                  </p>
                </div>

                {SCALE_QUESTIONS.map((question, index) => {
                  const qKey = `q${index + 1}` as keyof typeof formData.scaleResponses;
                  return (
                    <div key={index} className="space-y-3 pb-6 border-b last:border-b-0">
                      <Label className="font-semibold text-slate-900">
                        {index + 1}. {question}
                      </Label>
                      <RadioGroup
                        value={formData.scaleResponses[qKey].toString()}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            scaleResponses: {
                              ...formData.scaleResponses,
                              [qKey]: parseInt(value),
                            },
                          })
                        }
                      >
                        <div className="flex gap-4">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <div key={score} className="flex items-center space-x-2">
                              <RadioGroupItem value={score.toString()} id={`q${index + 1}_${score}`} />
                              <Label htmlFor={`q${index + 1}_${score}`} className="cursor-pointer">
                                {score}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>전혀 그렇지 않다</span>
                        <span>매우 그렇다</span>
                      </div>
                    </div>
                  );
                })}

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
                      <span className="font-semibold">[필수]</span> 또래상담 운영 및 비밀보장 예외 안내 확인
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Navigation Buttons */}
          <div className="flex gap-3 p-6 border-t">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                이전
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                className={`flex-1 bg-slate-700 hover:bg-slate-800 ${currentStep === 1 ? "w-full" : ""}`}
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
        </Card>
      </div>
    </div>
  );
}
