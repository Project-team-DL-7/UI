import React from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TeamBlock from "../features/teams/TeamBlock";
import CreateTeam from "../features/teams/CreateTeam";

const Teams = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as={"h1"}>Teams</Heading>
        <CreateTeam />
      </Row>
      <Row>
        <TeamBlock />
      </Row>
    </>
  );
};

export default Teams;
