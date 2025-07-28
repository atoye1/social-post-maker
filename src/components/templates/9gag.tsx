import { NineGag } from "@/lib/templates/social-media"

interface NineGagTemplateProps {
  template: NineGag
}

export const NineGagTemplate = ({ template }: NineGagTemplateProps) => {
  const { title, mainImage, background, watermark } = template.params

  // Background style
  const backgroundStyle = background.type === "color" 
    ? { backgroundColor: background.value }
    : background.type === "image"
    ? { backgroundImage: `url(${background.value})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: background.value }

  // Watermark position
  const watermarkPosition = {
    "top-left": { top: 20, left: 20 },
    "top-right": { top: 20, right: 20 },
    "bottom-left": { bottom: 20, left: 20 },
    "bottom-right": { bottom: 20, right: 20 },
  }[watermark.position]

  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        display: "flex",
        flexDirection: "column",
        fontFamily: title.fontFamily,
        ...backgroundStyle,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title Bar */}
      {title.position === "top" && (
        <div
          style={{
            backgroundColor: title.bgColor,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: title.alignment === "center" ? "center" : title.alignment === "flex-end" ? "flex-end" : "flex-start",
          }}
        >
          <h1
            style={{
              fontSize: `${title.fontSize}px`,
              fontWeight: title.fontWeight,
              color: title.color,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {title.text}
          </h1>
        </div>
      )}

      {/* Main Image */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={mainImage.url}
          alt={mainImage.alt || "9GAG meme"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: mainImage.objectFit || "cover",
          }}
        />
      </div>

      {/* Bottom Title Bar */}
      {title.position === "bottom" && (
        <div
          style={{
            backgroundColor: title.bgColor,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: title.alignment === "center" ? "center" : title.alignment === "flex-end" ? "flex-end" : "flex-start",
          }}
        >
          <h1
            style={{
              fontSize: `${title.fontSize}px`,
              fontWeight: title.fontWeight,
              color: title.color,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {title.text}
          </h1>
        </div>
      )}

      {/* Watermark */}
      {watermark.show && (
        <div
          style={{
            position: "absolute",
            ...watermarkPosition,
            fontSize: "18px",
            fontWeight: "bold",
            color: "#FFFFFF",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "8px 16px",
            borderRadius: "4px",
            backdropFilter: "blur(4px)",
          }}
        >
          {watermark.text}
        </div>
      )}
    </div>
  )
}