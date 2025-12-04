const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
const dayLabels = Array.from({ length: 31 }, (_, i) => i + 1);
export const dualAxesData = [
  { month: "January", data1: 6, data2: 3, data3: 4 },
  { month: "February", data1: 2, data2: 5, data3: 6 },
  { month: "March", data1: 9, data2: 1, data3: 7 },
  { month: "April", data1: 2, data2: 3, data3: 5 },
  { month: "May", data1: 2, data2: 1, data3: 4 },
  { month: "June", data1: 1, data2: 2, data3: 3 },
  { month: "July", data1: 1, data2: 2, data3: 5 },
];
export const AntdColumnData = [
  { day: "1", type: "신규방문", value: 450 },
  { day: "1", type: "재방문", value: 280 },

  { day: "2", type: "신규방문", value: 480 },
  { day: "2", type: "재방문", value: 320 },

  { day: "3", type: "신규방문", value: 520 },
  { day: "3", type: "재방문", value: 620 },

  { day: "4", type: "신규방문", value: 490 },
  { day: "4", type: "재방문", value: 580 },

  { day: "5", type: "신규방문", value: 460 },
  { day: "5", type: "재방문", value: 680 },

  { day: "6", type: "신규방문", value: 510 },
  { day: "6", type: "재방문", value: 750 },

  { day: "7", type: "신규방문", value: 480 },
  { day: "7", type: "재방문", value: 820 },

  { day: "8", type: "신규방문", value: 500 },
  { day: "8", type: "재방문", value: 890 },

  { day: "9", type: "신규방문", value: 530 },
  { day: "9", type: "재방문", value: 920 },

  { day: "10", type: "신규방문", value: 560 },
  { day: "10", type: "재방문", value: 1050 },

  { day: "11", type: "신규방문", value: 580 },
  { day: "11", type: "재방문", value: 1120 },

  { day: "12", type: "신규방문", value: 550 },
  { day: "12", type: "재방문", value: 1080 },

  { day: "13", type: "신규방문", value: 570 },
  { day: "13", type: "재방문", value: 1200 },

  { day: "14", type: "신규방문", value: 590 },
  { day: "14", type: "재방문", value: 1250 },

  { day: "15", type: "신규방문", value: 560 },
  { day: "15", type: "재방문", value: 1180 },

  { day: "16", type: "신규방문", value: 540 },
  { day: "16", type: "재방문", value: 1100 },

  { day: "17", type: "신규방문", value: 600 },
  { day: "17", type: "재방문", value: 1380 },

  { day: "18", type: "신규방문", value: 520 },
  { day: "18", type: "재방문", value: 950 },

  { day: "19", type: "신규방문", value: 490 },
  { day: "19", type: "재방문", value: 880 },

  { day: "20", type: "신규방문", value: 510 },
  { day: "20", type: "재방문", value: 920 },

  { day: "21", type: "신규방문", value: 480 },
  { day: "21", type: "재방문", value: 850 },

  { day: "22", type: "신규방문", value: 470 },
  { day: "22", type: "재방문", value: 820 },

  { day: "23", type: "신규방문", value: 460 },
  { day: "23", type: "재방문", value: 790 },

  { day: "24", type: "신규방문", value: 490 },
  { day: "24", type: "재방문", value: 840 },

  { day: "25", type: "신규방문", value: 510 },
  { day: "25", type: "재방문", value: 900 },

  { day: "26", type: "신규방문", value: 530 },
  { day: "26", type: "재방문", value: 950 },

  { day: "27", type: "신규방문", value: 520 },
  { day: "27", type: "재방문", value: 920 },

  { day: "28", type: "신규방문", value: 500 },
  { day: "28", type: "재방문", value: 880 },

  { day: "29", type: "신규방문", value: 490 },
  { day: "29", type: "재방문", value: 860 },

  { day: "30", type: "신규방문", value: 510 },
  { day: "30", type: "재방문", value: 900 },

  { day: "31", type: "신규방문", value: 530 },
  { day: "31", type: "재방문", value: 940 },
];

export const ChartJsBarData = {
  labels: dayLabels,
  datasets: [
    {
      label: "신규방문",
      data: [
        450, 480, 520, 490, 460, 510, 480, 500, 530, 560, 580, 550, 570, 590,
        560, 540, 600, 520, 490, 510, 480, 470, 460, 490, 510, 530, 520, 500,
        490, 510, 530,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "재방문",
      data: [
        280, 320, 620, 580, 680, 750, 820, 890, 920, 1050, 1120, 1080, 1200,
        1250, 1180, 1100, 1380, 950, 880, 920, 850, 820, 790, 840, 900, 950,
        920, 880, 860, 900, 940,
      ],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const ChartJsMultipleData = {
  labels: monthLabels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: [650, 590, 800, 810, 560, 550, 400],
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: [280, 480, 400, 190, 860, 270, 900],
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      data: [120, 300, 250, 700, 450, 680, 520],
    },
  ],
};

export const RechartMultipleData = [
  { name: "January", data1: 400, data2: 240, data3: 240, data4: 10 },
  { name: "February", data1: 300, data2: 139, data3: 221, data4: 115 },
  { name: "March", data1: 200, data2: 980, data3: 229, data4: 20 },
  { name: "April", data1: 278, data2: 390, data3: 200, data4: 250 },
  { name: "May", data1: 189, data2: 480, data3: 218, data4: 30 },
  { name: "June", data1: 239, data2: 380, data3: 250, data4: 354 },
  { name: "July", data1: 349, data2: 430, data3: 210, data4: 40 },
];

// Rechart SimpleBar용 데이터
export const RechartSimpleBarData = [
  { name: "1", newVisit: 450, returnVisit: 280 },
  { name: "2", newVisit: 480, returnVisit: 320 },
  { name: "3", newVisit: 520, returnVisit: 620 },
  { name: "4", newVisit: 490, returnVisit: 580 },
  { name: "5", newVisit: 460, returnVisit: 680 },
  { name: "6", newVisit: 510, returnVisit: 750 },
  { name: "7", newVisit: 480, returnVisit: 820 },
  { name: "8", newVisit: 500, returnVisit: 890 },
  { name: "9", newVisit: 530, returnVisit: 920 },
  { name: "10", newVisit: 560, returnVisit: 1050 },
  { name: "11", newVisit: 580, returnVisit: 1120 },
  { name: "12", newVisit: 550, returnVisit: 1080 },
  { name: "13", newVisit: 570, returnVisit: 1200 },
  { name: "14", newVisit: 590, returnVisit: 1250 },
  { name: "15", newVisit: 560, returnVisit: 1180 },
  { name: "16", newVisit: 540, returnVisit: 1100 },
  { name: "17", newVisit: 600, returnVisit: 1380 },
  { name: "18", newVisit: 520, returnVisit: 950 },
  { name: "19", newVisit: 490, returnVisit: 880 },
  { name: "20", newVisit: 510, returnVisit: 920 },
  { name: "21", newVisit: 480, returnVisit: 850 },
  { name: "22", newVisit: 470, returnVisit: 820 },
  { name: "23", newVisit: 460, returnVisit: 790 },
  { name: "24", newVisit: 490, returnVisit: 840 },
  { name: "25", newVisit: 510, returnVisit: 900 },
  { name: "26", newVisit: 530, returnVisit: 950 },
  { name: "27", newVisit: 520, returnVisit: 920 },
  { name: "28", newVisit: 500, returnVisit: 880 },
  { name: "29", newVisit: 490, returnVisit: 860 },
  { name: "30", newVisit: 510, returnVisit: 900 },
  { name: "31", newVisit: 530, returnVisit: 940 },
];
