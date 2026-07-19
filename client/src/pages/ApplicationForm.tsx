import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ApplicationForm() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return t("step.1.title");
      case 2:
        return t("step.2.title");
      case 3:
        return t("step.3.title");
      default:
        return "";
    }
  };

  const getStepDesc = () => {
    switch (step) {
      case 1:
        return t("step.1.desc");
      case 2:
        return t("step.2.desc");
      case 3:
        return t("step.3.desc");
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
            <p className="text-sm text-slate-600 mt-2">{getStepDesc()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>{t("form.name")}</Label>
                  <Input placeholder={t("placeholder.name")} />
                </div>
                <div>
                  <Label>{t("form.studentId")}</Label>
                  <Input placeholder={t("placeholder.studentId")} />
                </div>
                <div>
                  <Label>{t("form.phone")}</Label>
                  <Input placeholder={t("placeholder.phone")} />
                </div>
                <div>
                  <Label>{t("form.department")}</Label>
                  <Input placeholder={t("placeholder.department")} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>{t("form.applicationType")}</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-slate-50">
                      <input type="radio" id="referred" name="appType" />
                      <label htmlFor="referred" className="cursor-pointer flex-1">
                        {t("form.applicationType.referred")}
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-slate-50">
                      <input type="radio" id="direct" name="appType" />
                      <label htmlFor="direct" className="cursor-pointer flex-1">
                        {t("form.applicationType.direct")}
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>{t("form.topics")}</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      "form.topics.relationships",
                      "form.topics.dating",
                      "form.topics.family",
                      "form.topics.academics",
                      "form.topics.career",
                    ].map((key) => (
                      <div key={key} className="flex items-center gap-2">
                        <input type="checkbox" id={key} />
                        <label htmlFor={key} className="cursor-pointer">
                          {t(key)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="privacy" />
                    <label htmlFor="privacy" className="cursor-pointer text-sm">
                      {t("agreement.privacy")}
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms" className="cursor-pointer text-sm">
                      {t("agreement.terms")}
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="confidentiality" />
                    <label htmlFor="confidentiality" className="cursor-pointer text-sm">
                      {t("agreement.confidentiality.check")}
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between gap-4 mt-8 pt-6 border-t">
              <Button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                variant="outline"
              >
                {t("button.prev")}
              </Button>

              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)} className="bg-slate-700 hover:bg-slate-800">
                  {t("button.next")}
                </Button>
              ) : (
                <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
                  {t("button.submit")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
