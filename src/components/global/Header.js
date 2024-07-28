import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ServerDropdown } from "../ServerDropdown";
import { styled } from "@mui/system";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { getAggregator } from "../../api";

export const Header = () => {
  const { server, setServer, setServerData } = useContext(AppContext);
  const [serverList, setServerList] = useState([]);

  useEffect(() => {
    // query aggregator for all available servers
    axios
      .get(getAggregator)
      .then((res) => {
        // sort results by name
        const sorted = res.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else {
            return 1;
          }
        });

        // set server list to state
        setServerList(sorted);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  // on dropdown change, set the selected server url in the context
  function appChange(e) {
    const url = e.target.value;
    const serverData = serverList.filter((svr) => svr.url === url);
    setServerData(serverData[0]);
    setServer(url);
  }

  const StyledHeaderContainer = styled("header")({
    backgroundColor: "#282c34",
    padding: "1rem 0",
  });

  const StyledHeaderTitle = styled("h1")({
    fontSize: "1.5rem",
    color: "white",
    flex: "1",
  });

  const StyledHeaderWrapper = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const StyledServerInfo = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flex: "1",
  });

  const StyledServerName = styled(Typography)(({ theme }) => ({
    marginTop: "0.5rem",
    color: theme.palette.primary.main,
  }));

  return (
    <StyledHeaderContainer>
      <Container maxWidth="lg">
        <StyledHeaderWrapper>
          <StyledHeaderTitle>BMLT Meeting Tally</StyledHeaderTitle>
          <StyledServerInfo>
            <ServerDropdown serverList={serverList} appChange={appChange} />
            <StyledServerName variant="h4">
              {server ? `Connected To: ${server}` : "Not Connected"}
            </StyledServerName>
          </StyledServerInfo>
        </StyledHeaderWrapper>
      </Container>
    </StyledHeaderContainer>
  );
};
