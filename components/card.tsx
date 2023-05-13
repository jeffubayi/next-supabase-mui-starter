import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, CardMedia, Chip } from '@mui/material';
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/AddAPhoto';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function ProfileCard({ url, onUpload, username }: { url: string, onUpload: any, username: any }) {
  const user = useUser()
  const session = useSession()
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: any) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
      console.log('Error downloading image: ', data)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      console.log('Error : ', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card sx={{ display: 'flex',borderRadius:"1rem" }} elevation={0}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <IconButton  aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={uploadAvatar}
              disabled={uploading} />
            <EditIcon  sx={{fill:"grey"}}/>
          </IconButton>
        }
      >
        <Avatar alt="user" sx={{width:"7rem",height:"7rem",m:1}} src={avatarUrl || user?.user_metadata?.avatar_url} />
      </Badge>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {username || user?.user_metadata?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {session?.user?.email || user?.user_metadata?.email}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Chip icon={<AdminPanelSettingsIcon />} label="Administrator" variant="outlined" color="primary"/>
        </Box>
      </Box>

    </Card>
  );
}
