import React, { useState } from 'react';
import { Button, Grid, Header, Label, Segment, Portal } from 'semantic-ui-react'

const SideView = () => {
  return <div className="sidebar">
    <LogView />
    <LogView />
  </div>;
};

const LogView = () => {
  let [log, setLog] = useState([]);
  return (
    <div>
      <Segment.Group>
        <Segment>
          <Button
            compact
            size='small'
            floated='right'
            onClick={() => setLog([])}>
            Clear
              </Button>
              Event Log <Label circular>{log.length}</Label>
        </Segment>
        <Segment secondary>
          <pre>
            {log.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </pre>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default SideView;
