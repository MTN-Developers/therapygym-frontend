import DOMPurify from "dompurify";
import React from "react";

export const RenderHTML = ({
  htmlContent,
  renderInTable,
}: {
  htmlContent: string;
  renderInTable: boolean;
}) => {
  const sanitizedHTML = renderInTable
    ? DOMPurify.sanitize(htmlContent)?.length > 60
      ? DOMPurify.sanitize(htmlContent).slice(0, 60) + "..."
      : DOMPurify.sanitize(htmlContent)
    : DOMPurify.sanitize(htmlContent);
  return <div dir="rtl" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};
