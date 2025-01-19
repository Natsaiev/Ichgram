import { Divider, Typography, Box } from "@mui/material";

const OrDivider = () => {
    return (
        <Box display="flex" alignItems="center" my={2}>
            <Divider sx={{ flex: 1 }} />
            <Typography sx={{ mx: 1, color: "gray" }}>OR</Typography>
            <Divider sx={{ flex: 1 }} />
        </Box>
    );
};

export default OrDivider;