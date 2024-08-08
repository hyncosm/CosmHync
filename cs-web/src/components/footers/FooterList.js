import React from "react";

export default function FooterList({ name, list }) {
  return (
    <div className="mainFooterHeaderList">
      <div className="mainFooterListHeader">
        <text className="mainFooterListHeaderText">{name}</text>
      </div>
      <div className="footerList">
        {list.map((e) => {
          return <text className="FooterListElement">{e.name}</text>;
        })}
      </div>
    </div>
  );
}
