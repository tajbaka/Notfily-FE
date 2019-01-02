import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../";

import "./styles.css";

import { IMPDStates, States } from "../";

export interface IMPDIconProps extends IMPDStates {
  className?: string;
  name?: string;
  hoverName?: string;
  selectName?: string;
  imageType?: ImageType;
  alt?: string;
  urlSrc?: string;
  tabIndex?: number;
}

interface IMPDIconState {
  onHover: boolean;
  src?: string;
  src2x?: string;
}

export enum ImageType {
  png = ".png",
  jpg = ".jpg"
}

export class MPDIcon extends React.Component<IMPDIconProps, IMPDIconState> {
  public static defaultProps: IMPDIconProps = {
    imageType: ImageType.png,
    name: "alert_lightening_icon"
  };

  constructor(props: IMPDIconProps) {
    super(props);
    const { name, imageType, urlSrc } = this.props;
    let src;
    let src2x;
    try {
      src = require("../assets/" + name + imageType);
      src2x = require("../assets/" + name + "@2x" + imageType);
    } catch (e) {
      // ignore
    }

    if (urlSrc) {
      src = urlSrc;
      src2x = urlSrc;
    }

    this.state = {
      src: src || require("../assets/filler.png"),
      src2x: src2x || require("../assets/filler.png"),
      onHover: false
    };
  }

  public componentWillReceiveProps(nextProps: IMPDIconProps) {
    const { imageType, hoverName, selectName, name, urlSrc } = this.props;
    if (nextProps.itemState !== undefined) {
      if (urlSrc) {
        this.setState({ src: urlSrc, src2x: urlSrc });
      } else {
        try {
          let src = require("../assets/" + name + imageType);
          let src2x = require("../assets/" + name + "@2x" + imageType);
          switch (nextProps.itemState) {
            case States.hover:
              try {
                src = require("../assets/" + hoverName + imageType);
                src2x = require("../assets/" + hoverName + "@2x" + imageType);
              } catch (e) {
                // ignore
              }
              break;
            case States.selected:
              try {
                src = require("../assets/" + selectName + imageType);
                src2x = require("../assets/" + selectName + "@2x" + imageType);
              } catch (e) {
                // ignore
              }
              break;
            default:
              break;
          }
          this.setState({ src, src2x });
        } catch (e) {
          // ignore
        }
      }
    }
    if(nextProps.name !== this.props.name){
       const src = require("../assets/" + nextProps.name + imageType);
       const src2x = require("../assets/" + nextProps.name + "@2x" + imageType);
       this.setState({src, src2x})
    }
  }

  public render() {
    const { alt, className, tabIndex } = this.props;
    const { src, src2x } = this.state;
    const classes = classNames(Classes.ICON, className);

    return (
      <img
        tabIndex={tabIndex}
        className={classes}
        src={src}
        srcSet={`${src2x} 2x`}
        alt={alt}
      />
    );
  }
}
