const fs = require('fs');
const path = require('path');

// Simple ranking table test
const rankingTest = {
  name: "ranking-table",
  params: {
    title: {
      text: "간단한 테스트",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 32,
      color: "#000000",
      alignment: "center",
      bgColor: "#FFFFFF",
    },
    data: [
      {
        rank: 1,
        name: "테스트1",
        category: "카테고리1",
        description: "설명1",
      },
      {
        rank: 2,
        name: "테스트2",
        category: "카테고리2",
        description: "설명2",
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

async function testRanking() {
  try {
    console.log('🧪 Testing ranking table...');
    
    const response = await fetch('http://localhost:3000/api/v1/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rankingTest),
    });

    console.log('📊 Response status:', response.status);

    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const outputPath = path.join(__dirname, 'test-ranking-simple.png');
      
      fs.writeFileSync(outputPath, Buffer.from(buffer));
      console.log(`✅ Generated: ${outputPath}`);
    } else {
      const error = await response.text();
      console.error(`❌ Failed: ${error}`);
    }
  } catch (error) {
    console.error(`❌ Error:`, error);
  }
}

testRanking();