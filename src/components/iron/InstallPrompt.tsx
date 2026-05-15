import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Download, Share, Plus, MoreVertical, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Platform = "ios" | "android" | "desktop";

function detect(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "desktop";
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // @ts-expect-error iOS
    window.navigator.standalone === true
  );
}

export function InstallPrompt() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>("ios");

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem("iron-install-dismissed") === "1") return;
    setPlatform(detect());
    const t = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem("iron-install-dismissed", "1");
    setShow(false);
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-gradient-to-br from-primary/15 via-card to-card border border-primary/30 rounded-2xl p-4 flex items-center gap-3 glow-primary"
          >
            <div className="size-11 rounded-xl bg-primary/20 grid place-items-center shrink-0">
              <Download className="size-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Instale o Iron Coach</p>
              <p className="text-[11px] text-muted-foreground">Adicione à tela inicial em 2 toques</p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="bg-primary text-primary-foreground text-xs font-bold px-3 py-2 rounded-lg shrink-0"
            >
              Instalar
            </button>
            <button
              onClick={dismiss}
              aria-label="Dispensar"
              className="size-7 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground shrink-0"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl border-border bg-card max-w-[430px] mx-auto">
          <SheetHeader>
            <SheetTitle className="text-left">Adicionar à tela inicial</SheetTitle>
          </SheetHeader>

          <div className="mt-2 mb-3 flex gap-2">
            {(["ios", "android"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`flex-1 text-xs font-semibold py-2 rounded-lg border transition ${
                  platform === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-muted-foreground border-border"
                }`}
              >
                {p === "ios" ? "iPhone" : "Android"}
              </button>
            ))}
          </div>

          {platform === "ios" ? (
            <ol className="space-y-3">
              <Step n={1} icon={<Share className="size-4 text-primary" />}>
                Toque no botão <b>Compartilhar</b> na barra do Safari (ícone de quadrado com seta para cima).
              </Step>
              <Step n={2} icon={<Plus className="size-4 text-primary" />}>
                Role e toque em <b>Adicionar à Tela de Início</b>.
              </Step>
              <Step n={3} icon={<Download className="size-4 text-primary" />}>
                Confirme em <b>Adicionar</b>. Pronto — abra pelo ícone do Iron Coach.
              </Step>
            </ol>
          ) : (
            <ol className="space-y-3">
              <Step n={1} icon={<MoreVertical className="size-4 text-primary" />}>
                No Chrome, toque no menu <b>⋮</b> no canto superior direito.
              </Step>
              <Step n={2} icon={<Plus className="size-4 text-primary" />}>
                Toque em <b>Adicionar à tela inicial</b> ou <b>Instalar app</b>.
              </Step>
              <Step n={3} icon={<Download className="size-4 text-primary" />}>
                Confirme em <b>Adicionar</b>. O ícone aparece como app normal.
              </Step>
            </ol>
          )}

          <p className="text-[11px] text-muted-foreground mt-4 text-center">
            Funciona offline depois de aberto pela primeira vez no app.
          </p>
        </SheetContent>
      </Sheet>
    </>
  );
}

function Step({ n, icon, children }: { n: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start bg-secondary/40 border border-border rounded-xl p-3">
      <div className="size-7 rounded-lg bg-primary/15 grid place-items-center shrink-0 num text-xs font-bold text-primary">
        {n}
      </div>
      <div className="flex-1 text-sm leading-snug text-foreground">{children}</div>
      <div className="size-7 rounded-lg bg-background border border-border grid place-items-center shrink-0">
        {icon}
      </div>
    </li>
  );
}