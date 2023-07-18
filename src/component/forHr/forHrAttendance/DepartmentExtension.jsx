import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function DepartmentVacation() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;
    const chartData = getGroupedBarData();

    const chart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets,
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: (value, context) => {
              const label = context.chart.data.labels[context.dataIndex];
              return label + ': ' + value;
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: '부서명',
            },
          },
          y: {
            title: {
              display: true,
              text: '시간',
            },
            beginAtZero: true,
            max: 500,
            ticks: {
              stepSize: 100,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  const getRandomNumber = () => Math.floor(Math.random() * 101);

  const getRandomPastelColor = () => {
    const hue = getRandomNumber();
    const saturation = 70 + getRandomNumber() / 4;
    const lightness = 75 + getRandomNumber() / 9;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getGroupedBarData = () => {
    const departments = ['인사부', '회계부', '영업부', '기술부'];
    const datasets = [];

    for (let i = 0; i < departments.length; i++) {
      const data = [];
      for (let j = 0; j < 5; j++) {
        data.push(getRandomNumber());
      }

      datasets.push({
        label: departments[i],
        data,
        backgroundColor: getRandomPastelColor(),
        borderColor: getRandomPastelColor(),
        borderWidth: 1,
      });
    }

    return { labels: ['0-100', '101-200', '201-300', '301-400', '401-500'], datasets };
  };

  return (
    <>
      

      <DepartmentVacationContainer>
      <Title>그룹별 연장근무시간(월계)</Title>
      <HorizonLine />
        <DepartmentVacationGrid className="ag-theme-alpine" style={{ height: '1000px', width: '400px' }}>
            <canvas ref={chartRef} width="1000px" height="500px"></canvas>
        </DepartmentVacationGrid>
      </DepartmentVacationContainer>
    </>
  );
}

const DepartmentVacationContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 300px;
  width: 100%
  align-items: center;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const DepartmentVacationGrid = styled.div`
    width: 1200px;
    height: 600px;
`