import { Container, CssBaseline } from "@mui/material";
import React from "react";
import DataTable from "./components/dataTable/DataTable";
import { Header } from "./components/global/Header";
import { AppProvider } from "./context/AppContext";
import { theme } from "./theme";
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
