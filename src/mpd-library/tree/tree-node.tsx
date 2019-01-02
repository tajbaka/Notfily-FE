import * as classNames from "classnames";
import * as React from "react";

import { Collapse, IProps, Utils } from "@blueprintjs/core";

import { Classes, MPDIOSSelectableDiv } from "src/mpd-library";

import "./styles.css";

export interface IMPDTreeNode<T = {}> extends IProps {
  childNodes?: Array<IMPDTreeNode>;
  id: string | number;
  isExpanded?: boolean;
  isSelected?: boolean;
  shouldCollapse?: boolean;
  hasChild?: boolean;
  nodeData?: T;
}

export interface IMPDTreeNodeProps<T = {}> extends IMPDTreeNode<T> {
  children?: React.ReactNode;
  NodeItem: React.ComponentClass<any> | React.StatelessComponent<any>;
  contentRef?: (node: MPDTreeNode, element: HTMLDivElement | null) => void;
  returnNode?: boolean;
  depth: number;
  key?: string | number;
  loading?: boolean;
  onClick?: (node: MPDTreeNode, e: React.MouseEvent<HTMLDivElement>) => void;
  onCollapse?: (
    node: MPDTreeNode,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  onContextMenu?: (
    node: MPDTreeNode,
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
  onDoubleClick?: (
    node: MPDTreeNode,
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
  onExpand?: (node: MPDTreeNode, e: React.MouseEvent<HTMLSpanElement>) => void;
  onGetNode?: (node: MPDTreeNode) => void;
  path: Array<number>;
  listData?: any;
}

export class MPDTreeNode<T = {}> extends React.Component<IMPDTreeNodeProps<T>> {
  public static ofType<T>() {
    return MPDTreeNode as new (props: IMPDTreeNodeProps<T>) => MPDTreeNode<T>;
  }

  public constructor(props: IMPDTreeNodeProps<T>) {
    super(props);
    this.handleCaretClick = this.handleCaretClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleContentRef = this.handleContentRef.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    this.state = {
      returnNode: false
    };
  }

  public componentDidMount() {
    const { returnNode } = this.props;
    if (returnNode) {
      Utils.safeInvoke(this.props.onGetNode, this);
    }
  }

  public render() {
    const {
      children,
      className,
      hasChild,
      id,
      listData,
      isExpanded,
      isSelected,
      loading,
      NodeItem
    } = this.props;

    const classes = classNames(
      Classes.TREE_NODE,
      {
        [Classes.SELECTED]: isSelected,
        [Classes.EXPANDED]: isExpanded,
        [Classes.HAS_CHILD]: hasChild,
        [Classes.NO_CHILD]: !hasChild
      },
      className
    );

    const contentClasses = classNames(
      Classes.TREE_NODE_CONTENT,
      `${Classes.TREE_NODE_CONTENT}-${this.props.depth}`
    );

    // console.log(listData, "data");

    return (
      <div className={classes} onClick={this.handleCaretClick}>
        <MPDIOSSelectableDiv
          className={contentClasses}
          onClick={this.handleClick}
          onContextMenu={this.handleContextMenu}
          onDoubleClick={this.handleDoubleClick}
          ref={this.handleContentRef}
        >
          <NodeItem
            className={classNames({
              [Classes.SELECTED]: isSelected,
              [Classes.EXPANDED]: isExpanded,
              [Classes.HAS_CHILD]: hasChild
            })}
            id={id}
            loading={loading}
            data={listData}
          />
          <div
            className={classNames(Classes.TREE_NODE_CHILD, {
              [Classes.EXPANDED]: isExpanded,
              [Classes.HAS_CHILD]: hasChild
            })}
          />
        </MPDIOSSelectableDiv>
        <Collapse isOpen={isExpanded}>{children}</Collapse>
      </div>
    );
  }

  // private handleOnTouchStart(e: React.MouseEvent<HTMLElement>) {
  //   console.log("heeeere");
  //   document.body.addEventListener('touchstart', function() {}, false);
  // }

  private handleCaretClick(e: React.MouseEvent<any>) {
    e.stopPropagation();
    const { isExpanded, onCollapse, onExpand } = this.props;
    Utils.safeInvoke(isExpanded ? onCollapse : onExpand, this, e);
  }

  private handleClick(e: React.MouseEvent<any>) {
    Utils.safeInvoke(this.props.onClick, this, e);
  }

  private handleContentRef(element: any | null) {
    Utils.safeInvoke(this.props.contentRef, this, element);
  }

  private handleContextMenu(e: React.MouseEvent<any>) {
    Utils.safeInvoke(this.props.onContextMenu, this, e);
  }

  private handleDoubleClick(e: React.MouseEvent<any>) {
    Utils.safeInvoke(this.props.onDoubleClick, this, e);
  }
}
