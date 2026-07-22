import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2 } from "lucide-react";

export default function SubmissionSuccess() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {t("message.submitSuccess")}
          </h1>
          <p className="text-slate-600">
            {t("message.submitSuccessDesc")}
          </p>
        </div>



        {/* Next Steps */}
        <Card className="border-0 shadow-lg mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">{t("message.nextSteps")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-blue-900">
              <li className="flex gap-3">
                <span className="font-bold min-w-fit">1.</span>
                <span>{t("message.step1")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold min-w-fit">2.</span>
                <span>{t("message.step2")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold min-w-fit">3.</span>
                <span>{t("message.step3")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold min-w-fit">4.</span>
                <span>{t("message.step4")}</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="px-6"
          >
            {t("button.home")}
          </Button>
          <Button
            onClick={() => navigate("/apply")}
            className="px-6 bg-slate-700 hover:bg-slate-800"
          >
            {t("button.applyAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
}
