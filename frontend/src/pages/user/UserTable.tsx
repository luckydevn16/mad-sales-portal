import { createRef } from "react";

import { Person, PersonOff } from "@mui/icons-material";
import { Box, Chip, IconButton, Link as MUILink, Tooltip } from "@mui/material";
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
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import "devextreme/dist/css/dx.light.css";

import Invite from "./Invite";
import { apiUpdateUserStatus, apiGetUsers, apiDeleteUser } from "utils/api";

import { DeleteDialog } from "components";

export default function StateTable() {
  const navigate = useNavigate();
  const dataGridRef = createRef<any>();
  const dataSource = new CustomStore({
    key: "id",
    load: (loadOptions) => {
      return apiGetUsers({ loadOptions })
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

  const handleInvited = () => {
    dataGridRef.current.instance.refresh();
  };

  const handleUpdateStatus = async (row: any) => {
    await apiUpdateUserStatus({
      id: row.id,
      status: row.status === "active" ? "inactive" : "active",
    }).then((res: any) => {
      if (res.status === 200) {
        dataGridRef.current.instance.refresh();
        enqueueSnackbar(res.data?.message, { variant: "success" });
      } else if (res.status === 400) {
        enqueueSnackbar(res.data?.message, { variant: "warning" });
      } else if (res.status === 403) {
        navigate("/403");
        enqueueSnackbar(res.data?.message, { variant: "warning" });
      } else {
        enqueueSnackbar(res.data?.message, { variant: "error" });
      }
    });
  };

  const handleDelete = async (row: any) => {
    await apiDeleteUser({ id: row.id })
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

  const cellEmailRender = (data: any) => {
    const row = data.data;
    return (
      <MUILink
        component={Link}
        to={`/user/edit/${row.id as string}`}
        underline="hover"
        color="primary"
      >
        {row.email}
      </MUILink>
    );
  };

  const cellRoleRender = (data: any) => {
    const row = data.data;
    return <Chip label={row.role} />;
  };

  const cellStatesRender = (data: any) => {
    const row = data.data;
    return (
      <>
        {row.states
          .map((state: StateType) => `${state.country}/${state.code}`)
          .join(", ")}
      </>
    );
  };

  const cellStatusRender = (data: any) => {
    const row = data.data;
    return (
      <Chip
        label={row.status}
        variant="filled"
        color={
          row.status === "active"
            ? "success"
            : row.status === "inactive"
            ? "warning"
            : "info"
        }
      />
    );
  };

  const cellActionRender = (data: any) => {
    const row = data.data;
    return (
      <Box sx={{ textAlign: "center" }}>
        {row.status === "active" && (
          <Tooltip arrow placement="right" title="Disable">
            <IconButton color="primary" onClick={() => handleUpdateStatus(row)}>
              <PersonOff />
            </IconButton>
          </Tooltip>
        )}

        {row.status === "inactive" && (
          <Tooltip arrow placement="right" title="Enable">
            <IconButton color="primary" onClick={() => handleUpdateStatus(row)}>
              <Person />
            </IconButton>
          </Tooltip>
        )}

        <DeleteDialog onDelete={() => handleDelete(row)} />
      </Box>
    );
  };

  return (
    <>
      <Invite onInvited={handleInvited} />
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
            storageKey="mad-user-list"
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
          <Column
            dataField="email"
            caption="Email"
            fixed={true}
            minWidth={60}
            cellRender={cellEmailRender}
          />
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
            caption="State / Province"
            fixed={true}
            minWidth={250}
            cellRender={cellStatesRender}
          />
          <Column
            dataField="role"
            caption="Role"
            fixed={true}
            minWidth={60}
            cellRender={cellRoleRender}
          />
          <Column
            dataField="status"
            caption="Status"
            fixed={true}
            minWidth={60}
            cellRender={cellStatusRender}
          />
          <Column
            dataField="joinedAt"
            caption="Joined At"
            dataType="date"
            format="dd/MM/yyyy"
            defaultSortOrder="desc"
            minWidth={120}
          />
          <Column
            dataField="lastLogin"
            caption="Last Login"
            dataType="date"
            format="dd/MM/yyyy"
            minWidth={120}
          />
        </DataGrid>
      </Box>
    </>
  );
}
