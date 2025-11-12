import { Typography } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import { useNavigate, useParams } from "react-router";
import useRecording from "../../shared/api/recording/useRecording";
import RecordingDetailCard from "./components/RecordingDetailCard";

function DiaryDetailPage() {
  const { recordingId } = useParams<{ recordingId: string}>();
  const navigate = useNavigate();

  const { data: recording } = useRecording(recordingId!);

  if (!recording) {
    navigate("/diary");
    return;
  }

  return (
    <BasePage sx={{ p: 2 }}>
      <Typography variant="h3">Detail</Typography>

      <RecordingDetailCard recording={recording} />
    </BasePage>
  );
}

export default DiaryDetailPage;
