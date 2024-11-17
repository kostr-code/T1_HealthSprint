import { Box, Text, Progress } from '@chakra-ui/react'

export default function MetricCard({ title, value, total, colorScheme }) {
  const progress = (value / total) * 100
  const color = progress < 33 ? 'red' : progress < 66 ? 'yellow' : 'green'

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <Text fontSize="lg" fontWeight="medium" mb={2}>
        {title}
      </Text>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        {value}
      </Text>
      <Progress
        value={progress}
        colorScheme={color}
        size="sm"
        borderRadius="full"
      />
    </Box>
  )
}