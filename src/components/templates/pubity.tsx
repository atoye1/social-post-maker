import { Pubity } from "@/lib/templates/social-media"

interface PubityTemplateProps {
  template: Pubity
}

export const PubityTemplate = ({ template }: PubityTemplateProps) => {
  const { title, mainImage, background, hashtags, watermark } = template.params

  // Background style
  const backgroundStyle = background.type === "color" 
    ? { backgroundColor: background.value }
    : background.type === "image"
    ? { backgroundImage: `url(${background.value})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: background.value }

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
      {/* Title Section */}
      {title.position === "top" && (
        <div
          style={{
            backgroundColor: title.bgColor,
            borderBottom: `4px solid ${title.borderColor}`,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h1
            style={{
              fontSize: `${title.fontSize}px`,
              fontWeight: title.fontWeight,
              color: title.color,
              margin: 0,
              lineHeight: 1.2,
              textAlign: title.alignment === "center" ? "center" : title.alignment === "flex-end" ? "right" : "left",
            }}
          >
            {title.text}
          </h1>
          {hashtags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "14px",
                color: title.borderColor,
                fontWeight: 500,
              }}
            >
              {hashtags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          )}
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
          position: "relative",
        }}
      >
        <img
          src={mainImage.url}
          alt={mainImage.alt || "Pubity content"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: mainImage.objectFit || "cover",
          }}
        />
      </div>

      {/* Bottom Title Section */}
      {title.position === "bottom" && (
        <div
          style={{
            backgroundColor: title.bgColor,
            borderTop: `4px solid ${title.borderColor}`,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h1
            style={{
              fontSize: `${title.fontSize}px`,
              fontWeight: title.fontWeight,
              color: title.color,
              margin: 0,
              lineHeight: 1.2,
              textAlign: title.alignment === "center" ? "center" : title.alignment === "flex-end" ? "right" : "left",
            }}
          >
            {title.text}
          </h1>
          {hashtags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "14px",
                color: title.borderColor,
                fontWeight: 500,
              }}
            >
              {hashtags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Watermark Logo */}
      {watermark.show && watermark.logo && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={watermark.logo.url}
            alt={watermark.logo.alt || "Pubity"}
            style={{
              width: watermark.logo.width || 100,
              height: watermark.logo.height || 40,
              objectFit: watermark.logo.objectFit || "contain",
            }}
          />
        </div>
      )}

      {/* Default Pubity branding if no logo */}
      {watermark.show && !watermark.logo && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: title.borderColor,
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "24px",
            fontSize: "16px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          PUBITY
        </div>
      )}
    </div>
  )
}