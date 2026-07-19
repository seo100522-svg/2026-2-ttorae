import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">또래소담 프로그램</h1>
          <Button
            onClick={() => navigate("/apply")}
            className="bg-slate-700 hover:bg-slate-800"
          >
            신청하기
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-2">
                대학생활의 든든한 동반자,<br />또래소담 프로그램
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                학교생활, 인간관계, 진로 등 대학생활의 고민을 또래소담 프로그램을 통해 편안하게 나누어 보세요.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                이 페이지는 또래소담 프로그램에 참여할 '또래친구' 신청 페이지입니다.
              </p>
            </div>
            <Button
              onClick={() => navigate("/apply")}
              size="lg"
              className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-6 text-lg"
            >
              또래친구 신청하기
              </Button>
            </div>

          {/* Decorative Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-pink-200/30 rounded-3xl blur-3xl" />
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
              <div className="space-y-4">
                <div className="h-3 bg-blue-200 rounded-full w-3/4" />
                <div className="h-3 bg-pink-200 rounded-full w-5/6" />
                <div className="h-3 bg-blue-100 rounded-full w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            또래소담 프로그램은 어떤 프로그램인가요?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "또래상담자와 1:1 매칭",
                description: "또래소담 프로그램의 또래상담자와 1:1로 매칭되어 상담을 진행합니다.",
                icon: "👥",
              },
              {
                title: "학교생활과 일상의 고민",
                description: "학업, 인간관계, 진로 등 일상적인 고민을 나눕니다.",
                icon: "💬",
              },
              {
                title: "비교과 점수 5점 부여",
                description: "또래소담 프로그램 참여 시 비교과 점수 5점이 부여됩니다.",
                icon: "🎯",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            신청 절차
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "기본 정보 입력", desc: "이름, 학번, 학과, 연락처를 입력합니다." },
              { step: 2, title: "신청 유형 선택", desc: "미리 정해진 상담자가 있는지 선택합니다." },
              { step: 3, title: "신청 완료", desc: "동의 후 신청을 완료합니다." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
                {item.step < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-300 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            지금 바로 신청하세요
          </h3>
          <p className="text-lg text-slate-600 mb-8">
            신청 후 담당자가 연락하여 또래상담자와 매칭할 때 알려드립니다.
          </p>
          <Button
            onClick={() => navigate("/apply")}
            size="lg"
            className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-6 text-lg"
          >
            또래친구 신청하기
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 또래소담 프로그램. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
