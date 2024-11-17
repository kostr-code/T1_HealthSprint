import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function FileUpload({ onFileUpload }) {
  const toast = useToast()

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      // In a real app, you would process the file here
      onFileUpload({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      })
      toast({
        title: 'File uploaded successfully',
        status: 'success',
        duration: 3000,
      })
    }
  }, [onFileUpload, toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box
      {...getRootProps()}
      p={6}
      border="2px dashed"
      borderColor={isDragActive ? 'blue.400' : 'gray.200'}
      borderRadius="lg"
      cursor="pointer"
      _hover={{ borderColor: 'blue.400' }}
    >
      <input {...getInputProps()} />
      <VStack spacing={2}>
        <Text>Drop file here or click to upload</Text>
        <Button size="sm" colorScheme="blue">
          Select File
        </Button>
      </VStack>
    </Box>
  )
}