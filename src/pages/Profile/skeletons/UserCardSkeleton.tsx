import { Card, CardContent, Box, Skeleton } from "@mui/material";

function UserCardSkeleton() {
  return (
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
          {/* Avatar skeleton */}
          <Skeleton variant="circular" width={144} height={144} />

          {/* Text skeleton (nome utente) */}
          <Skeleton variant="text" width="30%" height={32} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserCardSkeleton;
