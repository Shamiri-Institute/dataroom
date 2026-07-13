// Shamiri stub: the viewer conversation sidebar lives in upstream's private
// EE repo. Provider/Layout render children unchanged and the hook reports the
// sidebar as unavailable; the classic ConversationSidebar (public) still
// handles viewer Q&A.
import { ReactNode } from "react";

export type ConversationSidebarContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function ConversationSidebarProvider({
  children,
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  return <>{children}</>;
}

export function ConversationSidebarLayout({
  children,
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  return <>{children}</>;
}

export function useConversationSidebarSafe(): ConversationSidebarContextValue | null {
  return null;
}
