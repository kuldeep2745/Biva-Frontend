import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';

const ChartPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h2>Task Chart</h2>
      <Chart data={tasks} />
    </div>
  );
};

export default ChartPage;
