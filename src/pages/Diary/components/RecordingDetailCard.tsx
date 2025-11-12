import type { Recording } from "../../../shared/interfaces/recording/Recording";

interface RecordingDetailCardProps {
  recording: Recording;
}

function RecordingDetailCard({recording}: RecordingDetailCardProps) {
  return (
    <pre>
      {JSON.stringify(recording, null, 2)}
    </pre> 
  )
}

export default RecordingDetailCard;