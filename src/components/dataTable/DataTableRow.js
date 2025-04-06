import {
  Collapse,
  IconButton,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const DataTableRow = ({ 
  row, 
  rows, 
  getServiceBodyMeetings, 
  childBodies = [],
  childrenMap = {},
  level = 0 
}) => {
  const [open, setOpen] = useState(false);
  const bodyMeetings = getServiceBodyMeetings(row.id);
  const filterMeetings = (filters) => bodyMeetings.filter(filters).length;
  const hasChildren = childBodies.length > 0;

  return (
    <Fragment>
      <TableRow sx={{ 
        backgroundColor: level === 0 ? '#f5f5f5' : 'inherit',
        '&:hover': {
          backgroundColor: level === 0 ? '#eeeeee' : '#f5f5f5'
        }
      }}>
        <TableCell 
          style={{ 
            paddingLeft: `${level * 2}rem`,
            width: '40px',
            minWidth: '40px'
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{ visibility: hasChildren ? 'visible' : 'hidden' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell 
          component="th" 
          scope="row"
          style={{ width: '30%', minWidth: '250px' }}
        >
          {row.name}
        </TableCell>
        <TableCell align="center" style={{ width: '12%' }}>
          {filterMeetings((pub) => pub.published === "1")}
        </TableCell>
        <TableCell align="center" style={{ width: '12%' }}>
          {filterMeetings((pub) => pub.published === "0")}
        </TableCell>
        <TableCell align="center" style={{ width: '12%' }}>
          {filterMeetings(
            (pub) => pub.published === "1" && pub.venue_type === "1"
          )}
        </TableCell>
        <TableCell align="center" style={{ width: '12%' }}>
          {filterMeetings(
            (pub) => pub.published === "1" && pub.venue_type === "3"
          )}
        </TableCell>
        <TableCell align="center" style={{ width: '12%' }}>
          {filterMeetings(
            (pub) => pub.published === "1" && pub.venue_type === "2"
          )}
        </TableCell>
        <TableCell align="center" style={{ width: '10%', fontWeight: 600 }}>
          {bodyMeetings.length}
        </TableCell>
      </TableRow>
      {hasChildren && (
        <TableRow>
          <TableCell style={{ padding: 0, border: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ width: '100%' }}>
                <Table size="medium" sx={{ width: '100%', tableLayout: 'fixed' }}>
                  <TableBody>
                    {childBodies.map((childBody) => (
                      <DataTableRow
                        key={childBody.id}
                        row={childBody}
                        rows={rows}
                        getServiceBodyMeetings={getServiceBodyMeetings}
                        childBodies={childrenMap[childBody.id] || []}
                        childrenMap={childrenMap}
                        level={level + 1}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};
