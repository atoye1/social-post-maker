import { RankingTable, TableRow } from "@/lib/templates/ranking-table"

interface RankingTableTemplateProps {
  template: RankingTable
}

export const RankingTableTemplate = ({ template }: RankingTableTemplateProps) => {
  const { title, subtitle, data, background, headerStyle, rowStyle, showRankNumbers, showLogos, tableLayout } = template.params

  // Calculate total table width
  const totalWidth = 
    (showRankNumbers ? tableLayout.rankWidth : 0) +
    tableLayout.nameWidth +
    (showLogos ? tableLayout.logoWidth : 0) +
    tableLayout.categoryWidth +
    tableLayout.descriptionWidth

  // Background style
  const backgroundStyle = background.type === "color" 
    ? { backgroundColor: background.value }
    : background.type === "image"
    ? { backgroundImage: `url(${background.value})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: background.value }

  const TableHeader = () => (
    <div
      style={{
        display: "flex",
        backgroundColor: headerStyle.backgroundColor,
        color: headerStyle.textColor,
        fontSize: `${headerStyle.fontSize}px`,
        fontWeight: headerStyle.fontWeight,
        borderBottom: `2px solid ${rowStyle.borderColor}`,
      }}
    >
      {showRankNumbers && (
        <div
          style={{
            width: `${tableLayout.rankWidth}px`,
            padding: `${tableLayout.padding}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: `1px solid ${rowStyle.borderColor}`,
          }}
        >
          순위
        </div>
      )}
      <div
        style={{
          width: `${tableLayout.nameWidth}px`,
          padding: `${tableLayout.padding}px`,
          display: "flex",
          alignItems: "center",
          borderRight: `1px solid ${rowStyle.borderColor}`,
        }}
      >
        브랜드명
      </div>
      {showLogos && (
        <div
          style={{
            width: `${tableLayout.logoWidth}px`,
            padding: `${tableLayout.padding}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: `1px solid ${rowStyle.borderColor}`,
          }}
        >
          로고
        </div>
      )}
      <div
        style={{
          width: `${tableLayout.categoryWidth}px`,
          padding: `${tableLayout.padding}px`,
          display: "flex",
          alignItems: "center",
          borderRight: `1px solid ${rowStyle.borderColor}`,
        }}
      >
        업종
      </div>
      <div
        style={{
          width: `${tableLayout.descriptionWidth}px`,
          padding: `${tableLayout.padding}px`,
          display: "flex",
          alignItems: "center",
        }}
      >
        현재 상태 & 주요 이슈
      </div>
    </div>
  )

  const TableRowComponent = ({ row, index }: { row: TableRow; index: number }) => {
    const isAlternate = rowStyle.alternateRowColor && index % 2 === 1
    const rowBackgroundColor = isAlternate ? rowStyle.alternateRowColorValue : rowStyle.primaryRowColor

    return (
      <div
        style={{
          display: "flex",
          backgroundColor: rowBackgroundColor,
          color: rowStyle.textColor,
          fontSize: `${rowStyle.fontSize}px`,
          borderBottom: `1px solid ${rowStyle.borderColor}`,
        }}
      >
        {showRankNumbers && (
          <div
            style={{
              width: `${tableLayout.rankWidth}px`,
              padding: `${tableLayout.padding}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: `1px solid ${rowStyle.borderColor}`,
              fontWeight: 600,
            }}
          >
            {row.rank}
          </div>
        )}
        <div
          style={{
            width: `${tableLayout.nameWidth}px`,
            padding: `${tableLayout.padding}px`,
            display: "flex",
            alignItems: "center",
            borderRight: `1px solid ${rowStyle.borderColor}`,
            fontWeight: 600,
          }}
        >
          {row.name}
        </div>
        {showLogos && (
          <div
            style={{
              width: `${tableLayout.logoWidth}px`,
              padding: `${tableLayout.padding}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: `1px solid ${rowStyle.borderColor}`,
            }}
          >
            {row.logo && (
              <img
                src={row.logo.url}
                alt={row.logo.alt || row.name}
                style={{
                  width: `${row.logo.width}px`,
                  height: `${row.logo.height}px`,
                  borderRadius: `${row.logo.borderRadius}px`,
                  objectFit: row.logo.objectFit,
                }}
              />
            )}
          </div>
        )}
        <div
          style={{
            width: `${tableLayout.categoryWidth}px`,
            padding: `${tableLayout.padding}px`,
            display: "flex",
            alignItems: "center",
            borderRight: `1px solid ${rowStyle.borderColor}`,
          }}
        >
          {row.category}
        </div>
        <div
          style={{
            width: `${tableLayout.descriptionWidth}px`,
            padding: `${tableLayout.padding}px`,
            display: "flex",
            alignItems: "center",
          }}
        >
          {row.description}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        display: "flex",
        flexDirection: "column",
        padding: "40px",
        fontFamily: title.fontFamily,
        ...backgroundStyle,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: `${title.fontSize}px`,
          fontWeight: title.fontWeight,
          color: title.color,
          textAlign: title.alignment === "center" ? "center" : title.alignment === "flex-end" ? "right" : "left",
          marginBottom: "20px",
          backgroundColor: title.bgColor,
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        {title.text}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: `${subtitle.fontSize}px`,
            fontWeight: subtitle.fontWeight,
            color: subtitle.color,
            textAlign: subtitle.alignment === "center" ? "center" : subtitle.alignment === "flex-end" ? "right" : "left",
            marginBottom: "30px",
          }}
        >
          {subtitle.text}
        </div>
      )}

      {/* Table Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: `2px solid ${rowStyle.borderColor}`,
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: rowStyle.primaryRowColor,
          alignSelf: "center",
          width: `${totalWidth}px`,
        }}
      >
        <TableHeader />
        {data.map((row, index) => (
          <TableRowComponent key={`${row.rank}-${index}`} row={row} index={index} />
        ))}
      </div>

      {/* Footer watermark */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          color: "#888888",
          paddingTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ backgroundColor: "#E91E63", color: "white", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", marginRight: "8px" }}>
            📊
          </span>
          <span>oneline.money</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ backgroundColor: "#FF0000", color: "white", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", marginRight: "8px" }}>
            📺
          </span>
          <span>머니업</span>
        </div>
      </div>
    </div>
  )
}