import * as classNames from "classnames";
import * as React from "react";

import { IProps } from "@blueprintjs/core";

let importObj: any;

import "./styles.css";

export interface ITestIconProps extends IProps {
  name?: string;
  filler?: boolean;
}

interface ITestIconState {
    Icon?: any;
}

export class TestIcon extends React.Component<ITestIconProps, ITestIconState> {
    constructor(props: ITestIconProps){
        super(props);
        const { name } = this.props;

        import('./icon-list').then((something) => {
           importObj = something.importObj;
           if(name && importObj[name])  {
                this.setState({ Icon: importObj[name].component });
           }
        });

        this.state = {
            Icon: undefined
        }
    }

    public componentWillReceiveProps(nextProps: ITestIconProps){
        const { name } = this.props;
        if(name !== nextProps.name && nextProps.name !== undefined && importObj[nextProps.name]){
            const Icon = importObj[nextProps.name].component;
            this.setState({ Icon })
        }
    }

    public render() {
        const {
            className,
            filler,
        } = this.props;

        const { Icon } = this.state;
        const classes = classNames("test-icon", className);

        if(Icon === undefined) {
            return (
                filler ? 
                    <div className='test-icon-filler' />
                : 
                    null
            );
        }
        return (
            <Icon className={classNames(classes)} tabIndex={-1} />
        );
    };
}

