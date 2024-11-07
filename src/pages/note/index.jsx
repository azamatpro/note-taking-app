import React, { useState } from 'react';
import { Container, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';

function Note() {
  const [textValue, setTextValue] = useState('');

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <Container maxWidth='lg' sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        <TextField
          variant='outlined'
          placeholder='Matiningizni kiriting...'
          fullWidth
          multiline
          maxRows={8}
          size='small'
          sx={{
            maxWidth: { xs: '99%', sm: 800 },
            borderRadius: '40px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '40px',
              outline: 'none',
            },
          }}
          value={textValue}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton>
                  <AttachmentIcon sx={{ color: '#9e9e9e', rotate: '-45deg' }} />
                </IconButton>
                {textValue ? (
                  <IconButton>
                    <SendIcon sx={{ color: '#9e9e9e' }} />
                  </IconButton>
                ) : (
                  <IconButton>
                    <MicIcon sx={{ color: '#9e9e9e' }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
}

export default Note;
