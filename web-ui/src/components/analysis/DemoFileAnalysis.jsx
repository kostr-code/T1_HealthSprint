import { Box, Text } from '@chakra-ui/react'
import Overview from './Overview'
import BurndownChart from './BurndownChart'
import VelocityMetrics from './VelocityMetrics'

export default function DemoFileAnalysis() {
  const demoData = {
    totalPoints: 85,
    completedPoints: 45,
    progress: 53,
    burndown: [100, 90, 75, 65, 45, 35, 25],
    velocity: {
      planned: [30, 35, 28, 32, 34],
      completed: [25, 32, 28, 30, 33],
    },
  }

  return (
    <Box>
      <Box mb={6}>
        <Text fontSize="sm" color="gray.500">
          This is a demo analysis. Upload your own file to see real data.
        </Text>
      </Box>
      <Overview data={demoData} />
      <Box mt={8}>
        <BurndownChart data={demoData} />
      </Box>
      <Box mt={8}>
        <VelocityMetrics data={demoData} />
      </Box>
    </Box>
  )
}