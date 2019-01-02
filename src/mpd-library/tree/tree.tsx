import * as classNames from "classnames";
import * as React from "react";

import * as myClasses from "src/mpd-library";

import { IProps } from "@blueprintjs/core";
import { IMPDTreeNode, MPDTreeNode } from "../";

export type MPDTreeEventHandler = (
  node: IMPDTreeNode,
  nodePath: Array<number>,
  e?: React.MouseEvent<HTMLElement>
) => void;

import "./styles.css";

export interface IMPDTreeProps<T = {}> extends IProps {
  contents?: Array<IMPDTreeNode<T>>;
  onNodeClick?: MPDTreeEventHandler;
  onNodeCollapse?: MPDTreeEventHandler;
  onNodeContextMenu?: MPDTreeEventHandler;
  onNodeDoubleClick?: MPDTreeEventHandler;
  onNodeExpand?: MPDTreeEventHandler;
  onGetNode?: MPDTreeEventHandler;
  NodeItem: React.ComponentClass<any> | React.StatelessComponent<any>;
  loading?: boolean;
  getNodeId?: string;
}

export class MPDTree extends React.Component<IMPDTreeProps> {
  public static nodeFromPath(
    path: Array<number>,
    treeNodes: Array<IMPDTreeNode> | undefined
  ): IMPDTreeNode | undefined {
    if (treeNodes) {
      if (path.length === 1) {
        return treeNodes[path[0]];
      } else {
        return MPDTree.nodeFromPath(
          path.slice(1),
          treeNodes[path[0]].childNodes
        );
      }
    }
    return;
  }

  private nodeRefs: { [nodeId: string]: HTMLElement } = {};

  public constructor(props: IMPDTreeProps) {
    super(props);
    this.handleGetNode = this.handleGetNode.bind(this);
    this.renderNodes = this.renderNodes.bind(this);
    this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleContentRef = this.handleContentRef.bind(this);
    this.handleNodeContextMenu = this.handleNodeContextMenu.bind(this);
    this.handleNodeDoubleClick = this.handleNodeDoubleClick.bind(this);
    this.handleNodeExpand = this.handleNodeExpand.bind(this);
    this.handlerHelper = this.handlerHelper.bind(this);
  }

  public render() {
    return (
      <div className={classNames(myClasses.TREE, this.props.className)}>
        {this.renderNodes(
          [],
          this.props.contents && this.props.contents,
          myClasses.TREE_ROOT
        )}
      </div>
    );
  }

  public handleGetNode(node: MPDTreeNode) {
    if (this.props.onGetNode) {
      this.handlerHelper(this.props.onGetNode, node);
    }
  }

  private renderNodes(
    currentPath: Array<number>,
    treeNodes?: Array<IMPDTreeNode>,
    className?: string
  ): JSX.Element | null {
    if (treeNodes == null) {
      return null;
    }

    const { loading, NodeItem, getNodeId } = this.props;

    const nodeItems = treeNodes.map((node, i) => {
      const hasChild = node.childNodes && node.childNodes.length > 0;
      const elementPath = currentPath.concat(i);
      return (
        <MPDTreeNode
          {...node}
          key={i}
          id={node.id}
          returnNode={node.id === getNodeId}
          onGetNode={this.handleGetNode}
          contentRef={this.handleContentRef}
          depth={elementPath.length - 1}
          onClick={this.handleNodeClick}
          onContextMenu={this.handleNodeContextMenu}
          onCollapse={this.handleNodeCollapse}
          onDoubleClick={this.handleNodeDoubleClick}
          onExpand={this.handleNodeExpand}
          path={elementPath}
          NodeItem={NodeItem}
          loading={loading}
          hasChild={hasChild}
        >
          {this.renderNodes(elementPath, node.childNodes || [])}
        </MPDTreeNode>
      );
    });

    return (
      <div className={classNames(myClasses.TREE_NODE_LIST, className)}>
        {nodeItems}
      </div>
    );
  }

  private handleNodeCollapse(
    node: MPDTreeNode,
    e: React.MouseEvent<HTMLElement>
  ) {
    if (this.props.onNodeCollapse) {
      this.handlerHelper(this.props.onNodeCollapse, node, e);
    }
  }

  private handleNodeClick(node: MPDTreeNode, e: React.MouseEvent<HTMLElement>) {
    if (this.props.onNodeClick) {
      this.handlerHelper(this.props.onNodeClick, node, e);
    }
  }

  private handleContentRef(node: MPDTreeNode, element: HTMLElement | null) {
    if (element != null) {
      this.nodeRefs[node.props.id] = element;
    } else {
      delete this.nodeRefs[node.props.id];
    }
  }

  private handleNodeContextMenu(
    node: MPDTreeNode,
    e: React.MouseEvent<HTMLElement>
  ) {
    if (this.props.onNodeContextMenu) {
      this.handlerHelper(this.props.onNodeContextMenu, node, e);
    }
  }

  private handleNodeDoubleClick(
    node: MPDTreeNode,
    e: React.MouseEvent<HTMLElement>
  ) {
    if (this.props.onNodeDoubleClick) {
      this.handlerHelper(this.props.onNodeDoubleClick, node, e);
    }
  }

  private handleNodeExpand(
    node: MPDTreeNode,
    e: React.MouseEvent<HTMLElement>
  ) {
    if (this.props.onNodeExpand) {
      this.handlerHelper(this.props.onNodeExpand, node, e);
    }
  }

  private handlerHelper(
    handlerFromProps: MPDTreeEventHandler,
    node: MPDTreeNode,
    e?: React.MouseEvent<HTMLElement>
  ) {
    const nodeData = MPDTree.nodeFromPath(node.props.path, this.props.contents);
    if (nodeData) {
      handlerFromProps(nodeData, node.props.path, e);
    }
  }
}
