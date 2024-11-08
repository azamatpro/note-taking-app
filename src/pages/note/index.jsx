import React, { useState, useRef } from 'react';
import { Container, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import bot from './../../assets/bot.svg';
import user from './../../assets/user.svg';

function Note() {
  const [textValue, setTextValue] = useState('');
  const chatContainerRef = useRef(null);
  let loadInterval;

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
      element.textContent += '.';
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }

  function typeText(element, text) {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  }

  function chatStripe(isAi, value, uniqueId) {
    return `
      <div style="display: flex; gap: 12px; align-items: start; margin-bottom: 8px; padding: 8px; border-radius: 8px;">
        <div style="display: flex; align-items: center;">
          <img 
            src="${isAi ? bot : user}" 
            alt="${isAi ? 'bot' : 'user'}" 
            style="width: 24px; height: 24px; border-radius: 50%;" 
          />
        </div>
        <div id="${uniqueId}">
          ${value}
        </div>
      </div>
    `;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('prompt', textValue);

    const userMessage = chatStripe(false, textValue);
    if (chatContainerRef.current) {
      chatContainerRef.current.innerHTML += userMessage;
    }

    setTextValue('');

    const uniqueId = generateUniqueId();
    const botMessage = chatStripe(true, ' ', uniqueId);
    if (chatContainerRef.current) {
      chatContainerRef.current.innerHTML += botMessage;
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);

    // Uncomment the fetch logic here for actual data retrieval
    /*
    try {
      const response = await fetch('https://codex-im0y.onrender.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textValue }),
      });

      clearInterval(loadInterval);
      messageDiv.innerHTML = '';

      if (response.ok) {
        const responseData = await response.json();
        const botResponse = responseData.bot.trim();
        typeText(messageDiv, botResponse);
      } else {
        const error = await response.text();
        messageDiv.innerHTML = 'Something went wrong';
      }
    } catch (error) {
      clearInterval(loadInterval);
      messageDiv.innerHTML = 'Something went wrong';
    }
    */
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        px: { xs: 1, sm: 2, md: 8, lg: 24 },
        py: 4,
      }}
    >
      {/* Chat Container */}
      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          mb: 2,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)',
        }}
      />

      {/* Input Area */}
      <Box sx={{ width: '100%' }}>
        <TextField
          name='prompt'
          variant='outlined'
          placeholder='Matningizni kiriting...'
          fullWidth
          multiline
          maxRows={6}
          size='small'
          sx={{
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
                  <IconButton onClick={handleSubmit}>
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
