// import * as classNames from "classnames";
import * as React from "react";

export interface IMPDListEmptyProps {
  emptyElement?: JSX.Element;
}

export const MPDListEmpty: React.SFC<IMPDListEmptyProps> = props => {
    const { emptyElement } = props;
    return (
        <React.Fragment>
            { emptyElement }
        </React.Fragment>
    );
}