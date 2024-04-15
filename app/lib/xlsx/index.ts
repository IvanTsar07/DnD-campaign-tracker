import { NpcModelInput } from "@/models/npc";
import * as XLSX from "xlsx";

export function readExcelFile(
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
