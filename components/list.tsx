import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Avatar, List, ListItem, ListItemButton, ListItemText, ListSubheader, ListItemAvatar, TextField, Button, Stack } from '@mui/material';
import Menu from "../components/menu";
import { supabase } from "../utility/supabaseClient";

export default function CheckboxListSecondary() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInvite = async () => {

    toast.success('Invitation sent successfully');

  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', borderRadius: "1rem" }} subheader={
      <>
        <ListSubheader>Invited Members</ListSubheader>
        <Stack
          direction='row'
          spacing={1}
          mb={2}
          px={2}
        >
          <TextField fullWidth size="small" type="email" value={email} onChange={handleEmailChange} placeholder="Enter email address" />
          <Button size="small" variant="contained" sx={{ color: "contrastText" }} onClick={handleInvite}>Invite</Button>
        </Stack>
      </>
    }>
      {[0].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Menu />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src=""
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`abc@gmail.com${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}