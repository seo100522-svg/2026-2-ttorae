import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";

interface AUCCQResponse {
  [key: number]: number; // question number -> score (1-5)
}

interface AUCCQScaleProps {
  responses: AUCCQResponse;
  onResponseChange: (questionNumber: number, score: number) => void;
}

export function AUCCQScale({ responses, onResponseChange }: AUCCQScaleProps) {
  const { t } = useLanguage();

  const questions = Array.from({ length: 20 }, (_, i) => i + 1);
  const scales = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{t("form.auccq.label")}</h3>
        <p className="text-sm text-slate-600 mb-4">{t("form.auccq.instruction")}</p>
      </div>

      <div className="space-y-6">
        {questions.map((questionNum) => (
          <div key={questionNum} className="border-b pb-4">
            <div className="mb-3">
              <Label className="text-sm font-medium">
                {questionNum}. {t(`form.auccq.q${questionNum}`)}
              </Label>
            </div>

            <RadioGroup
              value={responses[questionNum]?.toString() || ""}
              onValueChange={(value) => onResponseChange(questionNum, parseInt(value))}
            >
              <div className="flex gap-4 flex-wrap">
                {scales.map((scale) => (
                  <div key={scale} className="flex items-center space-x-2">
                    <RadioGroupItem value={scale.toString()} id={`q${questionNum}_s${scale}`} />
                    <Label
                      htmlFor={`q${questionNum}_s${scale}`}
                      className="font-normal cursor-pointer text-xs sm:text-sm"
                    >
                      {scale}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {/* Optional: Show scale labels below */}
            <div className="flex gap-4 flex-wrap mt-2 text-xs text-slate-500">
              <span className="flex-1 min-w-fit">{t("form.auccq.scale.1")}</span>
              <span className="flex-1 min-w-fit text-center">{t("form.auccq.scale.3")}</span>
              <span className="flex-1 min-w-fit text-right">{t("form.auccq.scale.5")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
