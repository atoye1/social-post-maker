import { QuoteCard } from "@/lib/templates/social-media"

interface QuoteCardTemplateProps {
  template: QuoteCard
}

export const QuoteCardTemplate = ({ template }: QuoteCardTemplateProps) => {
  const { quote, author, background, decoration } = template.params

  // Background style
  const backgroundStyle = background.type === "color" 
    ? { backgroundColor: background.value }
    : background.type === "image"
    ? { backgroundImage: `url(${background.value})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: background.value }

  // Quote marks for decoration
  const QuoteMarks = () => {
    if (decoration.type !== "quotes") return null
    
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            fontSize: "120px",
            fontFamily: "Georgia, serif",
            color: decoration.color,
            opacity: 0.2,
            lineHeight: 1,
          }}
        >
          "
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: "120px",
            fontFamily: "Georgia, serif",
            color: decoration.color,
            opacity: 0.2,
            lineHeight: 1,
            transform: "rotate(180deg)",
          }}
        >
          "
        </div>
      </>
    )
  }

  // Border decoration
  const borderStyle = decoration.type === "border" ? {
    border: `4px solid ${decoration.color}`,
    borderRadius: "16px",
  } : {}

  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px",
        fontFamily: quote.fontFamily,
        ...backgroundStyle,
        ...borderStyle,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <QuoteMarks />

      {/* Quote Text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: `${quote.fontSize}px`,
            fontWeight: quote.fontWeight,
            color: quote.color,
            textAlign: quote.alignment === "center" ? "center" : quote.alignment === "flex-end" ? "right" : "left",
            lineHeight: quote.lineHeight,
            margin: 0,
            maxWidth: "800px",
          }}
        >
          {quote.text}
        </p>
      </div>

      {/* Author */}
      <div
        style={{
          marginTop: "40px",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: `${author.fontSize}px`,
            fontWeight: author.fontWeight,
            color: author.color,
            textAlign: author.alignment === "center" ? "center" : author.alignment === "flex-end" ? "right" : "left",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {author.prefix} {author.text}
        </p>
      </div>

      {/* Minimal decoration line */}
      {decoration.type === "minimal" && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "2px",
            backgroundColor: decoration.color,
          }}
        />
      )}
    </div>
  )
}