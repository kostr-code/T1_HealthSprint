import { Box, VStack, Text, useColorModeValue } from '@chakra-ui/react'
import { FiFile } from 'react-icons/fi'

export default function FileList({ files, selectedFile, onFileSelect }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const selectedBgColor = useColorModeValue('blue.50', 'blue.900')

  return (
    <VStack spacing={2} align="stretch" w="100%">
      {files.map((file) => (
        <Box
          key={file.name}
          p={3}
          bg={file.name === selectedFile?.name ? selectedBgColor : bgColor}
          borderRadius="md"
          cursor="pointer"
          onClick={() => onFileSelect(file)}
          display="flex"
          alignItems="center"
          _hover={{ bg: selectedBgColor }}
        >
          <FiFile style={{ marginRight: '8px' }} />
          <Text fontSize="sm" isTruncated>
            {file.name}
          </Text>
        </Box>
      ))}
    </VStack>
  )
}