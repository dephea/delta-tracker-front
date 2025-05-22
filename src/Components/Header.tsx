import { AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import { useNavigate } from "react-router-dom";
import CreateTask from "./createTask";




function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 128, 0, 0.4)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="register"
              onClick={() => navigate('/register')}
              sx={{ my: 2, color: 'white', display: 'block', border: '1px solid white', margin: '2px', borderRadius: '10px' }}
            >
              Register
            </Button>
            <Button
              key="create task"
              onClick={() => setShowModal(true)}
              sx={{ my: 2, color: 'white', display: 'block', border: '1px solid white', margin: '2px', borderRadius: '10px'   }}
            >
              create task
            </Button>
          </Box>
          <AccountMenu />
        </Toolbar>
      </Container>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <CreateTask />
          </div>
        </div>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;