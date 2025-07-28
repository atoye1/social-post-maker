const fs = require('fs');
const path = require('path');

// Test data for ranking table
const rankingTableTest = {
  name: "ranking-table",
  params: {
    title: {
      text: "한때 잘 나갔지만 시라진 브랜드",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 32,
      color: "#000000",
      alignment: "center",
      bgColor: "#FFFFFF",
    },
    subtitle: {
      text: "출처: 각 브랜드의 공식 발표, 언론 보도(매일경제·한겨레·이데일리 등)",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 14,
      color: "#666666",
      alignment: "center",
    },
    data: [
      {
        rank: 1,
        name: "크라운베이커리",
        category: "베이커리",
        description: "전 매장 철수, 브랜드 종료",
        // Remove logo for validation
      },
      {
        rank: 2,
        name: "아웃백",
        category: "레스토랑",
        description: "점범 이상 폐점, 브랜드 축소",
      },
      {
        rank: 3,
        name: "민들레영토",
        category: "커피",
        description: "대부분 폐점, 주력 브랜드",
      },
    ],
    background: { type: "color", value: "#FFFFFF", opacity: 1 },
    headerStyle: {
      backgroundColor: "#1F2937",
      textColor: "#FFFFFF",
      fontSize: 16,
      fontWeight: 600,
    },
    rowStyle: {
      alternateRowColor: true,
      primaryRowColor: "#FFFFFF",
      alternateRowColorValue: "#F8F9FA",
      textColor: "#1F2937",
      borderColor: "#E5E7EB",
      fontSize: 14,
    },
    showRankNumbers: true,
    showLogos: false,
    tableLayout: {
      rankWidth: 60,
      nameWidth: 180,
      logoWidth: 80,
      categoryWidth: 120,
      descriptionWidth: 300,
      padding: 12,
    },
  },
  canvas: { width: 1080, height: 1080 },
};

// Test data for bar chart - using exact schema defaults with Korean content
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
      { label: "독서", value: 1.5, color: "#F59E0B" },
      { label: "기타", value: 0.8, color: "#8B5CF6" },
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

// Test data for pie chart - using exact schema defaults
const pieChartTest = {
  name: "data-viz",
  params: {
    title: {
      text: "Global Internet Users by Region",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 42,
      color: "#000000",
      alignment: "center",
      bgColor: "#FFFFFF",
    },
    subtitle: {
      text: "Number of internet users (in billions) as of 2024",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 20,
      color: "#4B5563",
      alignment: "center",
    },
    chartType: "pie",
    data: [
      { label: "Asia", value: 2.8, color: "#3B82F6" },
      { label: "Europe", value: 0.7, color: "#EF4444" },
      { label: "North America", value: 0.4, color: "#10B981" },
      { label: "South America", value: 0.3, color: "#F59E0B" },
      { label: "Africa", value: 0.6, color: "#8B5CF6" },
      { label: "Oceania", value: 0.03, color: "#EC4899" },
    ],
    background: { type: "color", value: "#FFFFFF", opacity: 1 },
    chartStyle: {
      primaryColor: "#3B82F6",
      secondaryColor: "#EF4444",
      accentColor: "#10B981",
      gridColor: "#E5E7EB",
      textColor: "#111827",
      showGrid: false,
      showValues: true,
      showLegend: true,
      animation: false,
    },
    layout: {
      chartWidth: 500,
      chartHeight: 500,
      marginTop: 40,
      marginBottom: 40,
      marginLeft: 40,
      marginRight: 40,
    },
    dataLabels: {
      show: true,
      position: "outside",
      fontSize: 16,
      color: "#111827",
    },
    insights: {
      show: true,
      highlight: {
        dataIndex: 0,
        text: "Asia represents over 60% of global internet users",
        color: "#3B82F6",
      },
      footer: {
        text: "Source: International Telecommunication Union (ITU)",
        source: "@infobeautiful",
      },
    },
  },
  canvas: { width: 1080, height: 1080 },
};

async function testTemplate(template, filename) {
  try {
    console.log(`Testing ${filename}...`);
    
    const response = await fetch('http://localhost:3000/api/v1/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(template),
    });

    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const outputPath = path.join(__dirname, 'screenshots', `${filename}.png`);
      
      // Create screenshots directory if it doesn't exist
      const screenshotsDir = path.join(__dirname, 'screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      
      fs.writeFileSync(outputPath, Buffer.from(buffer));
      console.log(`✅ Generated: ${outputPath}`);
      return true;
    } else {
      const error = await response.text();
      console.error(`❌ Failed to generate ${filename}: ${error}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error testing ${filename}:`, error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting template tests...\n');
  
  const tests = [
    { template: rankingTableTest, name: 'ranking-table-korean' },
    { template: barChartTest, name: 'data-viz-bar-chart-korean' },
    { template: pieChartTest, name: 'data-viz-pie-chart-global' },
  ];
  
  let successful = 0;
  let total = tests.length;
  
  for (const test of tests) {
    const success = await testTemplate(test.template, test.name);
    if (success) successful++;
    console.log(''); // Add spacing
  }
  
  console.log(`📊 Test Results: ${successful}/${total} templates generated successfully`);
  
  if (successful === total) {
    console.log('🎉 All templates working perfectly!');
  } else {
    console.log(`⚠️  ${total - successful} templates need debugging`);
  }
}

// Run the tests
runTests().catch(console.error);