import Messages from "./features/Messages/Messages.tsx";
import {Box, Container} from "@mui/material";

const App = () => {
    return (
        <Container maxWidth='lg' sx={{display: 'flex', justifyContent: 'center'}}>
            <Box>
                <Messages/>
            </Box>
        </Container>
    )
}

export default App
