import { Box } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'

export default function BurndownChart({ data }) {
  const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10']
  const idealBurndown = Array.from({ length: 10 }, (_, i) => 100 - (i * 10))
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Ideal Burndown',
        data: idealBurndown,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Actual Burndown',
        data: data?.burndown || [100, 95, 92, 85, 82, 75, 68, 55, 48, 40],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Sprint Burndown Chart',
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 16,
        },
      },
      tooltip: {
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Story Points Remaining',
          padding: 20,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Sprint Days',
          padding: 20,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  }

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" height="400px">
      <Line data={chartData} options={options} />
    </Box>
  )
}