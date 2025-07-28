import { RankingTable, TableRow } from "./templates/ranking-table"
import { DataViz, DataPoint } from "./templates/data-viz"
import { AlignmentOptions, FontFamilyOptions } from "@/types"

// Mock data for Korean ranking table (inspired by real Instagram posts)
export const mockKoreanRankingData: TableRow[] = [
  {
    rank: 1,
    name: "크라운베이커리",
    category: "베이커리",
    description: "전 매장 철수, 브랜드 종료",
    logo: {
      url: "https://via.placeholder.com/60x60/FF6B6B/white?text=C",
      alt: "크라운베이커리",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 2,
    name: "아웃백",
    category: "레스토랑",
    description: "점범 이상 폐점, 브랜드 축소",
    logo: {
      url: "https://via.placeholder.com/60x60/4ECDC4/white?text=O",
      alt: "아웃백",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 3,
    name: "민들레영토",
    category: "커피",
    description: "대부분 폐점, 주력 브랜드",
    logo: {
      url: "https://via.placeholder.com/60x60/45B7D1/white?text=M",
      alt: "민들레영토",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 4,
    name: "캔도아",
    category: "디저트",
    description: "프랜차이즈 수익",
    logo: {
      url: "https://via.placeholder.com/60x60/96CEB4/white?text=K",
      alt: "캔도아",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 5,
    name: "레드망고",
    category: "요거트",
    description: "국내 시장 철수",
    logo: {
      url: "https://via.placeholder.com/60x60/FFEAA7/black?text=R",
      alt: "레드망고",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 6,
    name: "미스터피자",
    category: "피자",
    description: "직접 축소, 이미지 하락",
    logo: {
      url: "https://via.placeholder.com/60x60/DDA0DD/white?text=P",
      alt: "미스터피자",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 7,
    name: "스킨푸드",
    category: "화장품",
    description: "매장 축소, 경영 악화",
    logo: {
      url: "https://via.placeholder.com/60x60/74C69D/white?text=S",
      alt: "스킨푸드",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 8,
    name: "베니건스",
    category: "패밀리레스토랑",
    description: "국내 철수 완료",
    logo: {
      url: "https://via.placeholder.com/60x60/43AA8B/white?text=B",
      alt: "베니건스",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
]

// Mock data for personal screen time (Mona Chalabi style)
export const mockPersonalScreenTimeData: DataPoint[] = [
  { 
    label: "소셜미디어", 
    value: 3.2, 
    color: "#EF4444", 
    description: "인스타그램, 틱톡 등에서 너무 많은 시간 소모 😅" 
  },
  { 
    label: "업무앱", 
    value: 5.8, 
    color: "#3B82F6", 
    description: "슬랙, 이메일, 업무 도구들" 
  },
  { 
    label: "엔터테인먼트", 
    value: 2.1, 
    color: "#10B981", 
    description: "넷플릭스, 유튜브 시청" 
  },
  { 
    label: "독서", 
    value: 1.5, 
    color: "#F59E0B", 
    description: "더 많이 읽어야 하는데..." 
  },
  { 
    label: "기타", 
    value: 0.8, 
    color: "#8B5CF6", 
    description: "잡다한 앱들" 
  },
]

// Mock data for global internet users
export const mockGlobalInternetData: DataPoint[] = [
  { label: "아시아", value: 2.8, color: "#3B82F6" },
  { label: "유럽", value: 0.7, color: "#EF4444" },
  { label: "북미", value: 0.4, color: "#10B981" },
  { label: "남미", value: 0.3, color: "#F59E0B" },
  { label: "아프리카", value: 0.6, color: "#8B5CF6" },
  { label: "오세아니아", value: 0.03, color: "#EC4899" },
]

// Mock data for K-pop popularity rankings
export const mockKpopRankingData: TableRow[] = [
  {
    rank: 1,
    name: "BTS",
    category: "보이그룹",
    description: "글로벌 슈퍼스타, 빌보드 1위",
    logo: {
      url: "https://via.placeholder.com/60x60/663399/white?text=BTS",
      alt: "BTS",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 2,
    name: "BLACKPINK",
    category: "걸그룹",
    description: "해외 인기 1위, 유튜브 조회수 신기록",
    logo: {
      url: "https://via.placeholder.com/60x60/FF1493/white?text=BP",
      alt: "BLACKPINK",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 3,
    name: "TWICE",
    category: "걸그룹",
    description: "일본 시장 강세, 아시아 인기",
    logo: {
      url: "https://via.placeholder.com/60x60/FF6347/white?text=2X",
      alt: "TWICE",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 4,
    name: "Stray Kids",
    category: "보이그룹",
    description: "4세대 대표 그룹, 해외 투어 성공",
    logo: {
      url: "https://via.placeholder.com/60x60/000000/white?text=SKZ",
      alt: "Stray Kids",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
  {
    rank: 5,
    name: "IVE",
    category: "걸그룹",
    description: "4세대 신인왕, 차세대 에이스",
    logo: {
      url: "https://via.placeholder.com/60x60/FFB6C1/black?text=IVE",
      alt: "IVE",
      width: 60,
      height: 60,
      borderRadius: 8,
      objectFit: "cover",
    },
  },
]

// Full template examples with rich mock data
export const richMockTemplates = {
  "korean-brands-decline": {
    name: "ranking-table" as const,
    params: {
      title: {
        text: "한때 잘 나갔지만 시라진 브랜드",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 700,
        fontSize: 32,
        color: "#000000",
        alignment: AlignmentOptions.CENTER,
        bgColor: "#FFFFFF",
      },
      subtitle: {
        text: "출처: 각 브랜드의 공식 발표, 언론 보도(매일경제·한겨레·이데일리 등), 업계 자료를 기반으로 재구성",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 400,
        fontSize: 14,
        color: "#666666",
        alignment: AlignmentOptions.CENTER,
      },
      data: mockKoreanRankingData,
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
      showLogos: true,
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
  },

  "kpop-global-ranking": {
    name: "ranking-table" as const,
    params: {
      title: {
        text: "2024 글로벌 K-POP 인기 순위",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 700,
        fontSize: 36,
        color: "#FFFFFF",
        alignment: AlignmentOptions.CENTER,
        bgColor: "#8B5CF6",
      },
      subtitle: {
        text: "스포티파이, 유튜브, 소셜미디어 데이터 종합 분석 결과",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 400,
        fontSize: 16,
        color: "#6B7280",
        alignment: AlignmentOptions.CENTER,
      },
      data: mockKpopRankingData,
      background: { 
        type: "gradient", 
        value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        opacity: 1 
      },
      headerStyle: {
        backgroundColor: "#8B5CF6",
        textColor: "#FFFFFF",
        fontSize: 18,
        fontWeight: 600,
      },
      rowStyle: {
        alternateRowColor: true,
        primaryRowColor: "rgba(255, 255, 255, 0.95)",
        alternateRowColorValue: "rgba(255, 255, 255, 0.8)",
        textColor: "#1F2937",
        borderColor: "#E5E7EB",
        fontSize: 15,
      },
      showRankNumbers: true,
      showLogos: true,
      tableLayout: {
        rankWidth: 70,
        nameWidth: 200,
        logoWidth: 90,
        categoryWidth: 120,
        descriptionWidth: 350,
        padding: 14,
      },
    },
    canvas: { width: 1080, height: 1350 },
  },

  "personal-screen-time": {
    name: "data-viz" as const,
    params: {
      title: {
        text: "나의 스크린타임 분석",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 600,
        fontSize: 36,
        color: "#1F2937",
        alignment: AlignmentOptions.LEFT,
        bgColor: "#FFFFFF",
      },
      subtitle: {
        text: "지난 한 달간 일평균 사용 시간 (단위: 시간)",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 400,
        fontSize: 18,
        color: "#6B7280",
        alignment: AlignmentOptions.LEFT,
      },
      chartType: "bar" as const,
      data: mockPersonalScreenTimeData,
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
        chartWidth: 700,
        chartHeight: 450,
        marginTop: 40,
        marginBottom: 80,
        marginLeft: 100,
        marginRight: 60,
      },
      dataLabels: {
        show: true,
        position: "outside" as const,
        fontSize: 16,
        color: "#374151",
      },
      insights: {
        show: true,
        highlight: {
          dataIndex: 1,
          text: "업무 앱 사용시간이 가장 많아요. 일과 삶의 균형이 필요해 보입니다! 🤔",
          color: "#F59E0B",
        },
        footer: {
          text: "iOS 스크린타임 설정에서 수집한 데이터",
          source: "@data_daily_kr",
        },
      },
    },
    canvas: { width: 1080, height: 1080 },
  },

  "global-internet-users": {
    name: "data-viz" as const,
    params: {
      title: {
        text: "Global Internet Users by Region",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 700,
        fontSize: 42,
        color: "#000000",
        alignment: AlignmentOptions.CENTER,
        bgColor: "#FFFFFF",
      },
      subtitle: {
        text: "Number of internet users (in billions) as of 2024",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 400,
        fontSize: 20,
        color: "#4B5563",
        alignment: AlignmentOptions.CENTER,
      },
      chartType: "pie" as const,
      data: mockGlobalInternetData,
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
        chartWidth: 600,
        chartHeight: 600,
        marginTop: 60,
        marginBottom: 60,
        marginLeft: 60,
        marginRight: 60,
      },
      dataLabels: {
        show: true,
        position: "outside" as const,
        fontSize: 16,
        color: "#111827",
      },
      insights: {
        show: true,
        highlight: {
          dataIndex: 0,
          text: "Asia represents over 60% of global internet users, showcasing the digital transformation across the continent",
          color: "#3B82F6",
        },
        footer: {
          text: "Source: International Telecommunication Union (ITU) 2024 Report",
          source: "@infobeautiful",
        },
      },
    },
    canvas: { width: 1080, height: 1080 },
  },
} as const