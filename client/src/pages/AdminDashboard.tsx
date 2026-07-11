import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

const STATUS_LABELS = {
  pending: "대기",
  matched: "매칭완료",
  cancelled: "취소",
};

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  matched: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface ApplicationDetail {
  id: number;
  studentName: string;
  studentId: string;
  phoneNumber: string;
  college: string;
  department: string;
  nationalityType: "local" | "international";
  nationality?: string;
  topics: string;
  storyDetails?: string;
  status: "pending" | "matched" | "cancelled";
  createdAt: Date;
  scale?: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
  };
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [selectedApplication, setSelectedApplication] = useState<ApplicationDetail | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "matched" | "cancelled">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: applications, isLoading, refetch } = trpc.applications.list.useQuery();
  const updateStatusMutation = trpc.applications.updateStatus.useMutation();

  const filteredApplications = (applications || [])
    .filter((app: any) => {
      if (statusFilter !== "all" && app.status !== statusFilter) return false;
      if (
        searchTerm &&
        !app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !app.studentId.includes(searchTerm)
      ) {
        return false;
      }
      return true;
    })
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleStatusChange = async (applicationId: number, newStatus: "pending" | "matched" | "cancelled") => {
    try {
      await updateStatusMutation.mutateAsync({
        id: applicationId,
        status: newStatus,
      });
      toast.success("상태가 업데이트되었습니다.");
      refetch();
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
    } catch (error) {
      toast.error("상태 업데이트에 실패했습니다.");
      console.error(error);
    }
  };

  const handleViewDetails = (app: any) => {
    setSelectedApplication(app);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              돌아가기
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">관리자 대시보드</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">전체 신청</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{applications?.length || 0}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">대기 중</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                {applications?.filter((a: any) => a.status === "pending").length || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">매칭완료</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {applications?.filter((a: any) => a.status === "matched").length || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">취소</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {applications?.filter((a: any) => a.status === "cancelled").length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md mb-8">
          <CardHeader>
            <CardTitle>필터 및 검색</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search">이름 또는 학번으로 검색</Label>
                <Input
                  id="search"
                  placeholder="검색어를 입력하세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="status">상태 필터</Label>
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 상태</SelectItem>
                    <SelectItem value="pending">대기</SelectItem>
                    <SelectItem value="matched">매칭완료</SelectItem>
                    <SelectItem value="cancelled">취소</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>신청 목록</CardTitle>
            <CardDescription>{filteredApplications.length}개의 신청</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-slate-600">로딩 중...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-8 text-slate-600">신청 내역이 없습니다.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>학번</TableHead>
                      <TableHead>단과대학</TableHead>
                      <TableHead>국적</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>신청일</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app: any) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.studentName}</TableCell>
                        <TableCell>{app.studentId}</TableCell>
                        <TableCell>{app.college}</TableCell>
                        <TableCell>
                          {app.nationalityType === "local" ? "국내" : `국외 (${app.nationality})`}
                        </TableCell>
                        <TableCell>
                          <Badge className={STATUS_COLORS[app.status as keyof typeof STATUS_COLORS]}>
                            {STATUS_LABELS[app.status as keyof typeof STATUS_LABELS]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(app.createdAt).toLocaleDateString("ko-KR")}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(app)}
                          >
                            상세보기
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedApplication.studentName} - 신청 상세 정보</DialogTitle>
                <DialogDescription>
                  신청일: {new Date(selectedApplication.createdAt).toLocaleDateString("ko-KR")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">기본 정보</h3>
                  <div className="grid md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-slate-600">이름</p>
                      <p className="font-medium">{selectedApplication.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">학번</p>
                      <p className="font-medium">{selectedApplication.studentId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">연락처</p>
                      <p className="font-medium">{selectedApplication.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">단과대학</p>
                      <p className="font-medium">{selectedApplication.college}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">학과</p>
                      <p className="font-medium">{selectedApplication.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">국적</p>
                      <p className="font-medium">
                        {selectedApplication.nationalityType === "local"
                          ? "대한민국"
                          : `외국인 (${selectedApplication.nationality})`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">상담 주제</h3>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(selectedApplication.topics).map((topic: string) => (
                      <Badge key={topic} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Story Details */}
                {selectedApplication.storyDetails && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900">상담 내용</h3>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">
                      {selectedApplication.storyDetails}
                    </p>
                  </div>
                )}

                {/* Scale Assessment */}
                {selectedApplication.scale && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900">척도 검사 결과</h3>
                    <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-slate-700">대학교 분위기 적응</span>
                        <span className="font-medium">{selectedApplication.scale.q1}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">고민 나눌 친구</span>
                        <span className="font-medium">{selectedApplication.scale.q2}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">학업 관심 및 만족</span>
                        <span className="font-medium">{selectedApplication.scale.q3}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">캠퍼스 활동 참여</span>
                        <span className="font-medium">{selectedApplication.scale.q4}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">전반적 대학생활 만족도</span>
                        <span className="font-medium">{selectedApplication.scale.q5}/5</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between font-semibold">
                        <span>평균 점수</span>
                        <span>
                          {(
                            (selectedApplication.scale.q1 +
                              selectedApplication.scale.q2 +
                              selectedApplication.scale.q3 +
                              selectedApplication.scale.q4 +
                              selectedApplication.scale.q5) /
                            5
                          ).toFixed(1)}
                          /5
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Management */}
                <div className="space-y-3 border-t pt-4">
                  <h3 className="font-semibold text-slate-900">상태 관리</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedApplication.status === "pending" ? "default" : "outline"}
                      onClick={() => handleStatusChange(selectedApplication.id, "pending")}
                      disabled={updateStatusMutation.isPending}
                      className={selectedApplication.status === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                    >
                      대기
                    </Button>
                    <Button
                      variant={selectedApplication.status === "matched" ? "default" : "outline"}
                      onClick={() => handleStatusChange(selectedApplication.id, "matched")}
                      disabled={updateStatusMutation.isPending}
                      className={selectedApplication.status === "matched" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      매칭완료
                    </Button>
                    <Button
                      variant={selectedApplication.status === "cancelled" ? "default" : "outline"}
                      onClick={() => handleStatusChange(selectedApplication.id, "cancelled")}
                      disabled={updateStatusMutation.isPending}
                      className={selectedApplication.status === "cancelled" ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
