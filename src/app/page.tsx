'use client';

import { Box, Container, Typography } from '@mui/material';

export default function Home() {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        SCM 시스템
                    </Typography>
                    <Typography variant="body1">
                        공급망 관리 시스템에 오신 것을 환영합니다.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
