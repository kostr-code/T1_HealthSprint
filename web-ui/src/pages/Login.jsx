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

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    // In a real app, you would validate credentials here
    setUser({ name: 'User', email: e.target.email.value })
    navigate('/dashboard')
  }

  const handleGuestLogin = () => {
    setUser({ name: 'Guest', email: 'guest@example.com' })
    navigate('/dashboard')
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box w="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Heading>Войти</Heading>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" required />
              </FormControl>
              <FormControl>
                <FormLabel>Пароль</FormLabel>
                <Input type="password" name="password" required />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="100%">
                Войти
              </Button>
            </VStack>
          </form>
          <Button onClick={handleGuestLogin} variant="outline" width="100%">
            Войти как гость
          </Button>
          <Text>
            Нет аккаунта?{' '}
            <ChakraLink as={Link} to="/register" color="blue.500">
              Зарегистрироваться
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}