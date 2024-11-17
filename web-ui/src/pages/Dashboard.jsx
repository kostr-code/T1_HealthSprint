import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Button,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import FileUpload from '../components/FileUpload'
import FileList from '../components/FileList'
import Overview from '../components/analysis/Overview'
import BurndownChart from '../components/analysis/BurndownChart'
import VelocityMetrics from '../components/analysis/VelocityMetrics'

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

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [files, setFiles] = useState([{ name: 'demo-sprint-data.json', type: 'application/json' }])
  const [selectedFile, setSelectedFile] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
  }

  const handleFileUpload = (file) => {
    setFiles((prev) => [...prev, file])
  }

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const renderAnalysisContent = () => {
    switch (activeTab) {
      case 0:
        return <Overview data={demoData} />
      case 1:
        return <BurndownChart data={demoData} />
      case 2:
        return <VelocityMetrics data={demoData} />
      default:
        return null
    }
  }

  return (
    <Box minH="100vh" bg="gray.100">
      <Container maxW="container.xl" py={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Heading size="lg">Dashboard</Heading>
          <Box>
            <Text display="inline-block" mr={4}>
              Hello, {user?.name}!
            </Text>
            <Button onClick={handleLogout} colorScheme="red" size="sm">
              Logout
            </Button>
          </Box>
        </Box>

        <Grid templateColumns="1fr 4fr" gap={6}>
          <GridItem>
            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
              <Heading size="md" mb={4}>
                Files
              </Heading>
              <FileUpload onFileUpload={handleFileUpload} />
              <Box mt={4}>
                <FileList
                  files={files}
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                />
              </Box>
            </Box>
          </GridItem>

          <GridItem>
            <Box>
              <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" mb={6}>
                <Heading size="md">
                  {selectedFile ? `Analysis: ${selectedFile.name}` : 'Demo Analysis'}
                </Heading>
              </Box>
              <Tabs onChange={setActiveTab} index={activeTab}>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Burndown Chart</Tab>
                  <Tab>Velocity Metrics</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>{renderAnalysisContent()}</TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}