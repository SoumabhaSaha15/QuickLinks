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
    <li className="list-row hover:bg-base-300 transition-all rounded-none">
      <div>
        <img
          className="size-10 rounded-box bg-base-content"
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
          onClick={() => {
            chrome.tabs.create({ url: site.href })
          }}
        />
      </div>
      <RippleButton className="btn btn-square btn-ghost bg-error" onClick={() => { remove(); }}>
        <MdDelete size={24} className="text-error-content" />
      </RippleButton>
    </li>
  )
}
export default ListItem;