import React, { useState } from "react";

export default function Addbtn({ state }) {
  const [state, setState] = useState(state);
  const addBtn = () => {
    setState(!state);
    console.log(state);
  };
  return (
    <div>
      <Button variant="contained" onClick={addBtn}>
        Add New
      </Button>
    </div>
  );
}
