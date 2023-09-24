import { createRef, useEffect, useState } from "react";

import { Box, Link as MuiLink } from "@mui/material";
import { Button } from "devextreme-react/button";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  DataGrid,
  FilterRow,
  Pager,
  Sorting,
  StateStoring,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { Paging } from "devextreme-react/tree-list";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import "devextreme/dist/css/dx.light.css";

import { apiDeleteState, apiGetSalesPersons, apiGetStates } from "utils/api";

import CreateState from "./CreateState";
import EditState from "./EditState";
import { DeleteDialog } from "components";

export default function StateTable() {
  const navigate = useNavigate();
  const [salesPersons, setSalesPersons] = useState<UserType[]>([]);

  const dataGridRef = createRef<any>();
  const dataSource = new CustomStore({
    key: "id",
    load: (loadOptions) => {
      return apiGetStates({ loadOptions })
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

  useEffect(() => {
    const getAllSalesPersons = async () => {
      await apiGetSalesPersons()
        .then((res) => {
          if (res.status === 200) {
            setSalesPersons(res.data.users);
          }
        })
        .catch(() => {
          enqueueSnackbar("Something went wrong. Please try again later", {
            variant: "error",
          });
        });
    };

    getAllSalesPersons();
  }, []);

  const handleRefreshDataGrid = () => {
    dataGridRef.current.instance.state(null);
  };

  const handleCreated = () => {
    dataGridRef.current.instance.refresh();
  };

  const handleDelete = async (row: any) => {
    await apiDeleteState({ id: row.id })
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

  const cellActionRender = (data: any) => {
    const row = data.data;
    return (
      <Box sx={{ textAlign: "center" }}>
        <EditState
          salesPersons={salesPersons}
          row={row}
          onCreated={handleCreated}
        />

        <DeleteDialog onDelete={() => handleDelete(row)} />
      </Box>
    );
  };

  const cellUsersRender = (data: any) => {
    const row = data.data;
    return (
      <>
        {row.users.map((user: UserType, index: number) => (
          <>
            {index !== 0 && (
              <Box component="span" sx={{ color: "primary.main" }}>
                ,{" "}
              </Box>
            )}
            <MuiLink
              key={user.id}
              component={Link}
              to={`/user/edit/${user.id}`}
              underline="hover"
              color="primary"
            >
              {`${user.firstName || "unnamed"} ${user.lastName || "unnamed"}`}
            </MuiLink>
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <CreateState onCreated={handleCreated} />

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
            storageKey="mad-state-list"
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
          <Column dataField="code" caption="Code" fixed={true} minWidth={60} />
          <Column dataField="name" caption="Name" fixed={true} minWidth={60} />
          <Column
            dataField="country"
            caption="Country"
            fixed={true}
            minWidth={60}
          />
          <Column
            caption="Sales Person"
            fixed={true}
            minWidth={250}
            cellRender={cellUsersRender}
          />
          <Column
            dataField="createdAt"
            caption="Created At"
            dataType="date"
            format="dd/MM/yyyy"
            defaultSortOrder="desc"
            minWidth={120}
          />
          <Column
            dataField="updatedAt"
            caption="Updated At"
            dataType="date"
            format="dd/MM/yyyy"
            minWidth={120}
          />
        </DataGrid>
      </Box>
    </>
  );
}
