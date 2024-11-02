import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  TextField,
  Typography,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import { QRCodeSVG } from 'qrcode.react'

const initialUsers = [
  { id: 1, nombre: "Juan Pérez", dni: "12345678", credencial: "EJECUTIVA" },
  { id: 2, nombre: "María García", dni: "87654321", credencial: "BASICA" },
  { id: 3, nombre: "Carlos López", dni: "11223344", credencial: "PREMIUM" }
]

const credentialColors = {
  BASICA: 'default',
  EJECUTIVA: 'primary',
  PREMIUM: 'secondary'
}

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [newUser, setNewUser] = useState({ nombre: '', dni: '', credencial: '' })
  const [editingUser, setEditingUser] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [qrUser, setQrUser] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditingUser({ ...editingUser, [name]: value })
  }

  const handleAddUser = () => {
    if (newUser.nombre && newUser.dni && newUser.credencial) {
      const addedUser = { ...newUser, id: users.length + 1 }
      setUsers([...users, addedUser])
      setQrUser(addedUser)
      setQrDialogOpen(true)
      setNewUser({ nombre: '', dni: '', credencial: '' })
    }
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
  }

  const handleUpdateUser = () => {
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user))
    setEditingUser(null)
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user)
    setIsDialogOpen(true)
  }

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id))
    setIsDialogOpen(false)
  }

  const generateQRCode = (user) => {
    setQrUser(user)
    setQrDialogOpen(true)
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom className="text-primary">
        Gestión de Usuarios
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Agregar Nuevo Usuario
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre"
            name="nombre"
            value={newUser.nombre}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="DNI"
            name="dni"
            value={newUser.dni}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="credencial-label">Credencial</InputLabel>
            <Select
              labelId="credencial-label"
              name="credencial"
              value={newUser.credencial}
              onChange={handleInputChange}
              label="Credencial"
            >
              <MenuItem value="BASICA">Básica</MenuItem>
              <MenuItem value="EJECUTIVA">Ejecutiva</MenuItem>
              <MenuItem value="PREMIUM">Premium</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            startIcon="+"
          >
            Agregar Usuario
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Credencial</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingUser && editingUser.id === user.id ? (
                    <TextField
                      name="nombre"
                      value={editingUser.nombre}
                      onChange={handleEditInputChange}
                      variant="standard"
                    />
                  ) : (
                    user.nombre
                  )}
                </TableCell>
                <TableCell>
                  {editingUser && editingUser.id === user.id ? (
                    <TextField
                      name="dni"
                      value={editingUser.dni}
                      onChange={handleEditInputChange}
                      variant="standard"
                    />
                  ) : (
                    user.dni
                  )}
                </TableCell>
                <TableCell>
                  {editingUser && editingUser.id === user.id ? (
                    <Select
                      name="credencial"
                      value={editingUser.credencial}
                      onChange={handleEditInputChange}
                      variant="standard"
                    >
                      <MenuItem value="BASICA">Básica</MenuItem>
                      <MenuItem value="EJECUTIVA">Ejecutiva</MenuItem>
                      <MenuItem value="PREMIUM">Premium</MenuItem>
                    </Select>
                  ) : (
                    <Chip
                      label={user.credencial}
                      color={credentialColors[user.credencial]}
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  {editingUser && editingUser.id === user.id ? (
                    <>
                      <Tooltip title="Guardar">
                        <IconButton onClick={handleUpdateUser} color="primary">
                          ✅
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancelar">
                        <IconButton onClick={() => setEditingUser(null)} color="default">
                          ❌
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleEditUser(user)} color="primary">
                          ✏️
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => handleDeleteUser(user)} color="error">
                          🗑️
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Generar QR">
                        <IconButton onClick={() => generateQRCode(user)} color="secondary">
                          📱
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro de que desea eliminar este usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={qrDialogOpen}
        onClose={() => setQrDialogOpen(false)}
        aria-labelledby="qr-dialog-title"
        aria-describedby="qr-dialog-description"
      >
        <DialogTitle id="qr-dialog-title">
          Código QR de Credencial
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="qr-dialog-description">
            Escanee este código QR para obtener los datos de la credencial del usuario.
          </DialogContentText>
          {qrUser && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <QRCodeSVG
                value={JSON.stringify({
                  nombre: qrUser.nombre,
                  dni: qrUser.dni,
                  credencial: qrUser.credencial
                })}
                size={256}
                level="H"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQrDialogOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}