import { createRef } from "react";

import {
  Box,
  Button as MuiButton,
  Link as MuiLink,
  Typography,
} from "@mui/material";
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { apiGetAllQuotes } from "utils/api";

import "devextreme/dist/css/dx.light.css";
import roles from "utils/roles";
import { RootState } from "store";

export default function QuoteTable() {
  const dataGridRef = createRef<any>();
  const auth = useSelector((state: RootState) => state.auth.user);

  const dataSource = new CustomStore({
    key: "id",
    load: (loadOptions) => {
      return apiGetAllQuotes({ loadOptions })
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

  const cellQuoteIdRender = (data: any) => {
    const row = data.data;

    if (row.type === "Visit")
      return (
        <MuiLink
          component={Link}
          to={`visit/detail/${row.id as string}`}
          underline="hover"
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          {data.value}
        </MuiLink>
      );

    return (
      <MuiLink
        component={Link}
        to={`detail/${row.id as string}`}
        underline="hover"
        color="primary"
        sx={{ fontWeight: 600 }}
      >
        {data.value}
      </MuiLink>
    );
  };

  const cellSalesPersonRender = (data: any) => {
    const row = data.data;
    if (row.state && row.state.users) {
      return (
        <>
          {row.state.users.map((user: UserType, index: number) => (
            <span key={index}>
              {index !== 0 && (
                <Box component="span" sx={{ color: "primary.main" }}>
                  ,{" "}
                </Box>
              )}
              {auth.role == roles.admin ? (
                <MuiLink
                  key={user.id}
                  component={Link}
                  to={`/user/edit/${user.id}`}
                  underline="hover"
                  color="primary"
                >
                  {`${user.firstName || "unnamed"} ${
                    user.lastName || "unnamed"
                  }`}
                </MuiLink>
              ) : (
                <Typography key={user.id}>
                  {`${user.firstName || "unnamed"} ${
                    user.lastName || "unnamed"
                  }`}
                </Typography>
              )}
            </span>
          ))}
        </>
      );
    } else {
      return <></>;
    }
  };

  const cellCommonRender = (data: any) => {
    const row = data.data;

    if (row.type === "Visit")
      return <Box sx={{ backgroundColor: "#7f7f7f" }}>&nbsp;</Box>;

    return <Box component="div">{data.text}</Box>;
  };

  return (
    <>
      <MuiButton
        component={Link}
        to="/quote/visit/create"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add New Visit Notes
      </MuiButton>
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
            storageKey="mad-quote-list"
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
              <div>
                <Button icon="refresh" onClick={handleRefreshDataGrid} />
              </div>
            </Item>
            <Item name="columnChooserButton" />
          </Toolbar>

          <Column dataField="type" caption="Type" fixed={true} minWidth={60} />
          <Column
            dataField="quoteId"
            caption="Quote Id"
            fixed={true}
            minWidth={80}
            cellRender={cellQuoteIdRender}
          />
          <Column
            dataField="status"
            caption="Status"
            minWidth={60}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="projectName"
            caption="Project Name"
            minWidth={110}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="units"
            caption="Units"
            dataType="number"
            minWidth={60}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="value"
            caption="Value"
            dataType="number"
            format={{
              type: "currency",
              precision: 2,
            }}
            minWidth={80}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="customerName"
            caption="Customer Name"
            minWidth={120}
          />
          <Column
            dataField="contact"
            caption="Contact"
            minWidth={80}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="endContractor"
            caption="End Contractor"
            minWidth={120}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="state.users.firstName"
            caption="Sales Person"
            dataType="string"
            minWidth={160}
            cellRender={cellSalesPersonRender}
          />
          <Column
            dataField="quoteBy"
            caption="Quote By"
            minWidth={80}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="creationDate"
            caption="Creation Date"
            dataType="date"
            format="dd/MM/yyyy"
            defaultSortOrder="desc"
            minWidth={120}
          />
          <Column
            dataField="estAwardDate"
            caption="Est Award Date"
            dataType="date"
            format="dd/MM/yyyy"
            minWidth={120}
            cellRender={cellCommonRender}
          />
          <Column
            dataField="nextFollowUp"
            caption="Next Follow Up"
            dataType="date"
            format="dd/MM/yyyy"
            minWidth={120}
            cellRender={cellCommonRender}
          />
        </DataGrid>
      </Box>
    </>
  );
}
