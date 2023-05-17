import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Avatar, List, ListItem, ListItemButton, ListItemText, ListSubheader, ListItemAvatar, TextField, Button, Stack } from '@mui/material';
import Menu from "../components/menu";
import { supabase } from "../utility/supabaseClient";
import { useUser } from '@supabase/auth-helpers-react'

interface UserInviteState {
  id?: string;
  created_by?: string;
  invitee_email: string;
  created_at?: string;
}
export default function CheckboxListSecondary() {
  const [email, setEmail] = useState('');
  const [emailInvites, setEmailInvites] = useState<any | []>([]);
  const user = useUser();

  useEffect(() => {
    getInvites()
  }, [emailInvites])

  async function getInvites() {
    try {
      if (!user) throw new Error('No user')
      let { data, error, status } = await supabase
        .from('invites')
        .select('*')
        .eq('created_by', user?.email)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setEmailInvites(data);
      }
    } catch (error) {
      toast.error('Error loading user data!');
      console.log(error)
    }
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInvite = async () => {
    const { error } = await supabase
      .from('invites')
      .insert({
        invitee_email: email,
        created_by: user?.email,
        created_at: new Date().toISOString()
      })
    if (error) throw error
    toast.success(`Invitation sent to ${email}`);
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
      {emailInvites.map(({ invitee_email }: { invitee_email: string }) => {
        const labelId = `checkbox-list-secondary-label-${invitee_email}`;
        return (
          <ListItem
            key={invitee_email}
            secondaryAction={
              <Menu />
            }
            disablePadding
          >
            {invitee_email !== undefined || null ? (
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={invitee_email}
                    src=""
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={invitee_email} />
              </ListItemButton>
            ) : (
              <ListItemText id={labelId} primary="No invites yet" />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}