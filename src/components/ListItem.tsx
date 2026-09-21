import React from "react";
import { MdDelete } from "react-icons/md";
import getFavIcon from "@/utils/favicon";
import RippleButton from "@/components/RippleButton";

export type ListItemProps = {
  site: URL;
  remove: () => void;
}
const ListItem: React.FC<ListItemProps> = ({ site, remove }: ListItemProps) => {
  return (
    <li className="list-row">
      <div>
        <img
          className="size-10 rounded-box"
          alt={site.hostname}
          src={getFavIcon(site.origin)}
        />
      </div>
      <div>
        <div>{site.origin}</div>
        <a
          className="link link-primary"
          href={site.href}
          children={site.hostname}
        />
      </div>
      <RippleButton className="btn btn-square btn-ghost bg-error" onClick={() => { remove(); }}>
        <MdDelete size={24} className="text-error-content" />
      </RippleButton>
    </li>
  )
}
export default ListItem;