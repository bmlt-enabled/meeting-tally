import React, { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import GroupsIcon from "@mui/icons-material/Groups";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { getMeetings, getServiceBodies } from "../../api";
import { PropagateLoader } from "react-spinners";
import { DataTableRow } from "./DataTableRow";

const jsonpAdapter = require("axios-jsonp");

export default function DataTable() {
  const { server, serverData } = useContext(AppContext);
  const [meetings, setMeetings] = useState([]);
  const [serviceBodies, setServiceBodies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await axios({
        url: server + getServiceBodies,
        adapter: jsonpAdapter,
      })
        .then((res) => {
          // sort by name
          const sorted = res.data.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          setServiceBodies(sorted);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios({
        url: server + getMeetings,
        adapter: jsonpAdapter,
      })
        .then((res) => {
          setMeetings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    if (server) {
      getData();
    }
  }, [server]);

  const spinnerStyles = {
    top: "25%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  };

  const rows = [];
  const serviceBodyIds = [];
  const serviceBodyParentIds = [];
  serviceBodies.forEach((body) => {
    serviceBodyIds.push(body.id);
    serviceBodyParentIds.push(body.parent_id);
    meetings.forEach((meeting) => {
      if (meeting.service_body_bigint === body.id) {
        rows.push({ ...meeting, ...body });
      }
    });
  });

  // get all parent service bodies
  const parents = serviceBodyIds.filter(
    (id) => !serviceBodyParentIds.includes(id)
  );

  // remove all serviceBodies where id matches parent_id
  const filteredServiceBodies = serviceBodies.filter((body) =>
    parents.includes(body.id)
  );

  if (isLoading) {
    return <PropagateLoader cssOverride={spinnerStyles} />;
  }
  if (Object.keys(serverData).length === 0) {
    return (
      <Typography variant="h2" sx={{ margin: "1rem 0" }}>
        Please Select A Server
      </Typography>
    );
  } else {
    return (
      <>
        <Typography variant="h2" sx={{ margin: "1rem 0" }}>
          {`Meetings In ${serverData.name}`}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Area</TableCell>
                <TableCell align="center">Published</TableCell>
                <TableCell align="center">Unpublished</TableCell>
                <TableCell align="center">
                  In Person
                  <br />
                  (Published)
                </TableCell>
                <TableCell align="center">
                  Hybrid
                  <br />
                  (Published)
                </TableCell>
                <TableCell align="center">
                  Virtual
                  <br />
                  (Published)
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 600 }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServiceBodies
                .filter((b) => b.id !== "1")
                .map((body) => (
                  <DataTableRow key={body.id} row={body} rows={rows} />
                ))}
              <TableRow style={{ backgroundColor: "#282c34" }}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small">
                    <GroupsIcon style={{ color: "#fff" }} />
                  </IconButton>
                </TableCell>
                <TableCell style={{ fontWeight: 600, color: "#fff" }}>
                  {serverData.name}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 600, color: "#fff" }}
                >
                  {rows.filter((pub) => pub.published === "1").length}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 600, color: "#fff" }}
                >
                  {rows.filter((pub) => pub.published === "0").length}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 600, color: "#fff" }}
                >
                  {
                    rows.filter(
                      (pub) => pub.published === "1" && pub.venue_type === "1"
                    ).length
                  }
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 600, color: "#fff" }}
                >
                  {
                    rows.filter(
                      (pub) => pub.published === "1" && pub.venue_type === "3"
                    ).length
                  }
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 600, color: "#fff" }}
                >
                  {
                    rows.filter(
                      (pub) => pub.published === "1" && pub.venue_type === "2"
                    ).length
                  }
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 600, color: "#fff" }}
                >
                  {rows.length}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
