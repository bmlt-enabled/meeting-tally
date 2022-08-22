import { Container, CssBaseline } from "@mui/material";
import React from "react";
import DataTable from "./components/DataTable";
import { Header } from "./components/global/Header";
import { AppProvider } from "./context/AppContext";
import { theme } from "./global/theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <DataTable />
        </Container>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
