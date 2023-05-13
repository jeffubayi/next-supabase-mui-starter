import * as React from 'react';
import StarIcon from '@mui/icons-material/StarBorder';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { tiers } from "../utility/enums"

export default function Index() {
  const router = useRouter();

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Nextjs + MUI + Redux + Supabase
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Quickly build an effective react web application using this starter tools easily Based on Typescript ,Nextjs 12 , Material UI components, Redux toolkit and Supabase.

        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" sx={{ mb: 8 }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'React' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Authentication' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[300]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    hidden
                    fullWidth
                    sx={{ color: tier.buttonVariant == 'contained' ? `contrastText` : '#42CD8E' }}
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                    onClick={() => router.push(`${tier.price}`)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}