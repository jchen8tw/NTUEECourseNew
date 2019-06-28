import React from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Paper,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  formPaper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '5%',
    '& > *': {
      margin: '5px'
    },
    '&:hover': {
      boxShadow: theme.shadows[4]
    }
  },
  formHelperTextRoot: {
    display: 'none',
    textAlign: 'right'
  },
  formHelperTextError: {
    display: 'initial'
  }
});

const ProfileEditor = ({ classes }) => {
  const [nickname, setNickname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  return (
    <div style={{ padding: '10% 5%' }}>
      <Typography variant="h3" align="left">
        編輯個人資料
      </Typography>
      <Grid container spacing={24} style={{ marginTop: '2rem' }}>
        <Grid item md={6} xs={12}>
          <Paper component="form" square className={classes.formPaper}>
            <TextField
              label="更改暱稱"
              placeholder="請輸入暱稱"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
            <Button
              component={Button}
              variant="outlined"
              style={{ alignSelf: 'flex-end' }}
            >
              送出
            </Button>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper component="form" square>
            <FormControl
              required
              error={password !== passwordConfirm}
              component="fieldset"
              className={classes.formPaper}
            >
              <FormLabel componene="legend" style={{ textAlign: 'left' }}>
                更改密碼
              </FormLabel>
              <TextField
                label="密碼"
                placeholder="請輸入密碼"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <TextField
                label="確認密碼"
                placeholder="請再次輸入密碼"
                type="password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
              />
              <FormHelperText
                classes={{
                  root: classes.formHelperTextRoot,
                  error: classes.formHelperTextError
                }}
              >
                密碼不一致
              </FormHelperText>
              <Button
                variant="outlined"
                style={{
                  alignSelf: 'flex-end',
                  marginLeft: 'auto',
                  marginRight: '0'
                }}
              >
                送出
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(style)(ProfileEditor);
