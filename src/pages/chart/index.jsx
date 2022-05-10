import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { dispatch } from '../../store';
import { handleDrawerActive } from '../../store/action';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  options: {
    animation: {
      duration: 0
    },
    transitions: {
      duration: 0
    },
    plugins: {
      tooltip: {
        callbacks: ({ tooltipItem, data }) => {
          console.log(tooltipItem, data);
          const { label, value } = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return `${label}+ ${value}`;
        }
      }
    }
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ giá trị cảm biến',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      beginAtZero: true,
    },
    x: {
      ticks: {
        beginAtZero: true,
        max: 10,
        min: 0,
      }
    }
  },
};

const color = ['255,0,0', '0,255,0', '0,0,255', '255,255,0', '255,0,255', '0,255,255'];



const Chart = () => {
  const sensorData = useSelector(state => state.data.clientData.sensorData);
  const data = {
    labels: sensorData[0].data.map((item) => item.createdAt),
    datasets: sensorData.map((element, index) => {
      return (
        {
          label: element.name,
          data: element.data.map(item => item.value),
          borderColor: `rgb(${color[index]})`,
          backgroundColor: `rgba(${color[index]}, 0.5)`,
        }
      )
    })
  };
  useEffect(() => {
    dispatch(handleDrawerActive(2));
  }, []);
  return (
    <Box sx={{ maxWidth: '100%', height: '100%' }}>
      <Line options={options} data={data} style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </Box>
  );
}

export default Chart;
