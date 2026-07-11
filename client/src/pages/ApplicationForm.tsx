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

const COLLEGES = [
  "인문과학대학",
  "사회과학대학",
  "자연과학대학",
  "공과대학",
];

const TOPICS = [
  { value: "학업", label: "학업 및 성적 관리" },
  { value: "진로", label: "진로 탐색 및 취업" },
  { value: "대인관계", label: "동기/선후배 대인관계" },
  { value: "적응", label: "대학생활 전반 적응" },
  { value: "정서", label: "우울, 불안, 스트레스" },
];

const SCALE_QUESTIONS = [
  "나는 우리 대학교의 분위기에 전반적으로 잘 적응하고 있다.",
  "캠퍼스 내에서 내 고민을 언제든 편하게 털어놓을 친구가 있다.",
  "나는 학업에 관심이 있고 공부하는 것이 만족스럽다.",
  "나는 캠퍼스 내 다양한 활동(동아리, 행사 등)에 적극적으로 참여하고 있다.",
  "전반적으로 대학생활에 만족하고 있다.",
];

interface FormData {
  // Step 1
  studentName: string;
  studentId: string;
  phoneNumber: string;
  college: string;
  department: string;
  nationalityType: "local" | "international";
  nationality: string;
  // Step 2
  topics: string[];
  storyDetails: string;
  // Step 3
  scaleResponses: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
  };
  // Step 4
  agreePrivacy: boolean;
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    studentId: "",
    phoneNumber: "",
    college: "",
    department: "",
    nationalityType: "local",
    nationality: "",
    topics: [],
    storyDetails: "",
    scaleResponses: { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 },
    agreePrivacy: false,
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
          toast.error("전화번호를 입력해주세요.");
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
        if (formData.topics.length === 0) {
          toast.error("상담 주제를 최소 하나 선택해주세요.");
          return false;
        }
        return true;
      case 3:
        if (
          formData.scaleResponses.q1 === 0 ||
          formData.scaleResponses.q2 === 0 ||
          formData.scaleResponses.q3 === 0 ||
          formData.scaleResponses.q4 === 0 ||
          formData.scaleResponses.q5 === 0
        ) {
          toast.error("모든 문항에 답변해주세요.");
          return false;
        }
        return true;
      case 4:
        if (!formData.agreePrivacy) {
          toast.error("개인정보 수집 및 이용에 동의해주세요.");
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

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      await createApplicationMutation.mutateAsync({
        studentName: formData.studentName,
        studentId: formData.studentId,
        phoneNumber: formData.phoneNumber,
        college: formData.college,
        department: formData.department,
        nationalityType: formData.nationalityType,
        nationality: formData.nationality || undefined,
        topics: JSON.stringify(formData.topics),
        storyDetails: formData.storyDetails,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="mb-4 text-5xl">🎉</div>
            <CardTitle className="text-2xl">신청 완료</CardTitle>
            <CardDescription className="mt-2">
              또래동반자 상담 신청이 정상적으로 접수되었습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-semibold mb-2">📞 다음 단계</p>
              <p>
                매칭이 완료되면 남겨주신 연락처로 안내해 드릴 예정입니다. 잠시만 기다려주세요.
              </p>
            </div>
            <Button
              onClick={() => window.location.href = "/"}
              className="w-full bg-slate-700 hover:bg-slate-800"
            >
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">또래동반자 상담 신청</h1>
          <p className="text-slate-600">
            비슷한 고민을 품고 걷는 캠퍼스 친구, 또래소담자가 늘 네 곁에 있어.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step <= currentStep
                      ? "bg-slate-700 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 mt-2 transition-all ${
                      step < currentStep ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "01. 나를 알려주세요"}
              {currentStep === 2 && "02. 어떤 이야기를 나누고 싶나요?"}
              {currentStep === 3 && "03. 마음 날씨 체크"}
              {currentStep === 4 && "04. 최종 확인"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="studentName">이름</Label>
                  <Input
                    id="studentName"
                    placeholder="이름을 입력해주세요"
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData({ ...formData, studentName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="studentId">학번</Label>
                  <Input
                    id="studentId"
                    placeholder="예: 202612345"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">전화번호</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="예: 010-1234-5678"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="college">단과대학</Label>
                  <Select value={formData.college} onValueChange={(value) =>
                    setFormData({ ...formData, college: value })
                  }>
                    <SelectTrigger id="college">
                      <SelectValue placeholder="단과대학을 선택해주세요" />
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
                  <Label htmlFor="department">학과</Label>
                  <Input
                    id="department"
                    placeholder="학과명을 정확히 입력해주세요"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>국적 구분</Label>
                  <RadioGroup
                    value={formData.nationalityType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        nationalityType: value as "local" | "international",
                        nationality: value === "local" ? "" : formData.nationality,
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local" className="font-normal cursor-pointer">
                        대한민국
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="international" id="international" />
                      <Label htmlFor="international" className="font-normal cursor-pointer">
                        외국인 유학생
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.nationalityType === "international" && (
                  <div>
                    <Label htmlFor="nationality">국적 입력</Label>
                    <Input
                      id="nationality"
                      placeholder="예: 베트남, 중국 등"
                      value={formData.nationality}
                      onChange={(e) =>
                        setFormData({ ...formData, nationality: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Topics */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">
                    대학생활 중 가장 고민되는 주제는 무엇인가요? (복수 선택 가능)
                  </Label>
                  <div className="space-y-2">
                    {TOPICS.map((topic) => (
                      <div key={topic.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={topic.value}
                          checked={formData.topics.includes(topic.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                topics: [...formData.topics, topic.value],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                topics: formData.topics.filter((t) => t !== topic.value),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={topic.value} className="font-normal cursor-pointer">
                          {topic.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="storyDetails">
                    또래소담자와 특별히 나누고 싶은 구체적인 이야기 (주관식)
                  </Label>
                  <Textarea
                    id="storyDetails"
                    placeholder="마음에 품고 있는 고민을 편안하게 한두 줄로 풀어놓아 주세요."
                    rows={5}
                    value={formData.storyDetails}
                    onChange={(e) =>
                      setFormData({ ...formData, storyDetails: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 3: Scale Assessment */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 mb-4">
                  각 문항을 읽고 현재 본인의 상태와 가장 가까운 보기를 선택해주세요.
                </p>
                {SCALE_QUESTIONS.map((question, index) => {
                  const qKey = `q${index + 1}` as keyof typeof formData.scaleResponses;
                  return (
                    <div
                      key={index}
                      className="bg-slate-50 p-4 rounded-lg border border-slate-200"
                    >
                      <p className="font-medium text-slate-900 mb-3">
                        {index + 1}. {question}
                      </p>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                scaleResponses: {
                                  ...formData.scaleResponses,
                                  [qKey]: value,
                                },
                              })
                            }
                            className={`py-2 px-1 text-xs font-medium rounded transition-all ${
                              formData.scaleResponses[qKey] === value
                                ? "bg-slate-700 text-white"
                                : "bg-white border border-slate-300 text-slate-600 hover:border-slate-400"
                            }`}
                          >
                            {value === 1 && "전혀\n아니다"}
                            {value === 2 && "아니다"}
                            {value === 3 && "보통"}
                            {value === 4 && "그렇다"}
                            {value === 5 && "매우\n그렇다"}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 4: Privacy Agreement */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">신청 정보 확인</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>
                      <strong>이름:</strong> {formData.studentName}
                    </p>
                    <p>
                      <strong>학번:</strong> {formData.studentId}
                    </p>
                    <p>
                      <strong>연락처:</strong> {formData.phoneNumber}
                    </p>
                    <p>
                      <strong>단과대학:</strong> {formData.college}
                    </p>
                    <p>
                      <strong>학과:</strong> {formData.department}
                    </p>
                    <p>
                      <strong>국적:</strong>{" "}
                      {formData.nationalityType === "local"
                        ? "대한민국"
                        : `외국인 (${formData.nationality})`}
                    </p>
                    <p>
                      <strong>상담 주제:</strong> {formData.topics.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreePrivacy: checked as boolean })
                      }
                    />
                    <Label htmlFor="privacy" className="font-normal cursor-pointer text-sm">
                      개인정보 수집 및 이용에 동의합니다. 수집된 정보는 또래소담 프로그램 운영 및 매칭 목적으로만 사용되며, 관련 법규에 따라 보호됩니다.
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex-1"
              >
                이전
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-slate-700 hover:bg-slate-800"
                >
                  다음
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-slate-700 hover:bg-slate-800"
                >
                  {isSubmitting ? "제출 중..." : "상담 신청 완료하기"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
