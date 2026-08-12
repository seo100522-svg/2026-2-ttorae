import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export default function AdminDashboard() {
  const { t, language } = useLanguage();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch all applications
  const { data: applications, isLoading } = trpc.applications.getAll.useQuery();
  const { data: exportData } = trpc.applications.exportToExcel.useQuery();

  const handleExportToExcel = async () => {
    if (!applications || applications.length === 0) {
      alert(t("admin.noApplications"));
      return;
    }

    setIsExporting(true);
    try {
      // Create CSV content with all input fields
      const headers = [
        t("table.id"),
        t("table.studentName"),
        t("form.studentId"),
        t("form.phoneNumber"),
        t("form.college"),
        t("form.department"),
        t("form.gender"),
        t("form.grade"),
        t("form.nationalityType"),
        t("form.nationality"),
        t("table.applicationType"),
        t("form.counselorName.label"),
        t("form.agreedSchedule.label"),
        t("form.availableTimes.label") || "Available Times",
        t("form.topics.label"),
        t("form.additionalMessage.label"),
        t("table.status"),
        t("table.submittedAt"),
      ];

      const rows = applications.map((app: any) => {
        let parsedTimes = "-";
        try {
          if (app.availableTimes) {
            const times = typeof app.availableTimes === "string" ? JSON.parse(app.availableTimes) : app.availableTimes;
            if (Array.isArray(times) && times.length > 0) {
              parsedTimes = times.map((slot: any) => `${slot.day} ${slot.startTime}~${slot.endTime}`).join("; ");
            }
          }
        } catch (e) {
          parsedTimes = app.availableTimes || "-";
        }

        let parsedTopics = "-";
        try {
          if (app.topics) {
            const topicsArr = typeof app.topics === "string" ? JSON.parse(app.topics) : app.topics;
            if (Array.isArray(topicsArr)) {
              parsedTopics = topicsArr.join(", ");
            } else {
              parsedTopics = String(app.topics);
            }
          }
        } catch (e) {
          parsedTopics = app.topics || "-";
        }

        return [
          app.id,
          app.studentName,
          app.studentId,
          app.phoneNumber,
          app.college,
          app.department,
          app.gender === "male" ? t("form.gender.male") : app.gender === "female" ? t("form.gender.female") : t("form.gender.other"),
          app.grade || "-",
          app.nationalityType === "local" ? (language === "ko" ? "내국인" : language === "ja" ? "国内学生" : "Local") : (language === "ko" ? "유학생" : language === "ja" ? "留学生" : "International"),
          app.nationality || "-",
          app.applicationType === "pre_arranged" ? t("form.applicationType.preArranged") : t("form.applicationType.direct"),
          app.counselorName || "-",
          app.agreedSchedule || "-",
          parsedTimes,
          parsedTopics,
          app.storyDetails || "-",
          app.status === "pending" ? t("status.pending") : app.status === "matched" ? t("status.matched") : t("status.cancelled"),
          new Date(app.createdAt).toLocaleString(language === "ko" ? "ko-KR" : language === "ja" ? "ja-JP" : "en-US"),
        ];
      });

      // Create CSV string with BOM for Excel Korean support (\uFEFF)
      const csvContent = "\uFEFF" + [
        headers.map(h => `"${h}"`).join(","),
        ...rows.map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")),
      ].join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `ttoerae_applications_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      alert(t("error.exportFailed") || "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      pending: { label: t("status.pending"), variant: "secondary" },
      matched: { label: t("status.matched"), variant: "default" },
      cancelled: { label: t("status.cancelled"), variant: "destructive" },
    };
    const config = statusMap[status] || statusMap.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const openDetail = (app: any) => {
    setSelectedApplication(app);
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t("admin.title")}</h1>
              <p className="text-muted-foreground">{t("admin.description")}</p>
            </div>
            <Button
              onClick={handleExportToExcel}
              disabled={isExporting || !applications || applications.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isExporting ? t("button.exporting") || "Exporting..." : t("button.exportExcel") || "Export to Excel"}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("admin.applications")}</CardTitle>
            <CardDescription>{t("admin.applicationsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {applications && applications.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("table.id")}</TableHead>
                      <TableHead>{t("table.studentName")}</TableHead>
                      <TableHead>{t("table.college")}</TableHead>
                      <TableHead>{t("table.applicationType")}</TableHead>
                      <TableHead>{t("table.status")}</TableHead>
                      <TableHead>{t("table.submittedAt")}</TableHead>
                      <TableHead>{t("table.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app: any) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">#{app.id}</TableCell>
                        <TableCell>{app.studentName}</TableCell>
                        <TableCell>{app.college}</TableCell>
                        <TableCell>
                          {app.applicationType === "pre_arranged"
                            ? t("form.applicationType.preArranged")
                            : t("form.applicationType.direct")}
                        </TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>{new Date(app.createdAt).toLocaleDateString(language === "ko" ? "ko-KR" : language === "ja" ? "ja-JP" : "en-US")}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetail(app)}
                          >
                            {t("button.view")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {t("admin.noApplications")}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.applicationDetail")}</DialogTitle>
            <DialogDescription>
              {selectedApplication && `${t("table.studentName")}: ${selectedApplication.studentName}`}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-semibold mb-3">{t("form.step1")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.name")}</p>
                    <p className="font-medium">{selectedApplication.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.studentId")}</p>
                    <p className="font-medium">{selectedApplication.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.college")}</p>
                    <p className="font-medium">{selectedApplication.college}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.department")}</p>
                    <p className="font-medium">{selectedApplication.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.grade")}</p>
                    <p className="font-medium">{selectedApplication.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.gender")}</p>
                    <p className="font-medium">
                      {selectedApplication.gender === "male"
                        ? t("form.gender.male")
                        : selectedApplication.gender === "female"
                        ? t("form.gender.female")
                        : t("form.gender.other")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.phoneNumber")}</p>
                    <p className="font-medium">{selectedApplication.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.nationality")}</p>
                    <p className="font-medium">
                      {selectedApplication.nationalityType === "local"
                        ? t("form.nationality.local")
                        : selectedApplication.nationality || t("placeholder.notAvailable")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Type */}
              <div>
                <h3 className="font-semibold mb-3">{t("form.step2")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("form.applicationType.label")}</p>
                    <p className="font-medium">
                      {selectedApplication.applicationType === "pre_arranged"
                        ? t("form.applicationType.preArranged")
                        : t("form.applicationType.direct")}
                    </p>
                  </div>
                  {selectedApplication.applicationType === "pre_arranged" && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("form.counselorName.label")}</p>
                        <p className="font-medium">{selectedApplication.counselorName || t("placeholder.notAvailable")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("form.agreedSchedule.label")}</p>
                        <p className="font-medium">{selectedApplication.agreedSchedule || t("placeholder.notAvailable")}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Topics */}
              <div>
                <h3 className="font-semibold mb-3">{t("form.step3")}</h3>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{t("form.topics.label")}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.topics &&
                      JSON.parse(selectedApplication.topics).map((topic: string, idx: number) => (
                        <Badge key={idx} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                  </div>
                </div>
                {selectedApplication.storyDetails && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">{t("form.additionalMessage.label")}</p>
                    <p className="text-sm bg-muted p-3 rounded">{selectedApplication.storyDetails}</p>
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <h3 className="font-semibold mb-3">{t("admin.status")}</h3>
                <div>{getStatusBadge(selectedApplication.status)}</div>
              </div>

              {/* Submission Date */}
              <div>
                <p className="text-sm text-muted-foreground">{t("admin.submittedAt")}</p>
                <p className="font-medium">
                  {new Date(selectedApplication.createdAt).toLocaleString(
                    language === "ko" ? "ko-KR" : language === "ja" ? "ja-JP" : "en-US"
                  )}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
