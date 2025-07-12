import React from "react";

interface FormattedMessageProps {
  content: string;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = (
  { content },
) => {
  const formatContent = (text: string) => {
    // Split content into lines for processing
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let listType: "numbered" | "bullet" | null = null;
    let keyCounter = 0; // Add unique key counter

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === "numbered") {
          elements.push(
            <ol
              key={elements.length}
              className="list-decimal list-inside ml-4 mb-3 space-y-1"
            >
              {currentList}
            </ol>,
          );
        } else if (listType === "bullet") {
          elements.push(
            <ul
              key={elements.length}
              className="list-disc list-inside ml-4 mb-3 space-y-1"
            >
              {currentList}
            </ul>,
          );
        }
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, _index) => {
      const trimmedLine = line.trim();

      // Skip empty lines
      if (!trimmedLine) {
        flushList();
        elements.push(<br key={`br-${keyCounter++}`} />);
        return;
      }

      // Handle headings
      if (trimmedLine.startsWith("## ")) {
        flushList();
        const headingText = trimmedLine.substring(3);
        elements.push(
          <h3
            key={`h3-${keyCounter++}`}
            className="text-lg font-semibold mb-2 mt-4 text-elevate-brown-dark dark:text-elevate-beige"
          >
            {formatInlineText(headingText)}
          </h3>,
        );
        return;
      }

      if (trimmedLine.startsWith("# ")) {
        flushList();
        const headingText = trimmedLine.substring(2);
        elements.push(
          <h2
            key={`h2-${keyCounter++}`}
            className="text-xl font-bold mb-3 mt-4 text-elevate-brown-dark dark:text-elevate-beige"
          >
            {formatInlineText(headingText)}
          </h2>,
        );
        return;
      }

      // Handle numbered lists (1., 2., 3., etc.)
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
      if (numberedMatch) {
        if (listType !== "numbered") {
          flushList();
          listType = "numbered";
        }
        currentList.push(
          <li key={`li-${keyCounter++}`} className="mb-1">
            {formatInlineText(numberedMatch[2])}
          </li>,
        );
        return;
      }

      // Handle bullet points (•, -, *)
      const bulletMatch = trimmedLine.match(/^[•\-\*]\s+(.+)$/);
      if (bulletMatch) {
        if (listType !== "bullet") {
          flushList();
          listType = "bullet";
        }
        currentList.push(
          <li key={`li-${keyCounter++}`} className="mb-1">
            {formatInlineText(bulletMatch[1])}
          </li>,
        );
        return;
      }

      // Regular paragraph
      flushList();
      if (trimmedLine) {
        elements.push(
          <p key={`p-${keyCounter++}`} className="mb-2 leading-relaxed">
            {formatInlineText(trimmedLine)}
          </p>,
        );
      }
    });

    // Flush any remaining list
    flushList();

    return elements;
  };

  const formatInlineText = (text: string) => {
    // Handle bold text (**text**)
    let formatted = text.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold text-elevate-brown dark:text-elevate-beige">$1</strong>',
    );

    // Handle italic text (*text*)
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

    // Handle inline code (`code`)
    formatted = formatted.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>',
    );

    // Return as JSX
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className="formatted-message">
      {formatContent(content)}
    </div>
  );
};

export default FormattedMessage;
