import { createRef } from "react";
import { Box, Chip, Link as MuiLink } from "@mui/material";
import { Button } from "devextreme-react/button";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  DataGrid,
  FilterRow,
  Item,
  Pager,
  Sorting,
  StateStoring,
  Toolbar,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { Paging } from "devextreme-react/tree-list";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { apiDeleteInvitation, apiGetInvitations } from "utils/api";

import "devextreme/dist/css/dx.light.css";
import { DeleteDialog } from "components";

export default function InvitationTable() {
  const navigate = useNavigate();
  const dataGridRef = createRef<any>();
  const dataSource = new CustomStore({
    key: "id",
    load: (loadOptions) => {
      return apiGetInvitations({ loadOptions })
        .then((res) => {
          return {
            data: res.data.data,
            totalCount: res.data.totalCount,
          };
        })
        .catch(() => {
          enqueueSnackbar("Something went wrong. Please try again later", {
            variant: "error",
          });
          return;
        });
    },
  });

  const handleRefreshDataGrid = () => {
    dataGridRef.current.instance.state(null);
  };

  const handleDelete = async (row: any) => {
    await apiDeleteInvitation({ id: row.id })
      .then((res) => {
        if (res.status === 200) {
          dataGridRef.current.instance.refresh();
          enqueueSnackbar(res.data?.message, { variant: "success" });
        } else if (res.status === 400) {
          enqueueSnackbar(res.data.message, { variant: "warning" });
        } else if (res.status === 403) {
          navigate("/403");
          enqueueSnackbar(res.data?.message, { variant: "warning" });
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again later", {
          variant: "error",
        });
      });
  };

  const cellStatusRender = (data: any) => {
    const row = data.data;
    return row.acceptedAt ? (
      <Chip
        label={"Accepted"}
        variant="filled"
        size="small"
        color={"success"}
      />
    ) : moment().diff(row.sentAt) > 0 ? (
      <Chip label={"Pending"} variant="filled" size="small" color={"info"} />
    ) : (
      <Chip label={"Expired"} variant="filled" size="small" color={"warning"} />
    );
  };

  const cellInviteLinkRender = (data: any) => {
    const row = data.data;
    return (
      <MuiLink
        sx={{ color: "primary.main" }}
        href={`${window.location.origin}/invitation/${row.token as string}`}
      >
        {row.token}
      </MuiLink>
    );
  };

  const cellActionRender = (data: any) => {
    const row = data.data;
    return (
      <Box sx={{ textAlign: "center" }}>
        <DeleteDialog onDelete={() => handleDelete(row)} />
      </Box>
    );
  };

  return (
    <Box sx={{ background: "white", height: "100%", p: 2 }}>
      <DataGrid
        ref={dataGridRef}
        dataSource={dataSource}
        width="100%"
        height="100%"
        showBorders={true}
        remoteOperations={true}
        wordWrapEnabled={true}
        rowAlternationEnabled={true}
      >
        <Sorting mode="multiple" />
        <FilterRow visible={true} />
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="mad-invitation-list"
        />

        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={[5, 10, 15, 20, 25, 30, 50, 100]}
          displayMode="adaptive"
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
        />
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
        <Toolbar>
          <Item location="after">
            <Button icon="refresh" onClick={handleRefreshDataGrid} />
          </Item>
          <Item name="columnChooserButton" />
        </Toolbar>

        <Column
          caption="Actions"
          fixed={true}
          minWidth={60}
          width={120}
          cellRender={cellActionRender}
        />
        <Column dataField="email" caption="Email" fixed={true} minWidth={60} />
        <Column
          dataField="firstName"
          caption="First Name"
          fixed={true}
          minWidth={60}
        />
        <Column
          dataField="lastName"
          caption="Last Name"
          fixed={true}
          minWidth={60}
        />
        <Column
          dataField="token"
          caption="Invite Link"
          fixed={true}
          minWidth={60}
          cellRender={cellInviteLinkRender}
        />
        <Column
          caption="Status"
          fixed={true}
          minWidth={60}
          cellRender={cellStatusRender}
        />
        <Column
          dataField="sentAt"
          caption="Invited At"
          dataType="date"
          format="dd/MM/yyyy"
          defaultSortOrder="desc"
          minWidth={120}
        />
        <Column
          dataField="expiredAt"
          caption="Expired At"
          dataType="date"
          format="dd/MM/yyyy"
          minWidth={120}
        />
      </DataGrid>
    </Box>
  );
}
