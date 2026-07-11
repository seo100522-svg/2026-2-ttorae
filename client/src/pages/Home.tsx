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
          <h1 className="text-xl font-bold text-slate-900">또래소담</h1>
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
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                비슷한 고민을 품고 걷는 캠퍼스 친구
              </h2>
              <p className="text-xl text-slate-600">
                또래소담자가 늘 네 곁에 있어. 대학생활의 고민을 함께 나누고 싶다면 지금 신청해보세요.
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
            또래소담은 어떤 프로그램인가요?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "또래 매칭",
                description: "비슷한 고민을 가진 학생들을 매칭해 자연스러운 관계를 형성합니다.",
                icon: "👥",
              },
              {
                title: "편안한 상담",
                description: "전문가가 아닌 또래 친구와의 대화로 더 편하고 자유로운 소통이 가능합니다.",
                icon: "💬",
              },
              {
                title: "맞춤형 지원",
                description: "학업, 진로, 대인관계 등 다양한 주제의 고민을 함께 나눕니다.",
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

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "기본 정보 입력", desc: "이름, 학번, 연락처 등을 입력합니다." },
              { step: 2, title: "상담 주제 선택", desc: "고민하는 주제를 선택합니다." },
              { step: 3, title: "척도 검사", desc: "대학생활 적응도를 평가합니다." },
              { step: 4, title: "신청 완료", desc: "개인정보 동의 후 신청을 완료합니다." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
                {item.step < 4 && (
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
            또래소담자와의 만남이 당신의 대학생활을 더욱 풍요롭게 만들어줄 것입니다.
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
