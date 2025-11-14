import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import { PlayArrow, MoreVert, Mic } from "@mui/icons-material";
import type { Recording } from "../../../shared/interfaces/recording/Recording";
import { useNavigate } from "react-router";

interface RecordingCardCompactProps {
  recording: Recording;
  onPlay?: () => void;
  onMenuOpen?: (event: React.MouseEvent<HTMLElement>) => void;
}

const RecordingItemCard = ({
  recording,
  onPlay,
  onMenuOpen,
}: RecordingCardCompactProps) => {
  const createdDate = new Date(recording.createdAt);
  const navigate = useNavigate();

  const handleNavigateDetail = (recordingId: string) => {
    navigate(`/diary/${recordingId}`);
  };

  return (
    <Card
      sx={{
        mb: 1.5,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Mic sx={{ color: "white", fontSize: 24 }} />
          </Box>

          {/* Content */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Date/Time */}
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {createdDate.toLocaleDateString()}
              {" · "}
              {createdDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>

            {/* Status */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 0.5 }}
            >
              <Chip
                label={
                  recording.isTranscrabing
                    ? "Trascrizione..."
                    : recording.text
                    ? "Trascritto"
                    : "Audio"
                }
                size="small"
                color={
                  recording.isTranscrabing
                    ? "warning"
                    : recording.text
                    ? "success"
                    : "default"
                }
                sx={{ height: 20, fontSize: "0.7rem" }}
              />
            </Stack>

            {/* Text preview */}
            {recording.text && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontSize: "0.875rem",
                  lineHeight: 1.4,
                }}
              >
                {recording.text}
              </Typography>
            )}
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
            <IconButton
              size="small"
              onClick={onPlay}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                width: 36,
                height: 36,
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              <PlayArrow sx={{ fontSize: 20 }} />
            </IconButton>

            <IconButton
              size="small"
              onClick={onMenuOpen}
              sx={{ width: 36, height: 36 }}
            >
              <MoreVert sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Stack>

        <Button onClick={() => handleNavigateDetail(recording.id)}>
          Dettagli
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecordingItemCard;
