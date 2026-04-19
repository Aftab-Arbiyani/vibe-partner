"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerClient({ url }: { url: string }) {
  return <SwaggerUI url={url} />;
}
