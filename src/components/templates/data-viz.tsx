import { DataViz, DataPoint } from "@/lib/templates/data-viz"

interface DataVizTemplateProps {
  template: DataViz
}

export const DataVizTemplate = ({ template }: DataVizTemplateProps) => {
  const { title, subtitle, chartType, data, background, chartStyle, layout, dataLabels, insights } = template.params

  // Background style
  const backgroundStyle = background.type === "color" 
    ? { backgroundColor: background.value }
    : background.type === "image"
    ? { backgroundImage: `url(${background.value})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: background.value }

  // CSS-based bar chart component (Satori-compatible)
  const BarChart = () => {
    const maxValue = Math.max(...data.map(d => d.value))

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: layout.chartWidth,
          height: layout.chartHeight,
          padding: "20px",
        }}
      >
        {/* Chart area */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            height: "300px",
            marginBottom: "40px",
            borderBottom: chartStyle.showGrid ? `1px solid ${chartStyle.gridColor}` : "none",
          }}
        >
          {data.map((point, index) => {
            const barHeight = (250 * point.value) / maxValue
            const isHighlighted = insights.highlight?.dataIndex === index

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {/* Value label */}
                {dataLabels.show && (
                  <div
                    style={{
                      fontSize: `${dataLabels.fontSize}px`,
                      color: dataLabels.color,
                      fontWeight: "600",
                    }}
                  >
                    {point.value}
                  </div>
                )}

                {/* Bar */}
                <div
                  style={{
                    width: "60px",
                    height: `${barHeight}px`,
                    backgroundColor: point.color || chartStyle.primaryColor,
                    borderRadius: "4px",
                    border: isHighlighted ? `3px solid ${insights.highlight?.color}` : "none",
                  }}
                />

                {/* Label */}
                <div
                  style={{
                    fontSize: "14px",
                    color: chartStyle.textColor,
                    textAlign: "center",
                    maxWidth: "80px",
                  }}
                >
                  {point.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // CSS-based pie chart component (simplified for Satori)
  const PieChart = () => {
    const total = data.reduce((sum, d) => sum + d.value, 0)

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: layout.chartWidth,
          height: layout.chartHeight,
          padding: "20px",
        }}
      >
        {/* Legend/List style pie chart */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {data.map((point, index) => {
            const percentage = ((point.value / total) * 100).toFixed(1)
            const isHighlighted = insights.highlight?.dataIndex === index

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  backgroundColor: isHighlighted ? `${point.color}20` : "transparent",
                  borderRadius: "8px",
                  border: isHighlighted ? `2px solid ${insights.highlight?.color}` : "1px solid #E5E7EB",
                }}
              >
                {/* Color indicator */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: point.color || chartStyle.primaryColor,
                    borderRadius: "50%",
                  }}
                />

                {/* Label and value */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: `${dataLabels.fontSize}px`,
                      color: dataLabels.color,
                      fontWeight: "600",
                    }}
                  >
                    {point.label}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: chartStyle.textColor,
                      fontWeight: "700",
                    }}
                  >
                    {percentage}%
                  </div>
                </div>
              </div>
            )
          })}
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
          marginBottom: "12px",
          backgroundColor: title.bgColor === "#FFFFFF" ? "transparent" : title.bgColor,
          padding: title.bgColor === "#FFFFFF" ? "0" : "12px",
          borderRadius: title.bgColor === "#FFFFFF" ? "0" : "8px",
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
            marginBottom: "40px",
          }}
        >
          {subtitle.text}
        </div>
      )}

      {/* Chart Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {chartType === "bar" && <BarChart />}
        {(chartType === "pie" || chartType === "donut") && <PieChart />}
      </div>

      {/* Insights and annotations */}
      {insights.show && insights.highlight && (
        <div
          style={{
            backgroundColor: "#F8F9FA",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "20px",
            border: `2px solid ${insights.highlight.color}`,
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#1F2937",
              marginBottom: "8px",
            }}
          >
            💡 Key Insight
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#4B5563",
              lineHeight: 1.5,
            }}
          >
            {insights.highlight.text}
          </div>
        </div>
      )}

      {/* Footer */}
      {insights.footer && (
        <div
          style={{
            marginTop: "auto",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "#6B7280",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          {insights.footer.text && <span>{insights.footer.text}</span>}
          {insights.footer.source && (
            <span style={{ fontWeight: 600, color: chartStyle.primaryColor }}>
              {insights.footer.source}
            </span>
          )}
        </div>
      )}
    </div>
  )
}