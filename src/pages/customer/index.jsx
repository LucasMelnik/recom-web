import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function List() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('./new')
  }

  return (
    <Box>
      <Box>
      <Button onClick={handleClick} colorScheme='blue'>+ Novo Cliente</Button>
      </Box>
    </Box>
  )

}
