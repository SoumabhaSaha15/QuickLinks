import React, { type PropsWithChildren } from "react";

const ListContainer: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  return (
    <ul className="list bg-base-200 rounded-box shadow-md max-h-[calc(100dvh-4rem)] overflow-auto">
      {children}
    </ul>
  )
}
export default ListContainer;