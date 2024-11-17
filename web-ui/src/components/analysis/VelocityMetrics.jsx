import { Box } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2'

export default function VelocityMetrics({ data }) {
  const labels = ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6']
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Planned Points',
        data: data?.velocity?.planned || [30, 35, 28, 32, 34, 36],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Completed Points',
        data: data?.velocity?.completed || [25, 32, 28, 30, 33, 35],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
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
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Team Velocity Trend',
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
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || ''
            const value = context.parsed.y || 0
            return `${label}: ${value} points`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Story Points',
          padding: 20,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Sprints',
          padding: 20,
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" height="400px">
      <Bar data={chartData} options={options} />
    </Box>
  )
}