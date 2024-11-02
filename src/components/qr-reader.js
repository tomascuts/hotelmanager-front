import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip
} from '@mui/material'

export default function QRReader() {
  const [qrData, setQrData] = useState('')
  const [userData, setUserData] = useState(null)

  const handleQrDataChange = (event) => {
    setQrData(event.target.value)
  }

  const handleReadQR = () => {
    try {
      const parsedData = JSON.parse(qrData)
      setUserData(parsedData)
    } catch (error) {
      console.error('Error parsing QR data:', error)
      setUserData(null)
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom className="text-primary">
        Lector de Código QR
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          Ingrese los datos del código QR:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={qrData}
          onChange={handleQrDataChange}
          placeholder='Ejemplo: {"nombre":"Juan Pérez","dni":"12345678","credencial":"EJECUTIVA"}'
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleReadQR}>
          Leer QR
        </Button>
      </Paper>

      {userData && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Datos del Usuario:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>
                <strong>Nombre:</strong> {userData.nombre}
              </Typography>
              <Typography>
                <strong>DNI:</strong> {userData.dni}
              </Typography>
              <Typography>
                <strong>Credencial:</strong>{' '}
                <Chip
                  label={userData.credencial}
                  color={
                    userData.credencial === 'EJECUTIVA'
                      ? 'primary'
                      : userData.credencial === 'PREMIUM'
                      ? 'secondary'
                      : 'default'
                  }
                  size="small"
                />
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}