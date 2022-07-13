import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export default function BackgroundLetterAvatars({brandObj}) {
    const { avatar } = brandObj
  return (
      <Avatar sx={{color: 'teal', backgroundColor: '#e9ecef'}}>{avatar}</Avatar>
  );
}
