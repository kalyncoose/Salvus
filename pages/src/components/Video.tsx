import React, { useEffect } from 'react';
import { Box, Typography, Divider, Card } from '@mui/material';

export const Video = () => {
  function resizeVideo() {
    const container = document.getElementById('video-card');
    const video = document.getElementById('youtube-video');

    // Get the container width
    const containerWidth = container?.offsetWidth;

    // Set the width of the video to the container width
    // @ts-expect-error
    video.width = containerWidth;

    // Calculate the proportional height based on the aspect ratio (16:9)
    const aspectRatio = 9 / 16; // height divided by width
    // @ts-expect-error
    video.height = containerWidth * aspectRatio;
  }

  useEffect(() => {
    // Attach the resizeVideo function to the window resize event
    window.addEventListener('resize', resizeVideo);

    // Call the resizeVideo function initially to set the correct dimensions
    window.onload = resizeVideo;
  }, []);

  return (
    <Box sx={{ marginTop: '25px' }}>
      <Divider />
      <Typography
        variant='h4'
        sx={{
          marginTop: '15px',
          fontWeight: 600,
          color: 'white',
          fontFamily: 'Crimson Text',
        }}
      >
        Video
      </Typography>
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          id='video-card'
          variant='outlined'
          sx={{
            width: '560px',
            padding: 0,
            marginTop: '10px',
          }}
        >
          <iframe
            id='youtube-video'
            width='560'
            height='315'
            src='https://www.youtube.com/embed/8GRW2AyMQoQ?si=CrbfvoTM6FJSBX-d'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen={true}
          ></iframe>
        </Card>
      </Box>
    </Box>
  );
};
