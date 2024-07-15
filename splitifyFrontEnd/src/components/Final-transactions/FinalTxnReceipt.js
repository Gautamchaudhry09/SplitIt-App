import React, { useState } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FinalTxnSS } from "./FinalTxnSS";

const sxDialogBox = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
  },
};

export const FinalTxnReceipt = ({ isOpen, closeModal }) => {
  const [imageUrl, setImageUrl] = useState();
  const [downloading, setDownloading] = useState(false);

  const downloadBlobFile = (file, filename) => {
    const navigator = window.navigator;
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(file, filename);
    } else {
      const a = document.createElement("a");
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  const handleDownloadImage = (e) => {
    e.preventDefault();

    if (!imageUrl) return;

    fetch(imageUrl).then(async (response) => {
      try {
        const blob = await response.blob();
        const filename = `final-txns-${Math.floor(Math.random() * 100000)}.png`;
        downloadBlobFile(blob, filename);
        setDownloading(false);
      } catch (e) {
        console.log(e);
        alert(
          "Error occurred while downloading image. Please refresh page and try again."
        );
        setDownloading(false);
        return false;
      }
    });

    setDownloading(true);
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} sx={sxDialogBox} scroll="paper">
      <DialogTitle>
        {imageUrl && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="10px"
          >
            <IconButton
              onClick={handleDownloadImage}
              disabled={downloading}
              sx={{ color: "#66CCCC" }}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        )}
      </DialogTitle>
      <DialogContent>
        <FinalTxnSS setImageUrl={setImageUrl} />
      </DialogContent>
    </Dialog>
  );
};
