import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function WorkExtension() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;
    const chartData = getRecentMonthsData();

    const chart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: '연장근무시간',
            data: chartData.data,
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
              return label + ': ' + value;
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
  }, []);

  // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //     .then(result => result.json())
    //     .then(Data => setData(Data))
    // }, []);

  const getRandomNumber = () => Math.floor(Math.random() * 101);  //

  const getRecentMonthsData = () => {
    const currentYearMonth = new Date().toISOString().slice(0, 7);
    const months = [];
    const data = [];

    for (let i = 3; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const yearMonth = date.toISOString().slice(0, 7).replace(/-/g, '');
      months.push(yearMonth);
      data.push(getRandomNumber()); //
    }

    return { labels: months, data };
  };

  return (
  <>
      <WorkExtensionContainer>
        <Title>월별 연장근무 시간 추이</Title>
        <HorizonLine />
        <WorkExtensionGrid className="ag-theme-alpine" style={{ height: '800px', width: '350px' }}>
            <canvas ref={chartRef} width="800px" height="500px" />
        </WorkExtensionGrid>
    </WorkExtensionContainer>
  </>
  )
};

const WorkExtensionContainer = styled.div`
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

const WorkExtensionGrid = styled.div`
    width: 900px;
    height: 110px;
`