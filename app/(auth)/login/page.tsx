import { Suspense } from "react";

import { GTMComponent } from "@/components/gtm-component";

import LoginClient from "./page-client";

export default function LoginPage() {
  return (
    <>
      <GTMComponent />
      <Suspense>
        <LoginClient />
      </Suspense>
    </>
  );
}
