import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'

export default function SalesChart() {
  const bgColor = useColorModeValue('white', 'gray.800')
  
  const lineChartData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [
      {
        label: 'Продажи',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="sm">
      <Heading size="md" mb={4}>
        График продаж
      </Heading>
      <Line data={lineChartData} />
    </Box>
  )
}