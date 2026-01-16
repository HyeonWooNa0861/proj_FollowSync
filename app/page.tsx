import Container from "@/components/layout/Container";
import Header from "../components/Header";
import ChatZipBar from "../components/upload/ChatZipBar";
import AnimatedBackground from "../components/background/AnimatedBG";

export default function Page() {
  return (
    <div className="relative min-h-dvh">
      <AnimatedBackground />
      
      <div className="relative min-h-dvh flex flex-col" style={{ zIndex: 1 }}>
        <Header />
        <main className="flex flex-1 items-center justify-center px-4">
          <Container>
            <ChatZipBar />
          </Container>
        </main>
      </div>
    </div>
  );
}