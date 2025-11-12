import { Box, Typography } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import useRecordingList from "../../shared/api/recording/useRecordingList";
import RecordingItemCard from "./components/RecordingItemCard";

function DiaryPage() {
  const { data: recordingList } = useRecordingList();

  if (!recordingList) {
    return <>Nessun dato trovato</>;
  }

  return (
    <BasePage sx={{ p: 2 }}>
      <Typography variant="h3">Diary</Typography>
      {recordingList.map((recording) => (
        <Box>
          <RecordingItemCard recording={recording} />
        </Box>
      ))}
    </BasePage>
  );
}

export default DiaryPage;
