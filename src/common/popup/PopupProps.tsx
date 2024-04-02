import React from 'react';
import { Layout } from '../layout/Layout';
import { Style } from "../Style";

export interface PopupProps {
  layout: Layout;
  style?: Style;
  disabled?: boolean;
  removed?: boolean;
  children: React.ReactNode;
  onBack?(): void;
  fit?: boolean;
}
