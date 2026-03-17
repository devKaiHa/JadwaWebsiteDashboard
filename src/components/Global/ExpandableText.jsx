import { useMemo, useState } from "react";

const ExpandableText = ({
  text,
  maxChars = 150,
  dir = "ltr",
  className = "",
}) => {
  const [expanded, setExpanded] = useState(false);

  const safeText = useMemo(() => {
    return typeof text === "string" ? text.trim() : "";
  }, [text]);

  if (!safeText) {
    return <span className="text-gray-400">-</span>;
  }

  const isLong = safeText.length > maxChars;
  const displayText =
    !expanded && isLong ? `${safeText.slice(0, maxChars).trim()}...` : safeText;

  return (
    <div dir={dir} className={`text-sm leading-6 text-gray-800 ${className}`}>
      <span className="whitespace-pre-wrap break-words">{displayText}</span>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={`mt-2 inline-flex font-medium text-primary hover:underline ${
            dir === "rtl" ? "mr-2" : "ml-2"
          }`}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
