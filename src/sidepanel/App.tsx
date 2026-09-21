// import { Activity } from "react";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import ListItem from "@/components/ListItem";
import { CiImport, CiExport } from "react-icons/ci";
import RippleButton from "@/components/RippleButton";
import ListContainer from "@/components/ListContainer";
import { type Sites, getQuickLinks, listenQuickLinksChanges, setQuickLinks } from "@/utils/quick-link";
import cn from "@/utils/cn";

export default function App() {
  const [sites, setSites] = useState<Sites>([]);
  useEffect(() => {
    getQuickLinks().then(setSites);
    return listenQuickLinksChanges(setSites);
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <RippleButton
          className="btn btn-ghost text-xl"
          onClick={() => {
            chrome.tabs.create({ url: "https://soumabha-saha15.vercel.app/" });
          }}
        >QuickLinks
        </RippleButton>
      </div>

      <ListContainer>
        {(!sites.length) && (
          <li className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                alt={"empty list"}
                src="/broken.png"
              />
            </div>
            <div>
              <div>Empty list</div>
              <div className="text-xs font-semibold opacity-60">No sites pinned</div>
            </div>
          </li>
        )}
        {sites.map((item, index) => {
          const url = new URL(item);
          return (
            <ListItem
              site={url}
              key={index}
              remove={() => {
                setQuickLinks(sites.filter(it => it !== item))
                  .then();
              }}
            />)
        })}
      </ListContainer>

      <div className="fab">
        <RippleButton tabIndex={0} className="btn btn-lg btn-circle btn-info">
          <MdMenu size={24} />
        </RippleButton>
        <div className="fab-close">
          Close
          <span className="btn btn-circle btn-lg btn-error">
            <IoMdClose size={24} />
          </span>
        </div>
        <div>
          export
          <RippleButton
            onClick={() => {
              const jsonStr = JSON.stringify(sites, null, 2);
              const blob = new Blob([jsonStr], { type: "application/json" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "quick_links.json";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className={cn("btn btn-lg btn-circle", (!sites.length) && "btn-disabled")}
          >
            <CiExport size={24} />
          </RippleButton>
        </div>
        <div>
          import
          <RippleButton className="btn btn-lg btn-circle">
            <CiImport size={24} />
          </RippleButton></div>
      </div>
    </>
  );
}
