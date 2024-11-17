import { SimpleGrid, Box, Text, Progress, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'

function MetricCard({ title, value, total, helpText }) {
  const progress = (value / total) * 100
  const color = progress < 33 ? 'red' : progress < 66 ? 'yellow' : 'green'

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <Stat>
        <StatLabel fontSize="lg" color="gray.600">{title}</StatLabel>
        <StatNumber fontSize="3xl" fontWeight="bold" my={2}>
          {value}
        </StatNumber>
        {helpText && (
          <StatHelpText color="gray.500">
            {helpText}
          </StatHelpText>
        )}
      </Stat>
      <Progress
        value={progress}
        colorScheme={color}
        size="sm"
        borderRadius="full"
        mt={2}
      />
    </Box>
  )
}

export default function Overview({ data }) {
  return (
    <SimpleGrid columns={3} spacing={6}>
      <MetricCard
        title="Total Story Points"
        value={data?.totalPoints || 0}
        total={100}
        helpText="Sprint capacity"
      />
      <MetricCard
        title="Completed Points"
        value={data?.completedPoints || 0}
        total={data?.totalPoints || 100}
        helpText="Points done"
      />
      <MetricCard
        title="Sprint Progress"
        value={data?.progress || 0}
        total={100}
        helpText="Overall completion"
      />
    </SimpleGrid>
  )
}