/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useCallback, useEffect, useState } from "react";

import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FileIcon } from "react-file-icon";

interface FileDnDProps {
  name: string;
  value: File[];
  onChange: Function;
}

function FileDnD({ name, value, onChange }: FileDnDProps, ref: any) {
  const [files, setFiles] = useState<File[]>(value ?? []);

  useEffect(() => {
    setFiles(value);
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...files, ...acceptedFiles].slice(-10));
      setFiles((prev: File[]) => [...prev, ...acceptedFiles].slice(-10));
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 10 * 1024 * 1024,
    // maxFiles: 10,
    onDrop,
  });

  return (
    <Box
      sx={{
        p: 4,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "info.main",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          width: 1,
          p: 4,
          backgroundColor: "#eee",
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "#aaa",
          borderRadius: 1,
          outline: "none",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <Box>Drop the files here ...</Box>
        ) : (
          <Box>Drag and drop some files here, or click to select files.</Box>
        )}
      </Box>

      {!!files.length && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {files.map((f: File) => (
            <Box
              key={f.name}
              sx={{
                position: "relative",
                width: 100,
                height: 130,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <FileIcon
                labelColor="#ec2127"
                extension={f.name.substring(f.name.lastIndexOf(".") + 1)}
              />

              <Box
                sx={{
                  width: 100,
                  fontSize: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={f.name}
              >
                {f.name}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default forwardRef(FileDnD);
