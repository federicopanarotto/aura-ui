import { type FC } from "react";
import { Button, type ButtonProps } from "@mui/material";
import { FiberManualRecord, Stop } from "@mui/icons-material";

interface RecordButtonProps extends Omit<ButtonProps, 'onClick'> {
  isRecording: boolean;
  onToggleRecording: () => void;
}

export const RecordButton: FC<RecordButtonProps> = ({
  isRecording,
  onToggleRecording,
  ...buttonProps
}) => {
  return (
    <Button
      onClick={onToggleRecording}
      sx={{
        width: 72,
        height: 72,
        borderRadius: "100%",
        backgroundColor: isRecording ? "#ff4444" : "#ff3b30",
        color: "#ffffff",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isRecording ? "#ff6666" : "#ff5555",
          transform: "scale(1.05)",
        },
        "& .MuiSvgIcon-root": {
          fontSize: 40,
        },
        ...buttonProps.sx,
      }}
      {...buttonProps}
    >
      {isRecording ? <Stop /> : <FiberManualRecord />}
    </Button>
  );
};