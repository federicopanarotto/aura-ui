import { Box, Button, Typography } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import useRecordingList from "../../shared/api/recording/useRecordingList";
import { useNavigate } from "react-router";

function DiaryPage() {
  const navigate = useNavigate();

  const { data: recordingList } = useRecordingList();

  const handleNavigateDetail = (recordingId: string) => {
    navigate(`/diary/${recordingId}`);
  };

  if (!recordingList) {
    return <>Nessun dato trovato</>;
  }

  return (
    <BasePage sx={{ p: 2 }}>
      <Typography variant="h3">Diary</Typography>
      {recordingList.map((recording) => (
        <Box>
          <pre>{JSON.stringify(recording, null, 2)}</pre>
          <Button onClick={() => handleNavigateDetail(recording.id)}>Dettagli</Button>
        </Box>
      ))}
    </BasePage>
  );
}

export default DiaryPage;
