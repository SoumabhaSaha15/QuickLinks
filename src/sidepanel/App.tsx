import z from "zod";
import cn from "@/utils/cn";
import { Activity } from "react";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import ListItem from "@/components/ListItem";
import { CiImport, CiExport } from "react-icons/ci";
import RippleButton from "@/components/RippleButton";
import ListContainer from "@/components/ListContainer";
import { IoMdClose, IoMdArrowRoundBack } from "react-icons/io";
import { type Sites, getQuickLinks, listenQuickLinksChanges, setQuickLinks, importQuickLinks } from "@/utils/quick-link";

const getMode: (mode: boolean) => ("hidden" | "visible") = (mode) => mode ? "visible" : "hidden";

export default function App() {
  const [sites, setSites] = useState<Sites>([]);
  const [text, setText] = useState<string>("");
  const [mode, setMode] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getQuickLinks().then(setSites);
    return listenQuickLinksChanges(setSites);
  }, []);

  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <RippleButton
          className="btn btn-ghost text-xl"
          onClick={() => { chrome.tabs.create({ url: "https://github.com/SoumabhaSaha15/QuickLinks" }); }}
        >QuickLinks
        </RippleButton>
      </div>
      <Activity mode={getMode(mode)}>
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
      </Activity>

      <Activity mode={getMode(!mode)}>
        <div className="min-h-[calc(100dvh-4rem)] w-full place-items-center grid" >
          <div className="card bg-base-200 w-full max-w-sm lg:max-w-md shrink-0 shadow-2xl rounded-box transition-transform">
            <div className="card-body p-4 sm:p-8">

              <form className="fieldset space-y-4">

                <RippleButton
                  type="button"
                  onClick={() => setMode(prev => !prev)}
                  disabled={mode}
                  className="btn btn-accent text-accent-content w-full rounded-box hover:btn-secondary"
                >
                  <IoMdArrowRoundBack size={24} />
                  back
                </RippleButton>

                <div>
                  <label className="label" htmlFor="LinksImport">
                    {error && (<span className="text-error text-sm ml-2">{error}</span>)}
                  </label>
                  <textarea
                    className="validator max-h-64 resize-y textarea textarea-bordered w-full min-h-30 focus:outline-none focus:ring-0 focus:ring-accent rounded-box"
                    id="LinksImport"
                    value={text}
                    onInput={(e) => { setText(e.currentTarget.value) }}
                    placeholder="paste json here"
                    required
                  />
                </div>

                <RippleButton
                  type="button"
                  disabled={text === ""}
                  onClick={() => {
                    try {
                      const paesedImport = JSON.parse(text);
                      importQuickLinks(paesedImport as string[])
                        .catch((err: Error) => {
                          if (err instanceof z.ZodError)
                            return setError(z.prettifyError(err));
                          setError(err.message);
                        });
                      setError(null);
                      setText("");
                      setMode(prev => !prev);
                    } catch (err) {
                      if (err instanceof z.ZodError)
                        return setError(z.prettifyError(err));
                      setError((err as Error).message);
                    }
                  }}
                  className={cn("btn btn-primary w-full rounded-box hover:btn-secondary", text === "" && "btn-disabled")}
                >
                  import links <CiImport size={24} />
                </RippleButton>

              </form>
            </div>
          </div>
        </div>
      </Activity>


      <div className="fab">
        <RippleButton tabIndex={0} className="btn btn-lg rounded-box btn-square btn-info">
          <MdMenu size={24} />
        </RippleButton>
        <div className="fab-close">
          Close
          <span className="btn rounded-box btn-square btn-lg btn-error">
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
            className={cn("btn btn-lg rounded-box btn-square", (!sites.length) && "btn-disabled")}
          >
            <CiExport size={24} />
          </RippleButton>
        </div>
        <div>
          import
          <RippleButton
            className={cn("btn btn-lg rounded-box btn-square", (!mode) && "btn-disabled")}
            onClick={() => setMode(prev => !prev)}
            disabled={!mode}
          >
            <CiImport size={24} />
          </RippleButton></div>
      </div>
    </>
  );
}
