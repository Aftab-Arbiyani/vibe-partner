import type { Metadata } from "next";
import SwaggerClient from "./SwaggerClient";

export const metadata: Metadata = {
  title: "API Docs",
};

export default function ApiDocsPage() {
  return (
    <main>
      <SwaggerClient url="/api/docs" />
    </main>
  );
}
