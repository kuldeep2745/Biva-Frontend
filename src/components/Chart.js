import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: data.map((task) => task.name),
    },
  };

  const series = [
    {
      name: 'Due in 7 Days',
      data: data.map((task) => task.dueDate),
    },
  ];

  return <ReactApexChart options={options} series={series} type="bar" height={350} />;
};

export default Chart;
