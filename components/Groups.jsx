import React, { useEffect, useState } from "react";
import { getAllGroups } from "../api";
import GroupListFilter from "./GroupListFilter";
import GroupListGenerator from "./GroupListGenerator";

const Groups = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupList, setGroupList] = useEffect([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllGroups()
      .then((groups) => {
        setErr(null);
        setGroupList(groups);
        setIsLoading(false);
      })
      .catch((err) =>
        setErr(`${error.response.status} Groups ${error.response.statusText}`)
      );
  }, []);
  console.log(groups, "<<<<<<<<<<<<<<");

  if (isLoading) {
    return <text>Fetching groups...</text>;
  }

  if (err) return <text>{err}</text>;

  return (
    <div>
      <GroupListFilter />
      <GroupListGenerator groupList={groupList} />
    </div>
  );
};

export default Groups;
