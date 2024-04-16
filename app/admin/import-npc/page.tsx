"use client";

import { addImportedNPCs } from "@/lib/firebase/firestore";
import { readExcelFile } from "@/lib/xlsx";
import { NpcModelInput } from "@/models/npc";
import { FileUpload } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { ChangeEvent, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

const ImportNpcPage = () => {
  const [npcList, setNpcList] = useState<NpcModelInput[]>([]);
  const [showNPC, setShowNPC] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    console.log(file);

    if (file) {
      readExcelFile(file, rows => setNpcList(rows));
    }
  };

  const handleUpload = async () => {
    await addImportedNPCs(npcList);
    setOpenModal(false);
  };

  return (
    <main>
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {npcList.length > 0 && (
        <>
          <Typography variant="h4">NPCs</Typography>

          <div style={{}}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowNPC(!showNPC)}
            >
              {showNPC ? "Hide NPC" : "Show NPC"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileUpload />}
              onClick={() => setOpenModal(true)}
            >
              Upload NPCs
            </Button>
          </div>

          {showNPC && <pre>{JSON.stringify(npcList, null, 2)}</pre>}
        </>
      )}

      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to upload all NPCs ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Discard</Button>
          <Button onClick={() => handleUpload()}>Upload</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default ImportNpcPage;
