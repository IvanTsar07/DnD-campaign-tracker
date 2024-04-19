"use client";

import { addImportedArtefacts } from "@/lib/firebase/firestore";
import { readExcelFileWithArtefacts } from "@/lib/xlsx";
import { ArtefactModelInput } from "@/models/artefact";
import { FileUpload } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState, type ChangeEvent } from "react";

const Transition = forwardRef(function Transition(
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

const ImportLootPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showArtefact, setShowArtefact] = useState(false);
  const [artefactList, setArtefactList] = useState<ArtefactModelInput[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    console.log(file);

    if (file) {
      readExcelFileWithArtefacts(file, rows => setArtefactList(rows));
    }
  };

  const handleUpload = async () => {
    setOpenModal(false);
    await addImportedArtefacts(artefactList);
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
          accept=".xls, .xlsx"
        />
      </Button>

      {artefactList.length > 0 && (
        <>
          <Typography variant="h4">Artefacts</Typography>

          <div style={{}}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowArtefact(!showArtefact)}
            >
              {showArtefact ? "Hide Artefacts" : "Show Artefacts"}
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

          {showArtefact && <pre>{JSON.stringify(artefactList, null, 2)}</pre>}
        </>
      )}

      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to upload all Artefacts ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Discard</Button>
          <Button onClick={() => handleUpload()}>Upload</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default ImportLootPage;
