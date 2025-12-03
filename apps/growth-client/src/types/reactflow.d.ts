/**
 * ReactFlow 类型定义（临时方案）
 * 等 reactflow 包安装后，这些类型定义可以删除
 */

export interface Node<T = any> {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: T;
  style?: React.CSSProperties;
  className?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
}

export interface Edge<T = any> {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  style?: React.CSSProperties;
  label?: string;
  labelStyle?: React.CSSProperties;
  markerEnd?: MarkerType | { type: MarkerType; color?: string };
  data?: T;
  hidden?: boolean;
  selected?: boolean;
}

export type NodeTypes = Record<string, React.ComponentType<any>>;
export type EdgeTypes = Record<string, React.ComponentType<any>>;

export interface Connection {
  source: string | null;
  target: string | null;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}

export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

