import { useEffect, useState } from "react";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import {
  Box,
  IconButton,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { FileIcon } from "react-file-icon";

import { apiGetAllQuoteFiles, apiDownloadQuoteFile } from "utils/api";

interface Props {
  quoteId: string;
}

export default function Files({ quoteId }: Props) {
  const [files, setFiles] = useState<QuoteFileType[]>([]);

  const downloadFile = async (key: string) => {
    await apiDownloadQuoteFile({ key })
      .then((res) => {
        if (res.status === 200) {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = key;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          enqueueSnackbar(res.data?.message, {
            variant: "warning",
          });
        }
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again later.", {
          variant: "error",
        });
      });
  };

  const openFile = async (key: string) => {
    await apiDownloadQuoteFile({ key })
      .then((res) => {
        if (res.status === 200) {
          const file = window.URL.createObjectURL(res.data);
          window.open(file);
        } else {
          enqueueSnackbar(res.data?.message, {
            variant: "warning",
          });
        }
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again later.", {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    const getAllQuoteFiles = async () => {
      if (quoteId) {
        const res = await apiGetAllQuoteFiles({ quoteId });
        setFiles(res.data.files);
      }
    };

    getAllQuoteFiles();
  }, [quoteId]);

  return (
    <Paper sx={{ flex: "1 1 0px", p: 2 }}>
      <Box
        sx={{
          pb: 0.5,
          mb: 2,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "primary.main",
          color: "primary.main",
          fontWeight: 700,
        }}
      >
        Files
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Date Modified</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>File Size</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!files.length && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  No records to display
                </TableCell>
              </TableRow>
            )}

            {!!files.length &&
              files
                .filter((f: QuoteFileType) => f.orgName.slice(-1) !== "/")
                .map((f: QuoteFileType) => (
                  <TableRow key={f.orgName}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          component={MuiLink}
                          underline="hover"
                          color="primary"
                          onClick={() => openFile(f.orgName)}
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ width: 32, height: 32 }}>
                            <FileIcon
                              labelColor="#ec2127"
                              extension={f.orgName.substring(
                                f.orgName.lastIndexOf(".") + 1
                              )}
                            />
                          </Box>
                          {f.orgName.split("/").pop()}
                        </Box>

                        <IconButton onClick={() => downloadFile(f.orgName)}>
                          <DownloadOutlinedIcon color="info" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {moment(f.createdAt).format("DD/MM/YYYY h:m A")}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        {(Number(f.fileSize) / 1024).toFixed(2)}KB
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
