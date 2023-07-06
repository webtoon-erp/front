import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

export default function VacationRemain() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;
    const chartData = [getRandomNumber(), getRandomNumber()];

    const chart = new Chart(chartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['소진 연차', '잔여 연차'],
        datasets: [
          {
            label: '인원',
            data: chartData,
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          datalabels: {
            formatter: (value, context) => {
              const dataset = context.chart.data.datasets[0];
              const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${value}명 (${percentage}%)`;
            },
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        tooltips: {
          enabled: false,
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  const getRandomNumber = () => Math.floor(Math.random() * 101);

  return (
    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
      <h2>연차현황</h2>
      <canvas ref={chartRef} width="200" height="300"></canvas>
    </div>
  );
}


