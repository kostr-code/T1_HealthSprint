import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const handleRegister = (e) => {
    e.preventDefault()
    // In a real app, you would create a new user here
    setUser({ name: e.target.name.value, email: e.target.email.value })
    navigate('/dashboard')
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box w="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Heading>Регистрация</Heading>
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input type="text" name="name" required />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" required />
              </FormControl>
              <FormControl>
                <FormLabel>Пароль</FormLabel>
                <Input type="password" name="password" required />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="100%">
                Зарегистрироваться
              </Button>
            </VStack>
          </form>
          <Text>
            Уже есть аккаунт?{' '}
            <ChakraLink as={Link} to="/login" color="blue.500">
              Войти
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}