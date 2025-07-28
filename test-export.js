// Test script for export functionality
async function testExport() {
  const template = {
    name: "ranking-table",
    params: {
      title: "Test Export",
      items: [
        { name: "Item 1", value: "100", rank: 1 },
        { name: "Item 2", value: "90", rank: 2 }
      ]
    },
    canvas: {
      width: 1080,
      height: 1080,
      background: "#ffffff"
    }
  };

  try {
    const response = await fetch("http://localhost:3000/api/v1/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Export failed:", response.status, error);
      return;
    }

    const blob = await response.blob();
    console.log("Export successful!");
    console.log("Image size:", blob.size, "bytes");
    console.log("Image type:", blob.type);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testExport();