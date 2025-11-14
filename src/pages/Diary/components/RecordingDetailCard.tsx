import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
  LinearProgress,
  Paper,
  IconButton,
  Slider,
} from "@mui/material";
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Language as LanguageIcon,
  TrendingDown as NegativeIcon,
  TrendingUp as PositiveIcon,
  Remove as NeutralIcon,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
} from "@mui/icons-material";
import type { Recording } from "../../../shared/interfaces/recording/Recording";
import { useState, useRef, useEffect } from "react";

interface RecordingDetailCardProps {
  recording: Recording;
}

function RecordingDetailCard({ recording }: RecordingDetailCardProps) {
  const { review, createdBy, createdAt, text, originalFileName, filePath } =
    recording;

  // Audio player state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Helper per il colore del sentiment
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "success";
      case "negative":
        return "error";
      default:
        return "default";
    }
  };

  // Helper per l'icona del sentiment
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <PositiveIcon />;
      case "negative":
        return <NegativeIcon />;
      default:
        return <NeutralIcon />;
    }
  };

  // Helper per formattare la data
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper per formattare il tempo (mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Audio player handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (_event: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = newValue as number;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = newValue as number;
    audio.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // Costruisci l'URL dell'audio
  const audioUrl = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/${filePath}`;

  return (
    <Card elevation={3}>
      <CardContent>
        {/* Header - Info Generali */}
        <Stack spacing={2}>
          {/* Titolo e Metadata */}
          <Box>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {originalFileName}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap">
              <Chip
                icon={<PersonIcon />}
                label={createdBy.fullName}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<CalendarIcon />}
                label={formatDate(createdAt)}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<LanguageIcon />}
                label={review.language.toUpperCase()}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>

          <Divider />

          {/* Audio Player */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Registrazione Audio
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
              }}
            >
              <audio ref={audioRef} src={audioUrl} preload="metadata" />

              {/* Play/Pause Button */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  onClick={togglePlay}
                  size="large"
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>

                {/* Time Display */}
                <Typography variant="body2" sx={{ minWidth: 45 }}>
                  {formatTime(currentTime)}
                </Typography>

                {/* Progress Slider */}
                <Slider
                  value={currentTime}
                  max={duration || 100}
                  onChange={handleSeek}
                  sx={{
                    color: "primary.main",
                    "& .MuiSlider-thumb": {
                      width: 16,
                      height: 16,
                    },
                  }}
                />

                {/* Duration */}
                <Typography variant="body2" sx={{ minWidth: 45 }}>
                  {formatTime(duration)}
                </Typography>

                {/* Volume Control */}
                <IconButton onClick={toggleMute} size="small">
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>

                <Slider
                  value={isMuted ? 0 : volume}
                  max={1}
                  step={0.01}
                  onChange={handleVolumeChange}
                  sx={{
                    width: 100,
                    color: "primary.main",
                  }}
                />
              </Stack>
            </Paper>
          </Box>

          <Divider />

          {/* Trascrizione */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Trascrizione
            </Typography>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
                {text.trim()}
              </Typography>
            </Paper>
          </Box>

          <Divider />

          {/* Summary */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Analisi
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {review.summary.short}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {review.summary.detailed}
            </Typography>
          </Box>

          <Divider />

          {/* Sentiment */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Sentiment Generale
            </Typography>
            <Chip
              icon={getSentimentIcon(review.overallSentiment)}
              label={review.overallSentiment.toUpperCase()}
              color={getSentimentColor(review.overallSentiment)}
              sx={{ fontWeight: "bold" }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Confidenza dell'analisi: {(review.confidence * 100).toFixed(0)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={review.confidence * 100}
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>
          </Box>

          <Divider />

          {/* Emotional Tone */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Tono Emotivo
            </Typography>
            <Stack spacing={2}>
              {review.emotionalTone.map((tone, index) => (
                <Paper key={index} elevation={0} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {tone.emotion}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Intensità: {(tone.intensity * 100).toFixed(0)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={tone.intensity * 100}
                      color="primary"
                      sx={{ height: 6, borderRadius: 1, mt: 0.5 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Confidenza: {(tone.confidence * 100).toFixed(0)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={tone.confidence * 100}
                      color="secondary"
                      sx={{ height: 6, borderRadius: 1, mt: 0.5 }}
                    />
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Topics */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Argomenti Rilevati
            </Typography>
            <Stack spacing={2}>
              {review.topics.map((topic, index) => (
                <Paper key={index} elevation={0} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {topic.name}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Rilevanza: {(topic.relevance * 100).toFixed(0)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={topic.relevance * 100}
                      sx={{ height: 6, borderRadius: 1, mt: 0.5 }}
                    />
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Keywords:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {topic.keywords.map((keyword, i) => (
                        <Chip key={i} label={keyword} size="small" />
                      ))}
                    </Stack>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Key Phrases */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Frasi Chiave
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {review.keyPhrases.map((phrase, index) => (
                <Chip
                  key={index}
                  label={phrase}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RecordingDetailCard;