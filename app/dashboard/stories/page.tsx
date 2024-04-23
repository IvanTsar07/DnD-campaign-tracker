"use client";

import ComingSoon from "@/components/common/coming-soon/coming-soon";
import { Button } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type Chapter = {
  title: string;
  text: string;
};

const StoriesPage = () => {
  const [chapters, setChapters] = useState<Chapter[]>();

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.currentTarget.files?.[0];
  //   console.log(file);

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(file);

  //     reader.onload = function (e) {
  //       const result = e.target?.result;
  //       if (result) {
  //         let data = new Uint8Array(result as ArrayBuffer);
  //         const decoder = new TextDecoder();
  //         const str = decoder.decode(data);
  //         console.log(data);
  //         console.log(str);
  //       }
  //     };
  //   }
  // };
  const parseTxtFile = (str: string) => {
    const chapters = str.split("Глава ");
    const parsedData = chapters.map(chapter => {
      const lines = chapter.split("\n");
      const title = lines[0];
      const text = lines.slice(1).join("\n");

      console.log(lines, text);

      return { title, text };
    });
    return parsedData;
  };

  // Example usage:
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (e) {
        const result = e.target?.result;
        if (result) {
          const str = result as string;
          const parsedData = parseTxtFile(str);
          console.log(parsedData);

          setChapters(parsedData);
        }
      };
    }
  };

  return <ComingSoon />;

  return (
    <div>
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

      <section>
        {chapters?.map((chapter, index) => (
          <div key={index}>
            <h2>{chapter.title}</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{chapter.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StoriesPage;
