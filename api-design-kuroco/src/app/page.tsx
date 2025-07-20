import Header from "@/components/header";
import HeroCases from "@/components/hero-cases";
import ToolsPanel from "@/components/tools-panel";
import CasesPanel from "@/components/cases-panel";
import Chatbot from "@/components/chatbot";
import {
  getLatestCases,
  getTools,
  getAllCases,
  getSettings,
} from "@/lib/kuroco";

export default async function Page() {
  const [cases5, tools, allCases, settings] = await Promise.all([
    getLatestCases(5),
    getTools(),
    getAllCases(),
    getSettings(),
  ]);

  return (
    <>
      <Header />

      {/* Hero */}
      <div className="grid md:grid-cols-[260px_1fr_260px] gap-6 p-6">
        <ToolsPanel tools={tools} />
        <HeroCases cases={cases5} />
        <CasesPanel cases={allCases} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-2 text-xs">
        © {new Date().getFullYear()} {settings.copyright}
      </footer>

      {/* Chatbot */}
      <Chatbot embed={settings.chatbot_widget.embed_code} />
    </>
  );
}
