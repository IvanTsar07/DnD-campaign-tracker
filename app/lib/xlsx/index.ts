import { ArtefactModelInput } from "@/models/artefact";
import { NpcModelInput } from "@/models/npc";
import * as XLSX from "xlsx";

export function readExcelFileWithNPCs(
  file: Blob,
  callback: (rows: NpcModelInput[]) => void
) {
  const rows: NpcModelInput[] = [];

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = function (e) {
    const result = e.target?.result;
    if (result) {
      let data = new Uint8Array(result as ArrayBuffer);
      let workbook = XLSX.read(data, { type: "array" });

      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      let wsJson: string[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const columnsToKeys: Record<number, string> = {
        0: "name",
        1: "details",
        2: "race",
        3: "image_url",
        4: "city_org",
        5: "notes",
        6: "relations",
        7: "status",
      };

      wsJson.forEach((row: string[], index) => {
        if (index > 1 && row.length > 0) {
          const obj: NpcModelInput = {
            name: "-",
            details: "-",
            race: "-",
            image_url: "-",
            city_org: "-",
            notes: "-",
            relations: "-",
            status: "-",
          };

          row.forEach((value, i) => {
            obj[columnsToKeys[i] as keyof NpcModelInput] = value;
          });

          rows.push(obj);
        }
      });
    }

    callback(rows);
  };
}

export function readExcelFileWithArtefacts(
  file: Blob,
  callback: (rows: ArtefactModelInput[]) => void
) {
  const rows: ArtefactModelInput[] = [];

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = function (e) {
    const result = e.target?.result;
    if (result) {
      let data = new Uint8Array(result as ArrayBuffer);
      let workbook = XLSX.read(data, { type: "array" });

      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      let wsJson: string[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      wsJson = wsJson.filter(row => row.length > 0);

      // console.log(worksheet);
      console.log(wsJson);

      const columnToKeys: Record<number, string> = {
        0: "name",
        1: "original_url",
        2: "short_description",
        3: "source",
        4: "tuning",
        5: "owner",
      };

      wsJson.forEach((row: string[], index) => {
        if (index > 1 && row.length > 0) {
          console.log(row);
          let obj: ArtefactModelInput = {
            name: "",
            original_url: "",
            short_description: "",
            source: "",
            tuning: false,
            owner: "",
          };

          row.forEach((value, i) => {
            let valueToPut: boolean | string | null = value;

            if (i === 4) {
              valueToPut =
                value === "ТАК" ? true : value === "НІ" ? false : null;
            }

            obj[columnToKeys[i] as keyof ArtefactModelInput] = valueToPut;
          });

          rows.push(obj);
        }
      });
    }

    console.log(rows);

    callback(rows);
  };
}
