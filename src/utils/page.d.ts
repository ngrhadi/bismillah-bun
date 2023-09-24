import { NextPage, NextPageContext } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  getInitialProps?: (_props: NextPageContext) => void;
  layout?: ComponentType;
};
