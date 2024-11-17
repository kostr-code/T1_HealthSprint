import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2'

export default function VisitsChart() {
  const bgColor = useColorModeValue('white', 'gray.800')
  
  const barChartData = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Посещения',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="sm">
      <Heading size="md" mb={4}>
        Посещения по дням
      </Heading>
      <Bar data={barChartData} />
    </Box>
  )
}