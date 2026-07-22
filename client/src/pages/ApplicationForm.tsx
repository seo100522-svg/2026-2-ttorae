import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { AUCCQScale } from "@/components/AUCCQScale";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

interface FormData {
  // Step 1: Basic Info
  studentName: string;
  studentId: string;
  phoneNumber: string;
  college: string;
  department: string;
  gender: string;
  grade: string;
  nationalityType: "local" | "international";
  nationality: string;
  // Step 2: Application Type & Conditional
  applicationType: "pre_arranged" | "direct" | "";
  counselorName: string;
  agreedSchedule: string;
  availableTimes: Array<{ day: string; startTime: string; endTime: string }>;
  // Step 3: Topics & Scale
  topics: string[];
  additionalMessage: string;
  scaleResponses: Record<number, number>;
  // Step 4: Agreements
  agreePrivacy: boolean;
  agreeConfidentiality: boolean;
}

export default function ApplicationForm() {
  const { t, language } = useLanguage();
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const createApplicationMutation = trpc.applications.create.useMutation();
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    studentId: "",
    phoneNumber: "",
    college: "",
    department: "",
    gender: "",
    grade: "",
    nationalityType: "local",
    nationality: "",
    applicationType: "",
    counselorName: "",
    agreedSchedule: "",
    availableTimes: [],
    topics: [],
    additionalMessage: "",
    scaleResponses: {},
    agreePrivacy: false,
    agreeConfidentiality: false,
  });

  const colleges = [
    { ko: "인문사회대학", en: "College of Humanities & Social Sciences", ja: "人文社会科学部" },
    { ko: "글로벌비즈니스대학", en: "Global Business College", ja: "グローバルビジネス学部" },
    { ko: "공과대학", en: "College of Engineering", ja: "工学部" },
    { ko: "소프트웨어융합대학", en: "College of Software Convergence", ja: "ソフトウェア融合学部" },
    { ko: "신학대학", en: "College of Theology", ja: "神学部" },
    { ko: "건강보건대학", en: "College of Health & Wellness", ja: "健康保健学部" },
    { ko: "예술체육대학", en: "College of Arts & Physical Education", ja: "芸術体育学部" },
    { ko: "자율전공대학", en: "College of Self-Designed Major", ja: "自律専攻学部" },
  ];

  const getCollegeLabel = (college: string) => {
    const collegeObj = colleges.find(c => c.ko === college || c.en === college || c.ja === college);
    if (!collegeObj) return college;
    if (language === "en") return collegeObj.en;
    if (language === "ja") return collegeObj.ja;
    return collegeObj.ko;
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.studentName.trim()) {
          toast.error(t("error.nameRequired"));
          return false;
        }
        if (!formData.studentId.trim()) {
          toast.error(t("error.studentIdRequired"));
          return false;
        }
        if (!formData.phoneNumber.trim()) {
          toast.error(t("error.phoneRequired"));
          return false;
        }
        if (!formData.college) {
          toast.error(t("error.collegeRequired"));
          return false;
        }
        if (!formData.department.trim()) {
          toast.error(t("error.departmentRequired"));
          return false;
        }
        if (!formData.gender) {
          toast.error(t("error.genderRequired"));
          return false;
        }
        if (!formData.grade) {
          toast.error(t("error.gradeRequired"));
          return false;
        }
        if (formData.nationalityType === "international" && !formData.nationality.trim()) {
          toast.error(t("error.nationalityRequired"));
          return false;
        }
        return true;

      case 2:
        if (!formData.applicationType) {
          toast.error(t("error.applicationTypeRequired"));
          return false;
        }
        if (formData.applicationType === "pre_arranged" && !formData.counselorName.trim()) {
          toast.error(t("error.counselorNameRequired"));
          return false;
        }
        if (formData.applicationType === "direct" && formData.availableTimes.length === 0) {
          toast.error(t("error.availableTimeRequired"));
          return false;
        }
        return true;

      case 3:
        if (formData.topics.length === 0) {
          toast.error(t("error.topicsRequired"));
          return false;
        }
        return true;

      case 4:
        if (!formData.agreePrivacy) {
          toast.error(t("error.privacyRequired"));
          return false;
        }
        if (!formData.agreeConfidentiality) {
          toast.error(t("error.confidentialityRequired"));
          return false;
        }
        return true;

      case 5:
        // Check if all 20 AUCCQ questions are answered
        const answeredQuestions = Object.keys(formData.scaleResponses).length;
        if (answeredQuestions < 20) {
          toast.error(t("error.auccqRequired"));
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

  const handleAddTime = () => {
    setFormData({
      ...formData,
      availableTimes: [...formData.availableTimes, { day: "", startTime: "09:00", endTime: "18:00" }],
    });
  };

  const handleRemoveTime = (index: number) => {
    setFormData({
      ...formData,
      availableTimes: formData.availableTimes.filter((_, i) => i !== index),
    });
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return t("form.step1.title");
      case 2:
        return t("form.step2.title");
      case 3:
        return t("form.step3.title");
      case 4:
        return t("form.step4.title");
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("form.title")}</h1>
          <p className="text-slate-600">{t("form.subtitle")}</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((step) => (
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
                {step < 5 && (
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
            <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>{t("form.name")}</Label>
                  <Input
                    placeholder={t("placeholder.name")}
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                </div>

                <div>
                  <Label>{t("form.studentId")}</Label>
                  <Input
                    placeholder={t("placeholder.studentId")}
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  />
                </div>

                <div>
                  <Label>{t("form.phone")}</Label>
                  <Input
                    placeholder={t("placeholder.phone")}
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>

                <div>
                  <Label>{t("form.college")}</Label>
                  <Select value={formData.college} onValueChange={(value) =>
                    setFormData({ ...formData, college: value })
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder={t("placeholder.selectCollege")} />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college.ko} value={college.ko}>
                          {getCollegeLabel(college.ko)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{t("form.department")}</Label>
                  <Input
                    placeholder={t("placeholder.department")}
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>

                <div>
                  <Label>{t("form.gender")}</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal cursor-pointer">{t("form.gender.male")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal cursor-pointer">{t("form.gender.female")}</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>{t("form.grade")}</Label>
                  <Select value={formData.grade} onValueChange={(value) =>
                    setFormData({ ...formData, grade: value })
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder={t("placeholder.selectGrade")} />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4"].map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {t(`form.grade.${grade}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{t("form.nationality.label")}</Label>
                  <RadioGroup value={formData.nationalityType} onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      nationalityType: value as "local" | "international",
                      nationality: value === "local" ? "" : formData.nationality,
                    })
                  }>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local" className="font-normal cursor-pointer">{t("form.nationality.domestic")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="international" id="international" />
                      <Label htmlFor="international" className="font-normal cursor-pointer">{t("form.nationality.international")}</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.nationalityType === "international" && (
                  <div>
                    <Label>{t("form.nationality.input")}</Label>
                    <Input
                      placeholder={t("placeholder.nationality")}
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Application Type & Conditional */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>{t("form.applicationType.label")}</Label>
                  <RadioGroup value={formData.applicationType} onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      applicationType: value as "pre_arranged" | "direct",
                      counselorName: "",
                      availableTimes: [],
                    })
                  }>
                    <div className="flex items-start space-x-2 p-3 border rounded cursor-pointer hover:bg-slate-50">
                      <RadioGroupItem value="pre_arranged" id="pre_arranged" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="pre_arranged" className="font-normal cursor-pointer">
                          {t("form.applicationType.preArranged")}
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 p-3 border rounded cursor-pointer hover:bg-slate-50">
                      <RadioGroupItem value="direct" id="direct" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="direct" className="font-normal cursor-pointer">
                          {t("form.applicationType.direct")}
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.applicationType === "pre_arranged" && (
                  <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div>
                      <Label>{t("form.counselorName.label")}</Label>
                      <p className="text-sm text-slate-600 mb-2">{t("form.counselorName.hint")}</p>
                      <Input
                        placeholder={t("placeholder.counselorName")}
                        value={formData.counselorName}
                        onChange={(e) => setFormData({ ...formData, counselorName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>{t("form.agreedSchedule.label")} ({t("form.optional")})</Label>
                      <Textarea
                        placeholder={t("placeholder.agreedSchedule")}
                        rows={3}
                        value={formData.agreedSchedule}
                        onChange={(e) => setFormData({ ...formData, agreedSchedule: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {formData.applicationType === "direct" && (
                  <div className="space-y-4 bg-green-50 p-4 rounded-lg border border-green-200">
                    <div>
                      <Label>{t("form.availableTime.label")}</Label>
                      <p className="text-sm text-slate-600 mb-3">{t("form.availableTime.hint")}</p>
                      {formData.availableTimes.map((time, index) => (
                        <div key={index} className="flex gap-2 mb-3 items-end">
                          <Select value={time.day} onValueChange={(value) => {
                            const newTimes = [...formData.availableTimes];
                            newTimes[index].day = value;
                            setFormData({ ...formData, availableTimes: newTimes });
                          }}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder={t("placeholder.day")} />
                            </SelectTrigger>
                            <SelectContent>
                              {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
                                <SelectItem key={day} value={day}>
                                  {t(`form.day.${day}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="time"
                            value={time.startTime}
                            onChange={(e) => {
                              const newTimes = [...formData.availableTimes];
                              newTimes[index].startTime = e.target.value;
                              setFormData({ ...formData, availableTimes: newTimes });
                            }}
                            className="w-24"
                          />
                          <span>-</span>
                          <Input
                            type="time"
                            value={time.endTime}
                            onChange={(e) => {
                              const newTimes = [...formData.availableTimes];
                              newTimes[index].endTime = e.target.value;
                              setFormData({ ...formData, availableTimes: newTimes });
                            }}
                            className="w-24"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveTime(index)}
                          >
                            {t("button.delete")}
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={handleAddTime}
                        className="w-full"
                      >
                        {t("button.addTime")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Topics & Scale */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>{t("form.topics.label")}</Label>
                  <div className="space-y-2 mt-3">
                    {[
                      "relationships",
                      "dating",
                      "family",
                      "academics",
                      "career",
                      "adaptation",
                      "stress",
                      "loneliness",
                      "confidence",
                      "other",
                      "unknown",
                    ].map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <Checkbox
                          id={topic}
                          checked={formData.topics.includes(topic)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                topics: [...formData.topics, topic],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                topics: formData.topics.filter((t) => t !== topic),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={topic} className="font-normal cursor-pointer">
                          {t(`form.topics.${topic}`)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>{t("form.additionalMessage.label")} ({t("form.optional")})</Label>
                  <p className="text-sm text-slate-600 mb-2">{t("form.additionalMessage.hint")}</p>
                  <Textarea
                    placeholder={t("placeholder.additionalMessage")}
                    rows={4}
                    maxLength={500}
                    value={formData.additionalMessage}
                    onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.additionalMessage.length}/500
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Agreements & Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">{t("form.confirmInfo")}</h3>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p><strong>{t("form.name")}:</strong> {formData.studentName}</p>
                    <p><strong>{t("form.studentId")}:</strong> {formData.studentId}</p>
                    <p><strong>{t("form.phone")}:</strong> {formData.phoneNumber}</p>
                    <p><strong>{t("form.college")}:</strong> {getCollegeLabel(formData.college)}</p>
                    <p><strong>{t("form.department")}:</strong> {formData.department}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 border rounded">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreePrivacy: checked as boolean })
                      }
                    />
                    <Label htmlFor="privacy" className="font-normal cursor-pointer text-sm">
                      {t("form.agreement.privacy")}
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded">
                    <Checkbox
                      id="confidentiality"
                      checked={formData.agreeConfidentiality}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeConfidentiality: checked as boolean })
                      }
                    />
                    <Label htmlFor="confidentiality" className="font-normal cursor-pointer text-sm">
                      {t("form.agreement.confidentiality")}
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: AUCCQ Scale */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{t("form.step5.title")}</h2>
                </div>
                <AUCCQScale
                  responses={formData.scaleResponses}
                  onResponseChange={(questionNumber, score) => {
                    setFormData({
                      ...formData,
                      scaleResponses: {
                        ...formData.scaleResponses,
                        [questionNumber]: score,
                      },
                    });
                  }}
                />
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
                {t("button.prev")}
              </Button>
              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-slate-700 hover:bg-slate-800"
                >
                  {t("button.next")}
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    if (validateStep(5)) {
                      try {
                        await createApplicationMutation.mutateAsync({
                          studentName: formData.studentName,
                          studentId: formData.studentId,
                          phoneNumber: formData.phoneNumber,
                          college: formData.college,
                          department: formData.department,
                          gender: formData.gender as "male" | "female" | "other",
                          grade: formData.grade,
                          nationalityType: formData.nationalityType,
                          nationality: formData.nationality,
                          applicationType: formData.applicationType as "pre_arranged" | "direct",
                          counselorName: formData.counselorName,
                          agreedSchedule: formData.agreedSchedule,
                          availableTimes: formData.availableTimes,
                          topics: formData.topics,
                          additionalMessage: formData.additionalMessage,
                          agreePrivacy: formData.agreePrivacy,
                          agreeConfidentiality: formData.agreeConfidentiality,
                        });
                        toast.success(t("message.submitSuccess"));
                        navigate("/success");
                      } catch (error) {
                        toast.error(t("error.submitFailed") || "Failed to submit application");
                        console.error("Submission error:", error);
                      }
                    }
                  }}
                  disabled={createApplicationMutation.isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {createApplicationMutation.isPending ? t("button.submitting") || "Submitting..." : t("button.submit")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
