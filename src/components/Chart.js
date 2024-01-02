import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({ data }) => {
  const today = new Date();
  const nextSevenDays = new Date(today);
  nextSevenDays.setDate(today.getDate() + 7);

  
  const tasksDueInNext7Days = data.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= nextSevenDays;
  });

  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: tasksDueInNext7Days.map((task) => {
        const dueDate = new Date(task.dueDate);
        const remainingDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

        const formattedDueDate =
 `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;

        return `${task.name} - ${formattedDueDate} (${remainingDays} days remaining)`;
      }),
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' days remaining';
        },
      },
    },
  };

  const series = [
    {
      name: 'Due in 7 Days',
      data: tasksDueInNext7Days.map((task) => {
        const remainingDays = Math.ceil((new Date(task.dueDate) - today) / (1000 * 60 * 60 * 24));
        return remainingDays;
      }),
    },
  ];

  return <ReactApexChart options={options} series={series} type="bar" height={350} />;
};

export default Chart;
