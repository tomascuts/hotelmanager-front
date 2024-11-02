import { useState } from 'react'
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip
} from '@mui/material'

const installations = [
  { id: 'gym', name: 'Gimnasio', icon: '🏋️' },
  { id: 'pool', name: 'Pileta', icon: '🏊' },
  { id: 'dining', name: 'Comedor', icon: '🍽️' },
  { id: 'bar', name: 'Bar', icon: '🍸' }
]

const users = [
  { id: 1, nombre: "Juan Pérez", dni: "12345678", credencial: "EJECUTIVA" },
  { id: 2, nombre: "María García", dni: "87654321", credencial: "BASICA" },
  { id: 3, nombre: "Carlos López", dni: "11223344", credencial: "PREMIUM" }
]

const credentialAccess = {
  BASICA: ['dining'],
  EJECUTIVA: ['gym', 'pool', 'dining', 'bar'],
  PREMIUM: ['gym', 'pool', 'dining']
}

const credentialColors = {
  BASICA: 'default',
  EJECUTIVA: 'primary',
  PREMIUM: 'secondary'
}

export default function AccessVerification() {
  const [selectedInstallation, setSelectedInstallation] = useState('')

  const checkAccess = (userCredential, installation) => {
    return credentialAccess[userCredential].includes(installation)
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom className="text-primary">
        Verificación de Acceso a Instalaciones
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="installation-label">Seleccionar Instalación</InputLabel>
          <Select
            labelId="installation-label"
            
            value={selectedInstallation}
            onChange={(e) => setSelectedInstallation(e.target.value)}
            label="Seleccionar Instalación"
          >
            {installations.map((installation) => (
              <MenuItem key={installation.id} value={installation.id}>
                {installation.icon} {installation.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {selectedInstallation && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Credencial</TableCell>
                <TableCell>Acceso a {installations.find(i => i.id === selectedInstallation)?.name}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.nombre}</TableCell>
                  <TableCell>{user.dni}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.credencial}
                      color={credentialColors[user.credencial]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={checkAccess(user.credencial, selectedInstallation) ? "Permitido" : "Denegado"}
                      color={checkAccess(user.credencial, selectedInstallation) ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}