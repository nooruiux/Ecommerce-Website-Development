"use client";

import dynamic from "next/dynamic";
import { useState, type ComponentProps } from "react";
import { useToast } from "@/store/toast";
import type { Drawer as DrawerType } from "./Drawer";
import type { Modal as ModalType } from "./Modal";

/*
 * Overlays (and Framer Motion with them) are code-split and only fetched the first time
 * they open, keeping them out of the initial bundle. They stay mounted afterwards so
 * exit animations still run.
 */
const DrawerImpl = dynamic(() => import("./Drawer").then((m) => m.Drawer), { ssr: false });
const ModalImpl = dynamic(() => import("./Modal").then((m) => m.Modal), { ssr: false });
const ToasterImpl = dynamic(() => import("./Toaster").then((m) => m.Toaster), { ssr: false });

function useOpenedOnce(open: boolean) {
  const [opened, setOpened] = useState(open);
  if (open && !opened) setOpened(true);
  return opened;
}

export function Drawer(props: ComponentProps<typeof DrawerType>) {
  const opened = useOpenedOnce(props.open);
  return opened ? <DrawerImpl {...props} /> : null;
}

export function Modal(props: ComponentProps<typeof ModalType>) {
  const opened = useOpenedOnce(props.open);
  return opened ? <ModalImpl {...props} /> : null;
}

export function Toaster() {
  const hasToasts = useToast((s) => s.toasts.length > 0);
  const opened = useOpenedOnce(hasToasts);
  return opened ? <ToasterImpl /> : null;
}
