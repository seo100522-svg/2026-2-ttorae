import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import AdminLoginModal from "@/components/AdminLoginModal";

export default function Home() {
  const [, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">{t("nav.title")}</h1>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <Globe className="w-4 h-4 text-slate-600 ml-2" />
              <button
                onClick={() => setLanguage("ko")}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  language === "ko" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-label="한국어"
              >
                한국어
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  language === "en" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-label="English"
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ja")}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  language === "ja" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-label="日本語"
              >
                日本語
              </button>
            </div>
            <Button
              onClick={() => navigate("/apply")}
              className="bg-slate-700 hover:bg-slate-800"
            >
              {t("button.apply")}
            </Button>
            <Button
              onClick={() => setIsAdminModalOpen(true)}
              variant="outline"
              className="text-xs"
            >
              {t("button.admin") || "Admin"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Admin Login Modal */}
      <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-2">
                {t("home.hero.title")}
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                {t("home.hero.subtitle")}
              </p>
              <p className="text-sm text-slate-500 mb-6">
                {t("home.hero.desc")}
              </p>
            </div>
            <Button
              onClick={() => navigate("/apply")}
              size="lg"
              className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-6 text-lg"
            >
              {t("button.applyNow")}
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
            {t("home.features.title")}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                titleKey: "home.features.feature1.title",
                descKey: "home.features.feature1.desc",
                icon: "👥",
              },
              {
                titleKey: "home.features.feature2.title",
                descKey: "home.features.feature2.desc",
                icon: "💬",
              },
              {
                titleKey: "home.features.feature3.title",
                descKey: "home.features.feature3.desc",
                icon: "🎯",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{t(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600" style={{fontSize: '15px'}}>{t(feature.descKey)}</p>
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
            {t("home.process.title")}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, titleKey: "home.process.step1.title", descKey: "home.process.step1.desc" },
              { step: 2, titleKey: "home.process.step2.title", descKey: "home.process.step2.desc" },
              { step: 3, titleKey: "home.process.step3.title", descKey: "home.process.step3.desc" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{t(item.titleKey)}</h4>
                  <p className="text-sm text-slate-600">{t(item.descKey)}</p>
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
            {t("home.cta.title")}
          </h3>
          <p className="text-lg text-slate-600 mb-8">
            {t("home.cta.subtitle")}
          </p>
          <Button
            onClick={() => navigate("/apply")}
            size="lg"
            className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-6 text-lg"
          >
            {t("button.applyNow")}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
