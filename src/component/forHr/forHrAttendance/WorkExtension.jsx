import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';
import axios from 'axios';

export default function WorkExtension() {
  const chartRef = useRef(null);
  const [overtimeData, setOvertimeData] = useState([]);

  

  useEffect(() => {
    const chartCanvas = chartRef.current;
    // Get the latest 4 months starting from the current month
    const currentMonth = new Date().getMonth() + 1; // Adding 1 to make it 1-based
    const months = [];
    for (let i = 0; i < 4; i++) {
        const monthIndex = (currentMonth - i + 12) % 12; // Ensure it wraps around correctly
        months.push(monthIndex);
    }
    //months = months.reverse();

    console.log("4months", months);
    axios
      .get('http://localhost:5050/attendance/total')
      .then((response) => {
        if (response.status === 200) {
          const monthlyOvertimeSummaryDto = response.data.totalAttendanceSummaryDto.monthlyOvertimeSummaryDto;

          const overtimeHoursArray = months.map((monthIndex) => ({
            id: monthIndex,
            value: parseTimeToMinutes(monthlyOvertimeSummaryDto[monthIndex])
          }));

          setOvertimeData(overtimeHoursArray);

          const chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
              labels: months.map((monthIndex) => getMonthName(monthIndex).substr(0, 3)), // Use short month names as labels
              datasets: [
                {
                  label: '연장근무시간',
                  data: overtimeHoursArray.map((item) => item.value),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                datalabels: {
                  formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${minutesToHoursAndMinutes(value)}`;
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 500,
                  },
                },
              },
            },
          });

          return () => {
            chart.destroy();
          };
        }
      })
      .catch((error) => {
        console.error('WorkExtension Error fetching data:', error);
      });
  }, []);

  const parseTimeToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    return totalMinutes;
  };

  const minutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  };

  // Helper function to get month name from its index
  const getMonthName = (monthIndex) => {
    const monthNames = [
      'janOvertime', 'febOvertime', 'marOvertime', 'aprOvertime',
      'mayOvertime', 'junOvertime', 'julOvertime', 'augOvertime',
      'sepOvertime', 'octOvertime', 'novOvertime', 'decOvertime'
    ];
    return monthNames[monthIndex];
  };

  return (
    <>
      <WorkExtensionContainer>
        <Title>월별 연장근무 시간 추이</Title>
        <HorizonLine />
        <WorkExtensionGrid
          className="ag-theme-alpine"
          style={{ height: '800px', width: '350px' }}
        >
          <canvas ref={chartRef} width="800px" height="500px" />
        </WorkExtensionGrid>
      </WorkExtensionContainer>
    </>
  );
}

const WorkExtensionContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 300px;
  width: 100%;
  align-items: center;
`;

const Title = styled.h3`
  margin-left: 10px;
`;

const WorkExtensionGrid = styled.div`
  width: 900px;
  height: 110px;
`;
