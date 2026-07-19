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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>
              {step === 1 && "기본 정보"}
              {step === 2 && "신청 유형"}
              {step === 3 && "동의"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>이름</Label>
                  <Input placeholder="이름을 입력하세요" />
                </div>
                <div>
                  <Label>학번</Label>
                  <Input placeholder="학번을 입력하세요" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p>신청 유형을 선택하세요</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p>약관에 동의하세요</p>
              </div>
            )}

            <div className="flex justify-between gap-4 mt-8">
              <Button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                variant="outline"
              >
                이전
              </Button>

              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)} className="bg-slate-700 hover:bg-slate-800">
                  다음
                </Button>
              ) : (
                <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
                  완료
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
