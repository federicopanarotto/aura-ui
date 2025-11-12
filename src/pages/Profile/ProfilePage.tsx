import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useMe } from "../../shared/api/user/useMe";
import BasePage from "../../shared/ui/page/BasePage";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";

function ProfilePage() {
  const { data: me, isLoading, isFetching } = useMe();

  const loading = isLoading || isFetching || !me;

  return (
    <BasePage sx={{ p: 2 }} isLoading={loading}>
      {loading ? (
        <UserCardSkeleton />
      ) : (
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                <Avatar sx={{ width: 144, height: 144 }} />
                <Typography variant="h5">{me.fullName}</Typography>
              </Box>
            </CardContent>
          </Card>
          <Typography>Info</Typography>
          <Card>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography>Data creazione account</Typography>
              <Typography>{me.createdAt as unknown as string}</Typography>
            </CardContent>
          </Card>
          
        </Stack>
      )}
    </BasePage>
  );
}

export default ProfilePage;
