const fs = require('fs');
const path = require('path');

// Test just the bar chart to debug the issue
const barChartTest = {
  name: "data-viz",
  params: {
    title: {
      text: "나의 스크린타임 분석",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 36,
      color: "#1F2937",
      alignment: "flex-start",
      bgColor: "#FFFFFF",
    },
    subtitle: {
      text: "지난 한 달간 일평균 사용 시간 (단위: 시간)",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 18,
      color: "#6B7280",
      alignment: "flex-start",
    },
    chartType: "bar",
    data: [
      { label: "소셜미디어", value: 3.2, color: "#EF4444" },
      { label: "업무앱", value: 5.8, color: "#3B82F6" },
      { label: "엔터테인먼트", value: 2.1, color: "#10B981" },
    ],
    background: { type: "color", value: "#FEFEFE", opacity: 1 },
    chartStyle: {
      primaryColor: "#3B82F6",
      secondaryColor: "#EF4444",
      accentColor: "#10B981",
      gridColor: "#F3F4F6",
      textColor: "#374151",
      showGrid: true,
      showValues: true,
      showLegend: false,
      animation: false,
    },
    layout: {
      chartWidth: 600,
      chartHeight: 400,
      marginTop: 40,
      marginBottom: 60,
      marginLeft: 80,
      marginRight: 40,
    },
    dataLabels: {
      show: true,
      position: "outside",
      fontSize: 14,
      color: "#374151",
    },
    insights: {
      show: true,
      highlight: {
        dataIndex: 1,
        text: "업무 앱 사용시간이 가장 많아요!",
        color: "#F59E0B",
      },
      footer: {
        text: "iOS 스크린타임 설정에서 수집한 데이터",
        source: "@data_daily_kr",
      },
    },
  },
  canvas: { width: 1080, height: 1080 },
};

async function testTemplate() {
  try {
    console.log('🧪 Testing single data-viz template...');
    console.log('📝 Template data:', JSON.stringify(barChartTest, null, 2));
    
    const response = await fetch('http://localhost:3000/api/v1/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(barChartTest),
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', [...response.headers.entries()]);

    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const outputPath = path.join(__dirname, 'debug-bar-chart.png');
      
      fs.writeFileSync(outputPath, Buffer.from(buffer));
      console.log(`✅ Generated: ${outputPath}`);
    } else {
      const error = await response.text();
      console.error(`❌ Failed to generate: ${error}`);
    }
  } catch (error) {
    console.error(`❌ Error:`, error);
  }
}

testTemplate();