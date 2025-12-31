import Container from "@/components/layout/Container";
import Header from "../components/Header";
import ChatZipBar from "../components/upload/ChatZipBar";

export default function Page() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {/* 상단 헤더 */}
      <Header />

      {/* 중앙 ZIP 업로드 영역 */}
      <main className="flex flex-1 items-center justify-center px-4">
        <Container>
          <ChatZipBar />
        </Container>
      </main>
    </div>
  );
}
