import {
  Collapse,
  IconButton,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { weekdays } from "../../data/weekdays";

export const DataTableRow = ({ row, rows, getServiceBodyMeetings }) => {
  const [open, setOpen] = useState(false);
  const bodyMeetings = getServiceBodyMeetings(row.id);
  const filterMeetings = (filters) => bodyMeetings.filter(filters).length;

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">
          {filterMeetings((pub) => pub.published === "1")}
        </TableCell>
        <TableCell align="center">
          {filterMeetings((pub) => pub.published === "0")}
        </TableCell>
        <TableCell align="center">
          {filterMeetings(
            (pub) => pub.published === "1" && pub.venue_type === "1"
          )}
        </TableCell>
        <TableCell align="center">
          {filterMeetings(
            (pub) => pub.published === "1" && pub.venue_type === "3"
          )}
        </TableCell>
        <TableCell align="center">
          {filterMeetings(
            (pub) => pub.published === "1" && pub.venue_type === "2"
          )}
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 600 }}>
          {bodyMeetings.length}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="h6">
                Published
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Day Of Week</TableCell>
                    <TableCell align="center">In Person</TableCell>
                    <TableCell align="center">Hybrid</TableCell>
                    <TableCell align="center">Virtual</TableCell>
                    <TableCell align="center" style={{ fontWeight: 600 }}>
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weekdays.map((day, idx) => (
                    <TableRow key={`weekday-${idx}`}>
                      <TableCell component="th" scope="row">
                        {day.name}
                      </TableCell>
                      <TableCell align="center">
                        {filterMeetings(
                          (pub) =>
                            pub.published === "1" &&
                            pub.venue_type === "1" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {filterMeetings(
                          (pub) =>
                            pub.published === "1" &&
                            pub.venue_type === "3" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {filterMeetings(
                          (pub) =>
                            pub.published === "1" &&
                            pub.venue_type === "2" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: 600 }}>
                        {filterMeetings(
                          (pub) =>
                            pub.published === "1" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="h6">
                Unpublished
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Day Of Week</TableCell>
                    <TableCell align="center">In Person</TableCell>
                    <TableCell align="center">Hybrid</TableCell>
                    <TableCell align="center">Virtual</TableCell>
                    <TableCell align="center">Unknown</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weekdays.map((day, idx) => (
                    <TableRow key={`weekday-${idx}`}>
                      <TableCell component="th" scope="row">
                        {day.name}
                      </TableCell>
                      <TableCell align="center">
                        {filterMeetings(
                          (pub) =>
                            pub.published === "0" &&
                            pub.venue_type === "1" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {filterMeetings(
                          (pub) =>
                            pub.published === "0" &&
                            pub.venue_type === "3" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {filterMeetings(
                          (pub) =>
                            pub.published === "0" &&
                            pub.venue_type === "2" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {filterMeetings(
                          (pub) =>
                            pub.published === "0" &&
                            !pub.venue_type &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: 600 }}>
                        {filterMeetings(
                          (pub) =>
                            pub.published === "0" &&
                            pub.weekday_tinyint === day.id
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
