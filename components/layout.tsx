import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import Container from '@mui/material/Container';

import Navbar from './navbar';
import theme from "../styles/theme";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box component="main">
          <Container disableGutters maxWidth="md" component="main" sx={{ pt: 3, pb: 3 }}>
            {children}
          </Container>
      </Box>
    </ThemeProvider>
  );
}