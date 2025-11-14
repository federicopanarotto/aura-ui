import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { useMe } from "../../api/user/useMe";
import LogoutButton from "../button/LogoutButton";

function UserInfoCardDebug() {
  const { data: me } = useMe();

  if (!me) {
    return null;
  }

  return (
    <>
      <Card sx={{ width: 300, mb: 2 }}>
        <CardContent sx={{pb: 0.2}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {me.id}
          </Typography>
          <Typography variant="h5" component="div">
            {me.fullName}
          </Typography>
          <Typography color="text.secondary">{me.role}</Typography>
        </CardContent>
        <CardActions>
          <LogoutButton />
        </CardActions>
      </Card>
    </>
  );
}

export default UserInfoCardDebug;
