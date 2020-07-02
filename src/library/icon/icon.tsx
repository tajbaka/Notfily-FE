import * as classNames from "classnames";
import * as React from "react";

import "./styles.css";

export interface IIconProps {
  className?: string;
  name?: string;
  imageType?: ImageType;
}

interface IIconState {
  src?: string;
  src2x?: string;
}

export enum ImageType {
  png = ".png",
  jpg = ".jpg"
}

export class Icon extends React.Component<IIconProps, IIconState> {
  public static defaultProps: IIconProps = {
    imageType: ImageType.png,
    name: "alert_lightening_icon"
  };

  constructor(props: IIconProps) {
    super(props);
    const { name, imageType } = this.props;
    let src;
    let src2x;
    try {
      src = require("../assets/" + name + imageType);
      src2x = require("../assets/" + name + "@2x" + imageType);
    } catch (e) {
      // ignore
    }

    this.state = {
      src: src || require("../assets/filler.png"),
      src2x: src2x || require("../assets/filler.png"),
    };
  }

  public componentWillReceiveProps(nextProps: IIconProps) {
    const { imageType } = this.props;
    if(nextProps.name !== this.props.name){
       const src = require("../assets/" + nextProps.name + imageType);
       const src2x = require("../assets/" + nextProps.name + "@2x" + imageType);
       this.setState({ src, src2x })
    }
  }

  public render() {
    const { className } = this.props;
    const { src, src2x } = this.state;
    const classes = 'library-icon';

    return (
      <img
        className={classNames(classes, className)}
        src={src}
        srcSet={`${src2x} 2x`}
      />
    );
  }
}
